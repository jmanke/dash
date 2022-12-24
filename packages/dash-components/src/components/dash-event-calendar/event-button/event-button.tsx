import { FunctionalComponent, h } from '@stencil/core';
import { DateTime } from 'luxon';
import { EventLayout } from '../../../interfaces/event-layout';
import { Scale } from '../../../types/types';

interface EventButtonProps {
  layout: EventLayout;
  scale?: Scale;
}

type CellScale = 'xs' | 's' | 'm';

const FontSize = Object.freeze({
  s: 'var(--dash-font-size--1)',
  m: 'var(--dash-font-size-0)',
  l: 'var(--dash-font-size-1)',
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
  minHeight: '10px',
  overflow: 'hidden',
};

function eventButtonStyle(scale: Scale, cellScale: CellScale) {
  return {
    fontSize: cellScale === 'xs' ? 'var(--dash-font-size--2)' : FontSize[scale],
    borderRadius: 'var(--dash-border-radius)',
    backgroundColor: 'var(--dash-brand)',
    margin: 'var(--dash-spacing-px)',
    height: '100%',
    cursor: 'pointer',
  };
}

function eventContentStyle(scale: Scale, cellScale: CellScale) {
  const style = {
    height: '100%',
    padding: cellScale !== 'm' ? '1px var(--dash-spacing-2)' : Padding[scale],
    display: cellScale !== 'm' ? 'flex' : 'block',
    columnGap: cellScale !== 'm' ? 'var(--dash-spacing-1-half)' : 'unset',
    lineHeight: cellScale === 'xs' ? '5px' : 'unset',
  };

  return style;
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

export const EventButton: FunctionalComponent<EventButtonProps> = ({ layout, scale = 'm' }) => {
  const height = parseInt(layout.height, 10);
  let cellScale: CellScale = 'm';
  if (height < 20) {
    cellScale = 'xs';
  } else if (height < 40) {
    cellScale = 's';
  }

  return (
    <div class='event-button-container' style={{ ...eventButtonContainerStyle, top: layout.top, height: layout.height, left: layout.left, width: layout.width }}>
      <div class='event-button' style={eventButtonStyle(scale, cellScale)}>
        <div class='event-content' style={eventContentStyle(scale, cellScale)}>
          <div class='event-name' style={eventNameStyle(scale)}>
            {layout.event.name}
            {cellScale !== 'm' && ', '}
          </div>
          <span>
            {toTimeString(layout.event.fromTime)} - {toTimeString(layout.event.toTime)}
          </span>
        </div>
      </div>
    </div>
  );
};
