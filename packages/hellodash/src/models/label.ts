import { Color } from '@didyoumeantoast/dash-components/dist/types/types/types';
import { Model } from './model';

export interface Label extends Model {
  text: string;
  color?: Color;
}
