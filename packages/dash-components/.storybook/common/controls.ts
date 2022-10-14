import icons from '../../bootstrap-icons/include-icons';

export const themeControl = {
  options: ['light-theme', 'dark-theme'],
  control: { type: 'radio' },
};

export const scaleControl = {
  options: ['s', 'm', 'l'],
  control: { type: 'radio' },
};

export const scaleExtendedControl = {
  options: ['s', 'm', 'l', 'xl'],
  control: { type: 'radio' },
};

export const iconControl = {
  options: [null, ...icons],
  control: { type: 'select' },
};

export const statusControl = {
  options: [null, 'success', 'error'],
  control: { type: 'select' },
};

export const placementStrategyControl = {
  options: ['fixed', 'absolute'],
  control: { type: 'radio' },
};

export const placementControl = {
  options: [
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'bottom',
    'right',
    'left',
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end',
    'right-start',
    'right-end',
    'left-start',
    'left-end',
  ],
  control: { type: 'select' },
};

export const colors = ['red', 'orange', 'yellow', 'green-apple', 'green-grass', 'baby-blue', 'dark-blue', 'purple', 'pink'];

export const colorControl = {
  options: colors,
  control: { type: 'select' },
};

export const multiColorControl = {
  options: colors,
  control: { type: 'multi-select' },
};
