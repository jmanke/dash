import { Label } from '@didyoumeantoast/hellodash-models';
import { get, post, put, remove } from './api';
import CancelationToken from './cancellation-token';

const labelBaseUrl = `labels`;

/**
 * Fetches all labels
 * @param cancelationToken for cancelling the request
 * @returns all labels for client
 */
export function fetchLabels(cancelationToken?: CancelationToken): Promise<Label[] | null> {
  return get({ url: `${labelBaseUrl}`, cancelationToken });
}

/**
 * Fetches a single label
 * @param id id of the label to fetch
 * @param cancelationToken for cancelling the request
 * @returns requested label
 */
export async function fetchLabel(id: number, cancelationToken?: CancelationToken): Promise<Label | null> {
  return get({ url: `${labelBaseUrl}/${id}`, cancelationToken });
}

/**
 * Creates a new label
 * @param label label to create
 * @returns id of the created label
 */
export async function createLabel(label: Label) {
  return post<Label, Label>(`${labelBaseUrl}`, label);
}

/**
 * Updates a label
 * @param label label to update
 * @returns last modified date of the updated label
 */
export async function updateLabel(label: Label) {
  return put(`${labelBaseUrl}/${label.id}`, label);
}

/**
 * Deletes a label
 * @param label label to delete
 */
export async function deleteLabel(label: Label) {
  return remove(`${labelBaseUrl}/${label.id}`);
}
