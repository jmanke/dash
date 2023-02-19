import { Label } from '../models/label';
import { Note } from '../models/note';

/**
 * Gets the labels associated with label ID's attached to the note
 * @param note note with label ID's
 * @returns Labels referenced by note
 */
export function noteLabels(note: Note, labels: Label[] = []) {
  // maintain label order
  const noteLabelIds = new Set(note.labels);
  return labels.filter(label => noteLabelIds.has(label.id));
}
