/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { RootState } from "./store";
import { RouterHistory } from "@stencil-community/router";
import { Auth0Client } from "@auth0/auth0-spa-js";
import { Color, Status } from "@didyoumeantoast/dash-components/dist/types/types/types";
import { Label } from "./models/label";
import { LabelViewModel } from "./view-models/label-view-model";
import { Note } from "./models/note";
import { NoteCardMode } from "./components/common/hellodash-note-card/hellodash-note-card";
import { User } from "./models/user";
export { RootState } from "./store";
export { RouterHistory } from "@stencil-community/router";
export { Auth0Client } from "@auth0/auth0-spa-js";
export { Color, Status } from "@didyoumeantoast/dash-components/dist/types/types/types";
export { Label } from "./models/label";
export { LabelViewModel } from "./view-models/label-view-model";
export { Note } from "./models/note";
export { NoteCardMode } from "./components/common/hellodash-note-card/hellodash-note-card";
export { User } from "./models/user";
export namespace Components {
    interface HellodashApp {
        "history": RouterHistory;
        "rootState": RootState;
    }
    interface HellodashAuth0Provider {
        "authClient": Auth0Client;
    }
    interface HellodashConfirm {
        "cancelText": string;
        "close": () => Promise<void>;
        "confirmButtonStatus": Status;
        "confirmText": string;
        "heading": string;
    }
    interface HellodashEditLabels {
        "close": () => Promise<void>;
        "labels": Label[];
    }
    interface HellodashLabelColorPicker {
        "color": Color;
    }
    interface HellodashLabelEdit {
        "label": Label;
    }
    interface HellodashLabelSelect {
        "allLabels": LabelViewModel[];
        "autoFocus": boolean;
        "canCreateLabel": boolean;
        "labels": LabelViewModel[];
    }
    interface HellodashModalNote {
        "close": () => Promise<void>;
        "newLabelId"?: number;
        "newNote": boolean;
        "noteId": number;
    }
    interface HellodashNavBar {
        "setFocus": () => Promise<void>;
    }
    interface HellodashNoteCard {
        "history": RouterHistory;
        "labels": Label[];
        "mode": NoteCardMode;
        "notePreview": Note;
        "selected": boolean;
    }
    interface HellodashNoteEditDropdown {
        "note": Note;
    }
    interface HellodashProfileSettings {
        "authClient": Auth0Client;
        "user": User;
    }
    interface HellodashRoot {
        "history": RouterHistory;
    }
    interface HellodashRouteBin {
    }
    interface HellodashRouteNotes {
        "history": RouterHistory;
        "match": any;
    }
    interface HellodashTextEditor {
        "content": string;
        "debounce": number;
        "deferLoadTime"?: number;
        "getContent": () => Promise<string>;
        "getTextContent": () => Promise<string>;
        "heading": string;
        "isEditorDirty": () => Promise<boolean>;
        "loading"?: boolean;
        "readonly": boolean;
        "resize"?: boolean;
        "save": (emitEvent?: boolean) => Promise<void>;
        "selectTitle": () => Promise<void>;
        "setFocus": () => Promise<void>;
        "showFullscreen"?: boolean;
        "showTitleInput"?: boolean;
        "theme": 'light' | 'dark';
    }
}
export interface HellodashAuth0ProviderCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLHellodashAuth0ProviderElement;
}
export interface HellodashConfirmCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLHellodashConfirmElement;
}
export interface HellodashEditLabelsCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLHellodashEditLabelsElement;
}
export interface HellodashLabelColorPickerCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLHellodashLabelColorPickerElement;
}
export interface HellodashLabelEditCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLHellodashLabelEditElement;
}
export interface HellodashLabelSelectCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLHellodashLabelSelectElement;
}
export interface HellodashModalNoteCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLHellodashModalNoteElement;
}
export interface HellodashNavBarCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLHellodashNavBarElement;
}
export interface HellodashNoteEditDropdownCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLHellodashNoteEditDropdownElement;
}
export interface HellodashTextEditorCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLHellodashTextEditorElement;
}
declare global {
    interface HTMLHellodashAppElement extends Components.HellodashApp, HTMLStencilElement {
    }
    var HTMLHellodashAppElement: {
        prototype: HTMLHellodashAppElement;
        new (): HTMLHellodashAppElement;
    };
    interface HTMLHellodashAuth0ProviderElement extends Components.HellodashAuth0Provider, HTMLStencilElement {
    }
    var HTMLHellodashAuth0ProviderElement: {
        prototype: HTMLHellodashAuth0ProviderElement;
        new (): HTMLHellodashAuth0ProviderElement;
    };
    interface HTMLHellodashConfirmElement extends Components.HellodashConfirm, HTMLStencilElement {
    }
    var HTMLHellodashConfirmElement: {
        prototype: HTMLHellodashConfirmElement;
        new (): HTMLHellodashConfirmElement;
    };
    interface HTMLHellodashEditLabelsElement extends Components.HellodashEditLabels, HTMLStencilElement {
    }
    var HTMLHellodashEditLabelsElement: {
        prototype: HTMLHellodashEditLabelsElement;
        new (): HTMLHellodashEditLabelsElement;
    };
    interface HTMLHellodashLabelColorPickerElement extends Components.HellodashLabelColorPicker, HTMLStencilElement {
    }
    var HTMLHellodashLabelColorPickerElement: {
        prototype: HTMLHellodashLabelColorPickerElement;
        new (): HTMLHellodashLabelColorPickerElement;
    };
    interface HTMLHellodashLabelEditElement extends Components.HellodashLabelEdit, HTMLStencilElement {
    }
    var HTMLHellodashLabelEditElement: {
        prototype: HTMLHellodashLabelEditElement;
        new (): HTMLHellodashLabelEditElement;
    };
    interface HTMLHellodashLabelSelectElement extends Components.HellodashLabelSelect, HTMLStencilElement {
    }
    var HTMLHellodashLabelSelectElement: {
        prototype: HTMLHellodashLabelSelectElement;
        new (): HTMLHellodashLabelSelectElement;
    };
    interface HTMLHellodashModalNoteElement extends Components.HellodashModalNote, HTMLStencilElement {
    }
    var HTMLHellodashModalNoteElement: {
        prototype: HTMLHellodashModalNoteElement;
        new (): HTMLHellodashModalNoteElement;
    };
    interface HTMLHellodashNavBarElement extends Components.HellodashNavBar, HTMLStencilElement {
    }
    var HTMLHellodashNavBarElement: {
        prototype: HTMLHellodashNavBarElement;
        new (): HTMLHellodashNavBarElement;
    };
    interface HTMLHellodashNoteCardElement extends Components.HellodashNoteCard, HTMLStencilElement {
    }
    var HTMLHellodashNoteCardElement: {
        prototype: HTMLHellodashNoteCardElement;
        new (): HTMLHellodashNoteCardElement;
    };
    interface HTMLHellodashNoteEditDropdownElement extends Components.HellodashNoteEditDropdown, HTMLStencilElement {
    }
    var HTMLHellodashNoteEditDropdownElement: {
        prototype: HTMLHellodashNoteEditDropdownElement;
        new (): HTMLHellodashNoteEditDropdownElement;
    };
    interface HTMLHellodashProfileSettingsElement extends Components.HellodashProfileSettings, HTMLStencilElement {
    }
    var HTMLHellodashProfileSettingsElement: {
        prototype: HTMLHellodashProfileSettingsElement;
        new (): HTMLHellodashProfileSettingsElement;
    };
    interface HTMLHellodashRootElement extends Components.HellodashRoot, HTMLStencilElement {
    }
    var HTMLHellodashRootElement: {
        prototype: HTMLHellodashRootElement;
        new (): HTMLHellodashRootElement;
    };
    interface HTMLHellodashRouteBinElement extends Components.HellodashRouteBin, HTMLStencilElement {
    }
    var HTMLHellodashRouteBinElement: {
        prototype: HTMLHellodashRouteBinElement;
        new (): HTMLHellodashRouteBinElement;
    };
    interface HTMLHellodashRouteNotesElement extends Components.HellodashRouteNotes, HTMLStencilElement {
    }
    var HTMLHellodashRouteNotesElement: {
        prototype: HTMLHellodashRouteNotesElement;
        new (): HTMLHellodashRouteNotesElement;
    };
    interface HTMLHellodashTextEditorElement extends Components.HellodashTextEditor, HTMLStencilElement {
    }
    var HTMLHellodashTextEditorElement: {
        prototype: HTMLHellodashTextEditorElement;
        new (): HTMLHellodashTextEditorElement;
    };
    interface HTMLElementTagNameMap {
        "hellodash-app": HTMLHellodashAppElement;
        "hellodash-auth0-provider": HTMLHellodashAuth0ProviderElement;
        "hellodash-confirm": HTMLHellodashConfirmElement;
        "hellodash-edit-labels": HTMLHellodashEditLabelsElement;
        "hellodash-label-color-picker": HTMLHellodashLabelColorPickerElement;
        "hellodash-label-edit": HTMLHellodashLabelEditElement;
        "hellodash-label-select": HTMLHellodashLabelSelectElement;
        "hellodash-modal-note": HTMLHellodashModalNoteElement;
        "hellodash-nav-bar": HTMLHellodashNavBarElement;
        "hellodash-note-card": HTMLHellodashNoteCardElement;
        "hellodash-note-edit-dropdown": HTMLHellodashNoteEditDropdownElement;
        "hellodash-profile-settings": HTMLHellodashProfileSettingsElement;
        "hellodash-root": HTMLHellodashRootElement;
        "hellodash-route-bin": HTMLHellodashRouteBinElement;
        "hellodash-route-notes": HTMLHellodashRouteNotesElement;
        "hellodash-text-editor": HTMLHellodashTextEditorElement;
    }
}
declare namespace LocalJSX {
    interface HellodashApp {
        "history"?: RouterHistory;
        "rootState"?: RootState;
    }
    interface HellodashAuth0Provider {
        "authClient"?: Auth0Client;
        "onHellodashAuth0ProviderSignedIn"?: (event: HellodashAuth0ProviderCustomEvent<void>) => void;
    }
    interface HellodashConfirm {
        "cancelText"?: string;
        "confirmButtonStatus"?: Status;
        "confirmText"?: string;
        "heading"?: string;
        "onDashConfirmConfirmed"?: (event: HellodashConfirmCustomEvent<any>) => void;
        "onDashModalBeforeClose"?: (event: HellodashConfirmCustomEvent<any>) => void;
        "onDashModalClosed"?: (event: HellodashConfirmCustomEvent<any>) => void;
    }
    interface HellodashEditLabels {
        "labels"?: Label[];
        "onDashModalBeforeClose"?: (event: HellodashEditLabelsCustomEvent<any>) => void;
        "onDashModalClosed"?: (event: HellodashEditLabelsCustomEvent<any>) => void;
        "onHellodashEditLabelsCreateLabel"?: (event: HellodashEditLabelsCustomEvent<Label>) => void;
        "onHellodashEditLabelsDeleteLabel"?: (event: HellodashEditLabelsCustomEvent<Label>) => void;
        "onHellodashEditLabelsUpdateLabel"?: (event: HellodashEditLabelsCustomEvent<Label>) => void;
    }
    interface HellodashLabelColorPicker {
        "color"?: Color;
        "onDashLabelColorPickerColorChanged"?: (event: HellodashLabelColorPickerCustomEvent<Color>) => void;
    }
    interface HellodashLabelEdit {
        "label"?: Label;
        "onHellodashLabelEditDeleteLabel"?: (event: HellodashLabelEditCustomEvent<Label>) => void;
        "onHellodashLabelEditUpdateLabel"?: (event: HellodashLabelEditCustomEvent<Label>) => void;
    }
    interface HellodashLabelSelect {
        "allLabels"?: LabelViewModel[];
        "autoFocus"?: boolean;
        "canCreateLabel"?: boolean;
        "labels"?: LabelViewModel[];
        "onDashLabelSelectLabelAdded"?: (event: HellodashLabelSelectCustomEvent<LabelViewModel>) => void;
        "onDashLabelSelectLabelCreated"?: (event: HellodashLabelSelectCustomEvent<Label>) => void;
        "onDashLabelSelectLabelRemoved"?: (event: HellodashLabelSelectCustomEvent<LabelViewModel>) => void;
        "onDashLabelSelectLabelUpdated"?: (event: HellodashLabelSelectCustomEvent<LabelViewModel>) => void;
    }
    interface HellodashModalNote {
        "newLabelId"?: number;
        "newNote"?: boolean;
        "noteId"?: number;
        "onDashModalBeforeClose"?: (event: HellodashModalNoteCustomEvent<any>) => void;
        "onDashModalClosed"?: (event: HellodashModalNoteCustomEvent<any>) => void;
    }
    interface HellodashNavBar {
        "onDashMenuToggled"?: (event: HellodashNavBarCustomEvent<any>) => void;
    }
    interface HellodashNoteCard {
        "history"?: RouterHistory;
        "labels"?: Label[];
        "mode"?: NoteCardMode;
        "notePreview"?: Note;
        "selected"?: boolean;
    }
    interface HellodashNoteEditDropdown {
        "note"?: Note;
        "onDashNoteEditDropdownVisibleChanged"?: (event: HellodashNoteEditDropdownCustomEvent<boolean>) => void;
    }
    interface HellodashProfileSettings {
        "authClient"?: Auth0Client;
        "user"?: User;
    }
    interface HellodashRoot {
        "history"?: RouterHistory;
    }
    interface HellodashRouteBin {
    }
    interface HellodashRouteNotes {
        "history"?: RouterHistory;
        "match"?: any;
    }
    interface HellodashTextEditor {
        "content"?: string;
        "debounce"?: number;
        "deferLoadTime"?: number;
        "heading"?: string;
        "loading"?: boolean;
        "onDashTextEditorBeforeUnload"?: (event: HellodashTextEditorCustomEvent<Promise<unknown>[]>) => void;
        "onDashTextEditorContentChanged"?: (event: HellodashTextEditorCustomEvent<string>) => void;
        "onDashTextEditorFullscreenChanged"?: (event: HellodashTextEditorCustomEvent<boolean>) => void;
        "onDashTextEditorHeadingChanged"?: (event: HellodashTextEditorCustomEvent<string>) => void;
        "onDashTextEditorInit"?: (event: HellodashTextEditorCustomEvent<HTMLHellodashTextEditorElement>) => void;
        "onDashTextEditorIsDirty"?: (event: HellodashTextEditorCustomEvent<any>) => void;
        "onDashTextEditorNodeChanged"?: (event: HellodashTextEditorCustomEvent<object>) => void;
        "onDashTextEditorUnload"?: (event: HellodashTextEditorCustomEvent<any>) => void;
        "readonly"?: boolean;
        "resize"?: boolean;
        "showFullscreen"?: boolean;
        "showTitleInput"?: boolean;
        "theme"?: 'light' | 'dark';
    }
    interface IntrinsicElements {
        "hellodash-app": HellodashApp;
        "hellodash-auth0-provider": HellodashAuth0Provider;
        "hellodash-confirm": HellodashConfirm;
        "hellodash-edit-labels": HellodashEditLabels;
        "hellodash-label-color-picker": HellodashLabelColorPicker;
        "hellodash-label-edit": HellodashLabelEdit;
        "hellodash-label-select": HellodashLabelSelect;
        "hellodash-modal-note": HellodashModalNote;
        "hellodash-nav-bar": HellodashNavBar;
        "hellodash-note-card": HellodashNoteCard;
        "hellodash-note-edit-dropdown": HellodashNoteEditDropdown;
        "hellodash-profile-settings": HellodashProfileSettings;
        "hellodash-root": HellodashRoot;
        "hellodash-route-bin": HellodashRouteBin;
        "hellodash-route-notes": HellodashRouteNotes;
        "hellodash-text-editor": HellodashTextEditor;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "hellodash-app": LocalJSX.HellodashApp & JSXBase.HTMLAttributes<HTMLHellodashAppElement>;
            "hellodash-auth0-provider": LocalJSX.HellodashAuth0Provider & JSXBase.HTMLAttributes<HTMLHellodashAuth0ProviderElement>;
            "hellodash-confirm": LocalJSX.HellodashConfirm & JSXBase.HTMLAttributes<HTMLHellodashConfirmElement>;
            "hellodash-edit-labels": LocalJSX.HellodashEditLabels & JSXBase.HTMLAttributes<HTMLHellodashEditLabelsElement>;
            "hellodash-label-color-picker": LocalJSX.HellodashLabelColorPicker & JSXBase.HTMLAttributes<HTMLHellodashLabelColorPickerElement>;
            "hellodash-label-edit": LocalJSX.HellodashLabelEdit & JSXBase.HTMLAttributes<HTMLHellodashLabelEditElement>;
            "hellodash-label-select": LocalJSX.HellodashLabelSelect & JSXBase.HTMLAttributes<HTMLHellodashLabelSelectElement>;
            "hellodash-modal-note": LocalJSX.HellodashModalNote & JSXBase.HTMLAttributes<HTMLHellodashModalNoteElement>;
            "hellodash-nav-bar": LocalJSX.HellodashNavBar & JSXBase.HTMLAttributes<HTMLHellodashNavBarElement>;
            "hellodash-note-card": LocalJSX.HellodashNoteCard & JSXBase.HTMLAttributes<HTMLHellodashNoteCardElement>;
            "hellodash-note-edit-dropdown": LocalJSX.HellodashNoteEditDropdown & JSXBase.HTMLAttributes<HTMLHellodashNoteEditDropdownElement>;
            "hellodash-profile-settings": LocalJSX.HellodashProfileSettings & JSXBase.HTMLAttributes<HTMLHellodashProfileSettingsElement>;
            "hellodash-root": LocalJSX.HellodashRoot & JSXBase.HTMLAttributes<HTMLHellodashRootElement>;
            "hellodash-route-bin": LocalJSX.HellodashRouteBin & JSXBase.HTMLAttributes<HTMLHellodashRouteBinElement>;
            "hellodash-route-notes": LocalJSX.HellodashRouteNotes & JSXBase.HTMLAttributes<HTMLHellodashRouteNotesElement>;
            "hellodash-text-editor": LocalJSX.HellodashTextEditor & JSXBase.HTMLAttributes<HTMLHellodashTextEditorElement>;
        }
    }
}
