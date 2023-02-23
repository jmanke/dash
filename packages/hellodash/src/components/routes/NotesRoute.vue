<script setup lang="ts">
import { stringSearch } from '@didyoumeantoast/dash-utils';
import { Label, Note, Status } from '@didyoumeantoast/hellodash-models';
import { Unsubscribe } from '@reduxjs/toolkit';
import { isEmpty, isNumber } from 'lodash';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Routes } from '../../common/routes';
import { createLabel, updateLabel } from '../../slices/labels-slice';
import { addLabelToNote, archiveNote, createNote, duplicateNote, getNoteById, removeLabelFromNote, updateNote } from '../../slices/notes-slice';
import { dispatch, store } from '../../store';
import { noteLabels } from '../../utils/note-labels';
import { DateTime } from 'luxon';

type SortOption = 'date' | 'title' | 'last-modified';

let unsubscribeStore: Unsubscribe;

const notes = ref<Note[]>([]);
const labels = ref<Label[]>([]);
const mobileView = ref(false);
const filteredNotes = ref<Note[]>([]);
const notesFilter = ref('');
const sortBy = ref<SortOption>('last-modified');
const selectedLabelId = ref<number | undefined>();
const selectedNote = ref<Note | undefined>();
const focusedNote = ref<Note | undefined>();
const isLoadingNote = ref(false);
const route = useRoute();
const router = useRouter();

watch([notesFilter, notes, selectedLabelId, sortBy], filterNotes);
watch(route, matchRoute);

onMounted(() => {
  const storeUpdated = () => {
    const state = store.getState();
    notes.value = state.notes.filter(note => note.status === Status.Active);
    labels.value = state.labels;
    mobileView.value = state.appState.mobileView;
  };

  storeUpdated();
  matchRoute();
  unsubscribeStore = store.subscribe(storeUpdated);
});

onUnmounted(() => {
  unsubscribeStore();
});

async function matchRoute() {
  const noteId = route.params.noteId ? parseInt(route.params.noteId as string) : undefined;
  let note = notes.value.find(note => note.id === noteId);
  if (note && note.content === null) {
    isLoadingNote.value = true;
    try {
      note = (await dispatch(getNoteById(note.id)).unwrap()) as Note;
    } finally {
      isLoadingNote.value = false;
    }
  }

  selectedNote.value = note;

  // don't update selected label when note is being edited
  if (!isNumber(noteId)) {
    selectedLabelId.value = route.params.labelId ? parseInt(route.params.labelId as string) : undefined;
  }
}

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
      filtered.sort((a, b) => DateTime.fromISO(b.lastModified ?? b.created).toMillis() - DateTime.fromISO(a.lastModified ?? a.created).toMillis());
      break;
    case 'title':
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'date':
      filtered.sort((a, b) => DateTime.fromISO(b.created).toMillis() - DateTime.fromISO(a.created).toMillis());
      break;
  }

  filteredNotes.value = filtered;
}

async function addNote() {
  const note = {
    title: 'New note',
    content: '',
    previewContent: '',
    status: Status.Active,
    labels: selectedLabelId.value ? [selectedLabelId.value] : [],
  };
  isLoadingNote.value = true;
  try {
    const newNote = await dispatch(createNote(note)).unwrap();
    if (newNote) {
      router.push(`${Routes.note}/${newNote.id}`);
    }
  } finally {
    setTimeout(() => {
      isLoadingNote.value = false;
    }, 0);
  }
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

      <dash-grid v-if="filteredNotes.length" col-s="1" col-m="2" col-l="3" col-xl="4">
        <hellodash-note-card
          v-for="note in filteredNotes"
          :key="note.id"
          :class="focusedNote?.id === note?.id ? 'note-overlay hydrated' : 'hydrated'"
          :note="note"
          :noteLabels="noteLabels(note, labels)"
          @hellodashNoteCardNoteSelected="() => router.push(`${Routes.note}/${note.id}`)"
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

    <div v-if="!notes.length" class="note-message-wrapper">
      <div class="note-message">Create your first note!</div>
      <dash-fab icon="plus" scale="l" @click="addNote"></dash-fab>
    </div>
  </dash-section>

  <hellodash-modal-note
    v-if="selectedNote || isLoadingNote"
    :note="selectedNote"
    :loading="isLoadingNote"
    :allLabels="labels"
    :mobileView="mobileView"
    @hellodashModalNoteLabelCreated="
      async (e: any) => {
        createLabelForNote(e.detail, selectedNote as Note);
      }
    "
    @hellodashModalNoteLabelUpdated="(e: any) => dispatch(updateLabel(e.detail))"
    @hellodashModalNoteUpdateNote="(e: any) => dispatch(updateNote(e.detail))"
    @dashModalClosed="router.back()"
  ></hellodash-modal-note>
</template>

<style scoped>
hellodash-nav-bar .theme-toggle {
  margin-inline-end: var(--dash-spacing-3);
}

dash-card-icon {
  width: 100%;
}

dash-grid {
  overflow-x: hidden;
}

.notes-filter {
  flex: auto;
  max-width: var(--dash-spacing-72);
}

.notes-search-container {
  display: flex;
  margin-bottom: var(--dash-spacing-3);
}

.notes-search-container .sort-dropdown {
  margin-inline-start: var(--dash-spacing-3);
  --dash-dropdown-min-width: var(--dash-spacing-48);
}

@media only screen and (max-width: 768px) {
  .add-note-button {
    display: none;
  }
}

.add-note-fab {
  position: absolute;
  right: var(--dash-spacing-12);
  bottom: var(--dash-spacing-12);
  display: none;
}

@media only screen and (max-width: 1200px) {
  .add-note-fab {
    display: block;
    right: var(--dash-spacing-3);
    bottom: var(--dash-spacing-3);
  }
}

.note-overlay {
  z-index: 10;
}

.note-message-wrapper {
  display: flex;
  justify-content: center;
  margin-top: var(--dash-spacing-16);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.note-message-wrapper .note-message {
  font-size: var(--dash-font-size-6);
  margin-bottom: var(--dash-spacing-6);
}

@media only screen and (max-width: 768px) {
  .note-message-wrapper .note-message {
    font-size: var(--dash-font-size-5);
  }
}
</style>
