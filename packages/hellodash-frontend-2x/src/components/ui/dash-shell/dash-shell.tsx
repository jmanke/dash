import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'dash-shell',
  styleUrl: 'dash-shell.css',
  shadow: true,
})
export class DashShell {
  render() {
    return (
      <Host>
        <div class='shell'>
          <slot name='header'></slot>

          <div class='body'>
            <slot name='left-panel'></slot>

            <div class='content'>
              <slot name='content'></slot>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
