import { FunctionalComponent, h } from '@stencil/core';
import { DateTime } from 'luxon';
import { CalendarEvent } from '../../../interfaces/calendar-event';

interface EventDropdownProps {
  target: HTMLElement;
  active: boolean;
  event: CalendarEvent;
  onClose?: () => void;
  onDelete?: () => void;
}

const eventPopoverStyle = {
  backgroundColor: 'var(--dash-background-1)',
  borderRadius: 'var(--dash-border-radius)',
  padding: 'var(--dash-spacing-2)',
  boxShadow: 'var(--dash-box-shadow)',
  minWidth: 'var(--dash-spacing-60)',
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  columnGap: 'var(--dash-spacing-3)',
  fontSize: 'var(--dash-font-size-3)',
  marginBlockEnd: 'var(--dash-spacing-3)',
};

function isSameDay(a: DateTime, b: DateTime) {
  if (!a || !b) {
    return true;
  }
  return a.year === b.year && a.month === b.month && a.day === b.day;
}

export const EventDropdown: FunctionalComponent<EventDropdownProps> = ({ target, active, event, onClose }) => {
  const sameDay = isSameDay(event?.fromTime, event?.toTime);
  return (
    <dash-popover target={target} active={active} autoClose={true} onDashPopoverClose={onClose}>
      <div class='event-popover' style={eventPopoverStyle}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBlockEnd: 'var(--dash-spacing-1)' }}>
          <dash-icon-button style={{ '--dash-icon-button-padding': 'var(--dash-spacing-2)' }} icon='pencil-square' rounded></dash-icon-button>
          <dash-icon-button style={{ '--dash-icon-button-padding': 'var(--dash-spacing-2)' }} icon='trash3' rounded></dash-icon-button>
          <dash-icon-button icon='x' onClick={onClose} rounded></dash-icon-button>
        </div>
        <div class='event-header' style={headerStyle}>
          <div>{event?.name}</div>
        </div>
        <div style={{ fontSize: 'var(--dash-font-size-0)' }}>
          <div>
            {sameDay && [<span>{event?.fromTime.toFormat('EEEE, dd LLLL • h:mma')} - </span>, <span>{event?.toTime.toFormat('h:mma')}</span>]}
            {!sameDay && [<span>{event?.fromTime.toFormat('EEEE, dd LLLL • h:mma')} - </span>, <span>{event?.toTime.toFormat('EEEE, h:mma')}</span>]}
          </div>

          {event?.description && <div style={{ marginBlockStart: 'var(--dash-spacing-3)' }}>{event?.description}</div>}
        </div>
      </div>
    </dash-popover>
  );
};
