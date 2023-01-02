import { FunctionalComponent, h } from '@stencil/core';
import { CalendarEvent, CalendarEventInternal } from '../../../interfaces/calendar-event';

interface EditEventDropdownProps {
  target: HTMLElement;
  active: boolean;
  event: CalendarEvent | CalendarEventInternal;
  onClose?: () => void;
  onEventUpdate?: (event: CalendarEvent | CalendarEventInternal) => void;
}

const editEventPopoverStyle = {
  backgroundColor: 'var(--dash-background-1)',
  borderRadius: 'var(--dash-border-radius)',
  padding: 'var(--dash-spacing-2)',
  boxShadow: 'var(--dash-box-shadow)',
  width: 'var(--dash-spacing-80)',
  maxWidth: '80vw',
};

export const EditEventDropdown: FunctionalComponent<EditEventDropdownProps> = ({ target, active, event, onClose, onEventUpdate }) => {
  return (
    <dash-popover class='edit-event-dropdown' target={target} active={active} placement='left-start' onDashPopoverClose={onClose} stayInView autoClose>
      <div class='edit-event-popover' style={editEventPopoverStyle}>
        <dash-event-calendar-edit-event
          event={event}
          onDashEventCalendarEditEventEventUpdate={e => onEventUpdate(e.target.event)}
          onDashEventCalendarEditEventEventCancel={onClose}
        ></dash-event-calendar-edit-event>
      </div>
    </dash-popover>
  );
};
