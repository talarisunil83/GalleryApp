import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/Main/HomeScreen';
import FavoritesScreen from '../screens/Main/FavoritesScreen';
import ProfileScreen from '../screens/Main/ProfileScreen';
import { MainTabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Gallery' }}
      />

      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}