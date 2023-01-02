export interface SignupDto {
  email: string;
  hash: string;
  role: 'user' | 'admin';
  firstName?: string;
  lastName?: string;
}
