export interface User {
  uid: string;
  displayName: string;
  email: string;
  password?: string;
  firstAccess?: boolean;
}