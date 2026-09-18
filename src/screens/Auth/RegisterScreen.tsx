import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';

import { useAuthStore } from '../../store/useAuthStore';
import {
  RegisterErrors,
  validateRegistration,
} from '../../utils/validation';
import { StoredUser } from '../../types/auth';
import { AuthStackParamList } from '../../types/navigation';

type Props = StackScreenProps<AuthStackParamList, 'Register'>;

const cities = [
  'Hyderabad',
  'Bengaluru',
  'Chennai',
  'Mumbai',
  'Delhi',
  'Kurnool',
  'Vijayawada',
  'Visakhapatnam',
];

export default function RegisterScreen({ navigation }: Props) {
  const register = useAuthStore((state) => state.register);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other' | ''>('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<RegisterErrors>({});

  const handleRegister = async () => {
    const form = {
      fullName,
      email,
      gender,
      mobile,
      address,
      city,
      password,
      confirmPassword,
    };

    const validationErrors = validateRegistration(form);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const user: StoredUser = {
      fullName: fullName.trim(),
      email: email.trim(),
      gender: gender as 'Male' | 'Female' | 'Other',
      mobile: mobile.trim(),
      address: address.trim(),
      city,
      password,
    };

    await register(user);

    Alert.alert(
      'Registration Successful',
      'Your account has been created. Please login.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ],
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>
        Register to access your image gallery
      </Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter full name"
        value={fullName}
        onChangeText={setFullName}
      />
      {errors.fullName && (
        <Text style={styles.error}>{errors.fullName}</Text>
      )}

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email address"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email && (
        <Text style={styles.error}>{errors.email}</Text>
      )}

      <Text style={styles.label}>Gender</Text>

      <View style={styles.genderRow}>
        {(['Male', 'Female', 'Other'] as const).map((item) => (
          <Pressable
            key={item}
            style={styles.genderOption}
            onPress={() => setGender(item)}
          >
            <View style={styles.radioOuter}>
              {gender === item && <View style={styles.radioInner} />}
            </View>
            <Text>{item}</Text>
          </Pressable>
        ))}
      </View>

      {errors.gender && (
        <Text style={styles.error}>{errors.gender}</Text>
      )}

      <Text style={styles.label}>Mobile Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter 10-digit mobile number"
        keyboardType="number-pad"
        maxLength={10}
        value={mobile}
        onChangeText={(text) =>
          setMobile(text.replace(/[^0-9]/g, ''))
        }
      />
      {errors.mobile && (
        <Text style={styles.error}>{errors.mobile}</Text>
      )}

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={[styles.input, styles.addressInput]}
        placeholder="Enter address"
        multiline
        value={address}
        onChangeText={setAddress}
      />
      {errors.address && (
        <Text style={styles.error}>{errors.address}</Text>
      )}

      <Text style={styles.label}>City</Text>

      <View style={styles.pickerContainer}>
  <Picker
    selectedValue={city}
    onValueChange={(itemValue) => setCity(itemValue)}
  >
    <Picker.Item label="Select City" value="" />

    {cities.map((item) => (
      <Picker.Item
        key={item}
        label={item}
        value={item}
      />
    ))}
  </Picker>
</View>

      {errors.city && (
        <Text style={styles.error}>{errors.city}</Text>
      )}

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Minimum 6 characters"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password}</Text>
      )}

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Re-enter password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword}</Text>
      )}

      <Pressable style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </Pressable>

      <Pressable
        style={styles.loginLink}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginText}>
          Already have an account? Login
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 6,
  },
  subtitle: {
    color: '#666666',
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  addressInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  error: {
    color: '#d32f2f',
    fontSize: 13,
    marginTop: 4,
  },
  genderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#555555',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#333333',
  },
  pickerContainer: {
  borderWidth: 1,
  borderColor: '#cccccc',
  borderRadius: 8,
  overflow: 'hidden',
  marginBottom: 4,
},
  registerButton: {
    marginTop: 25,
    backgroundColor: '#222222',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 18,
  },
  loginText: {
    color: '#333333',
    fontSize: 15,
  },
});