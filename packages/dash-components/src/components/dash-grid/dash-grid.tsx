import { Component, Host, h, Prop, State } from '@stencil/core';
import { Breakpoint } from '../../global/constants';

type ColSize = 's' | 'm' | 'l' | 'xl';

@Component({
  tag: 'dash-grid',
  styleUrl: 'dash-grid.css',
  shadow: true,
})
export class DashGrid {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  @State()
  numCols: number;
  //#endregion

  //#region @Prop
  @Prop({
    reflect: true,
  })
  colS: number;

  @Prop({
    reflect: true,
  })
  colM: number;

  @Prop({
    reflect: true,
  })
  colL: number;

  @Prop({
    reflect: true,
  })
  colXl: number;
  //#endregion

  //#region @Event
  //#endregion

  //#region Component lifecycle
  componentWillLoad() {
    this.addMediaListener(`(max-width: ${Breakpoint.small}px)`, 's');
    this.addMediaListener(`(min-width: ${Breakpoint.small}px)`, 'm');
    this.addMediaListener(`(max-width: ${Breakpoint.medium}px)`, 'm');
    this.addMediaListener(`(min-width: ${Breakpoint.medium}px)`, 'l');
    this.addMediaListener(`(max-width: ${Breakpoint.large}px)`, 'l');
    this.addMediaListener(`(min-width: ${Breakpoint.large}px)`, 'xl');

    // set the initial grid size
    const width = window.innerWidth;
    let size: ColSize;
    if (width < Breakpoint.small) {
      size = 's';
    } else if (width < Breakpoint.medium) {
      size = 'm';
    } else if (width < Breakpoint.large) {
      size = 'l';
    } else {
      size = 'xl';
    }

    this.numCols = this.getCols(size);
  }
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  getCols(size: ColSize) {
    switch (size) {
      case 's':
        return this.colS;
      case 'm':
        return this.colM;
      case 'l':
        return this.colL;
      case 'xl':
        return this.colXl;
    }
  }

  addMediaListener(mediaStr: string, size: ColSize) {
    const matchMedia = window.matchMedia(mediaStr);
    matchMedia.onchange = e => this.setMedia(e, size);
  }

  setMedia(mediaQueryList: MediaQueryListEvent | MediaQueryList, size: ColSize) {
    if (mediaQueryList.matches) {
      this.numCols = this.getCols(size);
    }
  }
  //#endregion

  render() {
    return (
      <Host style={{ 'grid-template-columns': `repeat(${this.numCols}, minmax(0, 1fr))` }}>
        <slot></slot>
      </Host>
    );
  }
}
