import { tracked } from '@didyoumeantoast/stencil-view-model';
import { User } from '../models/user';
import ViewModel from './view-model';

export class UserViewModel extends ViewModel<User> {
  @tracked userId: string;
  @tracked givenName?: string;
  @tracked familyName?: string;
  @tracked picture?: string;
  @tracked email?: string;

  constructor(user: User) {
    super(user);

    this.userId = user.userId;
    this.givenName = user.givenName;
    this.familyName = user.familyName;
    this.picture = user.picture;
    this.email = user.email;

    this.__isDirty = false;
  }

  __toModel(): User {
    return {
      ...super.__toModel(),
      userId: this.userId,
      givenName: this.givenName,
      familyName: this.familyName,
      picture: this.picture,
      email: this.email,
    };
  }
}
