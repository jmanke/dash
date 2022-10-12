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
