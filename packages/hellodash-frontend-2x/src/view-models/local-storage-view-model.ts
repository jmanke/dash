import EventEmitter from "../lib/event-emitter";

export default class LocalStorageViewModel<T> {
	__localStorageKey: string;
	__eventEmitter = new EventEmitter();

	constructor(localStorageKey: string) {
		this.__localStorageKey = localStorageKey;

		const model = JSON.parse(window.localStorage.getItem(localStorageKey) ?? '{}') as T;
		this.__load(model);
	}

	__toModel(): T {
		return {} as T;
	}

	__onChange(propertyKey: keyof T, callbackFn: (newValue?: any, oldValue?: any) => any) {
		this.__eventEmitter.on(propertyKey as string, callbackFn);
	}

	__removeOnChange(propertyKey: keyof T, callbackFn: (newValue?: any, oldValue?: any) => any) {
		this.__eventEmitter.removeListener(propertyKey as string, callbackFn);
	}

	__emitChange(propertyKey: keyof T, a1?: any, a2?: any, a3?: any) {
		this.__save();
		this.__eventEmitter.emit(propertyKey as string, a1, a2, a3);
	}

	// override load in sub classes
	__load(_model: T) { }

	__save() {
		window.localStorage.setItem(this.__localStorageKey, JSON.stringify(this.__toModel()));
	}
}
