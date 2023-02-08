import { Note } from '../models/note';
import { NotePreview } from '../models/note-preview';
import { patch, get, post, put, remove } from './api';
import CancelationToken from './cancellation-token';

const noteBaseUrl = `notes`;

export function fetchNotePreviews(cancelationToken?: CancelationToken): Promise<NotePreview[] | null> {
  return get({ url: `${noteBaseUrl}`, config: { params: { IncludeArchived: true, ExcludeContent: true }, cancelationToken } });
}

export async function fetchNote(id: number, cancelationToken?: CancelationToken): Promise<Note | null> {
  return get({ url: `${noteBaseUrl}/${id}`, cancelationToken });
}

export async function createNote(note: Note | NotePreview) {
  return post<Note, number>(`${noteBaseUrl}`, note as Note);
}

export async function updateNotePreview(note: NotePreview): Promise<{ lastModified: string }> {
  return put(`${noteBaseUrl}/Preview/${note.id}`, note);
}

export async function updateNote(note: Note): Promise<{ lastModified: string }> {
  return put(`${noteBaseUrl}/${note.id}`, note);
}

export async function removeNote(note: Note | NotePreview) {
  return patch(`${noteBaseUrl}/${note.id}`);
}

export async function deleteNote(note: Note | NotePreview) {
  return remove(`${noteBaseUrl}/${note.id}`);
}
