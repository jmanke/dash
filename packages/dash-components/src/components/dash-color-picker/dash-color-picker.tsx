import { Component, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { Color } from '../../types';

type Rgb = [number, number, number];

const ColorRampStops = [
  { color: [255, 0, 0], stop: 0 },
  { color: [255, 0, 255], stop: 0.15 },
  { color: [0, 0, 255], stop: 0.33 },
  { color: [0, 255, 255], stop: 0.49 },
  { color: [0, 255, 0], stop: 0.67 },
  { color: [255, 255, 0], stop: 0.84 },
  { color: [255, 0, 0], stop: 1 },
];

@Component({
  tag: 'dash-color-picker',
  styleUrl: 'dash-color-picker.css',
  shadow: true,
})
export class DashColorPicker {
  //#region Own properties
  //#endregion

  //#region @Element

  @Element() element: HTMLDashColorPickerElement;

  //#endregion

  //#region @State

  @State() rampColor: Rgb = [0, 255, 0];

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
    const rgbaGradient = this.element.shadowRoot.querySelector('canvas.rgba-gradient') as HTMLCanvasElement;
    rgbaGradient.width = 250;
    rgbaGradient.height = 150;
    this.createRgbaColorGradient(rgbaGradient, this.rampColor);

    const rgbGradient = this.element.shadowRoot.querySelector('canvas.rgb-gradient') as HTMLCanvasElement;
    rgbGradient.width = 250;
    rgbGradient.height = 16;
    this.createRgbColorRamp(rgbGradient);
  }

  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  interpolateColors(color1: Rgb, color2: Rgb, factor: number) {
    const result = [...color1];
    for (let i = 0; i < 3; i++) {
      result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
  }

  /**
   * Creates a gradient color based on the rgba values
   * @param canvas Canvas to draw on
   * @param color rgb color values
   */
  createRgbaColorGradient(canvas: HTMLCanvasElement, color: Rgb) {
    // Clear the canvas
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create a Gradient Color (colors change on the width)
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);
    gradient.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`);

    // Fill the canvas with the gradient color
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Create another gradient color, but this time change the color on the height
    gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');

    // Fill the canvas with the second gradient color
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let pixel = ctx.getImageData(canvas.width - 1, 0, 1, 1).data;
    console.log(pixel);
  }

  createRgbColorRamp(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);

    //Color Stops
    ColorRampStops.forEach(colorStop => gradient.addColorStop(colorStop.stop, `rgb(${colorStop.color[0]}, ${colorStop.color[1]}, ${colorStop.color[2]})`));
    //Fill it
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    console.log(this.interpolateColors([255, 0, 255], [0, 0, 255], 0 / (0.33 - 0.15)));
  }

  /**
   * Selects a new color
   * @param color Color to set
   */
  setColor(color: Color) {
    this.color = color;
    this.dashColorPickerColorChanged.emit();
  }

  //#endregion

  render() {
    return (
      <Host>
        <div>
          <canvas class='rgba-gradient'></canvas>
        </div>

        <div class='color-gradient'>
          <canvas class='rgb-gradient'></canvas>
          <div class='slider' style={{ backgroundColor: `rgb(${this.rampColor[0]}, ${this.rampColor[1]}, ${this.rampColor[2]}` }}></div>
        </div>
      </Host>

      // <div class='color-swatch-container' style={{ 'grid-template-columns': `repeat(${this.cols ?? this.colors.length}, 1fr)` }}>
      //   {this.colors.map(color => (
      //     <dash-color-swatch color={color} onClick={this.setColor.bind(this, color)} scale='l' selected={this.color === color}></dash-color-swatch>
      //   ))}
      // </div>
    );
  }
}
