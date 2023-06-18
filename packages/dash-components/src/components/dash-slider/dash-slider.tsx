import { spaceConcat } from '@didyoumeantoast/dash-utils';
import { Component, Element, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';

const ControlWidth = '20px';

@Component({
  tag: 'dash-slider',
  styleUrl: 'dash-slider.css',
  shadow: true,
})
export class DashSlider {
  //#region Own properties

  backgroundElement: HTMLDivElement;

  //#endregion

  //#region @Element

  @Element() element: HTMLDashSliderElement;

  //#endregion

  //#region @State

  /**
   * Handler for slider drag event
   */
  @State() sliderDragHandler: (event: MouseEvent) => void;

  /**
   * Handles position of the slider control
   */
  @State() controlPosition = 0;

  //#endregion

  //#region @Prop

  /**
   * Value of the slider
   * @default 0
   */
  @Prop({ reflect: true, mutable: true }) value: number = 0;
  @Watch('value')
  valueChanged() {
    this.updateControlPosition();
  }

  /**
   * Minimum value of slider
   * @default 0
   */
  @Prop({ reflect: true }) min: number = 0;
  @Watch('min')
  minChanged() {
    this.updateControlPosition();
  }

  /**
   * Maximum value of slider
   * @default 100
   */
  @Prop({ reflect: true }) max: number = 100;
  @Watch('max')
  maxChanged() {
    this.updateControlPosition();
  }

  /**
   * Step value of slider
   * @default 1
   */
  @Prop({ reflect: true }) step?: number = 1;

  /**
   * When `true`, the slider labels for min, max are visible
   * @default false
   */
  @Prop({ reflect: true }) minMaxLabelsVisible?: boolean = false;

  /**
   * When `true`, the slider label for value are visible
   * @default false
   */
  @Prop({ reflect: true }) valueLabelVisible?: boolean = false;

  /**
   * If provided, min label will have a constant width
   * @default null
   */
  @Prop({ reflect: true }) minLabelWidth?: number;

  /**
   * If provided, max label will have a constant width
   * @default null
   */
  @Prop({ reflect: true }) maxLabelWidth?: number;

  //#endregion

  //#region @Event

  /**
   * Emitted when hue has been changed
   */
  @Event({ eventName: 'dashSliderValueChanged' }) valueChangedEvent: EventEmitter<void>;

  //#endregion

  //#region Component lifecycle

  componentWillLoad() {
    this.updateControlPosition();
  }

  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  /**
   * Updates the position of the slider control
   */
  updateControlPosition() {
    this.controlPosition = ((this.value - this.min) / (this.max - this.min)) * 100;
  }

  /**
   * Handles the pointer event of the slider
   * @param event Pointer event
   */
  pointerInput(event: PointerEvent) {
    if (!this.backgroundElement) {
      this.backgroundElement = this.element.shadowRoot.querySelector('.slider-background');
    }

    const rect = this.backgroundElement.getBoundingClientRect();
    const x = event.clientX - rect.left;

    const width = rect.width;
    let newValue = (x / width) * (this.max - this.min) + this.min;

    // ensure value only changes on step intervals if defined
    if (!!this.step) {
      const remainder = newValue % this.step;
      newValue += remainder < this.step / 2 ? -remainder : this.step - remainder;
    }

    newValue = Math.min(Math.max(newValue, this.min), this.max);

    if (newValue === this.value || isNaN(newValue)) {
      return;
    }

    this.value = newValue;
    this.valueChangedEvent.emit();
  }

  /**
   * Starts the drag the slider
   */
  startSliderDrag(event: PointerEvent) {
    this.pointerInput(event);
    if (this.sliderDragHandler) {
      window.removeEventListener('pointermove', this.sliderDragHandler);
      this.sliderDragHandler = null;
    }
    this.sliderDragHandler = (e: PointerEvent) => {
      this.pointerInput(e);
    };
    window.addEventListener('pointermove', this.sliderDragHandler);
    window.addEventListener(
      'pointerup',
      () => {
        window.removeEventListener('pointermove', this.sliderDragHandler);
        this.sliderDragHandler = null;
      },
      { once: true },
    );
  }

  /**
   * Handles keyboard events
   * @param event Keyboard event
   */
  keydown(event: KeyboardEvent) {
    const step = this.step || 1;
    const delta = event.shiftKey ? step * (((this.max - this.min) / 15) | 0) : step;
    let newValue = 0;

    switch (event.key) {
      case 'ArrowLeft':
        newValue = this.value - delta;
        event.stopPropagation();
        break;
      case 'ArrowRight':
        newValue = this.value + delta;
        event.stopPropagation();
        break;
      default:
        return;
    }

    newValue = Math.min(Math.max(newValue, this.min), this.max);
    if (newValue === this.value) {
      return;
    }

    this.value = newValue;
    this.valueChangedEvent.emit();
  }

  //#endregion

  render() {
    const controlPosition = `calc(${this.controlPosition}% - ${ControlWidth} / 2)`;

    return (
      <Host>
        <div class={spaceConcat('slider', !!this.sliderDragHandler && 'dragging')}>
          {this.minMaxLabelsVisible && (
            <span class='min-label' style={{ width: this.minLabelWidth ? `${this.minLabelWidth}px` : 'unset' }}>
              {this.min}
            </span>
          )}
          <div
            class='slider-background'
            tabindex='0'
            onKeyDown={this.keydown.bind(this)}
            onPointerDown={this.startSliderDrag.bind(this)}
          >
            <div class='slider-background-fill' style={{ width: controlPosition }}></div>
            <div class='control' style={{ left: controlPosition }}>
              {this.valueLabelVisible && <div class='value-label'>{this.value}</div>}
            </div>
          </div>
          {this.minMaxLabelsVisible && (
            <span class='max-label' style={{ width: this.maxLabelWidth ? `${this.maxLabelWidth}px` : 'unset' }}>
              {this.max}
            </span>
          )}
        </div>
      </Host>
    );
  }
}
