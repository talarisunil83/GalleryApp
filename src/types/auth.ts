export interface User {
  fullName: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
  mobile: string;
  address: string;
  city: string;
}

export interface StoredUser extends User {
  password: string;
}