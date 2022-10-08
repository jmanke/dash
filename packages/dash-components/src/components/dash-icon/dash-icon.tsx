import { Component, h, Prop, State, Watch } from '@stencil/core';
import iconService from '../../services/icon-service';
import { Scale } from '../../types/types';

export type IconColor = 'primary' | 'secondary' | 'neutral';

const SIZES = {
  s: '16',
  m: '20',
  l: '32',
  xl: '48',
};

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
  @State()
  svg: string;

  @State()
  iconUrlError: boolean;

  @State()
  paths: Array<string> = [];
  //#endregion

  //#region @Prop
  @Prop({
    reflect: true,
  })
  icon: string;
  @Watch('icon')
  async iconChanged() {
    this.updateSvg();
  }

  // set icon to fallback to if error occurs loading image url
  @Prop({
    reflect: true,
  })
  iconUrl: string;

  @Prop({
    reflect: true,
  })
  scale?: Scale;

  @Prop({
    reflect: true,
  })
  width?: number;

  @Prop({
    reflect: true,
  })
  color: IconColor = 'neutral';

  @Prop({
    reflect: true,
  })
  rounded: boolean;
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
  async updateSvg() {
    if (!this.icon) {
      return;
    }

    this.paths = await iconService.getIconPaths(this.icon);
  }
  //#endregion

  render() {
    const width = this.width || SIZES[this.scale] || SIZES['m'];
    if (this.iconUrl && !this.iconUrlError) {
      return <img width={width} src={this.iconUrl} onError={() => (this.iconUrlError = true)} />;
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
