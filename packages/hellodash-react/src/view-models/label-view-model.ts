import { Label } from '../models/label';
import { Color } from '@didyoumeantoast/dash-components/dist/types/types/types';
import ViewModel from './view-model';

export class LabelViewModel extends ViewModel<Label> {
  text: string;
  color?: Color;

  constructor(label: Label) {
    super(label);

    this.text = label.text;
    this.color = label.color;
  }

  __toModel(): Label {
    return {
      ...super.__toModel(),
      text: this.text,
      color: this.color,
    };
  }
}
