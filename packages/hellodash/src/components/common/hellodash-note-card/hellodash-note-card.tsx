import { Component, h, Prop } from '@stencil/core';
import { injectHistory, RouterHistory } from '@stencil-community/router';
import { DateTime } from 'luxon';
import { Note } from '../../../models/note';
import { Label } from '../../../models/label';

// max labels to display in the card
const MAX_LABELS = 3;

export type NoteCardMode = 'edit' | 'selectable';

@Component({
  tag: 'hellodash-note-card',
  styleUrl: 'hellodash-note-card.css',
  shadow: true,
})
export class HellodashNoteCard {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop
  @Prop()
  notePreview: Note;

  @Prop()
  labels: Label[];

  @Prop({ mutable: true })
  history: RouterHistory;

  @Prop({
    reflect: true,
  })
  mode: NoteCardMode = 'edit';

  @Prop()
  selected: boolean = false;
  //#endregion

  //#region @Event
  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  openNoteModal() {
    if (this.mode !== 'edit') {
      return;
    }

    this.history.push(`/note/${this.notePreview.id}`);
  }

  toLocaleDate(dateTime: DateTime) {
    const dayDiff = DateTime.now().day - dateTime.day;
    if (dayDiff === 0) {
      return 'Today';
    } else if (dayDiff === 1) {
      return 'Yesterday';
    }

    return dateTime.toLocaleString(DateTime.DATE_MED);
  }

  notePreviewFragment({
    lastModified,
    title,
    previewContent,
    previewLabels,
    labels,
  }: {
    lastModified: string;
    title: string;
    previewContent: string;
    previewLabels: Label[];
    labels: number[];
  }) {
    return (
      <div class='preview-container'>
        <header>
          <p class='date-label'>{this.toLocaleDate(DateTime.fromISO(lastModified))}</p>
          <h2 class='title'>{title}</h2>
        </header>
        <section class='preview'>{previewContent}</section>
        {!!previewLabels.length && (
          <div class='labels-container'>
            {previewLabels.map(label => (
              <dash-chip heading={label.text} selectable color={label.color}></dash-chip>
            ))}
            {labels.length > MAX_LABELS && <dash-chip heading={`+ ${labels.length - MAX_LABELS}`} selectable></dash-chip>}
          </div>
        )}
      </div>
    );
  }
  //#endregion

  render() {
    const { title, labels, previewContent, lastModified } = this.notePreview;
    const previewLabels = (this.labels || []).slice(0, MAX_LABELS) ?? [];

    return (
      <div class='note-card'>
        {this.mode === 'edit' && [
          <button onClick={this.openNoteModal.bind(this)}>{this.notePreviewFragment({ lastModified, title, previewContent, previewLabels, labels })}</button>,

          <div class='actions-end-wrapper'>
            <slot name='actions-end'></slot>
          </div>,
        ]}

        {this.mode === 'selectable' && (
          <button class={this.selected ? 'selected' : ''} onClick={() => (this.selected = !this.selected)}>
            {this.selected && <dash-icon class='card-selected-icon' icon='check-circle' scale='m'></dash-icon>}
            {this.notePreviewFragment({ lastModified, title, previewContent, previewLabels, labels })}
          </button>
        )}
      </div>
    );
  }
}

injectHistory(HellodashNoteCard);
