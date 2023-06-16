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
  @State() controlPosition = 50;

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

  componentDidLoad() {
    this.backgroundElement = this.element.shadowRoot.querySelector('.slider-background');
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

    if (newValue === this.value) {
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
        break;
      case 'ArrowRight':
        newValue = this.value + delta;
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
    return (
      <Host>
        <div class='slider'>
          {this.minMaxLabelsVisible && (
            <div class='min-max-label-container'>
              <div class='min-label'>{this.min}</div>
              <div class='max-label'>{this.max}</div>
            </div>
          )}

          <div
            class='slider-background'
            ref={el => (this.backgroundElement = el)}
            tabindex='0'
            onKeyDown={this.keydown.bind(this)}
            onPointerDown={this.startSliderDrag.bind(this)}
          >
            <div class='control' style={{ left: `calc(${this.controlPosition}% - ${ControlWidth} / 2)` }}>
              {this.valueLabelVisible && <div class='value-label'>{this.value}</div>}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
