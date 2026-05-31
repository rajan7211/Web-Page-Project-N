import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
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

const forgotPasswordSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

export default function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      toast.success('Password reset link sent to your email!');
    },
  });

  if (isSubmitted) {
    return (
      <div className="min-h-[calc(100vh-84px)] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card className="rounded-3xl border-slate-200 shadow-2xl text-center">
            <CardContent className="p-8">
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <FiCheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Check your email</h2>
              <p className="text-slate-600 mb-6">
                We've sent a password reset link to{' '}
                <strong>{formik.values.email}</strong>
              </p>
              <Link to="/login">
                <Button className="w-full">Back to Login</Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-84px)] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="rounded-3xl border-slate-200 shadow-2xl">
          <CardHeader className="text-center pb-4 pt-8">
            <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg">
              <FiMail className="h-7 w-7" />
            </div>
            <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
            <CardDescription>Enter your email to receive a reset link</CardDescription>
          </CardHeader>

          <CardContent className="px-8">
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="you@example.com"
                    className={`pl-10 ${
                      formik.touched.email && formik.errors.email
                        ? 'border-red-300 bg-red-50'
                        : ''
                    }`}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-xs text-red-600">{formik.errors.email}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center pb-8 pt-2">
            <Link
              to="/login"
              className="text-sm text-slate-600 hover:text-blue-600 flex items-center gap-1"
            >
              <FiArrowLeft className="h-3 w-3" />
              Back to Login
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}



