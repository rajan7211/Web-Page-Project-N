import { useState } from 'react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiBell,
  FiShield,
  FiSave,
  FiSettings as FiSettingsIcon,
} from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const adminProfileSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(50, 'Maximum 50 characters')
    .required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone must be 10 digits'),
});

export default function AdminSettings() {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    customerAlerts: true,
    weeklyReports: true,
    systemUpdates: false,
  });

  const [security, setSececurity] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: true,
  });

  const formik = useFormik({
    initialValues: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: '',
    },
    validationSchema: adminProfileSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Settings updated successfully!');
      setIsLoading(false);
    },
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success('Notification preference updated');
  };

  const handleSecurityChange = (key: keyof typeof security) => {
    setSececurity((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success('Security setting updated');
  };

  return (
    <DashboardLayout title="Admin Settings" subtitle="Configure your admin preferences">
      <div className="max-w-4xl space-y-6">
        {/* Profile Information */}
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="rounded-xl p-2 bg-blue-50">
                <FiUser className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-base">Profile Information</CardTitle>
                <CardDescription>Manage your admin account details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your full name"
                  className={
                    formik.touched.name && formik.errors.name ? 'border-red-300' : ''
                  }
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-xs text-red-600">{formik.errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`pl-10 ${
                      formik.touched.email && formik.errors.email ? 'border-red-300' : ''
                    }`}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-xs text-red-600">{formik.errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="1234567890"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-xs text-red-600">{formik.errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <div className="flex items-center gap-2">
                  <Input value={currentUser?.role} disabled className="bg-slate-50" />
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                    Admin
                  </Badge>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <FiSave className="h-4 w-4" />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="rounded-xl p-2 bg-violet-50">
                <FiBell className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <CardTitle className="text-base">Notification Preferences</CardTitle>
                <CardDescription>Manage your admin notifications</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Email Alerts</Label>
                <p className="text-xs text-slate-500">
                  Receive email notifications for important events
                </p>
              </div>
              <Switch
                checked={notifications.emailAlerts}
                onCheckedChange={() => handleNotificationChange('emailAlerts')}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Customer Alerts</Label>
                <p className="text-xs text-slate-500">
                  Get notified about new customer registrations
                </p>
              </div>
              <Switch
                checked={notifications.customerAlerts}
                onCheckedChange={() => handleNotificationChange('customerAlerts')}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Weekly Reports</Label>
                <p className="text-xs text-slate-500">
                  Receive weekly summary reports via email
                </p>
              </div>
              <Switch
                checked={notifications.weeklyReports}
                onCheckedChange={() => handleNotificationChange('weeklyReports')}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">System Updates</Label>
                <p className="text-xs text-slate-500">
                  Get notified about platform updates and maintenance
                </p>
              </div>
              <Switch
                checked={notifications.systemUpdates}
                onCheckedChange={() => handleNotificationChange('systemUpdates')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="rounded-xl p-2 bg-emerald-50">
                <FiShield className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-base">Security Settings</CardTitle>
                <CardDescription>Manage your account security preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                <p className="text-xs text-slate-500">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch
                checked={security.twoFactorAuth}
                onCheckedChange={() => handleSecurityChange('twoFactorAuth')}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Login Alerts</Label>
                <p className="text-xs text-slate-500">
                  Get notified when someone logs into your account
                </p>
              </div>
              <Switch
                checked={security.loginAlerts}
                onCheckedChange={() => handleSecurityChange('loginAlerts')}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Session Timeout</Label>
                <p className="text-xs text-slate-500">
                  Automatically log out after 30 minutes of inactivity
                </p>
              </div>
              <Switch
                checked={security.sessionTimeout}
                onCheckedChange={() => handleSecurityChange('sessionTimeout')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="rounded-xl p-2 bg-amber-50">
                <FiLock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <CardTitle className="text-base">Change Password</CardTitle>
                <CardDescription>Update your password regularly for security</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <div className="relative">
                <Input
                  type={showCurrentPassword ? 'text' : 'password'}
                  placeholder="Enter current password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showCurrentPassword ? (
                    <FiEyeOff className="h-4 w-4" />
                  ) : (
                    <FiEye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>New Password</Label>
              <div className="relative">
                <Input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showNewPassword ? (
                    <FiEyeOff className="h-4 w-4" />
                  ) : (
                    <FiEye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              onClick={() => toast.success('Password updated successfully!')}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Update Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}


