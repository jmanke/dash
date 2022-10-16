import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'dashbook-resize-container',
  styleUrl: 'dashbook-resize-container.css',
  shadow: true,
})
export class DashbookResizeContainer {
  //#region Own properties
  resizeCb: () => void;
  //#endregion

  //#region @Element
  //#endregion

  //#region @State

  /**
   * Current width of the container in px
   */
  @State()
  width: string;

  //#endregion

  //#region @Prop

  /**
   * The max width of the container
   */
  @Prop()
  maxWidth: number = 500;

  /**
   * The min width of the container
   */
  @Prop()
  minWidth: number = 100;

  /**
   * Starting width of the container. Default is 250px
   */
  @Prop()
  startingWidth: number;

  //#endregion

  //#region @Event
  //#endregion

  //#region Component lifecycle

  componentWillLoad() {
    this.width = this.startingWidth ? `${this.startingWidth}px` : '250px';
  }

  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  /**
   * @Private
   * @param e mousemove event
   * Resizes the container
   */
  resize(e: MouseEvent) {
    let size = e.x;
    if (size > this.maxWidth) {
      size = this.maxWidth;
    } else if (size < this.minWidth) {
      size = this.minWidth;
    }

    this.width = `${size}px`;
  }

  /**
   * @Private
   * Start resizing the container
   */
  startResize() {
    this.resizeCb = this.resize.bind(this);
    document.addEventListener('mousemove', this.resizeCb, false);
    document.addEventListener(
      'mouseup',
      () => {
        document.removeEventListener('mousemove', this.resizeCb);
        this.resizeCb = null;
      },
      { once: true },
    );
  }

  //#endregion

  render() {
    return (
      <div class="wrapper">
        <div class="container">
          <div class="content" style={{ flexBasis: this.width }}>
            <slot></slot>
          </div>
          <div class="resizer" onMouseDown={this.startResize.bind(this)}></div>
        </div>
      </div>
    );
  }
}
