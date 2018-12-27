
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    street: string;
}

export interface RegisteredUser {
  id: string;
  password: string;
  is_Admin: boolean;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  street: string;
}

export interface LoginUser  {
  email: string;
  password: string;
}
