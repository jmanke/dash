import { Label } from '../models/label';
import { Note } from '../models/note';

/**
 * Gets the labels associated with label ID's attached to the note
 * @param note note with label ID's
 * @returns Labels referenced by note
 */
export function noteLabels(note: Note, labels: Label[] = []) {
  const labelsMap = labels.reduce((map, label) => map.set(label.id, label), new Map());
  return note.labels?.map(labelId => labelsMap.get(labelId)).filter(label => !!label) ?? [];
}
