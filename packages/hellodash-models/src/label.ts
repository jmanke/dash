import { Model } from './model';

export interface Label extends Model {
  text: string;
  color: string;
  sortOrder: number;
}
