import { Component, Element, Event, EventEmitter, h, Method, Prop, State, Watch } from '@stencil/core';
import { isEmpty } from 'lodash';
import { Focusable } from '../../../interfaces/focusable';
import { Scale } from '../../../types/types';

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
  @Element()
  element: HTMLDashFilterElement;
  //#endregion

  //#region @State
  @State()
  filterValue?: string;
  @Watch('filterValue')
  filterValueChanged() {
    this.dashFilterValueChanged.emit(this.filterValue);
    this.filterItems();
  }

  @State()
  filteredItems: {}[] | string[] = [];
  @Watch('filteredItems')
  filteredItemsChanged(filteredItems: {}[], previousFilteredItems: {}[]) {
    // make sure filtered items changed before emitting event
    const itemsDifferent = () => {
      if (filteredItems.length !== previousFilteredItems.length) {
        return true;
      }

      for (let i = 0; i < filteredItems.length; i++) {
        if (filteredItems[i] !== previousFilteredItems[i]) {
          return true;
        }
      }

      return false;
    };

    if (itemsDifferent()) {
      this.dashFilterFilteredItems.emit(filteredItems);
    }
  }
  //#endregion

  //#region @Prop
  @Prop({
    reflect: true,
  })
  placeholder?: string = 'Filter';

  @Prop({
    reflect: true,
  })
  scale: Scale = 'm';

  @Prop()
  items: {}[] | string[];
  @Watch('items')
  itemsChanged() {
    this.filterItems();
  }

  // can support up two two levels of nesting. For example, 'state.title' is valid
  @Prop()
  objKey: string;

  @Prop()
  debounce: number = 250;
  //#endregion

  //#region @Event
  @Event({
    eventName: 'dashFilterFilteredItems',
  })
  dashFilterFilteredItems: EventEmitter<object[]>;

  @Event({
    eventName: 'dashFilterValueChanged',
  })
  dashFilterValueChanged: EventEmitter<string>;

  @Event({
    eventName: 'dashFilterSubmit',
  })
  dashFilterSubmit: EventEmitter<string>;
  //#endregion

  //#region Component lifecycle
  componentWillLoad() {
    this.filterItems();
  }
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  @Method()
  async setFocus() {
    this.inputElement.setFocus();
  }

  @Method()
  async select() {
    this.inputElement.select();
  }

  @Method()
  async clear() {
    this.filterValue = '';
  }
  //#endregion

  //#region Local methods
  filterItems() {
    const value = this.filterValue;

    if (isEmpty(this.items) || isEmpty(value)) {
      this.filteredItems = this.items || [];
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
          value = item[objKeyArr[0]] as string;
        } else {
          value = item[objKeyArr[0]][objKeyArr[1]] as string;
        }
      } else {
        value = item as string;
      }

      return value?.match(regex);
    });
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
        onDashInputInput={e => (this.filterValue = e.detail?.trim())}
        onDashInputSubmit={() => this.dashFilterSubmit.emit(this.filterValue)}
        debounce={this.debounce}
      ></dash-input>
    );
  }
}
