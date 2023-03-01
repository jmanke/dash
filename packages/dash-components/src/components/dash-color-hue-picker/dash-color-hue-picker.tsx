import { spaceConcat } from '@didyoumeantoast/dash-utils';
import { Component, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';

const Slider = {
  width: 20,
  offset: -20 / 2,
  borderWidth: 2,
};

@Component({
  tag: 'dash-color-hue-picker',
  styleUrl: 'dash-color-hue-picker.css',
  shadow: true,
})
export class DashColorHuePicker {
  //#region Own properties

  colorGradient: HTMLCanvasElement;

  get sliderPosition() {
    return (this.hue / 360) * this.width + Slider.offset;
  }

  //#endregion

  //#region @Element

  @Element() element: HTMLDashColorHuePickerElement;

  //#endregion

  //#region @State

  /**
   * Handler for slider drag event
   */
  @State() sliderDragHandler: (event: MouseEvent) => void;

  /**
   * Whether the slider is currently being dragged
   */
  @State() isDragging: boolean = false;

  //#endregion

  //#region @Prop

  /**
   * Hue value from [0, 360]
   * @default 0
   */
  @Prop({ reflect: true, mutable: true }) hue: number = 0;

  /**
   * Width of hue picker (in pixels)
   * @default 200
   */
  @Prop({ reflect: true }) width: number = 200;

  //#endregion

  //#region @Event

  /**
   * Emitted when hue has been changed
   */
  @Event({ eventName: 'dashColorHuePickerHueChanged' }) hueChanged: EventEmitter<void>;

  //#endregion

  //#region Component lifecycle
  componentDidLoad() {
    const colorGradient = this.element.shadowRoot.querySelector('canvas.gradient') as HTMLCanvasElement;
    colorGradient.width = this.width;
    colorGradient.height = 10;
    this.createHueColorRamp(colorGradient);
    this.colorGradient = colorGradient;
  }

  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  createHueColorRamp(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);

    //Color Stops
    for (let i = 0; i < 7; i++) {
      gradient.addColorStop(i / 6, `hsl(${i * 60}, 100%, 50%)`);
    }

    //Fill it
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  /**
   * Handles the pointer event of the slider
   * @param event Pointer event
   */
  pointerInput(event: PointerEvent) {
    const relativeX = Math.min(Math.max(event.clientX - this.colorGradient.getBoundingClientRect().left, 0), this.width);
    this.hue = Math.round((relativeX / this.width) * 360);
    this.hueChanged.emit();
  }

  /**
   * Starts the drag the slider
   */
  startSliderDrag(event: PointerEvent) {
    this.pointerInput(event);
    this.sliderDragHandler = (e: PointerEvent) => {
      this.pointerInput(e);
      if (!this.isDragging) {
        this.isDragging = true;
      }
    };
    window.addEventListener('pointermove', this.sliderDragHandler);
    window.addEventListener(
      'pointerup',
      () => {
        window.removeEventListener('pointermove', this.sliderDragHandler);
        this.sliderDragHandler = null;
        this.isDragging = false;
      },
      { once: true },
    );
  }

  /**
   * Handles keyboard events
   * @param event Keyboard event
   */
  keydown(event: KeyboardEvent) {
    const delta = event.shiftKey ? 10 : 1;
    let newHue = 0;

    switch (event.key) {
      case 'ArrowLeft':
        newHue = this.hue - delta;
        break;
      case 'ArrowRight':
        newHue = this.hue + delta;
        break;
      default:
        return;
    }

    newHue = Math.min(Math.max(newHue, 0), 360);
    if (newHue === this.hue) {
      return;
    }

    this.hue = newHue;
    this.hueChanged.emit();
  }

  //#endregion

  render() {
    return (
      <Host>
        <div class='color-hue-picker' style={{ width: `${this.width}px` }} tabindex='0' onKeyDown={this.keydown.bind(this)} onPointerDown={this.startSliderDrag.bind(this)}>
          <canvas class='gradient'></canvas>
          <div class={spaceConcat('slider', this.isDragging ? 'dragging' : null)} style={{ backgroundColor: `hsl(${this.hue}, 100%, 50%`, left: `${this.sliderPosition}px` }}></div>
        </div>
      </Host>
    );
  }
}
