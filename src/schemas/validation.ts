import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export const registerSchema = Yup.object({
  firstName: Yup.string()
    .min(3, 'First name must be at least 3 characters')
    .max(50, 'First name cannot exceed 50 characters')
    .required('First name is required'),

  lastName: Yup.string()
    .min(3, 'Last name must be at least 3 characters')
    .max(50, 'Last name cannot exceed 50 characters')
    .required('Last name is required'),

  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Must contain at least one special character')
    .required('Password is required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),

  role: Yup.string()
    .oneOf(['Super Admin', 'Admin', 'Customer'])
    .required('Please select a role'),
});



