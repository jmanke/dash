import { Status } from '../enums/status';
import { Model } from './model';

export interface NotePreview extends Model {
  title: string;
  previewContent: string;
  labels: number[];
  status: Status;
}
