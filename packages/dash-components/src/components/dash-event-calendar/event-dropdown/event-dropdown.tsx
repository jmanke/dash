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

const headerWrapperStyle = {
  display: 'flex',
  flex: '1 1 auto',
  alignItems: 'center',
  minWidth: '0',
};

const headerStyle = {
  fontSize: 'var(--dash-font-size-3)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const actionBarStyle = {
  display: 'flex',
  flex: '1 1 auto',
  columnGap: 'var(--dash-spacing-half)',
  alignItems: 'center',
  justifyContent: 'flex-end',
};

export const EventDropdown: FunctionalComponent<EventDropdownProps> = ({ target, active, event, onEdit, onClose, onDelete }) => {
  const sameDay = isSameDay(event?.fromTime, event?.toTime);
  return (
    <dash-popover target={target} active={active} autoClose={true} placement='left-start' onDashPopoverClose={onClose} stayInView={true}>
      <div class='event-popover' style={eventPopoverStyle}>
        <div style={{ display: 'flex', marginBlockEnd: 'var(--dash-spacing-3)' }}>
          <div class='event-header-wrapper' style={headerWrapperStyle}>
            <div class='event-header' style={headerStyle} title={event?.name}>
              {event?.name}
            </div>
          </div>

          <div style={actionBarStyle}>
            <dash-icon-button style={{ '--dash-icon-button-padding': 'var(--dash-spacing-2)' }} icon='pencil-square' rounded onClick={onEdit}></dash-icon-button>
            <dash-icon-button style={{ '--dash-icon-button-padding': 'var(--dash-spacing-2)' }} icon='trash3' rounded onClick={onDelete}></dash-icon-button>
            <dash-icon-button icon='x' rounded onClick={onClose}></dash-icon-button>
          </div>
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
