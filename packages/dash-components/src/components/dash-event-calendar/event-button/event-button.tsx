import { FunctionalComponent, h } from '@stencil/core';
import { EventLayout } from '../../../interfaces/event-layout';

interface EventButtonProps {
  layout: EventLayout;
}

const eventButtonStyle = {
  position: 'absolute',
  display: 'flex',
  borderTop: '1px solid transparent',
  borderBottom: '1px solid transparent',
};

const eventStyle = {
  '--dash-button-height': '100%',
  'borderRadius': 'var(--dash-border-radius)',
  'backgroundColor': 'var(--dash-brand)',
  'flex': 'auto',
  'margin': 'var(--dash-spacing-px)',
};

const eventContentStyle = {
  height: '100%',
};

export const EventButton: FunctionalComponent<EventButtonProps> = ({ layout }) => (
  <div class='event-button' style={{ ...eventButtonStyle, top: layout.top, height: layout.height, left: layout.left, width: layout.width }}>
    <dash-button class='event' style={eventStyle}>
      <div class='event-content' style={eventContentStyle}>
        {layout.event.name}
      </div>
    </dash-button>
  </div>
);
