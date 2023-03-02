import { Component, Element, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';
import colorConvert from 'color-convert';

type HSV = [number, number, number];
type RGB = [number, number, number];
type ColorMode = 'rgb' | 'hsv' | 'hex';

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

  /** Color mode */
  @State() colorMode: ColorMode = 'rgb';

  //#endregion

  //#region @Prop

  /**
   * HSV color values
   * @default [0, 0, 100]
   */
  @Prop({ mutable: true }) hsv: HSV = [0, 0, 100];
  @Watch('hsv')
  hsvChanged(hsv: HSV, prevHsv: HSV) {
    if (hsv[0] !== prevHsv?.[0]) {
      this.createColorGradient(hsv[0]);
    }
  }

  /**
   * RGB color values
   * @default [255, 255, 255]
   */
  @Prop({ mutable: true }) rgb: RGB = [255, 255, 255];

  /**
   *  Hex color value
   * @default #FFFFFF
   */
  @Prop({ mutable: true }) hex: string = '#FFFFFF';

  @Prop({ reflect: true }) defaultColors: string[] = [];

  //#endregion

  //#region @Event

  /**
   * Emitted when color has been selected
   */
  @Event({ eventName: 'dashColorPickerColorChanged' })
  colorChanged: EventEmitter<void>;

  //#endregion

  //#region Component lifecycle

  componentWillLoad() {
    this.createColorGradient(this.hsv[0]);
  }

  componentDidLoad() {
    this.canvas = this.element.shadowRoot.querySelector('canvas.rgba-gradient') as HTMLCanvasElement;
    this.canvas.width = CanvasSize.width;
    this.canvas.height = CanvasSize.height;
    this.createColorGradient(this.hsv[0]);
  }

  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  /**
   * Sets hsv color values
   * @param hsv hsv color values
   */
  setHsv(hsv: HSV) {
    this.hsv = hsv;
    this.rgb = colorConvert.hsv.rgb(hsv);
    this.hex = '#' + colorConvert.hsv.hex(hsv);
  }

  /**
   * Sets hex color value
   * @param hex Hex color value
   */
  setHex(hex: string) {
    this.hex = hex;
    this.hsv = colorConvert.hex.hsv(hex);
    this.rgb = colorConvert.hex.rgb(hex);
  }

  /**
   * Sets rgb color values
   * @param rgb rgb color values
   */
  setRgb(rgb: RGB) {
    this.rgb = rgb;
    this.hsv = colorConvert.rgb.hsv(rgb);
    this.hex = '#' + colorConvert.rgb.hex(rgb);
  }

  /**
   * Creates a gradient color
   * @param canvas Canvas to draw on
   * @param color rgb color values
   */
  createColorGradient(hue: number) {
    // Clear the canvas
    const canvas = this.canvas;

    if (!canvas) {
      return;
    }

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

  canvasPointerInput(e: PointerEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const s = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1) * 100;
    const v = Math.min(Math.max(1 - (e.clientY - rect.top) / rect.height, 0), 1) * 100;

    this.setHsv([this.hsv[0], s, v]);
    this.colorChanged.emit();
  }

  canvasPointerDown(e: PointerEvent) {
    this.canvasPointerInput(e);
    const canvasPointerInput = this.canvasPointerInput.bind(this);
    window.addEventListener('pointermove', canvasPointerInput);
    window.addEventListener('pointerup', () => window.removeEventListener('pointermove', canvasPointerInput));
  }

  cycleColorMode() {
    const modes: ColorMode[] = ['rgb', 'hsv', 'hex'];
    const index = modes.indexOf(this.colorMode);
    this.colorMode = modes[(index + 1) % modes.length];
  }

  hexInputSubmit(e: Event) {
    const hex = (e.target as HTMLDashInputElement).value;
    const isValidHex = /^#([0-9A-F]{3}){1,2}$/i.test(hex);

    if (!isValidHex) {
      (e.target as HTMLDashInputElement).value = this.hex;
      return;
    }

    this.setHex(hex);
    this.colorChanged.emit();
  }

  rgbInputChange(index: number, e: Event) {
    const value = Number((e.target as HTMLDashInputElement).value);
    if (isNaN(value) || value < 0 || value > 255) {
      return;
    }

    const rgb: RGB = [...this.rgb];
    rgb[index] = value;
    this.setRgb(rgb);
    this.colorChanged.emit();
  }

  rgbInputBlur(index: number, e: Event) {
    const value = Number((e.target as HTMLDashInputElement).value);
    if (value !== this.rgb[index]) {
      (e.target as HTMLDashInputElement).value = this.rgb[index].toString();
    }
  }

  hsvInputChange(index: number, e: Event) {
    const value = Number((e.target as HTMLDashInputElement).value);
    if (isNaN(value) || value < 0 || value > (index === 0 ? 360 : 100)) {
      return;
    }

    const hsv: HSV = [...this.hsv];
    hsv[index] = value;
    this.setHsv(hsv);
  }

  hsvInputBlur(index: number, e: Event) {
    const value = Number((e.target as HTMLDashInputElement).value);
    if (value !== this.rgb[index]) {
      (e.target as HTMLDashInputElement).value = this.hsv[index].toString();
    }
  }

  defaultColorSelected(hex: string) {
    this.setHex(hex);
    this.colorChanged.emit();
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

          <div class='row'>
            <div class='hue-container'>
              <div class='selected-color' style={{ backgroundColor: `${this.hex}` }}></div>
              <dash-color-hue-picker
                hue={this.hsv[0]}
                width={170}
                onDashColorHuePickerHueChanged={e => this.setHsv([e.target.hue, this.hsv[1], this.hsv[2]])}
              ></dash-color-hue-picker>
            </div>
          </div>

          <div class='row'>
            <div class='input-container'>
              <dash-button scale='s' onClick={this.cycleColorMode.bind(this)}>
                {this.colorMode.toUpperCase()}
              </dash-button>
              {this.colorMode === 'rgb' && [
                <dash-input scale='s' value={this.rgb[0].toFixed()} onDashInputInput={this.rgbInputChange.bind(this, 0)} onBlur={this.rgbInputBlur.bind(this, 0)}></dash-input>,
                <dash-input scale='s' value={this.rgb[1].toFixed()} onDashInputInput={this.rgbInputChange.bind(this, 1)} onBlur={this.rgbInputBlur.bind(this, 1)}></dash-input>,
                <dash-input scale='s' value={this.rgb[2].toFixed()} onDashInputInput={this.rgbInputChange.bind(this, 2)} onBlur={this.rgbInputBlur.bind(this, 2)}></dash-input>,
              ]}
              {this.colorMode === 'hsv' && [
                <dash-input scale='s' value={this.hsv[0].toString()} onDashInputInput={this.hsvInputChange.bind(this, 0)} onBlur={this.hsvInputBlur.bind(this, 0)}></dash-input>,
                <dash-input scale='s' value={this.hsv[1].toFixed()} onDashInputInput={this.hsvInputChange.bind(this, 1)} onBlur={this.hsvInputBlur.bind(this, 1)}></dash-input>,
                <dash-input scale='s' value={this.hsv[2].toFixed()} onDashInputInput={this.hsvInputChange.bind(this, 2)} onBlur={this.hsvInputBlur.bind(this, 2)}></dash-input>,
              ]}
              {this.colorMode === 'hex' && [
                <dash-input scale='s' value={this.hex} onDashInputSubmit={this.hexInputSubmit.bind(this)} onBlur={this.hexInputSubmit.bind(this)}></dash-input>,
              ]}
            </div>
          </div>

          {!!this.defaultColors?.length && (
            <div class='row'>
              <div class='separator'></div>

              <div class='storage-color-container'>
                {this.defaultColors.map(color => (
                  <dash-color-swatch color={color} scale='m' selected={this.hex === color} onClick={() => this.defaultColorSelected(color)}></dash-color-swatch>
                ))}
              </div>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
