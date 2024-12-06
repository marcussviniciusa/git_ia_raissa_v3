import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, RegisterData } from '@/types/user';

interface AuthState {
  user: User | null;
  users: User[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  approveUser: (userId: string) => void;
  rejectUser: (userId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: [
        {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
          status: 'approved'
        }
      ],
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        const users = get().users;
        const user = users.find(u => u.email === email);
        
        if (email === 'admin@example.com' && password === 'admin') {
          set({
            user: users[0],
            isAuthenticated: true
          });
        } else if (user && user.status === 'approved') {
          set({
            user,
            isAuthenticated: true
          });
        } else if (user && user.status === 'pending') {
          throw new Error('Your account is pending approval');
        } else {
          throw new Error('Invalid credentials');
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      register: async (data: RegisterData) => {
        const users = get().users;
        if (users.some(u => u.email === data.email)) {
          throw new Error('Email already registered');
        }

        const newUser: User = {
          id: Math.random().toString(36).substring(7),
          name: data.name,
          email: data.email,
          role: 'user',
          status: 'pending'
        };

        set({ users: [...users, newUser] });
      },
      approveUser: (userId: string) => {
        set(state => ({
          users: state.users.map(user =>
            user.id === userId ? { ...user, status: 'approved' } : user
          )
        }));
      },
      rejectUser: (userId: string) => {
        set(state => ({
          users: state.users.filter(user => user.id !== userId)
        }));
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);