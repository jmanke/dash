/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { Appearance, Color, Scale, ScaleExtended, Status, Theme } from "./types/types";
import { Placement, PlacementStrategy } from "./components/dash-popover/dash-popover";
import { IconColor } from "./components/dash-icon/dash-icon";
import { LabelLayout } from "./components/dash-label/dash-label";
import { SelectionMode } from "./components/dash-list/dash-list";
import { SelectionMode as SelectionMode1 } from "./components/dash-list/dash-list";
import { Placement as Placement1, PlacementStrategy as PlacementStrategy1, PopoverCloseEvent } from "./components/dash-popover/dash-popover";
export namespace Components {
    interface DashButton {
        "appearance": Appearance;
        "disabled": boolean;
        "scale": Scale;
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
        "selectedColor": Color;
    }
    interface DashColorSwatch {
        "color": Color | string;
        "scale": Scale;
        "selected": boolean;
        "setFocus": () => Promise<void>;
    }
    interface DashConfirmButton {
        "icon": string;
        "scale": Scale;
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
    interface DashEventCalendarMonth {
    }
    interface DashFab {
        "icon": string;
        "scale": ScaleExtended;
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
        "scale"?: ScaleExtended;
        "width"?: number;
    }
    interface DashIconButton {
        "disabled": boolean;
        "icon": string;
        "iconUrl": string;
        "loading": boolean;
        "rounded": boolean;
        "scale"?: ScaleExtended;
        "setFocus": () => Promise<void>;
        "tooltipPlacement": Placement;
        "tooltipText"?: string;
        "type": string;
    }
    interface DashInlineEdit {
        "disabled": boolean;
        "scale": Scale;
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
        "for": string;
        "layout": LabelLayout;
    }
    interface DashList {
        "scale": Scale;
        "selectionMode": SelectionMode;
    }
    interface DashListItem {
        "disabled": boolean;
        "scale": Scale;
        "selected": boolean;
        "selectionMode": SelectionMode1;
        "setFocus": () => Promise<void>;
    }
    interface DashLoader {
        "scale": Scale;
    }
    interface DashModal {
        "autoFocus": boolean;
        "close": () => Promise<void>;
        "disableFullscreenMobileView": boolean;
        "fullscreen": boolean;
        "heading": string;
        "hideCloseButton": boolean;
        "scale": Scale;
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
    interface DashThemeToggle {
        "theme": Theme;
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
export interface DashConfirmButtonCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashConfirmButtonElement;
}
export interface DashDrillMenuCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashDrillMenuElement;
}
export interface DashDropdownCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashDropdownElement;
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
export interface DashListItemCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashListItemElement;
}
export interface DashModalCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashModalElement;
}
export interface DashPopoverCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashPopoverElement;
}
export interface DashSideBarCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashSideBarElement;
}
export interface DashToggleSwitchCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashToggleSwitchElement;
}
declare global {
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
    interface HTMLDashConfirmButtonElement extends Components.DashConfirmButton, HTMLStencilElement {
    }
    var HTMLDashConfirmButtonElement: {
        prototype: HTMLDashConfirmButtonElement;
        new (): HTMLDashConfirmButtonElement;
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
    interface HTMLDashEventCalendarMonthElement extends Components.DashEventCalendarMonth, HTMLStencilElement {
    }
    var HTMLDashEventCalendarMonthElement: {
        prototype: HTMLDashEventCalendarMonthElement;
        new (): HTMLDashEventCalendarMonthElement;
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
    interface HTMLDashModalElement extends Components.DashModal, HTMLStencilElement {
    }
    var HTMLDashModalElement: {
        prototype: HTMLDashModalElement;
        new (): HTMLDashModalElement;
    };
    interface HTMLDashPopoverElement extends Components.DashPopover, HTMLStencilElement {
    }
    var HTMLDashPopoverElement: {
        prototype: HTMLDashPopoverElement;
        new (): HTMLDashPopoverElement;
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
        "dash-button": HTMLDashButtonElement;
        "dash-chip": HTMLDashChipElement;
        "dash-color-picker": HTMLDashColorPickerElement;
        "dash-color-swatch": HTMLDashColorSwatchElement;
        "dash-confirm-button": HTMLDashConfirmButtonElement;
        "dash-drill-menu": HTMLDashDrillMenuElement;
        "dash-dropdown": HTMLDashDropdownElement;
        "dash-event-calendar-month": HTMLDashEventCalendarMonthElement;
        "dash-fab": HTMLDashFabElement;
        "dash-filter": HTMLDashFilterElement;
        "dash-focus-trap": HTMLDashFocusTrapElement;
        "dash-grid": HTMLDashGridElement;
        "dash-icon": HTMLDashIconElement;
        "dash-icon-button": HTMLDashIconButtonElement;
        "dash-inline-edit": HTMLDashInlineEditElement;
        "dash-input": HTMLDashInputElement;
        "dash-label": HTMLDashLabelElement;
        "dash-list": HTMLDashListElement;
        "dash-list-item": HTMLDashListItemElement;
        "dash-loader": HTMLDashLoaderElement;
        "dash-modal": HTMLDashModalElement;
        "dash-popover": HTMLDashPopoverElement;
        "dash-scrim": HTMLDashScrimElement;
        "dash-section": HTMLDashSectionElement;
        "dash-shell": HTMLDashShellElement;
        "dash-side-bar": HTMLDashSideBarElement;
        "dash-sidebar-button": HTMLDashSidebarButtonElement;
        "dash-theme-toggle": HTMLDashThemeToggleElement;
        "dash-toggle-switch": HTMLDashToggleSwitchElement;
        "dash-tooltip": HTMLDashTooltipElement;
    }
}
declare namespace LocalJSX {
    interface DashButton {
        "appearance"?: Appearance;
        "disabled"?: boolean;
        "scale"?: Scale;
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
        "selectedColor"?: Color;
    }
    interface DashColorSwatch {
        "color"?: Color | string;
        "scale"?: Scale;
        "selected"?: boolean;
    }
    interface DashConfirmButton {
        "icon"?: string;
        "onDashConfirmButtonConfirmed"?: (event: DashConfirmButtonCustomEvent<any>) => void;
        "scale"?: Scale;
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
    interface DashEventCalendarMonth {
    }
    interface DashFab {
        "icon"?: string;
        "scale"?: ScaleExtended;
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
        "scale"?: ScaleExtended;
        "width"?: number;
    }
    interface DashIconButton {
        "disabled"?: boolean;
        "icon"?: string;
        "iconUrl"?: string;
        "loading"?: boolean;
        "rounded"?: boolean;
        "scale"?: ScaleExtended;
        "tooltipPlacement"?: Placement;
        "tooltipText"?: string;
        "type"?: string;
    }
    interface DashInlineEdit {
        "disabled"?: boolean;
        "onDashInlineEditValueChanged"?: (event: DashInlineEditCustomEvent<string>) => void;
        "scale"?: Scale;
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
        "for"?: string;
        "layout"?: LabelLayout;
    }
    interface DashList {
        "scale"?: Scale;
        "selectionMode"?: SelectionMode;
    }
    interface DashListItem {
        "disabled"?: boolean;
        "onDashListItemMoveNext"?: (event: DashListItemCustomEvent<HTMLDashListItemElement>) => void;
        "onDashListItemMovePrevious"?: (event: DashListItemCustomEvent<HTMLDashListItemElement>) => void;
        "onDashListItemSelectedChanged"?: (event: DashListItemCustomEvent<boolean>) => void;
        "scale"?: Scale;
        "selected"?: boolean;
        "selectionMode"?: SelectionMode1;
    }
    interface DashLoader {
        "scale"?: Scale;
    }
    interface DashModal {
        "autoFocus"?: boolean;
        "disableFullscreenMobileView"?: boolean;
        "fullscreen"?: boolean;
        "heading"?: string;
        "hideCloseButton"?: boolean;
        "onDashModalBeforeClose"?: (event: DashModalCustomEvent<any>) => void;
        "onDashModalClosed"?: (event: DashModalCustomEvent<any>) => void;
        "scale"?: Scale;
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
    interface DashThemeToggle {
        "theme"?: Theme;
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
        "dash-button": DashButton;
        "dash-chip": DashChip;
        "dash-color-picker": DashColorPicker;
        "dash-color-swatch": DashColorSwatch;
        "dash-confirm-button": DashConfirmButton;
        "dash-drill-menu": DashDrillMenu;
        "dash-dropdown": DashDropdown;
        "dash-event-calendar-month": DashEventCalendarMonth;
        "dash-fab": DashFab;
        "dash-filter": DashFilter;
        "dash-focus-trap": DashFocusTrap;
        "dash-grid": DashGrid;
        "dash-icon": DashIcon;
        "dash-icon-button": DashIconButton;
        "dash-inline-edit": DashInlineEdit;
        "dash-input": DashInput;
        "dash-label": DashLabel;
        "dash-list": DashList;
        "dash-list-item": DashListItem;
        "dash-loader": DashLoader;
        "dash-modal": DashModal;
        "dash-popover": DashPopover;
        "dash-scrim": DashScrim;
        "dash-section": DashSection;
        "dash-shell": DashShell;
        "dash-side-bar": DashSideBar;
        "dash-sidebar-button": DashSidebarButton;
        "dash-theme-toggle": DashThemeToggle;
        "dash-toggle-switch": DashToggleSwitch;
        "dash-tooltip": DashTooltip;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "dash-button": LocalJSX.DashButton & JSXBase.HTMLAttributes<HTMLDashButtonElement>;
            "dash-chip": LocalJSX.DashChip & JSXBase.HTMLAttributes<HTMLDashChipElement>;
            "dash-color-picker": LocalJSX.DashColorPicker & JSXBase.HTMLAttributes<HTMLDashColorPickerElement>;
            "dash-color-swatch": LocalJSX.DashColorSwatch & JSXBase.HTMLAttributes<HTMLDashColorSwatchElement>;
            "dash-confirm-button": LocalJSX.DashConfirmButton & JSXBase.HTMLAttributes<HTMLDashConfirmButtonElement>;
            "dash-drill-menu": LocalJSX.DashDrillMenu & JSXBase.HTMLAttributes<HTMLDashDrillMenuElement>;
            "dash-dropdown": LocalJSX.DashDropdown & JSXBase.HTMLAttributes<HTMLDashDropdownElement>;
            "dash-event-calendar-month": LocalJSX.DashEventCalendarMonth & JSXBase.HTMLAttributes<HTMLDashEventCalendarMonthElement>;
            "dash-fab": LocalJSX.DashFab & JSXBase.HTMLAttributes<HTMLDashFabElement>;
            "dash-filter": LocalJSX.DashFilter & JSXBase.HTMLAttributes<HTMLDashFilterElement>;
            "dash-focus-trap": LocalJSX.DashFocusTrap & JSXBase.HTMLAttributes<HTMLDashFocusTrapElement>;
            "dash-grid": LocalJSX.DashGrid & JSXBase.HTMLAttributes<HTMLDashGridElement>;
            "dash-icon": LocalJSX.DashIcon & JSXBase.HTMLAttributes<HTMLDashIconElement>;
            "dash-icon-button": LocalJSX.DashIconButton & JSXBase.HTMLAttributes<HTMLDashIconButtonElement>;
            "dash-inline-edit": LocalJSX.DashInlineEdit & JSXBase.HTMLAttributes<HTMLDashInlineEditElement>;
            "dash-input": LocalJSX.DashInput & JSXBase.HTMLAttributes<HTMLDashInputElement>;
            "dash-label": LocalJSX.DashLabel & JSXBase.HTMLAttributes<HTMLDashLabelElement>;
            "dash-list": LocalJSX.DashList & JSXBase.HTMLAttributes<HTMLDashListElement>;
            "dash-list-item": LocalJSX.DashListItem & JSXBase.HTMLAttributes<HTMLDashListItemElement>;
            "dash-loader": LocalJSX.DashLoader & JSXBase.HTMLAttributes<HTMLDashLoaderElement>;
            "dash-modal": LocalJSX.DashModal & JSXBase.HTMLAttributes<HTMLDashModalElement>;
            "dash-popover": LocalJSX.DashPopover & JSXBase.HTMLAttributes<HTMLDashPopoverElement>;
            "dash-scrim": LocalJSX.DashScrim & JSXBase.HTMLAttributes<HTMLDashScrimElement>;
            "dash-section": LocalJSX.DashSection & JSXBase.HTMLAttributes<HTMLDashSectionElement>;
            "dash-shell": LocalJSX.DashShell & JSXBase.HTMLAttributes<HTMLDashShellElement>;
            "dash-side-bar": LocalJSX.DashSideBar & JSXBase.HTMLAttributes<HTMLDashSideBarElement>;
            "dash-sidebar-button": LocalJSX.DashSidebarButton & JSXBase.HTMLAttributes<HTMLDashSidebarButtonElement>;
            "dash-theme-toggle": LocalJSX.DashThemeToggle & JSXBase.HTMLAttributes<HTMLDashThemeToggleElement>;
            "dash-toggle-switch": LocalJSX.DashToggleSwitch & JSXBase.HTMLAttributes<HTMLDashToggleSwitchElement>;
            "dash-tooltip": LocalJSX.DashTooltip & JSXBase.HTMLAttributes<HTMLDashTooltipElement>;
        }
    }
}
