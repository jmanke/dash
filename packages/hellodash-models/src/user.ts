import { Model } from './model';

export interface User extends Model {
  userId: string;
  givenName?: string;
  familyName?: string;
  picture?: string;
  email?: string;
}
