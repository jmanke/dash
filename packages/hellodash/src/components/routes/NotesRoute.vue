<script setup lang="ts">
import { DashFilterCustomEvent } from '@didyoumeantoast/dash-components';
import { stringSearch } from '@didyoumeantoast/dash-utils';
import { Label, Note, Status, Theme } from '@didyoumeantoast/hellodash-models';
import { Unsubscribe } from '@reduxjs/toolkit';
import { isEmpty, isNumber } from 'lodash';
import { DateTime } from 'luxon';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Routes } from '../../common/routes';
import { createLabel, updateLabel } from '../../slices/labels-slice';
import { addLabelToNote, archiveNote, createNote, duplicateNote, getNoteById, removeLabelFromNote, updateNote } from '../../slices/notes-slice';
import { dispatch, store } from '../../store';
import { noteLabels } from '../../utils/note-labels';

type SortOption = 'date' | 'title' | 'last-modified';

//#region Local properties

/** Unsubscribe function for the store subscription */
let unsubscribeStore: Unsubscribe;

/** The route object from vue-router */
const route = useRoute();

/** The router object from vue-router */
const router = useRouter();

//#endregion

//#region Refs

/** The notes from the store */
const notes = ref<Note[]>([]);

/** The labels from the store */
const labels = ref<Label[]>([]);

/** Whether the app is in mobile view */
const mobileView = ref(false);

/** The current theme */
const theme = ref<Theme>('dark');

/** Notes that have been filtered by various properties */
const filteredNotes = ref<Note[]>([]);

/** String filter value to filter notes by */
const notesFilter = ref('');

/** Sort by notes options (applies to filteredNotes) */
const sortBy = ref<SortOption>('last-modified');

/** The label that is currently selected */
const selectedLabelId = ref<number>();

/** The note that is currently selected */
const selectedNote = ref<Note>();

/** The note that is currently focused */
const focusedNote = ref<Note>();

/** Whether a note is currently being loaded */
const isLoadingNote = ref(false);

//#endregion

//#region Watchers

watch([notesFilter, notes, selectedLabelId, sortBy], filterNotes);
watch(route, matchRoute);

//#endregion

//#region Lifecycle methods

onMounted(() => {
  const storeUpdated = () => {
    const state = store.getState();
    notes.value = state.notes.filter(note => note.status === Status.Active);
    labels.value = state.labels;
    theme.value = state.appSettings.theme;
    mobileView.value = state.appState.mobileView;
  };

  storeUpdated();
  matchRoute();
  unsubscribeStore = store.subscribe(storeUpdated);
});

onUnmounted(() => {
  unsubscribeStore();
});

//#endregion

//#region Methods

/**
 * Updates the selected note and label based on the route
 */
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

/**
 * Filters the notes based on the current filter values
 */
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

/**
 * Adds a new note
 */
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

/**
 * Creates a new label and adds it to the selected note
 * @param label label to create
 * @param note note to add the label to
 */
async function createLabelForNote(label: Label, note: Note) {
  const newLabel = await dispatch(createLabel(label)).unwrap();
  return dispatch(addLabelToNote({ note, label: newLabel.id }));
}

/**
 * Updates the notes filter value
 * @param e
 */
function updateNotesFilterValue(e: DashFilterCustomEvent<string>) {
  notesFilter.value = e.target.filterValue ?? '';
}

/**
 * Updates the sort by value
 * @param v sort option
 */
function updateSortBy(v: SortOption) {
  sortBy.value = v;
}

function notesModalClosed() {
  if (isEmpty(router.options.history.state.back)) {
    return;
  }

  router.back();
}

//#endregion
</script>

<template>
  <dash-section stickyHeader>
    <template v-if="notes.length">
      <div slot="header" class="notes-search-container">
        <dash-filter class="notes-filter" placeholder="Search" scale="l" @dashFilterValueChanged="updateNotesFilterValue"></dash-filter>
        <dash-dropdown class="sort-dropdown" placement="bottom-end" auto-close>
          <dash-icon-button slot="dropdown-trigger" icon="filter" scale="l" tooltip-text="Filter notes" tooltip-placement="right"></dash-icon-button>

          <dash-list selection-mode="single" disable-deselect>
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
            @hellodashNoteEditDropdownVisibleChanged="(e: any) => focusedNote = e.detail ? note : undefined"
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
    :open="!!selectedNote || isLoadingNote"
    :note="selectedNote"
    :loading="isLoadingNote"
    :allLabels="labels"
    :mobileView="mobileView"
    :theme="theme"
    @hellodashModalNoteLabelCreated="
      async (e: any) => {
        createLabelForNote(e.detail, selectedNote as Note);
      }
    "
    @hellodashModalNoteLabelUpdated="(e: any) => dispatch(updateLabel(e.detail))"
    @hellodashModalNoteUpdateNote="(e: any) => dispatch(updateNote(e.detail))"
    @dashModalClosed="notesModalClosed"
  ></hellodash-modal-note>
</template>

<style scoped>
hellodash-nav-bar .theme-toggle {
  margin-inline-end: var(--dash-spacing-3);
}

dash-card-icon {
  width: 100%;
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
