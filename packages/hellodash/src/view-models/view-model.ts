import { Model } from '../models/model';
import { DateTime } from 'luxon';
import { ViewModel as ViewModelMvvm } from '@didyoumeantoast/stencil-view-model';

export default class ViewModel<T extends Model> extends ViewModelMvvm<T> {
  id: number;
  dateCreated: DateTime;

  constructor(model: T) {
    super();
    this.id = model.id;
    this.dateCreated = DateTime.fromISO(model.created);
  }

  __toModel(): T {
    return { ...super.__toModel(), id: this.id, created: this.dateCreated.toISO() } as T;
  }
}
