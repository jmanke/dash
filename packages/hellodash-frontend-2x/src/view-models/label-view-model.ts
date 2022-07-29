import { tracked } from '../decorators/tracked';
import { Label } from '../models/label';
import { Color } from '@didyoumeantoast/dash-components/dist/types/types/types';
import ViewModel from './view-model';

export class LabelViewModel extends ViewModel<Label> {
  @tracked text: string;
  @tracked color?: Color;

  constructor(label: Label) {
    super(label);

    this.text = label.text;
    this.color = label.color;

    this.__isDirty = false;
  }

  __toModel(): Label {
    return {
      ...super.__toModel(),
      text: this.text,
      color: this.color,
    };
  }
}
