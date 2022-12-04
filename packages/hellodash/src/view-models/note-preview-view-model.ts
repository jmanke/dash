import { tracked } from '@didyoumeantoast/stencil-view-model';
import { Status } from '../enums/status';
import { NotePreview } from '../models/note-preview';
import ViewModel from './view-model';

export class NotePreviewViewModel extends ViewModel<NotePreview> {
  @tracked title: string;
  @tracked previewContent: string;
  @tracked labels: number[];
  @tracked status: Status;

  constructor(notePreview: NotePreview) {
    super(notePreview);

    this.title = notePreview.title;
    this.previewContent = notePreview.previewContent;
    this.labels = notePreview.labels ?? [];
    this.status = notePreview.status;

    this.__isDirty = false;
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
