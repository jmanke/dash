<script setup lang="ts">
import { Label, Note, Status } from '@didyoumeantoast/hellodash-models';
import { Unsubscribe } from '@reduxjs/toolkit';
import { orderBy } from 'lodash';
import { DateTime } from 'luxon';
import { onMounted, onUnmounted, ref } from 'vue';
import { deleteNote, restoreNote } from '../../slices/notes-slice';
import { dispatch, store } from '../../store';
import { noteLabels } from '../../utils/note-labels';

//#region Local properties

/** Callback when the store is updated. Need to keep a reference to it so we can remove it later. */
let unsubscribeStore: Unsubscribe;

//#endregion

//#region Refs

/** Notes from store */
const notes = ref<Note[]>();

/** Archived notes from store */
const archivedNotes = ref<Note[]>([]);

/** Labels from store */
const labels = ref<Label[]>();

/** Whether the app is in mobile view */
const mobileView = ref(false);

/** The note that has the dropdown active */
const noteWithDropdownActive = ref<Note>();

/** The notes that are currently selected */
const selectedNotes = ref<Map<number, Note>>(new Map());

/** Whether to show the delete confirmation dialog */
const showDeleteConfirmation = ref(false);

//#endregion

//#region Lifecycle methods
onMounted(() => {
  const storeUpdated = () => {
    const state = store.getState();
    notes.value = state.notes;
    const archived = notes.value.filter(note => note.status === Status.Archived);
    archivedNotes.value = orderBy(archived, [a => DateTime.fromISO(a.lastModified ?? a.created).toMillis()], ['desc']);
    labels.value = state.labels;
    mobileView.value = state.appState.mobileView;
  };

  storeUpdated();
  unsubscribeStore = store.subscribe(storeUpdated);
});

onUnmounted(() => {
  unsubscribeStore();
});

//#endregion

//#region Methods

/**
 * Handles when a note is clicked.
 * @param note The note that was clicked.
 */
function noteClicked(note: Note) {
  if (selectedNotes.value.has(note.id)) {
    selectedNotes.value.delete(note.id);
    selectedNotes.value = new Map(selectedNotes.value);
    return;
  }

  selectedNotes.value.set(note.id, note);
  selectedNotes.value = new Map(selectedNotes.value);
}

/**
 * Restores the selected notes.
 */
function restoreNotes() {
  selectedNotes.value.forEach(note => {
    dispatch(restoreNote(note));
  });

  selectedNotes.value = new Map();
}

/**
 * Selects all notes.
 */
function selectAll() {
  selectedNotes.value = new Map(archivedNotes.value.map(n => [n.id, n]));
}

/**
 * Deselects all notes.
 */
function deselectAll() {
  selectedNotes.value = new Map();
}

//#endregion
</script>

<template>
  <dash-section stickyHeader>
    <div v-if="archivedNotes.length" class="header" slot="header">
      <span class="notes-selected">{{ selectedNotes.size ? `Selected: ${selectedNotes.size}` : '' }}</span>
      <div class="content-end">
        <template v-if="!mobileView">
          <dash-button @click="() => (selectedNotes.size === archivedNotes.length ? deselectAll() : selectAll())">
            {{ selectedNotes.size === archivedNotes.length ? 'Deselect all' : 'Select all' }}
          </dash-button>
          <dash-button :disabled="selectedNotes.size === 0" @click="restoreNotes"> Restore </dash-button>
          <dash-button :disabled="selectedNotes.size === 0" @click="() => (showDeleteConfirmation = true)"> Delete </dash-button>
        </template>

        <dash-dropdown v-if="mobileView" placement="bottom-end" auto-close>
          <dash-icon-button slot="dropdown-trigger" icon="three-dots-vertical" scale="l"></dash-icon-button>

          <dash-list selection-mode="none">
            <dash-list-item @dashListItemSelectedChanged="() => (selectedNotes.size === archivedNotes.length ? deselectAll() : selectAll())">
              {{ selectedNotes.size === archivedNotes.length ? 'Deselect all' : 'Select all' }}
            </dash-list-item>
            <dash-list-item :disabled="selectedNotes.size === 0" @dashListItemSelectedChanged="restoreNotes"> Restore </dash-list-item>
            <dash-list-item :disabled="selectedNotes.size === 0" @dashListItemSelectedChanged="() => (showDeleteConfirmation = true)"> Delete </dash-list-item>
          </dash-list>
        </dash-dropdown>
      </div>
    </div>

    <dash-grid v-if="archivedNotes.length" col-s="1" col-m="2" col-l="3" col-xl="4">
      <hellodash-note-card
        v-for="note in archivedNotes"
        :key="note.id"
        :class="noteWithDropdownActive === note ? 'note-overlay' : undefined"
        :selected="selectedNotes.has(note.id)"
        :note="note"
        :noteLabels="noteLabels(note, labels)"
        mode="selectable"
        @click="() => noteClicked(note)"
      ></hellodash-note-card>
    </dash-grid>

    <div v-if="!archivedNotes?.length" class="bin-empty-message">Bin is empty</div>
  </dash-section>

  <hellodash-confirm
    v-if="showDeleteConfirmation"
    @hellodashConfirmConfirmed="
      () => {
        selectedNotes.forEach(note => {
          dispatch(deleteNote(note));
        });

        selectedNotes = new Map();
      }
    "
    @dashModalClosed="() => (showDeleteConfirmation = false)"
  >
    <div>Selected notes ({{ selectedNotes.size }}) will be deleted forever.</div>
  </hellodash-confirm>
</template>

<style scoped>
.note-overlay {
  z-index: 10;
}

.bin-empty-message {
  margin-top: var(--dash-spacing-16);
  font-size: var(--dash-font-size-6);
  text-align: center;
}

@media only screen and (max-width: 768px) {
  .bin-empty-message {
    font-size: var(--dash-font-size-5);
  }
}

.header {
  display: flex;
}

.header .notes-selected {
  display: flex;
  align-items: center;
}

.header .content-end {
  margin-inline-start: auto;
}
</style>
