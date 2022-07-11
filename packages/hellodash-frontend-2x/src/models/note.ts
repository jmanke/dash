import { Status } from '../enums/status';
import { Model } from './model';

export class Note extends Model {
  title: string;
  content: string;
  previewContent: string;
  labels: number[];
  status: Status;
}
