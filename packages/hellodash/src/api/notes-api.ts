import { Note } from '@didyoumeantoast/hellodash-models';
import { get, patch, post, put, remove } from './api';
import CancelationToken from './cancellation-token';

const noteBaseUrl = `notes`;

/**
 * Fetches all notes without content
 * @param cancelationToken for cancelling the request
 * @returns all notes for client
 */
export function fetchNotePreviews(cancelationToken?: CancelationToken): Promise<Note[] | null> {
  return get({ url: `${noteBaseUrl}`, config: { params: { IncludeArchived: true, ExcludeContent: true }, cancelationToken } });
}

/**
 * Fetches a single note
 * @param id id of the note to fetch
 * @param cancelationToken for cancelling the request
 * @returns requested note
 */
export async function fetchNote(id: number, cancelationToken?: CancelationToken): Promise<Note | null> {
  return get({ url: `${noteBaseUrl}/${id}`, cancelationToken });
}

/**
 * Creates a new note
 * @param note note to create
 * @returns id of the created note
 */
export async function createNote(note: Note) {
  return post<Note, number>(`${noteBaseUrl}`, note as Note);
}

/**
 * Updates a note preview (note without content)
 * @param note note to update
 * @returns last modified date of the updated note
 */
export async function updateNotePreview(note: Note): Promise<{ lastModified: string }> {
  return put(`${noteBaseUrl}/Preview/${note.id}`, note);
}

/**
 * Updates a note
 * @param note note to update
 * @returns last modified date of the updated note
 */
export async function updateNote(note: Note): Promise<{ lastModified: string }> {
  // If the note has no content, we only want to update the preview
  if (note.content === null || note.content === undefined) {
    return updateNotePreview(note);
  }

  return put(`${noteBaseUrl}/${note.id}`, note);
}

/**
 * Archives a note
 * @param note note to archive
 */
export async function removeNote(note: Note) {
  return patch(`${noteBaseUrl}/${note.id}`);
}

/**
 * Deletes a note
 * @param note note to delete
 */
export async function deleteNote(note: Note) {
  return remove(`${noteBaseUrl}/${note.id}`);
}
