import { create } from 'zustand';
import {
  saveRegisteredUser,
  getRegisteredUser,
  saveSession,
  getSession,
  clearSession,
} from '../utils/storage';
import { StoredUser, User } from '../types/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  register: (user: StoredUser) => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  updateProfile: (user: User) => Promise<void>;
  loadSession: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  register: async (userData) => {
    await saveRegisteredUser(userData);
  },

  login: async (email, password) => {
    const registeredUser = await getRegisteredUser();

    if (!registeredUser) {
      return false;
    }

    if (
      registeredUser.email.toLowerCase() !== email.toLowerCase() ||
      registeredUser.password !== password
    ) {
      return false;
    }

    const user: User = {
      fullName: registeredUser.fullName,
      email: registeredUser.email,
      gender: registeredUser.gender,
      mobile: registeredUser.mobile,
      address: registeredUser.address,
      city: registeredUser.city,
    };

    await saveSession(user);

    set({
      user,
      isAuthenticated: true,
    });

    return true;
  },

  updateProfile: async (updatedUser) => {
    const registeredUser = await getRegisteredUser();

    if (registeredUser) {
      await saveRegisteredUser({
        ...registeredUser,
        ...updatedUser,
      });
    }

    await saveSession(updatedUser);

    set({
      user: updatedUser,
      isAuthenticated: true,
    });
  },

  loadSession: async () => {
    const session = await getSession();

    if (session) {
      set({
        user: session,
        isAuthenticated: true,
      });
    }
  },

  logout: async () => {
    await clearSession();

    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));