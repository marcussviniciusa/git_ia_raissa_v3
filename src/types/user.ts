export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  status: 'pending' | 'approved';
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}