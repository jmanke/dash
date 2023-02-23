import { FunctionalComponent, h } from '@stencil/core';
import { EventLayout } from '../../../interfaces/event-layout';
import { Scale } from '../../../types';
import { toLocaleString } from '../../../utils/date-time';

interface EventButtonProps {
  layout: EventLayout;
  scale?: Scale;
  onClick?: () => void;
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
  display: 'flex',
  borderTop: '1px solid transparent',
  borderBottom: '1px solid transparent',
  maxWidth: '100%',
  minHeight: '10px',
};

function eventButtonStyle(scale: Scale, cellScale: CellScale) {
  return {
    flex: 'auto',
    fontSize: cellScale === 'xs' ? 'var(--dash-font-size--2)' : FontSize[scale],
    borderRadius: 'var(--dash-border-radius)',
    backgroundColor: 'var(--dash-brand)',
    margin: 'var(--dash-spacing-px)',
    cursor: 'pointer',
    overflow: 'hidden',
  };
}

function eventContentStyle(scale: Scale, cellScale: CellScale) {
  const style = {
    height: '100%',
    color: 'var(--dash-text-color-1-dark)',
    fontWeight: '500',
    textRendering: 'optimizeLegibility',
    fontSmoothing: 'antialiased',
    padding: cellScale !== 'm' ? '0 var(--dash-spacing-1)' : Padding[scale],
    display: cellScale !== 'm' ? 'flex' : 'block',
    columnGap: cellScale !== 'm' ? 'var(--dash-spacing-1-half)' : 'unset',
    alignItems: cellScale !== 'm' ? 'center' : 'unset',
  };

  return style;
}

function eventNameStyle(scale: Scale, cellScale: CellScale) {
  return {
    marginBlockEnd: cellScale !== 'm' ? '0' : NameMarginBlockEnd[scale],
    fontWeight: '600',
    whiteSpace: cellScale !== 'm' ? 'nowrap' : 'unset',
    overflow: cellScale !== 'm' ? 'hidden' : 'unset',
    textOverflow: cellScale !== 'm' ? 'ellipsis' : 'unset',
  };
}

function toTimeString(time: Date) {
  return toLocaleString(time, { hour: 'numeric', minute: '2-digit', hour12: true });
}

export const EventButton: FunctionalComponent<EventButtonProps> = ({ layout, scale = 'm', onClick }) => {
  const height = parseInt(layout.height, 10);
  let cellScale: CellScale = 'm';
  if (height < 20) {
    cellScale = 'xs';
  } else if (height < 40) {
    cellScale = 's';
  }

  return (
    <div class='event-button-container' style={{ ...eventButtonContainerStyle, top: layout.top, height: layout.height, left: layout.left, width: layout.width }}>
      <div class='event-button' style={eventButtonStyle(scale, cellScale)} onClick={onClick}>
        <div class='event-content' style={eventContentStyle(scale, cellScale)}>
          <div class='event-name' style={eventNameStyle(scale, cellScale)}>
            {layout.event.name}
            {cellScale !== 'm' && ', '}
          </div>
          <div>
            <span style={{ whiteSpace: 'nowrap' }}>{toTimeString(layout.event.fromTime)} - </span>
            <span style={{ whiteSpace: 'nowrap' }}>{toTimeString(layout.event.toTime)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
