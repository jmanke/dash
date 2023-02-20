import { Component, Element, Event, EventEmitter, h, Method, Prop, State, Watch } from '@stencil/core';
import { isEmpty } from 'lodash';
import { Focusable } from '../../interfaces/focusable';
import { Scale } from '../../types/types';

@Component({
  tag: 'dash-filter',
  styleUrl: 'dash-filter.css',
  shadow: true,
})
export class DashFilter implements Focusable {
  //#region Own properties

  inputElement: HTMLDashInputElement;

  //#endregion

  //#region @Element

  @Element() element: HTMLDashFilterElement;

  //#endregion

  //#region @State

  /**
   * Items that match the current filter value
   */
  @State() filteredItems: Record<any, any>[] = [];
  //#endregion

  //#region @Prop

  /**
   * Value to filter items by
   * @optional
   */
  @Prop({ reflect: true, mutable: true }) filterValue?: string;
  @Watch('filterValue')
  filterValueChanged() {
    this.filterItems();
  }

  /**
   * Placeholder text for input
   * @default 'Filter''
   */
  @Prop({ reflect: true }) placeholder?: string = 'Filter';

  /**
   * Size of the filter input
   * @default 'm'
   */
  @Prop({ reflect: true }) scale: Scale = 'm';

  /**
   * Items to filter
   * @required
   */
  @Prop() items: {}[] | string[];
  @Watch('items')
  itemsChanged() {
    this.filterItems(false);
  }

  /**
   * Key to filter items by. Supports up two two levels of nesting. For example, 'state.title' is valid
   * @optional
   */
  @Prop({ reflect: true }) objKey: string;

  /**
   * Debounces input in milliseconds
   * @default 250
   */
  @Prop({ reflect: true }) debounce: number = 250;

  //#endregion

  //#region @Event

  /**
   * Emitted when filtered items change
   */
  @Event({ eventName: 'dashFilterFilteredItems' }) itemsFiltered: EventEmitter<object[]>;

  /**
   * Emitted when filtered value changes
   */
  @Event({ eventName: 'dashFilterValueChanged' }) dashFilterValueChanged: EventEmitter<void>;

  /**
   * Emitted when user submits filter input
   */
  @Event({ eventName: 'dashFilterSubmit' }) dashFilterSubmit: EventEmitter<void>;

  //#endregion

  //#region Component lifecycle

  componentWillLoad() {
    this.filterItems();
  }

  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method

  /**
   * Sets focus on this element
   */
  @Method()
  async setFocus() {
    this.inputElement.setFocus();
  }

  /**
   * Selects text in filter input
   */
  @Method()
  async select() {
    this.inputElement.select();
  }

  /**
   * Clears filter value
   */
  @Method()
  async clear() {
    this.updateFilterValue('');
  }

  //#endregion

  //#region Local methods

  /**
   * Updates the filterValue property
   * @param value - filterValue value
   */
  updateFilterValue(value: string) {
    this.filterValue = value;
    this.dashFilterValueChanged.emit();
  }

  /**
   * Filters items based on the filter value
   */
  filterItems(emitEvent: boolean = true) {
    const value = this.filterValue;
    const emitFilteredItemsEvent = () => {
      if (emitEvent) {
        this.itemsFiltered.emit(this.filteredItems);
      }
    };

    if (isEmpty(this.items) || isEmpty(value)) {
      this.filteredItems = this.items || [];
      emitFilteredItemsEvent();
      return;
    }

    const regex = new RegExp(value, 'i');
    const objKeyArr = this.objKey?.split('.') ?? [];
    this.filteredItems = this.items.filter(item => {
      let value: string;
      if (typeof item === 'object') {
        if (objKeyArr.length === 0) {
          return false;
        } else if (objKeyArr.length === 1) {
          // @ts-ignore
          value = item[objKeyArr[0]] as string;
        } else {
          // @ts-ignore
          value = item[objKeyArr[0]][objKeyArr[1]] as string;
        }
      } else {
        value = item as string;
      }

      return value?.match(regex);
    });
    emitFilteredItemsEvent();
  }

  //#endregion

  render() {
    return (
      <dash-input
        ref={e => (this.inputElement = e)}
        value={this.filterValue}
        placeholder={this.placeholder}
        icon='search'
        scale={this.scale}
        clearable
        onDashInputInput={e => this.updateFilterValue(e.target.value?.trim())}
        onDashInputSubmit={() => this.dashFilterSubmit.emit()}
        debounce={this.debounce}
      ></dash-input>
    );
  }
}
