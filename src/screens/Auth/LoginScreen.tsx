import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { useAuthStore } from '../../store/useAuthStore';
import { validateEmail } from '../../utils/validation';
import { AuthStackParamList } from '../../types/navigation';

type Props = StackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email.trim())) {
      setEmailError('Enter a valid email address');
      return;
    }

    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    const success = await login(email.trim(), password);

    if (!success) {
      Alert.alert(
        'Login Failed',
        'Invalid email or password. Please check your registered credentials.',
      );
      return;
    }

    Alert.alert('Login Successful', 'Welcome to GalleryApp!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <Text style={styles.subtitle}>
        Login to continue to your gallery
      </Text>

      <Text style={styles.label}>Email Address</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter email address"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {emailError ? (
        <Text style={styles.error}>{emailError}</Text>
      ) : null}

      <Text style={styles.label}>Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {passwordError ? (
        <Text style={styles.error}>{passwordError}</Text>
      ) : null}

      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>

      <Pressable
        style={styles.registerLink}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerText}>
          Don't have an account? Register
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#666666',
    marginBottom: 30,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 7,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  error: {
    color: '#d32f2f',
    fontSize: 13,
    marginTop: 4,
  },
  loginButton: {
    marginTop: 25,
    backgroundColor: '#222222',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  registerLink: {
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: {
    fontSize: 15,
    color: '#333333',
  },
});