import { Model } from '../models/model';
import { DateTime } from 'luxon';
import { makeAutoObservable } from 'mobx';

export default class ViewModel<T extends Model> {
  id: number;
  dateCreated: DateTime;
  lastModified: DateTime;
  __isDirty: boolean = false;

  constructor(model: T) {
    this.id = model.id;
    this.dateCreated = model.created ? DateTime.fromISO(model.created) : DateTime.now();
    this.lastModified = model.lastModified ? DateTime.fromISO(model.lastModified) : this.dateCreated;

    makeAutoObservable(this);
  }

  __toModel(): T {
    return { id: this.id, created: this.dateCreated.toISO() } as T;
  }
}
