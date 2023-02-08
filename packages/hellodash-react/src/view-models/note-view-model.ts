import { Status } from '../enums/status';
import { Note } from '../models/note';
import ViewModel from './view-model';

export class NoteViewModel extends ViewModel<Note> {
  title: string;
  content: string;
  previewContent: string;
  labels: number[];
  status: Status;

  constructor(note: Note) {
    super(note);

    this.title = note.title;
    this.content = note.content;
    this.previewContent = note.previewContent;
    this.labels = note.labels ?? [];
    this.status = note.status;
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
}
