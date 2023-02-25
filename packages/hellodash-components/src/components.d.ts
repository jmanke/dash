/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { Auth0Client } from "@auth0/auth0-spa-js";
import { Color, Status } from "@didyoumeantoast/dash-components";
import { Label, Note, Theme, User } from "@didyoumeantoast/hellodash-models";
import { NoteCardMode } from "./components/hellodash-note-card/hellodash-note-card";
export { Auth0Client } from "@auth0/auth0-spa-js";
export { Color, Status } from "@didyoumeantoast/dash-components";
export { Label, Note, Theme, User } from "@didyoumeantoast/hellodash-models";
export { NoteCardMode } from "./components/hellodash-note-card/hellodash-note-card";
export namespace Components {
    interface HellodashAuth0Provider {
        "authClient": Auth0Client;
    }
    interface HellodashConfirm {
        /**
          * Modal content
          * @required
         */
        "cancelText": string;
        /**
          * Closes the modal
          * @returns Promise for closing the modal
         */
        "close": () => Promise<void>;
        /**
          * Status of confirm button
          * @default 'error'
         */
        "confirmButtonStatus": Status;
        /**
          * Confirm button text
          * @required
         */
        "confirmText": string;
        /**
          * Modal heading
          * @required
         */
        "heading": string;
        /**
          * When `true`, the modal is open
          * @default false
         */
        "open": boolean;
    }
    interface HellodashEditLabels {
        "close": () => Promise<void>;
        "creatingLabel": boolean;
        "labels": Label[];
    }
    interface HellodashLabelColorPicker {
        "color": Color;
    }
    interface HellodashLabelEdit {
        "label": Label;
    }
    interface HellodashLabelSelect {
        "allLabels": Label[];
        "autoFocus": boolean;
        "canCreateLabel": boolean;
        "labels": Label[];
    }
    interface HellodashModalNote {
        "allLabels": Label[];
        "close": () => Promise<void>;
        "createLabelDisabled": boolean;
        "loading": boolean;
        "mobileView": boolean;
        "note": Note;
        /**
          * When `true`, the modal is open
         */
        "open": boolean;
        "theme": Theme;
    }
    interface HellodashNavBar {
        "setFocus": () => Promise<void>;
    }
    interface HellodashNoteCard {
        "mode": NoteCardMode;
        "note": Note;
        "noteLabels": Label[];
        "selected": boolean;
    }
    interface HellodashNoteEditDropdown {
        "allLabels": Label[];
        "note": Note;
    }
    interface HellodashProfileSettings {
        "user": User;
    }
    interface HellodashTextEditor {
        "content": string;
        "debounce": number;
        "getContent": () => Promise<string>;
        "getTextContent": () => Promise<string>;
        "heading": string;
        "isEditorDirty": () => Promise<boolean>;
        "loading": boolean;
        "readonly": boolean;
        "resize"?: boolean;
        "save": (emitEvent?: boolean) => Promise<void>;
        "selectTitle": () => Promise<void>;
        "setContent": (content: string) => Promise<void>;
        "setFocus": () => Promise<void>;
        "setHeading": (heading: string) => Promise<void>;
        "showFullscreen": boolean;
        "showTitleInput": boolean;
        "theme": Theme;
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
export interface HellodashNoteCardCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLHellodashNoteCardElement;
}
export interface HellodashNoteEditDropdownCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLHellodashNoteEditDropdownElement;
}
export interface HellodashProfileSettingsCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLHellodashProfileSettingsElement;
}
export interface HellodashTextEditorCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLHellodashTextEditorElement;
}
declare global {
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
    interface HTMLHellodashTextEditorElement extends Components.HellodashTextEditor, HTMLStencilElement {
    }
    var HTMLHellodashTextEditorElement: {
        prototype: HTMLHellodashTextEditorElement;
        new (): HTMLHellodashTextEditorElement;
    };
    interface HTMLElementTagNameMap {
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
        "hellodash-text-editor": HTMLHellodashTextEditorElement;
    }
}
declare namespace LocalJSX {
    interface HellodashAuth0Provider {
        "authClient"?: Auth0Client;
        "onHellodashAuth0ProviderRefreshToken"?: (event: HellodashAuth0ProviderCustomEvent<void>) => void;
        "onHellodashAuth0ProviderSignedIn"?: (event: HellodashAuth0ProviderCustomEvent<void>) => void;
    }
    interface HellodashConfirm {
        /**
          * Modal content
          * @required
         */
        "cancelText"?: string;
        /**
          * Status of confirm button
          * @default 'error'
         */
        "confirmButtonStatus"?: Status;
        /**
          * Confirm button text
          * @required
         */
        "confirmText"?: string;
        /**
          * Modal heading
          * @required
         */
        "heading"?: string;
        "onDashModalBeforeClose"?: (event: HellodashConfirmCustomEvent<any>) => void;
        "onDashModalClosed"?: (event: HellodashConfirmCustomEvent<any>) => void;
        "onHellodashConfirmConfirmed"?: (event: HellodashConfirmCustomEvent<any>) => void;
        /**
          * When `true`, the modal is open
          * @default false
         */
        "open"?: boolean;
    }
    interface HellodashEditLabels {
        "creatingLabel"?: boolean;
        "labels"?: Label[];
        "onDashModalBeforeClose"?: (event: HellodashEditLabelsCustomEvent<any>) => void;
        "onDashModalClosed"?: (event: HellodashEditLabelsCustomEvent<any>) => void;
        "onHellodashEditLabelsCreateLabel"?: (event: HellodashEditLabelsCustomEvent<Pick<Label, 'color' | 'text'>>) => void;
        "onHellodashEditLabelsDeleteLabel"?: (event: HellodashEditLabelsCustomEvent<Label>) => void;
        "onHellodashEditLabelsUpdateLabel"?: (event: HellodashEditLabelsCustomEvent<Label>) => void;
    }
    interface HellodashLabelColorPicker {
        "color"?: Color;
        "onHellodashLabelColorPickerColorChanged"?: (event: HellodashLabelColorPickerCustomEvent<Color>) => void;
    }
    interface HellodashLabelEdit {
        "label"?: Label;
        "onHellodashLabelEditLabelDeleted"?: (event: HellodashLabelEditCustomEvent<Label>) => void;
        "onHellodashLabelEditLabelUpdated"?: (event: HellodashLabelEditCustomEvent<Label>) => void;
    }
    interface HellodashLabelSelect {
        "allLabels"?: Label[];
        "autoFocus"?: boolean;
        "canCreateLabel"?: boolean;
        "labels"?: Label[];
        "onHellodashLabelSelectLabelAdded"?: (event: HellodashLabelSelectCustomEvent<Label>) => void;
        "onHellodashLabelSelectLabelCreated"?: (event: HellodashLabelSelectCustomEvent<Label>) => void;
        "onHellodashLabelSelectLabelRemoved"?: (event: HellodashLabelSelectCustomEvent<Label>) => void;
        "onHellodashLabelSelectLabelUpdated"?: (event: HellodashLabelSelectCustomEvent<Label>) => void;
    }
    interface HellodashModalNote {
        "allLabels"?: Label[];
        "createLabelDisabled"?: boolean;
        "loading"?: boolean;
        "mobileView"?: boolean;
        "note"?: Note;
        "onDashModalBeforeClose"?: (event: HellodashModalNoteCustomEvent<any>) => void;
        "onDashModalClosed"?: (event: HellodashModalNoteCustomEvent<any>) => void;
        "onHellodashModalNoteLabelCreated"?: (event: HellodashModalNoteCustomEvent<Label>) => void;
        "onHellodashModalNoteLabelUpdated"?: (event: HellodashModalNoteCustomEvent<Label>) => void;
        "onHellodashModalNoteUpdateNote"?: (event: HellodashModalNoteCustomEvent<Note>) => void;
        /**
          * When `true`, the modal is open
         */
        "open"?: boolean;
        "theme"?: Theme;
    }
    interface HellodashNavBar {
        "onHellodashMenuToggled"?: (event: HellodashNavBarCustomEvent<any>) => void;
    }
    interface HellodashNoteCard {
        "mode"?: NoteCardMode;
        "note"?: Note;
        "noteLabels"?: Label[];
        "onHellodashNoteCardNoteSelected"?: (event: HellodashNoteCardCustomEvent<void>) => void;
        "selected"?: boolean;
    }
    interface HellodashNoteEditDropdown {
        "allLabels"?: Label[];
        "note"?: Note;
        "onHellodashNoteEditDeleteNote"?: (event: HellodashNoteEditDropdownCustomEvent<Note>) => void;
        "onHellodashNoteEditDropdownVisibleChanged"?: (event: HellodashNoteEditDropdownCustomEvent<boolean>) => void;
        "onHellodashNoteEditDuplicateNote"?: (event: HellodashNoteEditDropdownCustomEvent<Note>) => void;
        "onHellodashNoteEditLabelAdded"?: (event: HellodashNoteEditDropdownCustomEvent<number>) => void;
        "onHellodashNoteEditLabelCreated"?: (event: HellodashNoteEditDropdownCustomEvent<Label>) => void;
        "onHellodashNoteEditLabelRemoved"?: (event: HellodashNoteEditDropdownCustomEvent<number>) => void;
        "onHellodashNoteEditLabelUpdated"?: (event: HellodashNoteEditDropdownCustomEvent<Label>) => void;
    }
    interface HellodashProfileSettings {
        "onHellodashProfileSettingsLogout"?: (event: HellodashProfileSettingsCustomEvent<void>) => void;
        "user"?: User;
    }
    interface HellodashTextEditor {
        "content"?: string;
        "debounce"?: number;
        "heading"?: string;
        "loading"?: boolean;
        "onHellodashTextEditorBeforeUnload"?: (event: HellodashTextEditorCustomEvent<Promise<unknown>[]>) => void;
        "onHellodashTextEditorContentChanged"?: (event: HellodashTextEditorCustomEvent<string>) => void;
        "onHellodashTextEditorFullscreenChanged"?: (event: HellodashTextEditorCustomEvent<boolean>) => void;
        "onHellodashTextEditorHeadingChanged"?: (event: HellodashTextEditorCustomEvent<string>) => void;
        "onHellodashTextEditorInit"?: (event: HellodashTextEditorCustomEvent<HTMLHellodashTextEditorElement>) => void;
        "onHellodashTextEditorIsDirty"?: (event: HellodashTextEditorCustomEvent<any>) => void;
        "onHellodashTextEditorNodeChanged"?: (event: HellodashTextEditorCustomEvent<object>) => void;
        "onHellodashTextEditorUnload"?: (event: HellodashTextEditorCustomEvent<any>) => void;
        "readonly"?: boolean;
        "resize"?: boolean;
        "showFullscreen"?: boolean;
        "showTitleInput"?: boolean;
        "theme"?: Theme;
    }
    interface IntrinsicElements {
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
        "hellodash-text-editor": HellodashTextEditor;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
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
            "hellodash-text-editor": LocalJSX.HellodashTextEditor & JSXBase.HTMLAttributes<HTMLHellodashTextEditorElement>;
        }
    }
}
