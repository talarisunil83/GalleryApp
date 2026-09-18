import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Favorites: undefined;
  Profile: undefined;
};

export type MainStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  ImageDetail: {
    image: {
      id: string;
      author: string;
      width: number;
      height: number;
      url: string;
      download_url: string;
    };
  };
};