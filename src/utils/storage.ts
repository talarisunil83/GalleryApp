import AsyncStorage from '@react-native-async-storage/async-storage';
import { StoredUser, User } from '../types/auth';

const USER_KEY = '@gallery_registered_user';
const SESSION_KEY = '@gallery_user_session';
const FAVORITES_KEY = '@gallery_favorites';

export const saveRegisteredUser = async (
  user: StoredUser,
): Promise<void> => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getRegisteredUser = async (): Promise<StoredUser | null> => {
  const data = await AsyncStorage.getItem(USER_KEY);

  if (!data) {
    return null;
  }

  return JSON.parse(data) as StoredUser;
};

export const saveSession = async (user: User): Promise<void> => {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

export const getSession = async (): Promise<User | null> => {
  const data = await AsyncStorage.getItem(SESSION_KEY);

  if (!data) {
    return null;
  }

  return JSON.parse(data) as User;
};

export const clearSession = async (): Promise<void> => {
  await AsyncStorage.removeItem(SESSION_KEY);
};