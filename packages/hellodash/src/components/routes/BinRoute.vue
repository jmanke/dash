<script setup lang="ts">
import { Label, Note, Status } from '@didyoumeantoast/hellodash-models';
import { Unsubscribe } from '@reduxjs/toolkit';
import { orderBy } from 'lodash';
import { DateTime } from 'luxon';
import { onMounted, onUnmounted, ref } from 'vue';
import { deleteNote, restoreNote } from '../../slices/notes-slice';
import { dispatch, store } from '../../store';
import { noteLabels } from '../../utils/note-labels';

let unsubscribeStore: Unsubscribe;

const notes = ref<Note[]>();
const archivedNotes = ref<Note[]>([]);
const labels = ref<Label[]>();
const mobileView = ref(false);
const noteWithDropdownActive = ref<Note | null>(null);
const selectedNotes = ref<Map<number, Note>>(new Map());
const showDeleteConfirmation = ref(false);

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

function noteClicked(note: Note) {
  if (selectedNotes.value.has(note.id)) {
    selectedNotes.value.delete(note.id);
    selectedNotes.value = new Map(selectedNotes.value);
    return;
  }

  selectedNotes.value.set(note.id, note);
  selectedNotes.value = new Map(selectedNotes.value);
}

function restoreNotes() {
  selectedNotes.value.forEach(note => {
    dispatch(restoreNote(note));
  });

  selectedNotes.value = new Map();
}

function selectAll() {
  selectedNotes.value = new Map(archivedNotes.value.map(n => [n.id, n]));
}

function deselectAll() {
  selectedNotes.value = new Map();
}
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
dash-grid {
  overflow-x: hidden;
}

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
