<script setup lang="ts">
import { stringSearch } from '@didyoumeantoast/dash-utils';
import { Label, Note, Status } from '@didyoumeantoast/hellodash-models';
import { Unsubscribe } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';
import { onMounted, onUnmounted, ref } from 'vue';
import { createLabel, updateLabel } from '../../slices/labels-slice';
import { addLabelToNote, archiveNote, createNote, duplicateNote, removeLabelFromNote, updateNote } from '../../slices/notes-slice';
import { dispatch, store } from '../../store';
import { noteLabels } from '../../utils/note-labels';

type SortOption = 'date' | 'title' | 'last-modified';

let unsubscribeStore: Unsubscribe;

const notes = ref<Note[]>([]);
const labels = ref<Label[]>([]);
const mobileView = ref(false);
const filteredNotes = ref<Note[]>([]);
const notesFilter = ref('');
const sortBy = ref<SortOption>('last-modified');
const selectedLabelId = ref<number | null>(null);
const selectedNote = ref<Note | null>(null);
const focusedNote = ref<Note | null>(null);
const isLoadingNote = ref(false);

onMounted(() => {
  const storeUpdated = () => {
    const state = store.getState();
    notes.value = state.notes;
    labels.value = state.labels;
    mobileView.value = state.appState.mobileView;
  };

  storeUpdated();
  unsubscribeStore = store.subscribe(storeUpdated);
});

onUnmounted(() => {
  unsubscribeStore();
});

function filterNotes() {
  const filterFns: ((note: Note) => boolean)[] = [];

  // string filter
  if (!isEmpty(notesFilter.value)) {
    const noteFilter = (note: Note) => stringSearch(note.title, notesFilter.value);
    filterFns.push(noteFilter);
  }

  // labels filter
  if (selectedLabelId.value) {
    const labelFilter = (note: Note) => {
      return note.labels?.some(label => selectedLabelId.value === label);
    };
    filterFns.push(labelFilter);
  }

  const filtered = filterFns.length ? notes.value.filter(note => filterFns.every(fn => fn(note))) : [...notes.value];

  // sort logic
  switch (sortBy.value) {
    case 'last-modified':
      filtered.sort((a, b) => new Date(b.lastModified ?? b.created).getMilliseconds() - new Date(a.lastModified ?? a.created).getMilliseconds());
      break;
    case 'title':
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'date':
      filtered.sort((a, b) => new Date(b.created).getMilliseconds() - new Date(a.created).getMilliseconds());
      break;
  }

  filteredNotes.value = filtered;
}

async function addNote() {
  const note: Note = {
    id: -1,
    title: 'New note',
    content: '',
    status: Status.Active,
    previewContent: '',
    labels: selectedLabelId.value ? [selectedLabelId.value] : [],
    created: new Date().toISOString(),
  };
  selectedNote.value = note;
  const newNote = await dispatch(createNote(note)).unwrap();
  //   this.history.push(`/note/${newNote.id}`);
}

async function createLabelForNote(label: Label, note: Note) {
  const newLabel = await dispatch(createLabel(label)).unwrap();
  return dispatch(addLabelToNote({ note, label: newLabel.id }));
}

function updateNotesFilterValue(e: any) {
  notesFilter.value = e.target.filterValue;
}

function updateSortBy(v: SortOption) {
  sortBy.value = v;
}
</script>

<template>
  <dash-section stickyHeader>
    <template v-if="notes.length">
      <div slot="header" class="notes-search-container">
        <dash-filter class="notes-filter" placeholder="Search" scale="l" @dashFilterValueChanged="updateNotesFilterValue"></dash-filter>
        <dash-dropdown class="sort-dropdown" placement="bottom-end" auto-close>
          <dash-icon-button slot="dropdown-trigger" icon="filter" scale="l" tooltip-text="Filter notes" tooltip-placement="right"></dash-icon-button>

          <dash-list selection-mode="single">
            <dash-list-item :selected="sortBy === 'last-modified'" @dashListItemSelectedChanged="() => updateSortBy('last-modified')"> Sort by last modified </dash-list-item>
            <dash-list-item :selected="sortBy === 'date'" @dashListItemSelectedChanged="() => updateSortBy('date')"> Sort by date created </dash-list-item>
            <dash-list-item :selected="sortBy === 'title'" @dashListItemSelectedChanged="updateSortBy('title')"> Sort by title </dash-list-item>
          </dash-list>
        </dash-dropdown>

        <dash-icon-button class="add-note-button" icon="plus-lg" scale="l" tooltip-text="Add note" tooltip-placement="right" @click="addNote"></dash-icon-button>
      </div>

      <dash-grid v-if="filteredNotes.length" col-s="{1}" col-m="{2}" col-l="{3}" col-xl="{4}">
        <hellodash-note-card
          v-for="note in filteredNotes"
          :key="note.id"
          :class="focusedNote?.id === note?.id ? 'note-overlay' : undefined"
          :note="note"
          :note-labels="noteLabels(note, labels)"
        >
          <hellodash-note-edit-dropdown
            slot="actions-end"
            :note="note"
            :allLabels="labels"
            @hellodashNoteEditDeleteNote="() => dispatch(archiveNote(note))"
            @hellodashNoteEditDuplicateNote="() => dispatch(duplicateNote(note))"
            @hellodashNoteEditLabelAdded="(e: any) => dispatch(addLabelToNote({ note, label: e.detail }))"
            @hellodashNoteEditLabelRemoved="(e: any) => dispatch(removeLabelFromNote({ note, label: e.detail }))"
            @hellodashNoteEditLabelUpdated="(e: any) => dispatch(updateLabel(e.detail))"
            @hellodashNoteEditLabelCreated="(e: any) => createLabelForNote(e.detail, note)"
            @focusin="() => (focusedNote = note)"
          ></hellodash-note-edit-dropdown>
        </hellodash-note-card>
      </dash-grid>
      <div v-else>No matching notes</div>
      <dash-fab class="add-note-fab" icon="plus" scale="l" @click="addNote"></dash-fab>
    </template>

    <div v-if="notes.length" class="note-message-wrapper">
      <div class="note-message">Create your first note!</div>
      <dash-fab icon="plus" scale="l" @click="addNote"></dash-fab>
    </div>
  </dash-section>

  <!-- TODO: goback on before modal close -->
  <hellodash-modal-note
    v-if="selectedNote"
    :note="selectedNote"
    :loading="isLoadingNote"
    :all-labels="labels"
    :mobile-view="mobileView"
    @hellodashModalNoteLabelCreated="
      async (e: any) => {
        createLabelForNote(e.detail, selectedNote as Note);
      }
    "
    @hellodashModalNoteLabelUpdated="(e: any) => dispatch(updateLabel(e.detail))"
    @hellodashModalNoteUpdateNote="(e: any) => dispatch(updateNote(e.detail))"
  ></hellodash-modal-note>
</template>

<style scoped></style>
