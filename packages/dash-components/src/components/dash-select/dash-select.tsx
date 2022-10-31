import { Component, h } from '@stencil/core';

@Component({
  tag: 'dash-select',
  styleUrl: 'dash-select.css',
  shadow: true,
})
export class DashSelect {
  render() {
    return (
      <select>
        <slot></slot>
      </select>
    );
  }
}
