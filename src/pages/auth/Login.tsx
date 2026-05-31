import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
  FiLogIn,
} from 'react-icons/fi';

import { useAuth } from '@/hooks/useAuth';
import { loginSchema } from '@/schemas/validation';
import { LoginData } from '@/types';

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
import { Checkbox } from '@/components/ui/checkbox';

export default function Login() {
  const { login, isAuthenticated, currentUser, getDashboardRoute } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      navigate(getDashboardRoute(currentUser.role), { replace: true });
    }
  }, [isAuthenticated, currentUser, getDashboardRoute, navigate]);

  const formik = useFormik<LoginData>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const user = await login(values);
        if (!rememberMe) {
          localStorage.removeItem('isAuthenticated');
        }
        toast.success(`Welcome back, ${user.firstName || user.name}!`, {
          autoClose: 2000,
        });
        const destination =
          (location.state as any)?.from?.pathname || getDashboardRoute(user.role);
        navigate(destination, { replace: true });
      } catch (error: any) {
        toast.error(error?.message || 'Invalid credentials. Please try again.', {
          autoClose: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const isFormValid =
    Boolean(formik.values.email) &&
    Boolean(formik.values.password) &&
    Object.keys(formik.errors).length === 0;

  return (
    <div className="min-h-[calc(100vh-84px)] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md"
      >
        <Card className="rounded-3xl border-slate-200 shadow-2xl shadow-slate-200/70 backdrop-blur-sm bg-white/95">
          <CardHeader className="text-center pb-4 pt-8">
            <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30">
              <FiLogIn className="h-7 w-7" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-sm">
              Login to access your personalized dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8">
            <form onSubmit={formik.handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                  Email Address
                </Label>
                <div className="relative">
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
                    className={`pl-10 rounded-xl border transition-all ${
                      formik.touched.email && formik.errors.email
                        ? 'border-red-300 bg-red-50 focus-visible:ring-red-200'
                        : 'border-slate-200 bg-slate-50 focus-visible:ring-blue-100'
                    }`}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-600 font-medium flex items-center gap-1"
                  >
                    <FiAlertCircle className="h-3 w-3" />
                    {formik.errors.email}
                  </motion.p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
                  Password
                </Label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="••••••••"
                    className={`pl-10 pr-10 rounded-xl border transition-all ${
                      formik.touched.password && formik.errors.password
                        ? 'border-red-300 bg-red-50 focus-visible:ring-red-200'
                        : 'border-slate-200 bg-slate-50 focus-visible:ring-blue-100'
                    }`}
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
                </div>
                {formik.touched.password && formik.errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-600 font-medium flex items-center gap-1"
                  >
                    <FiAlertCircle className="h-3 w-3" />
                    {formik.errors.password}
                  </motion.p>
                )}
              </div>

              {/* Remember Me / Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer select-none">
                  <Checkbox
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  Remember me
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`w-full rounded-xl py-5 text-sm font-bold shadow-lg transition-all ${
                  isLoading || !isFormValid
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-blue-500/25'
                }`}
              >
                {isLoading ? (
                  <>
                    <FiLoader className="h-4 w-4 animate-spin mr-2" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              {/* Status Indicator */}
              <div className="flex items-center justify-center gap-2 text-xs">
                {isFormValid ? (
                  <>
                    <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 font-medium">
                      Valid credentials entered
                    </span>
                  </>
                ) : (
                  <>
                    <FiAlertCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-slate-400">
                      Please enter your login details
                    </span>
                  </>
                )}
              </div>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-xs font-semibold text-blue-900 mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-xs text-blue-700">
                <p>
                  <strong>Super Admin:</strong> superadmin@demo.com / SuperAdmin123!
                </p>
                <p>
                  <strong>Admin:</strong> admin@demo.com / AdminDemo123!
                </p>
                <p>
                  <strong>Customer:</strong> customer@demo.com / Customer123!
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center pb-8 pt-2">
            <p className="text-sm text-slate-500">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Create an account
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}





