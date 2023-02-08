import { Status } from '../enums/status';
import { NotePreview } from '../models/note-preview';
import ViewModel from './view-model';

export class NotePreviewViewModel extends ViewModel<NotePreview> {
  title: string;
  previewContent: string;
  labels: number[];
  status: Status;

  constructor(notePreview: NotePreview) {
    super(notePreview);

    this.title = notePreview.title;
    this.previewContent = notePreview.previewContent;
    this.labels = notePreview.labels ?? [];
    this.status = notePreview.status;
  }

  __toModel(): NotePreview {
    return {
      ...super.__toModel(),
      title: this.title,
      previewContent: this.previewContent,
      labels: this.labels,
      status: this.status,
    };
  }
}
