import { Label } from '../models/label';
import { get, post, put, remove } from './api';
import CancelationToken from './cancellation-token';

const labelBaseUrl = `labels`;

export function fetchLabels(cancelationToken?: CancelationToken): Promise<Label[] | null> {
  return get({ url: `${labelBaseUrl}`, cancelationToken });
}

export async function fetchLabel(id: number, cancelationToken?: CancelationToken): Promise<Label | null> {
  return get({ url: `${labelBaseUrl}/${id}`, cancelationToken });
}

export async function createLabel(label: Label) {
  return post<Label, number>(`${labelBaseUrl}`, label);
}

export async function updateLabel(label: Label) {
  return put(`${labelBaseUrl}/${label.id}`, label);
}

export async function deleteLabel(label: Label) {
  return remove(`${labelBaseUrl}/${label.id}`);
}
