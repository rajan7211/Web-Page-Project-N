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
              {/* First Name */}
              <div className="space-y-1.5 relative">
                <Label className="text-sm font-semibold text-slate-700">
                  First Name
                </Label>
                <FiUser className="absolute left-3.5 top-10 text-slate-400 h-4 w-4" />
                <Input
                  id="firstName"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="John"
                  className={fieldClass('firstName')}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <FiAlertCircle className="h-3 w-3" />
                    {formik.errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-1.5 relative">
                <Label className="text-sm font-semibold text-slate-700">
                  Last Name
                </Label>
                <FiUser className="absolute left-3.5 top-10 text-slate-400 h-4 w-4" />
                <Input
                  id="lastName"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Doe"
                  className={fieldClass('lastName')}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <FiAlertCircle className="h-3 w-3" />
                    {formik.errors.lastName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5 relative">
                <Label className="text-sm font-semibold text-slate-700">
                  Email
                </Label>
                <FiMail className="absolute left-3.5 top-10 text-slate-400 h-4 w-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="you@example.com"
                  className={fieldClass('email')}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <FiAlertCircle className="h-3 w-3" />
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5 relative">
                <Label className="text-sm font-semibold text-slate-700">
                  Password
                </Label>
                <FiLock className="absolute left-3.5 top-10 text-slate-400 h-4 w-4" />

                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="••••••••"
                  className={`${fieldClass('password')} pr-10`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-slate-400"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>

                {formik.touched.password && formik.errors.password && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <FiAlertCircle className="h-3 w-3" />
                    {formik.errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5 relative">
                <Label className="text-sm font-semibold text-slate-700">
                  Confirm Password
                </Label>
                <FiLock className="absolute left-3.5 top-10 text-slate-400 h-4 w-4" />

                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="••••••••"
                  className={`${fieldClass('confirmPassword')} pr-10`}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-9 text-slate-400"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>

                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <FiAlertCircle className="h-3 w-3" />
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>

              {/* Role */}
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold text-slate-700">
                  Role
                </Label>

                <Select
                  value={formik.values.role}
                  onValueChange={(val) => formik.setFieldValue('role', val)}
                >
                  <SelectTrigger className="rounded-xl border-slate-200 bg-slate-50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Customer">Customer</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Super Admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="w-full rounded-xl py-5 font-bold bg-blue-600 text-white"
              >
                {isLoading ? (
                  <>
                    <FiLoader className="animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center pb-8">
            <p className="text-sm text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 font-bold">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

















