import { FunctionalComponent, h } from '@stencil/core';

interface TimeBarProps {
  top: string;
}

const timeBarStyle = Object.freeze({
  display: 'relative',
  position: 'absolute',
  height: '3px',
  width: '100%',
  backgroundColor: 'var(--dash-danger)',
  borderRadius: 'var(--dash-border-radius)',
});

const timeBarKnobStyle = Object.freeze({
  position: 'absolute',
  top: '-3px',
  left: '-6px',
  width: '10px',
  height: '10px',
  borderRadius: '9999px',
  backgroundColor: 'var(--dash-danger)',
});

export const TimeBar: FunctionalComponent<TimeBarProps> = ({ top }) => {
  return (
    <div class='time-bar' style={{ ...timeBarStyle, top }}>
      <div class='time-bar-knob' style={timeBarKnobStyle}></div>
    </div>
  );
};
