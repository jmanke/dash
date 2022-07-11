import { Color } from '../types/types';
import { Model } from './model';

export class Label extends Model {
  text: string;
  color?: Color;
}
