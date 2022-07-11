import { Model } from '../models/model';
import { DateTime } from 'luxon';
import EventEmitter from '../lib/event-emitter';

export default class ViewModel<T extends Model> {
  // set to true by @tracked properties when a set occurs
  __isDirty = false;
  __eventEmitter = new EventEmitter();

  id: number;
  dateCreated: DateTime;

  constructor(model: T) {
    this.id = model.id;
    this.dateCreated = DateTime.fromISO(model.created);

    this.__isDirty = false;
  }

  __toModel(): T {
    return { id: this.id, created: this.dateCreated.toISO() } as T;
  }

  __onChange(propertyKey: keyof T, callbackFn: (newValue?: any, oldValue?: any) => any) {
    this.__eventEmitter.on(propertyKey as string, callbackFn);
  }

  __removeOnChange(propertyKey: keyof T, callbackFn: (newValue?: any, oldValue?: any) => any) {
    this.__eventEmitter.removeListener(propertyKey as string, callbackFn);
  }

  __emitChange(propertyKey: keyof T, a1?: any, a2?: any, a3?: any) {
    this.__eventEmitter.emit(propertyKey as string, a1, a2, a3);
  }
}
