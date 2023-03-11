import { FunctionalComponent, h } from '@stencil/core';
import { CalendarEvent, CalendarEventInternal } from '../../../interfaces/calendar-event';

interface EditEventDropdownProps {
  target: HTMLElement;
  active: boolean;
  event: CalendarEvent | CalendarEventInternal;
  onClose?: () => void;
  onCancel?: () => void;
  onEventUpdate?: (event: CalendarEvent | CalendarEventInternal) => void;
}

const editEventPopoverStyle = {
  backgroundColor: 'var(--dash-background-2)',
  borderRadius: 'var(--dash-border-radius)',
  padding: 'var(--dash-spacing-2)',
  boxShadow: 'var(--dash-box-shadow)',
  width: 'var(--dash-spacing-80)',
  maxWidth: '80vw',
};

const headerStyle = {
  marginBlockStart: '0',
  marginBlockEnd: 'var(--dash-spacing-3)',
};

export const EditEventDropdown: FunctionalComponent<EditEventDropdownProps> = ({ target, active, event, onClose, onCancel, onEventUpdate }) => {
  return (
    <dash-popover class='edit-event-dropdown' target={target} active={active} placement='left-start' onDashPopoverClose={onClose} stayInView autoClose>
      <div class='edit-event-popover' style={editEventPopoverStyle}>
        <h3 style={headerStyle}>Edit event</h3>

        <dash-event-calendar-edit-event
          event={event}
          onDashEventCalendarEditEventEventUpdate={e => {
            onEventUpdate?.(e.target.event);
            onClose?.();
          }}
          onDashEventCalendarEditEventEventCancel={onCancel}
        ></dash-event-calendar-edit-event>
      </div>
    </dash-popover>
  );
};
