import { tracked } from '../decorators/tracked';
import { Status } from '../enums/status';
import { Note } from '../models/note';
import { convert } from 'html-to-text';
import ViewModel from './view-model';

const PREVIEW_CONTENT_LENGTH = 140;

export class NoteViewModel extends ViewModel<Note> {
  @tracked title: string;
  @tracked content: string;
  @tracked previewContent: string;
  @tracked labels: number[];
  @tracked status: Status;

  constructor(note: Note) {
    super(note);

    this.title = note.title;
    this.content = note.content;
    this.previewContent = note.previewContent;
    this.labels = note.labels ?? [];
    this.status = note.status;

    this.__isDirty = false;
  }

  __toModel(): Note {
    return {
      ...super.__toModel(),
      title: this.title,
      content: this.content,
      previewContent: this.previewContent,
      labels: this.labels,
      status: this.status,
    };
  }

  updatePreviewContent() {
    let previewContent = (convert(this.content, {
      selectors: [
        { selector: 'img', format: 'skip' },
      ],
    }) as string).substring(0, PREVIEW_CONTENT_LENGTH);
    if (previewContent?.length === PREVIEW_CONTENT_LENGTH) {
      previewContent += '...';
    }

    this.previewContent = previewContent;
  }
}
