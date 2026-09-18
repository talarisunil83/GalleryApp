import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import { useAuthStore } from '../store/useAuthStore';
import { MainStackParamList } from '../types/navigation';
import ImageDetailScreen from '../screens/Main/ImageDetailScreen';

const Stack = createStackNavigator<MainStackParamList>();

export default function RootNavigator() {
  const loadSession = useAuthStore((state) => state.loadSession);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      await loadSession();
      setLoading(false);
    };

    initialize();
  }, [loadSession]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Stack.Navigator>
          <Stack.Screen
            name="MainTabs"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ImageDetail"
            component={ImageDetailScreen}
            options={{ title: 'Image Details' }}
          />
        </Stack.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}