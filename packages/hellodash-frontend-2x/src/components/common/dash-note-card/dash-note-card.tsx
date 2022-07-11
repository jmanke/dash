import { Component, h, Prop } from '@stencil/core';
import { injectHistory, RouterHistory } from '@stencil/router';
import { DateTime } from 'luxon';
import labelsState from '../../../stores/labels-store';
import { LabelViewModel } from '../../../view-models/label-view-model';
import { NoteViewModel } from '../../../view-models/note-view-model';

// max labels to display in the card
const MAX_LABELS = 2;

export type NoteCardMode = 'edit' | 'selectable';

@Component({
  tag: 'dash-note-card',
  styleUrl: 'dash-note-card.css',
  shadow: true,
})
export class DashNoteCard {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop
  @Prop({
    reflect: true,
  })
  note: NoteViewModel;

  @Prop()
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

    this.history.push(`/note/${this.note.id}`);
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

  notePreview({ dateCreated, title, previewContent, previewLabels, labels }: { dateCreated: DateTime, title: string, previewContent: string, previewLabels: LabelViewModel[], labels: number[] }) {
    return <div class='preview-container'>
      <header>
        <h6 class='date-label'>{this.toLocaleDate(dateCreated)}</h6>
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
  }
  //#endregion

  render() {
    const { title, labels, previewContent, dateCreated } = this.note;
    const noteLabels = labelsState.getLabelsByIds(this.note.labels);
    const previewLabels = noteLabels.slice(0, MAX_LABELS) ?? [];

    return (
      <div class='note-card'>
        {(this.mode === 'edit') && ([
          <button onClick={this.openNoteModal.bind(this)}>
            {this.notePreview({ dateCreated, title, previewContent, previewLabels, labels })}
          </button>,

          <div class='actions-end-wrapper'>
            <slot name='actions-end'></slot>
          </div>
        ])}

        {this.mode === 'selectable' && (
          <button class={this.selected ? 'selected' : ''} onClick={() => this.selected = !this.selected}>
            {this.selected && <dash-icon class='card-selected-icon' icon='check-circle' scale='m'></dash-icon>}
            {this.notePreview({ dateCreated, title, previewContent, previewLabels, labels })}
          </button>
        )}
      </div>
    );
  }
}

injectHistory(DashNoteCard);