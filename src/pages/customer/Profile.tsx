import { useState } from 'react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FiEdit2, FiSave, FiX, FiMail, FiUser, FiCalendar, FiShield } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const profileSchema = Yup.object({
  firstName: Yup.string()
    .min(3, 'At least 3 characters')
    .max(50, 'Maximum 50 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(3, 'At least 3 characters')
    .max(50, 'Maximum 50 characters')
    .required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone must be 10 digits'),
  address: Yup.string().max(200, 'Maximum 200 characters'),
});

export default function CustomerProfile() {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      email: currentUser?.email || '',
      phone: '',
      address: '',
    },
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      setIsLoading(false);
    },
  });

  const userInitial = currentUser?.firstName?.charAt(0)?.toUpperCase() || 'U';

  const handleCancel = () => {
    formik.resetForm();
    setIsEditing(false);
  };

  return (
    <DashboardLayout title="My Profile" subtitle="Manage your personal information">
      <div className="max-w-4xl space-y-6">
        {/* Profile Header Card */}
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-700 text-white text-3xl font-bold">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-slate-900">{currentUser?.name}</h2>
                <p className="text-slate-500 mt-1">{currentUser?.email}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700 hover:bg-blue-100"
                  >
                    <FiShield className="mr-1 h-3 w-3" />
                    {currentUser?.role}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                  >
                    Active
                  </Badge>
                </div>
              </div>
              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <FiEdit2 className="h-4 w-4" />
                  Edit Profile
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Profile Information Card */}
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-base font-semibold">Personal Information</CardTitle>
            <CardDescription>Update your personal details and information</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={formik.handleSubmit} className="space-y-5">
              {/* Name Fields */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-semibold text-slate-700">
                    First Name
                  </Label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={!isEditing}
                      className={`pl-10 ${
                        !isEditing ? 'bg-slate-50 cursor-not-allowed' : ''
                      } ${
                        formik.touched.firstName && formik.errors.firstName
                          ? 'border-red-300'
                          : ''
                      }`}
                    />
                  </div>
                  {formik.touched.firstName && formik.errors.firstName && (
                    <p className="text-xs text-red-600">{formik.errors.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-semibold text-slate-700">
                    Last Name
                  </Label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={!isEditing}
                      className={`pl-10 ${
                        !isEditing ? 'bg-slate-50 cursor-not-allowed' : ''
                      } ${
                        formik.touched.lastName && formik.errors.lastName
                          ? 'border-red-300'
                          : ''
                      }`}
                    />
                  </div>
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className="text-xs text-red-600">{formik.errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                  Email Address
                </Label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={!isEditing}
                    className={`pl-10 ${
                      !isEditing ? 'bg-slate-50 cursor-not-allowed' : ''
                    } ${formik.touched.email && formik.errors.email ? 'border-red-300' : ''}`}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-xs text-red-600">{formik.errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-slate-700">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="1234567890"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={!isEditing}
                  className={!isEditing ? 'bg-slate-50 cursor-not-allowed' : ''}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-xs text-red-600">{formik.errors.phone}</p>
                )}
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-semibold text-slate-700">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="123 Main Street, City, State"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={!isEditing}
                  className={!isEditing ? 'bg-slate-50 cursor-not-allowed' : ''}
                />
                {formik.touched.address && formik.errors.address && (
                  <p className="text-xs text-red-600">{formik.errors.address}</p>
                )}
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    <FiSave className="h-4 w-4" />
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="gap-2"
                  >
                    <FiX className="h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Account Details */}
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-base font-semibold">Account Details</CardTitle>
            <CardDescription>Your account information and status</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <FiCalendar className="text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Member Since</p>
                    <p className="text-xs text-slate-500">
                      {new Date(currentUser?.createdAt || '').toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <FiShield className="text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Account Type</p>
                    <p className="text-xs text-slate-500">{currentUser?.role}</p>
                  </div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                  Verified
                </Badge>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <FiUser className="text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Account Status</p>
                    <p className="text-xs text-slate-500 capitalize">{currentUser?.status}</p>
                  </div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                  Active
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}


