import { Status } from '../enums/status';
import { Model } from './model';

export class NotePreview extends Model {
  title: string;
  previewContent: string;
  labels: number[];
  status: Status;
}
