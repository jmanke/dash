import { Model } from './model';

export class User extends Model {
  userId: string;
  givenName?: string;
  familyName?: string;
  picture?: string;
  email?: string;
}
