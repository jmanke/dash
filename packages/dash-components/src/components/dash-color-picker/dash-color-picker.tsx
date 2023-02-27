import { Component, Element, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';
import { Color } from '../../types';

type HSV = [number, number, number];
type RGB = [number, number, number];

const CanvasSize = {
  width: 250,
  height: 125,
};

const ColorSelector = {
  width: 20,
  height: 20,
};

@Component({
  tag: 'dash-color-picker',
  styleUrl: 'dash-color-picker.css',
  shadow: true,
})
export class DashColorPicker {
  //#region Own properties

  canvas: HTMLCanvasElement;

  //#endregion

  //#region @Element

  @Element() element: HTMLDashColorPickerElement;

  //#endregion

  //#region @State

  @State() hsv: HSV = [360, 100, 100];
  @Watch('hsv')
  hsvChanged(hsv: HSV, prevHsv: HSV) {
    if (hsv[0] !== prevHsv[0]) {
      this.createColorGradient(hsv[0]);
    }

    this.rgb = this.hsvToRgb(hsv);
  }

  @State()
  rgb: RGB = [360, 100, 50];

  //#endregion

  //#region @Prop

  /**
   * Colors to pick from
   * @required
   */
  @Prop({ reflect: true }) colors: Color[] = [];

  /**
   * Currently selected color
   * @optional
   */
  @Prop({ reflect: true, mutable: true }) color: Color;

  /**
   * Number of columns to display for colors - ex. 3 cols means colors will be split among 3 columns
   * @default colors.length
   */
  @Prop({ reflect: true }) cols: number;

  /**
   * Currently selected color
   * @optional
   */
  @Prop({ mutable: true, reflect: true }) selectedColor: string;

  //#endregion

  //#region @Event

  /**
   * Emitted when color has been selected
   */
  @Event({ eventName: 'dashColorPickerColorChanged' })
  dashColorPickerColorChanged: EventEmitter<void>;

  //#endregion

  //#region Component lifecycle

  componentDidLoad() {
    this.canvas = this.element.shadowRoot.querySelector('canvas.rgba-gradient') as HTMLCanvasElement;
    this.canvas.width = CanvasSize.width;
    this.canvas.height = CanvasSize.height;
    this.createColorGradient(this.hsv[0]);
    this.rgb = this.hsvToRgb(this.hsv);
  }

  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  /**
   * Creates a gradient color
   * @param canvas Canvas to draw on
   * @param color rgb color values
   */
  createColorGradient(hue: number) {
    // Clear the canvas
    const canvas = this.canvas;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create a Gradient Color (colors change on the width)
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 0)`);
    gradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 1)`);

    // Fill the canvas with the gradient color
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Create another gradient color, but this time change the color on the height
    gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'hsla(0, 0%, 100%, 0)');
    gradient.addColorStop(1, 'hsla(0, 0%, 0%, 1)');

    // Fill the canvas with the second gradient color
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  /**
   * Selects a new color
   * @param color Color to set
   */
  setColor(color: Color) {
    this.color = color;
    this.dashColorPickerColorChanged.emit();
  }

  setHsv({ hue, saturation, value }: { hue?: number; saturation?: number; value?: number }) {
    this.hsv = [hue ?? this.hsv[0], saturation ?? this.hsv[1], value ?? this.hsv[2]];
  }

  hsvToRgb([h, s, v]: HSV): RGB {
    const c = (v / 100) * (s / 100);
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v / 100 - c;

    let r = 0;
    let g = 0;
    let b = 0;

    if (h >= 0 && h < 60) {
      r = c;
      g = x;
    } else if (h >= 60 && h < 120) {
      r = x;
      g = c;
    } else if (h >= 120 && h < 180) {
      g = c;
      b = x;
    } else if (h >= 180 && h < 240) {
      g = x;
      b = c;
    } else if (h >= 240 && h < 300) {
      r = x;
      b = c;
    } else if (h >= 300 && h < 360) {
      r = c;
      b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return [r, g, b];
  }

  canvasPointerInput(e: PointerEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const s = Math.round(Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1) * 100);
    const v = Math.round(Math.min(Math.max(1 - (e.clientY - rect.top) / rect.height, 0), 1) * 100);

    this.setHsv({ saturation: s, value: v });
  }

  canvasPointerDown(e: PointerEvent) {
    this.canvasPointerInput(e);
    const canvasPointerInput = this.canvasPointerInput.bind(this);
    window.addEventListener('pointermove', canvasPointerInput);
    window.addEventListener('pointerup', () => window.removeEventListener('pointermove', canvasPointerInput));
  }

  //#endregion

  render() {
    const colorSelectorLeft = (this.hsv[1] / 100) * CanvasSize.width - ColorSelector.width / 2;
    const colorSelectorTop = (1 - this.hsv[2] / 100) * CanvasSize.height - ColorSelector.height / 2;

    return (
      <Host>
        <div class='color-picker'>
          <div class='gradient-container'>
            <canvas class='rgba-gradient' onPointerDown={this.canvasPointerDown.bind(this)}></canvas>
            <div
              class='color-selector'
              style={{ left: `${colorSelectorLeft}px`, top: `${colorSelectorTop}px`, backgroundColor: `rgb(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]})` }}
            ></div>
          </div>
          <dash-color-hue-picker hue={this.hsv[0]} width={225} onDashColorHuePickerHueChanged={e => this.setHsv({ hue: e.target.hue })}></dash-color-hue-picker>

          <div>
            <span>H: {this.hsv[0]}, </span>
            <span>S: {this.hsv[1]}%, </span>
            <span>V: {this.hsv[2]}%, </span>
          </div>
        </div>
      </Host>
    );
  }
}
