import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useAuthStore } from '../../store/useAuthStore';
import { validateMobile } from '../../utils/validation';

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const logout = useAuthStore((state) => state.logout);

  const [editing, setEditing] = useState(false);

  const [fullName, setFullName] = useState(user?.fullName ?? '');
  const [mobile, setMobile] = useState(user?.mobile ?? '');
  const [address, setAddress] = useState(user?.address ?? '');
  const [city, setCity] = useState(user?.city ?? '');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>(
  user?.gender ?? 'Other',
);

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>No profile information found.</Text>
      </View>
    );
  }

  const handleSave = async () => {
    if (!fullName.trim() || !address.trim() || !city.trim()) {
  Alert.alert(
    'Invalid Profile',
    'Full name, address, and city are required.',
  );
  return;
}
    if (!validateMobile(mobile.trim())) {
  Alert.alert(
    'Invalid Mobile',
    'Mobile number must be exactly 10 digits.',
  );
  return;
}
  await updateProfile({
    ...user,
    fullName,
    gender,
    mobile,
    address,
    city,
  });

  setEditing(false);
  Alert.alert('Success', 'Profile updated successfully.');
};

  const handleLogout = () => {
  Alert.alert(
    'Logout',
    'Are you sure you want to logout?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
        },
      },
    ],
  );
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {editing ? (
        <>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, styles.disabled]}
            value={user.email}
            editable={false}
          />
          <Text style={styles.label}>Gender</Text>

<View style={styles.genderContainer}>
  {['Male', 'Female', 'Other'].map((item) => (
    <Pressable
      key={item}
      style={styles.genderOption}
      onPress={() => setGender(item as 'Male' | 'Female' | 'Other')}
    >
      <Text style={styles.radio}>
        {gender === item ? '◉' : '○'}
      </Text>
      <Text>{item}</Text>
    </Pressable>
  ))}
</View>

          <Text style={styles.label}>Mobile</Text>
          <TextInput
            style={styles.input}
            value={mobile}
            onChangeText={setMobile}
            keyboardType="number-pad"
          />

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />

          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
          />

          <Pressable style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </Pressable>

          <Pressable
            style={styles.cancelButton}
            onPress={() => setEditing(false)}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.info}>
            Name: {user.fullName}
          </Text>

          <Text style={styles.info}>
            Email: {user.email}
          </Text>

          <Text style={styles.info}>
            Gender: {user.gender}
          </Text>

          <Text style={styles.info}>
            Mobile: {user.mobile}
          </Text>

          <Text style={styles.info}>
            Address: {user.address}
          </Text>

          <Text style={styles.info}>
            City: {user.city}
          </Text>

          <Pressable
            style={styles.button}
            onPress={() => setEditing(true)}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </Pressable>
        </>
      )}

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  genderContainer: {
  flexDirection: 'row',
  marginBottom: 12,
},
genderOption: {
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: 20,
},
radio: {
  fontSize: 20,
  marginRight: 5,
},
  disabled: {
    backgroundColor: '#eeeeee',
  },
  info: {
    fontSize: 16,
    marginBottom: 14,
  },
  button: {
    backgroundColor: '#222222',
    padding: 13,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  cancelButton: {
    padding: 13,
    alignItems: 'center',
  },
  cancelText: {
    fontWeight: '600',
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#d32f2f',
    padding: 13,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#d32f2f',
    fontWeight: '600',
  },
});