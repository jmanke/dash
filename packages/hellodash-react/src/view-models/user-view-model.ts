import { User } from '../models/user';
import ViewModel from './view-model';

export default class UserViewModel extends ViewModel<User> {
  userId: string;
  givenName?: string;
  familyName?: string;
  picture?: string;
  email?: string;

  constructor(user: User) {
    super(user);

    this.userId = user.userId;
    this.givenName = user.givenName;
    this.familyName = user.familyName;
    this.picture = user.picture;
    this.email = user.email;
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
