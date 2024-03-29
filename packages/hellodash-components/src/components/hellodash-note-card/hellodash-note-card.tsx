import { Label, Note } from '@didyoumeantoast/hellodash-models';
import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import { DateTime } from 'luxon';

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

  /**
   * Note
   */
  @Prop() note: Note;

  /**
   * Labels for note
   */
  @Prop() noteLabels: Label[];

  /**
   * Mode of the note card
   * @default 'edit'
   */
  @Prop({ reflect: true }) mode: NoteCardMode = 'edit';

  /**
   * Whether the note card is selected
   */
  @Prop({ reflect: true }) selected: boolean = false;

  //#endregion

  //#region @Event

  @Event({ eventName: 'hellodashNoteCardNoteSelected' }) noteSelected: EventEmitter<void>;

  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  /**
   * Opens the note modal
   */
  openNoteModal() {
    if (this.mode !== 'edit') {
      return;
    }

    this.noteSelected.emit();
  }

  /**
   * Converts a date time to a locale date to be displayed in the card
   * @param dateTime Date time to convert
   * @returns Locale date
   */
  toLocaleDate(dateTime: DateTime) {
    const dayDiff = DateTime.now().day - dateTime.day;
    if (dayDiff === 0) {
      return 'Today';
    } else if (dayDiff === 1) {
      return 'Yesterday';
    }

    return dateTime.toLocaleString(DateTime.DATE_MED);
  }

  /**
   * Returns the note preview fragment
   * @returns
   */
  notePreviewFragment() {
    const { title, previewContent, lastModified, created } = this.note;
    const labels = this.noteLabels ?? [];
    const displayLabels = labels.slice(0, MAX_LABELS) ?? [];
    return (
      <div class='preview-container'>
        <header>
          <p class='date-label'>{this.toLocaleDate(DateTime.fromISO(lastModified ?? created))}</p>
          <h2 class='title'>{title}</h2>
        </header>
        <section class='preview'>{previewContent}</section>
        {displayLabels.length > 0 && (
          <div class='labels-container'>
            {displayLabels.map(label => (
              <dash-chip key={label.id} heading={label.text} selectable color={label.color}></dash-chip>
            ))}
            {labels.length > MAX_LABELS && <dash-chip heading={`+ ${labels.length - MAX_LABELS}`} selectable></dash-chip>}
          </div>
        )}
      </div>
    );
  }

  //#endregion

  render() {
    return (
      <div class='note-card'>
        {this.mode === 'edit' && [
          <button onClick={this.openNoteModal.bind(this)}>{this.notePreviewFragment()}</button>,

          <div class='actions-end-wrapper'>
            <slot name='actions-end'></slot>
          </div>,
        ]}

        {this.mode === 'selectable' && (
          <button class={this.selected ? 'selected' : ''} onClick={() => (this.selected = !this.selected)}>
            {this.selected && <dash-icon class='card-selected-icon' icon='check-circle' scale='m'></dash-icon>}
            {this.notePreviewFragment()}
          </button>
        )}
      </div>
    );
  }
}
