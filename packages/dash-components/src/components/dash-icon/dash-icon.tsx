import { Component, h, Prop, State, Watch } from '@stencil/core';
import iconService from '../../services/icon-service';
import { ScaleExtended } from '../../types/types';

export type IconColor = 'primary' | 'secondary' | 'neutral';

@Component({
  tag: 'dash-icon',
  styleUrl: 'dash-icon.css',
  shadow: true,
})
export class DashIcon {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State

  /**
   * SVG to display
   */
  @State() svg: string;

  /**
   * When `true`, displays an error for the icon's url
   */
  @State() iconUrlError: boolean;

  /**
   * Paths of the SVG
   */
  @State() paths: Array<string> = [];

  //#endregion

  //#region @Prop

  /**
   * Icon name to display
   * @optional
   */
  @Prop({ reflect: true }) icon: string;
  @Watch('icon')
  async iconChanged() {
    this.updateSvg();
  }

  /**
   * URL pointing to icon
   * @optional
   */
  @Prop({ reflect: true }) iconUrl: string;

  /**
   * Size of the icon
   * @default 'm'
   */
  @Prop({ reflect: true }) scale?: ScaleExtended = 'm';

  /**
   * Width of the icon in pixels
   * @optional
   */
  @Prop({ reflect: true }) width?: number;

  /**
   * Color of the icon
   * @default 'neutral'
   */
  @Prop({ reflect: true }) color: IconColor = 'neutral';

  /**
   * When `true`, icon is rounded
   * @default false
   */
  @Prop({ reflect: true }) rounded: boolean;

  //#endregion

  //#region @Event
  //#endregion

  //#region Component lifecycle

  componentWillLoad() {
    this.updateSvg();
  }

  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  /**
   *  Updates the current SVG to be displayed
   */
  async updateSvg() {
    if (!this.icon) {
      return;
    }

    this.paths = await iconService.getIconPaths(this.icon);
  }

  //#endregion

  render() {
    if (this.iconUrl && !this.iconUrlError) {
      return <img src={this.iconUrl} onError={() => (this.iconUrlError = true)} />;
    }

    return (
      <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' fill='currentColor' viewBox='0 0 16 16'>
        {this.paths.map((path: any) => (
          <path d={path.d}></path>
        ))}
      </svg>
    );
  }
}
