import { Note } from '../models/note';
import { patch, get, post, put, remove } from './api';
import CancelationToken from './cancellation-token';

const noteBaseUrl = `notes`;

export function fetchNotes(cancelationToken?: CancelationToken): Promise<Note[] | null> {
  return get({ url: `${noteBaseUrl}`, config: { params: { IncludeArchived: true, ExcludeContent: true }, cancelationToken } });
}

export async function fetchNote(id: number, cancelationToken?: CancelationToken): Promise<Note | null> {
  return get({ url: `${noteBaseUrl}/${id}`, cancelationToken });
}

export async function createNote(note: Note) {
  return post<Note, number>(`${noteBaseUrl}`, note);
}

export async function updateNotePreview(note: Note) {
  return put(`${noteBaseUrl}/${note.id}`, note, { params: { ExcludeContent: true } });
}

export async function updateNote(note: Note) {
  return put(`${noteBaseUrl}/${note.id}`, note);
}

export async function removeNote(note: Note) {
  return patch(`${noteBaseUrl}/${note.id}`);
}

export async function deleteNote(note: Note) {
  return remove(`${noteBaseUrl}/${note.id}`);
}
