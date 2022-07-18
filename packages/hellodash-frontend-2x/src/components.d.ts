/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { RouterHistory } from "@stencil/router";
import { Auth0Client } from "@auth0/auth0-spa-js";
import { Color, Scale, Status } from "./types/types";
import { Placement, PlacementStrategy } from "./components/ui/dash-popover/dash-popover";
import { IconColor } from "./components/ui/dash-icon/dash-icon";
import { LabelViewModel } from "./view-models/label-view-model";
import { SelectionMode } from "./components/ui/dash-list/dash-list";
import { SelectionMode as SelectionMode1 } from "./components/ui/dash-list/dash-list";
import { NoteViewModel } from "./view-models/note-view-model";
import { NoteCardMode } from "./components/common/dash-note-card/dash-note-card";
import { Placement as Placement1, PlacementStrategy as PlacementStrategy1, PopoverCloseEvent } from "./components/ui/dash-popover/dash-popover";
import { UserViewModel } from "./view-models/user-view-model";
import { TextEditorContent } from "./components/ui/dash-text-editor/dash-text-editor";
export namespace Components {
    interface DashApp {
        "history": RouterHistory;
    }
    interface DashAuth0Provider {
        "authClient": Auth0Client;
    }
    interface DashButton {
        "disabled": boolean;
        "setFocus": () => Promise<void>;
        "startIcon": string;
        "status": Status;
    }
    interface DashChip {
        "color": Color | string;
        "dismissTooltipText"?: string;
        "heading": string;
        "removeable": boolean;
        "selectable": boolean;
    }
    interface DashColorPicker {
        "colors": Color[];
        "cols": number;
    }
    interface DashColorSwatch {
        "color": Color | string;
        "scale": Scale;
        "setFocus": () => Promise<void>;
    }
    interface DashConfirm {
        "cancelText": string;
        "close": () => Promise<void>;
        "confirmButtonStatus": Status;
        "confirmText": string;
        "heading": string;
    }
    interface DashDrillMenu {
        "active": boolean;
        "drillHeading": string;
    }
    interface DashDropdown {
        "autoClose": boolean;
        "close": (focusTarget?: boolean) => Promise<void>;
        "placement": Placement;
        "placementStrategy": PlacementStrategy;
    }
    interface DashEditLabels {
        "close": () => Promise<void>;
    }
    interface DashFab {
        "icon": string;
    }
    interface DashFilter {
        "clear": () => Promise<void>;
        "debounce": number;
        "items": {}[] | string[];
        "objKey": string;
        "placeholder"?: string;
        "scale": Scale;
        "select": () => Promise<void>;
        "setFocus": () => Promise<void>;
    }
    interface DashFocusTrap {
    }
    interface DashGrid {
        "colL": number;
        "colM": number;
        "colS": number;
        "colXl": number;
    }
    interface DashIcon {
        "color": IconColor;
        "icon": string;
        "iconUrl": string;
        "rounded": boolean;
        "scale"?: Scale;
        "width"?: number;
    }
    interface DashIconButton {
        "disabled": boolean;
        "icon": string;
        "iconUrl": string;
        "loading": boolean;
        "scale"?: Scale;
        "setFocus": () => Promise<void>;
        "type": string;
        "width"?: number;
    }
    interface DashInlineEdit {
        "value": string;
    }
    interface DashInput {
        "clearable": boolean;
        "debounce"?: number;
        "icon"?: string;
        "placeholder": string;
        "scale": Scale;
        "select": () => Promise<void>;
        "setFocus": () => Promise<void>;
        "type": string;
        "value": string;
    }
    interface DashLabel {
        "layout": string;
    }
    interface DashLabelColorPicker {
    }
    interface DashLabelEdit {
        "label": LabelViewModel;
    }
    interface DashLabelSelect {
        "autoFocus": boolean;
        "labels": LabelViewModel[];
    }
    interface DashList {
        "selectionMode": SelectionMode;
    }
    interface DashListItem {
        "disabled": boolean;
        "selected": boolean;
        "selectionMode": SelectionMode1;
        "setFocus": () => Promise<void>;
    }
    interface DashLoader {
        "scale": Scale;
    }
    interface DashMenu {
        "heading"?: string;
        "visible"?: boolean;
    }
    interface DashModal {
        "autoFocus": boolean;
        "close": () => Promise<void>;
        "closeOnHistoryChanged": boolean;
        "disableFullscreenMobileView": boolean;
        "fullscreen": boolean;
        "heading": string;
        "hideCloseButton": boolean;
        "scale": Scale;
    }
    interface DashModalNote {
        "close": () => Promise<void>;
        "newLabelId"?: number;
        "newNote": boolean;
        "noteId": number;
    }
    interface DashNavBar {
        "setFocus": () => Promise<void>;
    }
    interface DashNavLink {
        "href": string;
    }
    interface DashNoteCard {
        "history": RouterHistory;
        "mode": NoteCardMode;
        "note": NoteViewModel;
        "selected": boolean;
    }
    interface DashNoteEditDropdown {
        "note": NoteViewModel;
    }
    interface DashPageContainer {
        "fullpage"?: boolean;
    }
    interface DashPanel {
    }
    interface DashPopover {
        "active": boolean;
        "autoClose": boolean;
        "offsetX"?: number;
        "offsetY"?: number;
        "placement": Placement;
        "placementStrategy": PlacementStrategy;
        "target": HTMLElement | string;
    }
    interface DashProfileSettings {
        "user": UserViewModel;
    }
    interface DashRoot {
        "history": RouterHistory;
    }
    interface DashRouteBin {
    }
    interface DashRouteNotes {
        "history": RouterHistory;
        "match": any;
    }
    interface DashScrim {
        "active"?: boolean;
    }
    interface DashSection {
        "heading": string;
        "stickyHeader": boolean;
    }
    interface DashShell {
    }
    interface DashSideBar {
        "collapsed": boolean;
    }
    interface DashSidebarButton {
        "active": boolean;
        "collapsed": boolean;
        "icon": string;
        "iconColor": string;
        "text": string;
    }
    interface DashTextEditor {
        "content": string;
        "debounce": number;
        "deferLoadTime"?: number;
        "heading": string;
        "loading"?: boolean;
        "resize"?: boolean;
        "save": (emitEvent?: boolean) => Promise<{ rawContent: string; textContent: string; }>;
        "selectTitle": () => Promise<void>;
        "setFocus": () => Promise<void>;
        "showFullscreen"?: boolean;
        "showTitleInput"?: boolean;
    }
    interface DashThemeToggle {
    }
    interface DashToggleSwitch {
        "checked": boolean;
        "setFocus": () => Promise<void>;
    }
    interface DashTooltip {
        "arrow": boolean;
        "enabled": boolean;
        "offsetX"?: number;
        "offsetY"?: number;
        "placement": Placement;
        "placementStrategy": PlacementStrategy;
        "scale": Scale;
        "target": HTMLElement | string;
        "text": string;
    }
}
export interface DashChipCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashChipElement;
}
export interface DashColorPickerCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashColorPickerElement;
}
export interface DashConfirmCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashConfirmElement;
}
export interface DashDrillMenuCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashDrillMenuElement;
}
export interface DashDropdownCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashDropdownElement;
}
export interface DashEditLabelsCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashEditLabelsElement;
}
export interface DashFilterCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashFilterElement;
}
export interface DashInlineEditCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashInlineEditElement;
}
export interface DashInputCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashInputElement;
}
export interface DashLabelColorPickerCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashLabelColorPickerElement;
}
export interface DashLabelEditCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashLabelEditElement;
}
export interface DashLabelSelectCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashLabelSelectElement;
}
export interface DashListItemCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashListItemElement;
}
export interface DashMenuCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashMenuElement;
}
export interface DashModalCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashModalElement;
}
export interface DashModalNoteCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashModalNoteElement;
}
export interface DashNavBarCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashNavBarElement;
}
export interface DashNoteEditDropdownCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashNoteEditDropdownElement;
}
export interface DashPopoverCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashPopoverElement;
}
export interface DashSideBarCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashSideBarElement;
}
export interface DashTextEditorCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashTextEditorElement;
}
export interface DashToggleSwitchCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashToggleSwitchElement;
}
declare global {
    interface HTMLDashAppElement extends Components.DashApp, HTMLStencilElement {
    }
    var HTMLDashAppElement: {
        prototype: HTMLDashAppElement;
        new (): HTMLDashAppElement;
    };
    interface HTMLDashAuth0ProviderElement extends Components.DashAuth0Provider, HTMLStencilElement {
    }
    var HTMLDashAuth0ProviderElement: {
        prototype: HTMLDashAuth0ProviderElement;
        new (): HTMLDashAuth0ProviderElement;
    };
    interface HTMLDashButtonElement extends Components.DashButton, HTMLStencilElement {
    }
    var HTMLDashButtonElement: {
        prototype: HTMLDashButtonElement;
        new (): HTMLDashButtonElement;
    };
    interface HTMLDashChipElement extends Components.DashChip, HTMLStencilElement {
    }
    var HTMLDashChipElement: {
        prototype: HTMLDashChipElement;
        new (): HTMLDashChipElement;
    };
    interface HTMLDashColorPickerElement extends Components.DashColorPicker, HTMLStencilElement {
    }
    var HTMLDashColorPickerElement: {
        prototype: HTMLDashColorPickerElement;
        new (): HTMLDashColorPickerElement;
    };
    interface HTMLDashColorSwatchElement extends Components.DashColorSwatch, HTMLStencilElement {
    }
    var HTMLDashColorSwatchElement: {
        prototype: HTMLDashColorSwatchElement;
        new (): HTMLDashColorSwatchElement;
    };
    interface HTMLDashConfirmElement extends Components.DashConfirm, HTMLStencilElement {
    }
    var HTMLDashConfirmElement: {
        prototype: HTMLDashConfirmElement;
        new (): HTMLDashConfirmElement;
    };
    interface HTMLDashDrillMenuElement extends Components.DashDrillMenu, HTMLStencilElement {
    }
    var HTMLDashDrillMenuElement: {
        prototype: HTMLDashDrillMenuElement;
        new (): HTMLDashDrillMenuElement;
    };
    interface HTMLDashDropdownElement extends Components.DashDropdown, HTMLStencilElement {
    }
    var HTMLDashDropdownElement: {
        prototype: HTMLDashDropdownElement;
        new (): HTMLDashDropdownElement;
    };
    interface HTMLDashEditLabelsElement extends Components.DashEditLabels, HTMLStencilElement {
    }
    var HTMLDashEditLabelsElement: {
        prototype: HTMLDashEditLabelsElement;
        new (): HTMLDashEditLabelsElement;
    };
    interface HTMLDashFabElement extends Components.DashFab, HTMLStencilElement {
    }
    var HTMLDashFabElement: {
        prototype: HTMLDashFabElement;
        new (): HTMLDashFabElement;
    };
    interface HTMLDashFilterElement extends Components.DashFilter, HTMLStencilElement {
    }
    var HTMLDashFilterElement: {
        prototype: HTMLDashFilterElement;
        new (): HTMLDashFilterElement;
    };
    interface HTMLDashFocusTrapElement extends Components.DashFocusTrap, HTMLStencilElement {
    }
    var HTMLDashFocusTrapElement: {
        prototype: HTMLDashFocusTrapElement;
        new (): HTMLDashFocusTrapElement;
    };
    interface HTMLDashGridElement extends Components.DashGrid, HTMLStencilElement {
    }
    var HTMLDashGridElement: {
        prototype: HTMLDashGridElement;
        new (): HTMLDashGridElement;
    };
    interface HTMLDashIconElement extends Components.DashIcon, HTMLStencilElement {
    }
    var HTMLDashIconElement: {
        prototype: HTMLDashIconElement;
        new (): HTMLDashIconElement;
    };
    interface HTMLDashIconButtonElement extends Components.DashIconButton, HTMLStencilElement {
    }
    var HTMLDashIconButtonElement: {
        prototype: HTMLDashIconButtonElement;
        new (): HTMLDashIconButtonElement;
    };
    interface HTMLDashInlineEditElement extends Components.DashInlineEdit, HTMLStencilElement {
    }
    var HTMLDashInlineEditElement: {
        prototype: HTMLDashInlineEditElement;
        new (): HTMLDashInlineEditElement;
    };
    interface HTMLDashInputElement extends Components.DashInput, HTMLStencilElement {
    }
    var HTMLDashInputElement: {
        prototype: HTMLDashInputElement;
        new (): HTMLDashInputElement;
    };
    interface HTMLDashLabelElement extends Components.DashLabel, HTMLStencilElement {
    }
    var HTMLDashLabelElement: {
        prototype: HTMLDashLabelElement;
        new (): HTMLDashLabelElement;
    };
    interface HTMLDashLabelColorPickerElement extends Components.DashLabelColorPicker, HTMLStencilElement {
    }
    var HTMLDashLabelColorPickerElement: {
        prototype: HTMLDashLabelColorPickerElement;
        new (): HTMLDashLabelColorPickerElement;
    };
    interface HTMLDashLabelEditElement extends Components.DashLabelEdit, HTMLStencilElement {
    }
    var HTMLDashLabelEditElement: {
        prototype: HTMLDashLabelEditElement;
        new (): HTMLDashLabelEditElement;
    };
    interface HTMLDashLabelSelectElement extends Components.DashLabelSelect, HTMLStencilElement {
    }
    var HTMLDashLabelSelectElement: {
        prototype: HTMLDashLabelSelectElement;
        new (): HTMLDashLabelSelectElement;
    };
    interface HTMLDashListElement extends Components.DashList, HTMLStencilElement {
    }
    var HTMLDashListElement: {
        prototype: HTMLDashListElement;
        new (): HTMLDashListElement;
    };
    interface HTMLDashListItemElement extends Components.DashListItem, HTMLStencilElement {
    }
    var HTMLDashListItemElement: {
        prototype: HTMLDashListItemElement;
        new (): HTMLDashListItemElement;
    };
    interface HTMLDashLoaderElement extends Components.DashLoader, HTMLStencilElement {
    }
    var HTMLDashLoaderElement: {
        prototype: HTMLDashLoaderElement;
        new (): HTMLDashLoaderElement;
    };
    interface HTMLDashMenuElement extends Components.DashMenu, HTMLStencilElement {
    }
    var HTMLDashMenuElement: {
        prototype: HTMLDashMenuElement;
        new (): HTMLDashMenuElement;
    };
    interface HTMLDashModalElement extends Components.DashModal, HTMLStencilElement {
    }
    var HTMLDashModalElement: {
        prototype: HTMLDashModalElement;
        new (): HTMLDashModalElement;
    };
    interface HTMLDashModalNoteElement extends Components.DashModalNote, HTMLStencilElement {
    }
    var HTMLDashModalNoteElement: {
        prototype: HTMLDashModalNoteElement;
        new (): HTMLDashModalNoteElement;
    };
    interface HTMLDashNavBarElement extends Components.DashNavBar, HTMLStencilElement {
    }
    var HTMLDashNavBarElement: {
        prototype: HTMLDashNavBarElement;
        new (): HTMLDashNavBarElement;
    };
    interface HTMLDashNavLinkElement extends Components.DashNavLink, HTMLStencilElement {
    }
    var HTMLDashNavLinkElement: {
        prototype: HTMLDashNavLinkElement;
        new (): HTMLDashNavLinkElement;
    };
    interface HTMLDashNoteCardElement extends Components.DashNoteCard, HTMLStencilElement {
    }
    var HTMLDashNoteCardElement: {
        prototype: HTMLDashNoteCardElement;
        new (): HTMLDashNoteCardElement;
    };
    interface HTMLDashNoteEditDropdownElement extends Components.DashNoteEditDropdown, HTMLStencilElement {
    }
    var HTMLDashNoteEditDropdownElement: {
        prototype: HTMLDashNoteEditDropdownElement;
        new (): HTMLDashNoteEditDropdownElement;
    };
    interface HTMLDashPageContainerElement extends Components.DashPageContainer, HTMLStencilElement {
    }
    var HTMLDashPageContainerElement: {
        prototype: HTMLDashPageContainerElement;
        new (): HTMLDashPageContainerElement;
    };
    interface HTMLDashPanelElement extends Components.DashPanel, HTMLStencilElement {
    }
    var HTMLDashPanelElement: {
        prototype: HTMLDashPanelElement;
        new (): HTMLDashPanelElement;
    };
    interface HTMLDashPopoverElement extends Components.DashPopover, HTMLStencilElement {
    }
    var HTMLDashPopoverElement: {
        prototype: HTMLDashPopoverElement;
        new (): HTMLDashPopoverElement;
    };
    interface HTMLDashProfileSettingsElement extends Components.DashProfileSettings, HTMLStencilElement {
    }
    var HTMLDashProfileSettingsElement: {
        prototype: HTMLDashProfileSettingsElement;
        new (): HTMLDashProfileSettingsElement;
    };
    interface HTMLDashRootElement extends Components.DashRoot, HTMLStencilElement {
    }
    var HTMLDashRootElement: {
        prototype: HTMLDashRootElement;
        new (): HTMLDashRootElement;
    };
    interface HTMLDashRouteBinElement extends Components.DashRouteBin, HTMLStencilElement {
    }
    var HTMLDashRouteBinElement: {
        prototype: HTMLDashRouteBinElement;
        new (): HTMLDashRouteBinElement;
    };
    interface HTMLDashRouteNotesElement extends Components.DashRouteNotes, HTMLStencilElement {
    }
    var HTMLDashRouteNotesElement: {
        prototype: HTMLDashRouteNotesElement;
        new (): HTMLDashRouteNotesElement;
    };
    interface HTMLDashScrimElement extends Components.DashScrim, HTMLStencilElement {
    }
    var HTMLDashScrimElement: {
        prototype: HTMLDashScrimElement;
        new (): HTMLDashScrimElement;
    };
    interface HTMLDashSectionElement extends Components.DashSection, HTMLStencilElement {
    }
    var HTMLDashSectionElement: {
        prototype: HTMLDashSectionElement;
        new (): HTMLDashSectionElement;
    };
    interface HTMLDashShellElement extends Components.DashShell, HTMLStencilElement {
    }
    var HTMLDashShellElement: {
        prototype: HTMLDashShellElement;
        new (): HTMLDashShellElement;
    };
    interface HTMLDashSideBarElement extends Components.DashSideBar, HTMLStencilElement {
    }
    var HTMLDashSideBarElement: {
        prototype: HTMLDashSideBarElement;
        new (): HTMLDashSideBarElement;
    };
    interface HTMLDashSidebarButtonElement extends Components.DashSidebarButton, HTMLStencilElement {
    }
    var HTMLDashSidebarButtonElement: {
        prototype: HTMLDashSidebarButtonElement;
        new (): HTMLDashSidebarButtonElement;
    };
    interface HTMLDashTextEditorElement extends Components.DashTextEditor, HTMLStencilElement {
    }
    var HTMLDashTextEditorElement: {
        prototype: HTMLDashTextEditorElement;
        new (): HTMLDashTextEditorElement;
    };
    interface HTMLDashThemeToggleElement extends Components.DashThemeToggle, HTMLStencilElement {
    }
    var HTMLDashThemeToggleElement: {
        prototype: HTMLDashThemeToggleElement;
        new (): HTMLDashThemeToggleElement;
    };
    interface HTMLDashToggleSwitchElement extends Components.DashToggleSwitch, HTMLStencilElement {
    }
    var HTMLDashToggleSwitchElement: {
        prototype: HTMLDashToggleSwitchElement;
        new (): HTMLDashToggleSwitchElement;
    };
    interface HTMLDashTooltipElement extends Components.DashTooltip, HTMLStencilElement {
    }
    var HTMLDashTooltipElement: {
        prototype: HTMLDashTooltipElement;
        new (): HTMLDashTooltipElement;
    };
    interface HTMLElementTagNameMap {
        "dash-app": HTMLDashAppElement;
        "dash-auth0-provider": HTMLDashAuth0ProviderElement;
        "dash-button": HTMLDashButtonElement;
        "dash-chip": HTMLDashChipElement;
        "dash-color-picker": HTMLDashColorPickerElement;
        "dash-color-swatch": HTMLDashColorSwatchElement;
        "dash-confirm": HTMLDashConfirmElement;
        "dash-drill-menu": HTMLDashDrillMenuElement;
        "dash-dropdown": HTMLDashDropdownElement;
        "dash-edit-labels": HTMLDashEditLabelsElement;
        "dash-fab": HTMLDashFabElement;
        "dash-filter": HTMLDashFilterElement;
        "dash-focus-trap": HTMLDashFocusTrapElement;
        "dash-grid": HTMLDashGridElement;
        "dash-icon": HTMLDashIconElement;
        "dash-icon-button": HTMLDashIconButtonElement;
        "dash-inline-edit": HTMLDashInlineEditElement;
        "dash-input": HTMLDashInputElement;
        "dash-label": HTMLDashLabelElement;
        "dash-label-color-picker": HTMLDashLabelColorPickerElement;
        "dash-label-edit": HTMLDashLabelEditElement;
        "dash-label-select": HTMLDashLabelSelectElement;
        "dash-list": HTMLDashListElement;
        "dash-list-item": HTMLDashListItemElement;
        "dash-loader": HTMLDashLoaderElement;
        "dash-menu": HTMLDashMenuElement;
        "dash-modal": HTMLDashModalElement;
        "dash-modal-note": HTMLDashModalNoteElement;
        "dash-nav-bar": HTMLDashNavBarElement;
        "dash-nav-link": HTMLDashNavLinkElement;
        "dash-note-card": HTMLDashNoteCardElement;
        "dash-note-edit-dropdown": HTMLDashNoteEditDropdownElement;
        "dash-page-container": HTMLDashPageContainerElement;
        "dash-panel": HTMLDashPanelElement;
        "dash-popover": HTMLDashPopoverElement;
        "dash-profile-settings": HTMLDashProfileSettingsElement;
        "dash-root": HTMLDashRootElement;
        "dash-route-bin": HTMLDashRouteBinElement;
        "dash-route-notes": HTMLDashRouteNotesElement;
        "dash-scrim": HTMLDashScrimElement;
        "dash-section": HTMLDashSectionElement;
        "dash-shell": HTMLDashShellElement;
        "dash-side-bar": HTMLDashSideBarElement;
        "dash-sidebar-button": HTMLDashSidebarButtonElement;
        "dash-text-editor": HTMLDashTextEditorElement;
        "dash-theme-toggle": HTMLDashThemeToggleElement;
        "dash-toggle-switch": HTMLDashToggleSwitchElement;
        "dash-tooltip": HTMLDashTooltipElement;
    }
}
declare namespace LocalJSX {
    interface DashApp {
        "history"?: RouterHistory;
    }
    interface DashAuth0Provider {
        "authClient"?: Auth0Client;
    }
    interface DashButton {
        "disabled"?: boolean;
        "startIcon"?: string;
        "status"?: Status;
    }
    interface DashChip {
        "color"?: Color | string;
        "dismissTooltipText"?: string;
        "heading"?: string;
        "onDashChipRemove"?: (event: DashChipCustomEvent<any>) => void;
        "removeable"?: boolean;
        "selectable"?: boolean;
    }
    interface DashColorPicker {
        "colors"?: Color[];
        "cols"?: number;
        "onDashColorPickerColorChanged"?: (event: DashColorPickerCustomEvent<Color>) => void;
    }
    interface DashColorSwatch {
        "color"?: Color | string;
        "scale"?: Scale;
    }
    interface DashConfirm {
        "cancelText"?: string;
        "confirmButtonStatus"?: Status;
        "confirmText"?: string;
        "heading"?: string;
        "onDashConfirmConfirmed"?: (event: DashConfirmCustomEvent<any>) => void;
        "onDashModalBeforeClose"?: (event: DashConfirmCustomEvent<any>) => void;
        "onDashModalClosed"?: (event: DashConfirmCustomEvent<any>) => void;
    }
    interface DashDrillMenu {
        "active"?: boolean;
        "drillHeading"?: string;
        "onDashDrillMenuClosed"?: (event: DashDrillMenuCustomEvent<any>) => void;
    }
    interface DashDropdown {
        "autoClose"?: boolean;
        "onDropdownVisibleChanged"?: (event: DashDropdownCustomEvent<boolean>) => void;
        "placement"?: Placement;
        "placementStrategy"?: PlacementStrategy;
    }
    interface DashEditLabels {
        "onDashModalBeforeClose"?: (event: DashEditLabelsCustomEvent<any>) => void;
        "onDashModalClosed"?: (event: DashEditLabelsCustomEvent<any>) => void;
    }
    interface DashFab {
        "icon"?: string;
    }
    interface DashFilter {
        "debounce"?: number;
        "items"?: {}[] | string[];
        "objKey"?: string;
        "onDashFilterFilteredItems"?: (event: DashFilterCustomEvent<object[]>) => void;
        "onDashFilterSubmit"?: (event: DashFilterCustomEvent<string>) => void;
        "onDashFilterValueChanged"?: (event: DashFilterCustomEvent<string>) => void;
        "placeholder"?: string;
        "scale"?: Scale;
    }
    interface DashFocusTrap {
    }
    interface DashGrid {
        "colL"?: number;
        "colM"?: number;
        "colS"?: number;
        "colXl"?: number;
    }
    interface DashIcon {
        "color"?: IconColor;
        "icon"?: string;
        "iconUrl"?: string;
        "rounded"?: boolean;
        "scale"?: Scale;
        "width"?: number;
    }
    interface DashIconButton {
        "disabled"?: boolean;
        "icon"?: string;
        "iconUrl"?: string;
        "loading"?: boolean;
        "scale"?: Scale;
        "type"?: string;
        "width"?: number;
    }
    interface DashInlineEdit {
        "onDashInlineEditValueChanged"?: (event: DashInlineEditCustomEvent<string>) => void;
        "value"?: string;
    }
    interface DashInput {
        "clearable"?: boolean;
        "debounce"?: number;
        "icon"?: string;
        "onDashInputInput"?: (event: DashInputCustomEvent<string>) => void;
        "onDashInputSubmit"?: (event: DashInputCustomEvent<any>) => void;
        "placeholder"?: string;
        "scale"?: Scale;
        "type"?: string;
        "value"?: string;
    }
    interface DashLabel {
        "layout"?: string;
    }
    interface DashLabelColorPicker {
        "onDashLabelColorPickerColorChanged"?: (event: DashLabelColorPickerCustomEvent<Color>) => void;
    }
    interface DashLabelEdit {
        "label"?: LabelViewModel;
        "onDashDeleteLabel"?: (event: DashLabelEditCustomEvent<LabelViewModel>) => void;
    }
    interface DashLabelSelect {
        "autoFocus"?: boolean;
        "labels"?: LabelViewModel[];
        "onDashLabelSelectLabelAdded"?: (event: DashLabelSelectCustomEvent<LabelViewModel>) => void;
        "onDashLabelSelectLabelRemoved"?: (event: DashLabelSelectCustomEvent<LabelViewModel>) => void;
    }
    interface DashList {
        "selectionMode"?: SelectionMode;
    }
    interface DashListItem {
        "disabled"?: boolean;
        "onDashListItemMoveNext"?: (event: DashListItemCustomEvent<HTMLDashListItemElement>) => void;
        "onDashListItemMovePrevious"?: (event: DashListItemCustomEvent<HTMLDashListItemElement>) => void;
        "onDashListItemSelectedChanged"?: (event: DashListItemCustomEvent<boolean>) => void;
        "selected"?: boolean;
        "selectionMode"?: SelectionMode1;
    }
    interface DashLoader {
        "scale"?: Scale;
    }
    interface DashMenu {
        "heading"?: string;
        "onDashMenuClose"?: (event: DashMenuCustomEvent<any>) => void;
        "visible"?: boolean;
    }
    interface DashModal {
        "autoFocus"?: boolean;
        "closeOnHistoryChanged"?: boolean;
        "disableFullscreenMobileView"?: boolean;
        "fullscreen"?: boolean;
        "heading"?: string;
        "hideCloseButton"?: boolean;
        "onDashModalBeforeClose"?: (event: DashModalCustomEvent<any>) => void;
        "onDashModalClosed"?: (event: DashModalCustomEvent<any>) => void;
        "scale"?: Scale;
    }
    interface DashModalNote {
        "newLabelId"?: number;
        "newNote"?: boolean;
        "noteId"?: number;
        "onDashModalBeforeClose"?: (event: DashModalNoteCustomEvent<any>) => void;
        "onDashModalClosed"?: (event: DashModalNoteCustomEvent<any>) => void;
    }
    interface DashNavBar {
        "onDashMenuToggled"?: (event: DashNavBarCustomEvent<any>) => void;
    }
    interface DashNavLink {
        "href"?: string;
    }
    interface DashNoteCard {
        "history"?: RouterHistory;
        "mode"?: NoteCardMode;
        "note"?: NoteViewModel;
        "selected"?: boolean;
    }
    interface DashNoteEditDropdown {
        "note"?: NoteViewModel;
        "onDashNoteEditDropdownVisibleChanged"?: (event: DashNoteEditDropdownCustomEvent<boolean>) => void;
    }
    interface DashPageContainer {
        "fullpage"?: boolean;
    }
    interface DashPanel {
    }
    interface DashPopover {
        "active"?: boolean;
        "autoClose"?: boolean;
        "offsetX"?: number;
        "offsetY"?: number;
        "onDashPopoverClose"?: (event: DashPopoverCustomEvent<PopoverCloseEvent>) => void;
        "onDashPopoverOpen"?: (event: DashPopoverCustomEvent<any>) => void;
        "placement"?: Placement;
        "placementStrategy"?: PlacementStrategy;
        "target"?: HTMLElement | string;
    }
    interface DashProfileSettings {
        "user"?: UserViewModel;
    }
    interface DashRoot {
        "history"?: RouterHistory;
    }
    interface DashRouteBin {
    }
    interface DashRouteNotes {
        "history"?: RouterHistory;
        "match"?: any;
    }
    interface DashScrim {
        "active"?: boolean;
    }
    interface DashSection {
        "heading"?: string;
        "stickyHeader"?: boolean;
    }
    interface DashShell {
    }
    interface DashSideBar {
        "collapsed"?: boolean;
        "onDashSideBarClose"?: (event: DashSideBarCustomEvent<any>) => void;
    }
    interface DashSidebarButton {
        "active"?: boolean;
        "collapsed"?: boolean;
        "icon"?: string;
        "iconColor"?: string;
        "text"?: string;
    }
    interface DashTextEditor {
        "content"?: string;
        "debounce"?: number;
        "deferLoadTime"?: number;
        "heading"?: string;
        "loading"?: boolean;
        "onDashTextEditorContentChanged"?: (event: DashTextEditorCustomEvent<TextEditorContent>) => void;
        "onDashTextEditorFullscreenChanged"?: (event: DashTextEditorCustomEvent<boolean>) => void;
        "onDashTextEditorHeadingChanged"?: (event: DashTextEditorCustomEvent<string>) => void;
        "onDashTextEditorInit"?: (event: DashTextEditorCustomEvent<HTMLDashTextEditorElement>) => void;
        "onDashTextEditorIsDirty"?: (event: DashTextEditorCustomEvent<any>) => void;
        "resize"?: boolean;
        "showFullscreen"?: boolean;
        "showTitleInput"?: boolean;
    }
    interface DashThemeToggle {
    }
    interface DashToggleSwitch {
        "checked"?: boolean;
        "onDashToggleSwitchCheckChanged"?: (event: DashToggleSwitchCustomEvent<any>) => void;
    }
    interface DashTooltip {
        "arrow"?: boolean;
        "enabled"?: boolean;
        "offsetX"?: number;
        "offsetY"?: number;
        "placement"?: Placement;
        "placementStrategy"?: PlacementStrategy;
        "scale"?: Scale;
        "target"?: HTMLElement | string;
        "text"?: string;
    }
    interface IntrinsicElements {
        "dash-app": DashApp;
        "dash-auth0-provider": DashAuth0Provider;
        "dash-button": DashButton;
        "dash-chip": DashChip;
        "dash-color-picker": DashColorPicker;
        "dash-color-swatch": DashColorSwatch;
        "dash-confirm": DashConfirm;
        "dash-drill-menu": DashDrillMenu;
        "dash-dropdown": DashDropdown;
        "dash-edit-labels": DashEditLabels;
        "dash-fab": DashFab;
        "dash-filter": DashFilter;
        "dash-focus-trap": DashFocusTrap;
        "dash-grid": DashGrid;
        "dash-icon": DashIcon;
        "dash-icon-button": DashIconButton;
        "dash-inline-edit": DashInlineEdit;
        "dash-input": DashInput;
        "dash-label": DashLabel;
        "dash-label-color-picker": DashLabelColorPicker;
        "dash-label-edit": DashLabelEdit;
        "dash-label-select": DashLabelSelect;
        "dash-list": DashList;
        "dash-list-item": DashListItem;
        "dash-loader": DashLoader;
        "dash-menu": DashMenu;
        "dash-modal": DashModal;
        "dash-modal-note": DashModalNote;
        "dash-nav-bar": DashNavBar;
        "dash-nav-link": DashNavLink;
        "dash-note-card": DashNoteCard;
        "dash-note-edit-dropdown": DashNoteEditDropdown;
        "dash-page-container": DashPageContainer;
        "dash-panel": DashPanel;
        "dash-popover": DashPopover;
        "dash-profile-settings": DashProfileSettings;
        "dash-root": DashRoot;
        "dash-route-bin": DashRouteBin;
        "dash-route-notes": DashRouteNotes;
        "dash-scrim": DashScrim;
        "dash-section": DashSection;
        "dash-shell": DashShell;
        "dash-side-bar": DashSideBar;
        "dash-sidebar-button": DashSidebarButton;
        "dash-text-editor": DashTextEditor;
        "dash-theme-toggle": DashThemeToggle;
        "dash-toggle-switch": DashToggleSwitch;
        "dash-tooltip": DashTooltip;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "dash-app": LocalJSX.DashApp & JSXBase.HTMLAttributes<HTMLDashAppElement>;
            "dash-auth0-provider": LocalJSX.DashAuth0Provider & JSXBase.HTMLAttributes<HTMLDashAuth0ProviderElement>;
            "dash-button": LocalJSX.DashButton & JSXBase.HTMLAttributes<HTMLDashButtonElement>;
            "dash-chip": LocalJSX.DashChip & JSXBase.HTMLAttributes<HTMLDashChipElement>;
            "dash-color-picker": LocalJSX.DashColorPicker & JSXBase.HTMLAttributes<HTMLDashColorPickerElement>;
            "dash-color-swatch": LocalJSX.DashColorSwatch & JSXBase.HTMLAttributes<HTMLDashColorSwatchElement>;
            "dash-confirm": LocalJSX.DashConfirm & JSXBase.HTMLAttributes<HTMLDashConfirmElement>;
            "dash-drill-menu": LocalJSX.DashDrillMenu & JSXBase.HTMLAttributes<HTMLDashDrillMenuElement>;
            "dash-dropdown": LocalJSX.DashDropdown & JSXBase.HTMLAttributes<HTMLDashDropdownElement>;
            "dash-edit-labels": LocalJSX.DashEditLabels & JSXBase.HTMLAttributes<HTMLDashEditLabelsElement>;
            "dash-fab": LocalJSX.DashFab & JSXBase.HTMLAttributes<HTMLDashFabElement>;
            "dash-filter": LocalJSX.DashFilter & JSXBase.HTMLAttributes<HTMLDashFilterElement>;
            "dash-focus-trap": LocalJSX.DashFocusTrap & JSXBase.HTMLAttributes<HTMLDashFocusTrapElement>;
            "dash-grid": LocalJSX.DashGrid & JSXBase.HTMLAttributes<HTMLDashGridElement>;
            "dash-icon": LocalJSX.DashIcon & JSXBase.HTMLAttributes<HTMLDashIconElement>;
            "dash-icon-button": LocalJSX.DashIconButton & JSXBase.HTMLAttributes<HTMLDashIconButtonElement>;
            "dash-inline-edit": LocalJSX.DashInlineEdit & JSXBase.HTMLAttributes<HTMLDashInlineEditElement>;
            "dash-input": LocalJSX.DashInput & JSXBase.HTMLAttributes<HTMLDashInputElement>;
            "dash-label": LocalJSX.DashLabel & JSXBase.HTMLAttributes<HTMLDashLabelElement>;
            "dash-label-color-picker": LocalJSX.DashLabelColorPicker & JSXBase.HTMLAttributes<HTMLDashLabelColorPickerElement>;
            "dash-label-edit": LocalJSX.DashLabelEdit & JSXBase.HTMLAttributes<HTMLDashLabelEditElement>;
            "dash-label-select": LocalJSX.DashLabelSelect & JSXBase.HTMLAttributes<HTMLDashLabelSelectElement>;
            "dash-list": LocalJSX.DashList & JSXBase.HTMLAttributes<HTMLDashListElement>;
            "dash-list-item": LocalJSX.DashListItem & JSXBase.HTMLAttributes<HTMLDashListItemElement>;
            "dash-loader": LocalJSX.DashLoader & JSXBase.HTMLAttributes<HTMLDashLoaderElement>;
            "dash-menu": LocalJSX.DashMenu & JSXBase.HTMLAttributes<HTMLDashMenuElement>;
            "dash-modal": LocalJSX.DashModal & JSXBase.HTMLAttributes<HTMLDashModalElement>;
            "dash-modal-note": LocalJSX.DashModalNote & JSXBase.HTMLAttributes<HTMLDashModalNoteElement>;
            "dash-nav-bar": LocalJSX.DashNavBar & JSXBase.HTMLAttributes<HTMLDashNavBarElement>;
            "dash-nav-link": LocalJSX.DashNavLink & JSXBase.HTMLAttributes<HTMLDashNavLinkElement>;
            "dash-note-card": LocalJSX.DashNoteCard & JSXBase.HTMLAttributes<HTMLDashNoteCardElement>;
            "dash-note-edit-dropdown": LocalJSX.DashNoteEditDropdown & JSXBase.HTMLAttributes<HTMLDashNoteEditDropdownElement>;
            "dash-page-container": LocalJSX.DashPageContainer & JSXBase.HTMLAttributes<HTMLDashPageContainerElement>;
            "dash-panel": LocalJSX.DashPanel & JSXBase.HTMLAttributes<HTMLDashPanelElement>;
            "dash-popover": LocalJSX.DashPopover & JSXBase.HTMLAttributes<HTMLDashPopoverElement>;
            "dash-profile-settings": LocalJSX.DashProfileSettings & JSXBase.HTMLAttributes<HTMLDashProfileSettingsElement>;
            "dash-root": LocalJSX.DashRoot & JSXBase.HTMLAttributes<HTMLDashRootElement>;
            "dash-route-bin": LocalJSX.DashRouteBin & JSXBase.HTMLAttributes<HTMLDashRouteBinElement>;
            "dash-route-notes": LocalJSX.DashRouteNotes & JSXBase.HTMLAttributes<HTMLDashRouteNotesElement>;
            "dash-scrim": LocalJSX.DashScrim & JSXBase.HTMLAttributes<HTMLDashScrimElement>;
            "dash-section": LocalJSX.DashSection & JSXBase.HTMLAttributes<HTMLDashSectionElement>;
            "dash-shell": LocalJSX.DashShell & JSXBase.HTMLAttributes<HTMLDashShellElement>;
            "dash-side-bar": LocalJSX.DashSideBar & JSXBase.HTMLAttributes<HTMLDashSideBarElement>;
            "dash-sidebar-button": LocalJSX.DashSidebarButton & JSXBase.HTMLAttributes<HTMLDashSidebarButtonElement>;
            "dash-text-editor": LocalJSX.DashTextEditor & JSXBase.HTMLAttributes<HTMLDashTextEditorElement>;
            "dash-theme-toggle": LocalJSX.DashThemeToggle & JSXBase.HTMLAttributes<HTMLDashThemeToggleElement>;
            "dash-toggle-switch": LocalJSX.DashToggleSwitch & JSXBase.HTMLAttributes<HTMLDashToggleSwitchElement>;
            "dash-tooltip": LocalJSX.DashTooltip & JSXBase.HTMLAttributes<HTMLDashTooltipElement>;
        }
    }
}