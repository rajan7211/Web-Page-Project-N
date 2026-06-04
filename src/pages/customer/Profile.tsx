import { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  FiEdit2,
  FiSave,
  FiX,
  FiMail,
  FiUser,
  FiCalendar,
  FiShield,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiKey,
  FiLock,
} from 'react-icons/fi';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import EditProfileImage from '@/components/profile/EditProfileImage';

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
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone must be 10 digits')
    .notRequired(),
  address: Yup.string().max(200, 'Maximum 200 characters').notRequired(),
});

export default function CustomerProfile() {
  const { currentUser, updateUserProfile } = useAuth();
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
      if (!currentUser) return;

      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      updateUserProfile(currentUser.id, {
        firstName: values.firstName,
        lastName: values.lastName,
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
      });

      toast.success('Profile updated successfully!', {
        position: 'top-right',
        autoClose: 2000,
      });
      setIsEditing(false);
      setIsLoading(false);
    },
  });

  const handleImageUpdate = (base64Image: string | null) => {
    if (currentUser && base64Image) {
      updateUserProfile(currentUser.id, {
        profileImage: base64Image,
      });
    }
  };

  const userInitial = useMemo(
    () => currentUser?.firstName?.charAt(0)?.toUpperCase() || 'U',
    [currentUser?.firstName]
  );

  const memberSinceDate = useMemo(() => {
    return new Date(currentUser?.createdAt || '').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [currentUser?.createdAt]);

  const handleCancel = () => {
    formik.resetForm();
    setIsEditing(false);
  };

  return (
    <DashboardLayout title="My Profile" subtitle="Manage your personal information and preferences">
      <div className="max-w-7xl space-y-8">
        {/* PROFILE HEADER WITH IMAGE SECTION  */}
        <div className="rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 p-8 shadow-sm overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600" />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Left Column - Profile Image */}
            <div className="lg:col-span-1">
              <EditProfileImage
                userName={currentUser?.name || 'User'}
                userInitial={userInitial}
                onImageUpdate={handleImageUpdate}
              />
            </div>
            <div className="lg:col-span-3 space-y-6">
              {/* Welcome Section */}
              <div>
                <h1 className="text-4xl font-bold text-slate-900">{currentUser?.name}</h1>
                <p className="text-slate-600 mt-2 flex items-center gap-2">
                  <FiMail className="h-4 w-4" />
                  {currentUser?.email}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 font-semibold px-4 py-2 text-sm">
                  <FiShield className="mr-2 h-4 w-4" />
                  {currentUser?.role}
                </Badge>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 font-semibold px-4 py-2 text-sm">
                  <FiCheckCircle className="mr-2 h-4 w-4" />
                  {currentUser?.status}
                </Badge>
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 font-semibold px-4 py-2 text-sm">
                  <FiCalendar className="mr-2 h-4 w-4" />

                </Badge>
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 font-semibold px-4 py-2 text-sm">
                  <FiClock className="mr-2 h-4 w-4" />
                  Verified
                </Badge>
              </div>

              {/* Description */}
              <p className="text-slate-600 leading-relaxed">
                Welcome to your profile dashboard! Here you can manage your personal information,
                upload and change your profile picture, and update your account settings. Your
                profile image is securely stored in your browser's local storage.
              </p>

              {/* Edit Button */}
              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <FiEdit2 className="h-4 w-4" />
                  Edit Profile Information
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* EDIT FORM SECTION */}
        {isEditing && (
          <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-8 py-6 border-b border-slate-200">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FiUser className="h-4 w-4 text-blue-600" />
                </div>
                Personal Information
              </CardTitle>
              <CardDescription className="mt-2">
                Update your personal details and contact information
              </CardDescription>
            </div>

            <CardContent className="p-8">
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2.5">
                    <Label htmlFor="firstName" className="text-sm font-semibold text-slate-700">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="John"
                      className={`rounded-xl transition-all ${
                        formik.touched.firstName && formik.errors.firstName
                          ? 'border-red-300 focus:ring-red-200'
                          : 'border-slate-200 focus:ring-blue-200'
                      }`}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div className="flex items-center gap-2 text-xs text-red-600">
                        <FiAlertCircle className="h-3.5 w-3.5" />
                        {formik.errors.firstName}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    <Label htmlFor="lastName" className="text-sm font-semibold text-slate-700">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Doe"
                      className={`rounded-xl transition-all ${
                        formik.touched.lastName && formik.errors.lastName
                          ? 'border-red-300 focus:ring-red-200'
                          : 'border-slate-200 focus:ring-blue-200'
                      }`}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <div className="flex items-center gap-2 text-xs text-red-600">
                        <FiAlertCircle className="h-3.5 w-3.5" />
                        {formik.errors.lastName}
                      </div>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2.5">
                  <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="john@example.com"
                    className={`rounded-xl transition-all ${
                      formik.touched.email && formik.errors.email
                        ? 'border-red-300 focus:ring-red-200'
                        : 'border-slate-200 focus:ring-blue-200'
                    }`}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="flex items-center gap-2 text-xs text-red-600">
                      <FiAlertCircle className="h-3.5 w-3.5" />
                      {formik.errors.email}
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2.5">
                  <Label htmlFor="phone" className="text-sm font-semibold text-slate-700">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="1234567890"
                    className="rounded-xl"
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="flex items-center gap-2 text-xs text-red-600">
                      <FiAlertCircle className="h-3.5 w-3.5" />
                      {formik.errors.phone}
                    </div>
                  )}
                </div>

                {/* Address */}
                <div className="space-y-2.5">
                  <Label htmlFor="address" className="text-sm font-semibold text-slate-700">
                    Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="123 Main Street, City, State"
                    className="rounded-xl"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 border-t border-slate-100">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="gap-2 bg-blue-600 hover:bg-blue-700 flex-1 rounded-xl font-semibold"
                  >
                    <FiSave className="h-4 w-4" />
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="gap-2 flex-1 rounded-xl font-semibold"
                  >
                    <FiX className="h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* ACCOUNT DETAILS GRID  */}
        {!isEditing && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Account Type Card */}
            <Card className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <FiShield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 font-medium">Account Type</p>
                      <p className="text-lg font-semibold text-slate-900 mt-1">
                        {currentUser?.role}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 whitespace-nowrap">
                    Verified
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Status Card */}
            <Card className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <FiCheckCircle className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 font-medium">Status</p>
                      <p className="text-lg font-semibold text-slate-900 mt-1 capitalize">
                        {currentUser?.status}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 whitespace-nowrap">
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Member Since Card */}
            <Card className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <FiCalendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Member Since</p>
                    <p className="text-lg font-semibold text-slate-900 mt-1">
                      {memberSinceDate}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Last Updated Card */}
            <Card className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <FiClock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Last Updated</p>
                    <p className="text-lg font-semibold text-slate-900 mt-1">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* SECURITY SECTION */}
        {!isEditing && (
          <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-8 py-6 border-b border-slate-200">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                  <FiShield className="h-4 w-4 text-red-600" />
                </div>
                Security Settings
              </CardTitle>
              <CardDescription className="mt-2">
                Manage your security settings and preferences
              </CardDescription>
            </div>

            <CardContent className="p-8">
              <div className="space-y-4">
                {/* Password Card */}
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 border border-slate-200 hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                      <FiKey className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Password</p>
                      <p className="text-sm text-slate-500">Change your password regularly</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg whitespace-nowrap"
                  >
                    Change
                  </Button>
                </div>

                <Separator className="bg-slate-200" />

                {/* Two-Factor Auth Card */}
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 border border-slate-200 hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <FiLock className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Two-Factor Authentication</p>
                      <p className="text-sm text-slate-500">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Badge className="bg-slate-200 text-slate-700 hover:bg-slate-200 whitespace-nowrap">
                    Not Enabled
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}






















