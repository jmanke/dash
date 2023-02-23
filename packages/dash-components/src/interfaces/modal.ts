import type { EventEmitter } from '@stencil/core';

export interface Modal {
  close: () => Promise<void>;
  dashModalBeforeClose: EventEmitter;
  dashModalClosed: EventEmitter;
}
