export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateMobile = (mobile: string): boolean => {
  const mobileRegex = /^[0-9]{10}$/;
  return mobileRegex.test(mobile);
};

export interface RegisterErrors {
  fullName?: string;
  email?: string;
  gender?: string;
  mobile?: string;
  address?: string;
  city?: string;
  password?: string;
  confirmPassword?: string;
}

interface RegisterForm {
  fullName: string;
  email: string;
  gender: string;
  mobile: string;
  address: string;
  city: string;
  password: string;
  confirmPassword: string;
}

export const validateRegistration = (
  form: RegisterForm,
): RegisterErrors => {
  const errors: RegisterErrors = {};

  if (!form.fullName.trim()) {
    errors.fullName = 'Full name is required';
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(form.email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  if (!form.gender) {
    errors.gender = 'Please select gender';
  }

  if (!form.mobile.trim()) {
    errors.mobile = 'Mobile number is required';
  } else if (!validateMobile(form.mobile.trim())) {
    errors.mobile = 'Mobile number must be exactly 10 digits';
  }

  if (!form.address.trim()) {
    errors.address = 'Address is required';
  }

  if (!form.city) {
    errors.city = 'Please select a city';
  }

  if (!form.password) {
    errors.password = 'Password is required';
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};