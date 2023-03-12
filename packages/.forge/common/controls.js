const icons = [
  'plus',
  'plus-lg',
  'plus-circle',
  'trash3',
  'x',
  'list',
  'three-dots-vertical',
  'journal-text',
  'pencil',
  'arrow-left',
  'search',
  'tag-fill',
  'filter',
  'check',
  'check2',
  'person',
  'dot',
  'check-circle',
];
export const scaleControl = {
  options: ['s', 'm', 'l'],
  type: 'radio',
};
export const scaleExtendedControl = {
  options: ['s', 'm', 'l', 'xl'],
  type: 'radio',
};
export const iconControl = {
  options: [null, ...icons],
  type: 'select',
};
export const statusControl = {
  options: [null, 'success', 'error'],
  type: 'select',
};
export const placementStrategyControl = {
  options: ['fixed', 'absolute'],
  type: 'radio',
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
  type: 'select',
};
export const colors = ['red', 'orange', 'yellow', 'green-apple', 'green-grass', 'baby-blue', 'dark-blue', 'purple', 'pink'];
export const colorControl = {
  options: colors,
  type: 'select',
};
export const multiColorControl = {
  options: colors,
  type: 'multi-select',
};
//# sourceMappingURL=controls.js.map
