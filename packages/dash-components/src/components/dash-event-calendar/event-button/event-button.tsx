import { FunctionalComponent, h } from '@stencil/core';
import { DateTime } from 'luxon';
import { EventLayout } from '../../../interfaces/event-layout';
import { Scale } from '../../../types/types';

interface EventButtonProps {
  layout: EventLayout;
  scale?: Scale;
}

const FontSize = Object.freeze({
  s: 'var(--dash-font-size--1)',
  m: 'var(--dash-font-size-1)',
  l: 'var(--dash-font-size-3)',
});

const Padding = Object.freeze({
  s: 'var(--dash-spacing-half)',
  m: 'var(--dash-spacing-1)',
  l: 'var(--dash-spacing-2)',
});

const NameMarginBlockEnd = Object.freeze({
  s: '0',
  m: 'var(--dash-spacing-half)',
  l: 'var(--dash-spacing-1)',
});

const eventButtonContainerStyle = {
  position: 'absolute',
  borderTop: '1px solid transparent',
  borderBottom: '1px solid transparent',
  maxWidth: '100%',
  overflow: 'hidden',
};

function eventButtonStyle(scale: Scale) {
  return {
    fontSize: FontSize[scale],
    borderRadius: 'var(--dash-border-radius)',
    backgroundColor: 'var(--dash-brand)',
    margin: 'var(--dash-spacing-px)',
    height: '100%',
    cursor: 'pointer',
  };
}

function eventContentStyle(scale: Scale) {
  return {
    height: '100%',
    padding: Padding[scale],
  };
}

function eventNameStyle(scale: Scale) {
  return {
    marginBlockEnd: NameMarginBlockEnd[scale],
    fontWeight: '600',
  };
}

function toTimeString(time: DateTime) {
  return time.toLocaleString({ hour: 'numeric', hour12: true });
}

export const EventButton: FunctionalComponent<EventButtonProps> = ({ layout, scale = 'm' }) => (
  <div class='event-button-container' style={{ ...eventButtonContainerStyle, top: layout.top, height: layout.height, left: layout.left, width: layout.width }}>
    <div class='event-button' style={eventButtonStyle(scale)}>
      <div class='event-content' style={eventContentStyle(scale)}>
        <div class='event-name' style={eventNameStyle(scale)}>
          {layout.event.name}
        </div>
        <span>
          {toTimeString(layout.event.fromTime)} - {toTimeString(layout.event.toTime)}
        </span>
      </div>
    </div>
  </div>
);
