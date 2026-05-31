import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiLoader,
  FiCheckCircle,
  FiAlertCircle,
} from 'react-icons/fi';

import { useAuth } from '@/hooks/useAuth';
import { registerSchema } from '@/schemas/validation';
import { RegisterData } from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik<RegisterData>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'Customer',
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await register(values);
        if (values.role === 'Customer') {
          toast.success(`Welcome ${values.firstName}!`);
          setTimeout(() => {
            navigate('/', { replace: true });
            window.location.reload();
          }, 500);
        } else {
          toast.success('Registration successful! Please login.');
          navigate('/login', { replace: true });
        }
      } catch (error: any) {
        toast.error(error?.message || 'Registration failed.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  const isFormValid =
    formik.values.firstName &&
    formik.values.lastName &&
    formik.values.email &&
    formik.values.password &&
    formik.values.confirmPassword &&
    formik.values.role &&
    Object.keys(formik.errors).length === 0;

  const fieldClass = (name: keyof RegisterData) =>
    `rounded-xl border transition-all pl-10 ${
      formik.touched[name] && formik.errors[name]
        ? 'border-red-300 bg-red-50 focus-visible:ring-red-200'
        : 'border-slate-200 bg-slate-50 focus-visible:ring-blue-100'
    }`;

  // Password strength indicator
  const getPasswordStrength = () => {
    const password = formik.values.password;
    if (!password) return { strength: 0, label: '', color: '' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) return { strength, label: 'Weak', color: 'bg-red-500' };
    if (strength <= 3) return { strength, label: 'Medium', color: 'bg-amber-500' };
    if (strength <= 4) return { strength, label: 'Strong', color: 'bg-emerald-500' };
    return { strength, label: 'Very Strong', color: 'bg-emerald-600' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-[calc(100vh-84px)] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-2xl"
      >
        <Card className="rounded-3xl border-slate-200 shadow-2xl shadow-slate-200/70 backdrop-blur-sm bg-white/95">
          <CardHeader className="text-center pb-4 pt-8">
            <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30">
              <FiUser className="h-7 w-7" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">
              Create Account
            </CardTitle>
            <CardDescription>
              Join Whitepace today and start your journey
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8">
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              {/* Name Row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <FieldWrapper
                  id="firstName"
                  label="First Name"
                  error={
                    formik.touched.firstName && formik.errors.firstName
                      ? formik.errors.firstName
                      : undefined
                  }
                >
                  <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
                  <Input
                    id="firstName"
                    name="firstName"
                    autoComplete="given-name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="John"
                    className={fieldClass('firstName')}
                  />
                </FieldWrapper>

                <FieldWrapper
                  id="lastName"
                  label="Last Name"
                  error={
                    formik.touched.lastName && formik.errors.lastName
                      ? formik.errors.lastName
                      : undefined
                  }
                >
                  <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
                  <Input
                    id="lastName"
                    name="lastName"
                    autoComplete="family-name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Doe"
                    className={fieldClass('lastName')}
                  />
                </FieldWrapper>
              </div>

              {/* Email */}
              <FieldWrapper
                id="email"
                label="Email Address"
                error={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : undefined
                }
              >
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="you@example.com"
                  className={fieldClass('email')}
                />
              </FieldWrapper>

              {/* Password */}
              <FieldWrapper
                id="password"
                label="Password"
                error={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : undefined
                }
              >
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="••••••••"
                  className={`${fieldClass('password')} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? (
                    <FiEyeOff className="h-4 w-4" />
                  ) : (
                    <FiEye className="h-4 w-4" />
                  )}
                </button>
              </FieldWrapper>

              {/* Password Strength Indicator */}
              {formik.values.password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(passwordStrength.strength / 5) * 100}%`,
                        }}
                        className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-600">
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 space-y-1">
                    <p className="flex items-center gap-1.5">
                      {formik.values.password.length >= 8 ? (
                        <FiCheckCircle className="text-emerald-500" />
                      ) : (
                        <FiAlertCircle className="text-slate-300" />
                      )}
                      At least 8 characters
                    </p>
                    <p className="flex items-center gap-1.5">
                      {/[A-Z]/.test(formik.values.password) ? (
                        <FiCheckCircle className="text-emerald-500" />
                      ) : (
                        <FiAlertCircle className="text-slate-300" />
                      )}
                      One uppercase letter
                    </p>
                    <p className="flex items-center gap-1.5">
                      {/[a-z]/.test(formik.values.password) ? (
                        <FiCheckCircle className="text-emerald-500" />
                      ) : (
                        <FiAlertCircle className="text-slate-300" />
                      )}
                      One lowercase letter
                    </p>
                    <p className="flex items-center gap-1.5">
                      {/[0-9]/.test(formik.values.password) ? (
                        <FiCheckCircle className="text-emerald-500" />
                      ) : (
                        <FiAlertCircle className="text-slate-300" />
                      )}
                      One number
                    </p>
                    <p className="flex items-center gap-1.5">
                      {/[^A-Za-z0-9]/.test(formik.values.password) ? (
                        <FiCheckCircle className="text-emerald-500" />
                      ) : (
                        <FiAlertCircle className="text-slate-300" />
                      )}
                      One special character
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Confirm Password */}
              <FieldWrapper
                id="confirmPassword"
                label="Confirm Password"
                error={
                  formik.touched.confirmPassword && formik.errors.confirmPassword
                    ? formik.errors.confirmPassword
                    : undefined
                }
              >
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="••••••••"
                  className={`${fieldClass('confirmPassword')} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="h-4 w-4" />
                  ) : (
                    <FiEye className="h-4 w-4" />
                  )}
                </button>
              </FieldWrapper>

              {/* Role Select */}
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold text-slate-700">
                  Select User Role
                </Label>
                <Select
                  value={formik.values.role}
                  onValueChange={(val) => formik.setFieldValue('role', val)}
                >
                  <SelectTrigger className="rounded-xl border-slate-200 bg-slate-50 focus:ring-blue-100">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Customer">Customer (User)</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Super Admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.role && formik.errors.role && (
                  <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                    <FiAlertCircle className="h-3 w-3" />
                    {formik.errors.role}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`w-full rounded-xl py-5 text-sm font-bold shadow-lg mt-2 transition-all ${
                  isLoading || !isFormValid
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-blue-500/25'
                }`}
              >
                {isLoading ? (
                  <>
                    <FiLoader className="h-4 w-4 animate-spin mr-2" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center pb-8 pt-2">
            <p className="text-sm text-slate-500">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Login here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

// Reusable Field Wrapper Component
interface FieldWrapperProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

function FieldWrapper({ id, label, error, children }: FieldWrapperProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label}
      </Label>
      <div className="relative">{children}</div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-600 font-medium flex items-center gap-1"
        >
          <FiAlertCircle className="h-3 w-3" />
          {error}
        </motion.p>
      )}
    </div>
  );
}


