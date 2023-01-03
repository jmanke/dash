import { FunctionalComponent, h } from '@stencil/core';
import { CalendarEventInternal } from '../../../interfaces/calendar-event';
import { formatDate, isSameDay } from '../../../utils/date-time';

interface EventDropdownProps {
  target: HTMLElement;
  active: boolean;
  event: CalendarEventInternal;
  onEdit?: () => void;
  onClose?: () => void;
  onDelete?: () => void;
}

const eventPopoverStyle = {
  backgroundColor: 'var(--dash-background-2)',
  borderRadius: 'var(--dash-border-radius)',
  padding: 'var(--dash-spacing-2)',
  boxShadow: 'var(--dash-box-shadow)',
  width: 'var(--dash-spacing-80)',
  maxWidth: '80vw',
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  columnGap: 'var(--dash-spacing-3)',
  fontSize: 'var(--dash-font-size-3)',
  marginBlockEnd: 'var(--dash-spacing-3)',
};

export const EventDropdown: FunctionalComponent<EventDropdownProps> = ({ target, active, event, onEdit, onClose, onDelete }) => {
  const sameDay = isSameDay(event?.fromTime, event?.toTime);
  return (
    <dash-popover target={target} active={active} autoClose={true} placement='left-start' onDashPopoverClose={onClose} stayInView={true}>
      <div class='event-popover' style={eventPopoverStyle}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBlockEnd: 'var(--dash-spacing-1)' }}>
          <dash-icon-button style={{ '--dash-icon-button-padding': 'var(--dash-spacing-2)' }} icon='pencil-square' rounded onClick={onEdit}></dash-icon-button>
          <dash-icon-button style={{ '--dash-icon-button-padding': 'var(--dash-spacing-2)' }} icon='trash3' rounded onClick={onDelete}></dash-icon-button>
          <dash-icon-button icon='x' rounded onClick={onClose}></dash-icon-button>
        </div>
        <div class='event-header' style={headerStyle}>
          <div>{event?.name}</div>
        </div>
        <div style={{ fontSize: 'var(--dash-font-size-0)' }}>
          <div>
            {sameDay && [<span>{formatDate(event?.fromTime, 'EEEE, dd LLLL • h:mma')} - </span>, <span>{formatDate(event?.toTime, 'h:mma')}</span>]}
            {!sameDay && [<span>{formatDate(event?.fromTime, 'EEEE, dd LLLL • h:mma')} - </span>, <span>{formatDate(event?.toTime, 'EEEE, h:mma')}</span>]}
          </div>

          {event?.description && <div style={{ marginBlockStart: 'var(--dash-spacing-3)' }}>{event?.description}</div>}
        </div>
      </div>
    </dash-popover>
  );
};
