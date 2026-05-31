import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  FiBell,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield,
  FiGlobe,
  FiTrash2,
} from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function CustomerSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    orderUpdates: true,
    newsletter: true,
    promotions: false,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: false,
    showActivity: false,
    allowAnalytics: true,
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    toast.success('Notification preference updated');
  };

  const handlePrivacyChange = (key: keyof typeof privacy) => {
    setPrivacy((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    toast.success('Privacy setting updated');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    toast.success('Password updated successfully');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      toast.error('Account deletion initiated. Please contact support to complete this action.');
    }
  };

  return (
    <DashboardLayout title="Settings" subtitle="Manage your account preferences">
      <div className="max-w-4xl space-y-6">
        {/* Notifications */}
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="rounded-xl p-2 bg-blue-50">
                <FiBell className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-base">Notifications</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications" className="text-sm font-medium">
                  Email Notifications
                </Label>
                <p className="text-xs text-slate-500">Receive notifications via email</p>
              </div>
              <Switch
                id="email-notifications"
                checked={notifications.email}
                onCheckedChange={() => handleNotificationChange('email')}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications" className="text-sm font-medium">
                  Push Notifications
                </Label>
                <p className="text-xs text-slate-500">Receive push notifications on your device</p>
              </div>
              <Switch
                id="push-notifications"
                checked={notifications.push}
                onCheckedChange={() => handleNotificationChange('push')}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="order-updates" className="text-sm font-medium">
                  Order Updates
                </Label>
                <p className="text-xs text-slate-500">Get notified about order status changes</p>
              </div>
              <Switch
                id="order-updates"
                checked={notifications.orderUpdates}
                onCheckedChange={() => handleNotificationChange('orderUpdates')}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="newsletter" className="text-sm font-medium">
                  Newsletter
                </Label>
                <p className="text-xs text-slate-500">Receive our weekly newsletter</p>
              </div>
              <Switch
                id="newsletter"
                checked={notifications.newsletter}
                onCheckedChange={() => handleNotificationChange('newsletter')}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="promotions" className="text-sm font-medium">
                  Promotional Emails
                </Label>
                <p className="text-xs text-slate-500">Receive special offers and promotions</p>
              </div>
              <Switch
                id="promotions"
                checked={notifications.promotions}
                onCheckedChange={() => handleNotificationChange('promotions')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="rounded-xl p-2 bg-violet-50">
                <FiShield className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <CardTitle className="text-base">Privacy</CardTitle>
                <CardDescription>Control your privacy settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="profile-visible" className="text-sm font-medium">
                  Public Profile
                </Label>
                <p className="text-xs text-slate-500">Make your profile visible to others</p>
              </div>
              <Switch
                id="profile-visible"
                checked={privacy.profileVisible}
                onCheckedChange={() => handlePrivacyChange('profileVisible')}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-activity" className="text-sm font-medium">
                  Show Activity
                </Label>
                <p className="text-xs text-slate-500">Display your recent activity</p>
              </div>
              <Switch
                id="show-activity"
                checked={privacy.showActivity}
                onCheckedChange={() => handlePrivacyChange('showActivity')}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="allow-analytics" className="text-sm font-medium">
                  Usage Analytics
                </Label>
                <p className="text-xs text-slate-500">Help us improve by sharing usage data</p>
              </div>
              <Switch
                id="allow-analytics"
                checked={privacy.allowAnalytics}
                onCheckedChange={() => handlePrivacyChange('allowAnalytics')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security - Change Password */}
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="rounded-xl p-2 bg-emerald-50">
                <FiLock className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-base">Change Password</CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                    }
                    placeholder="Enter current password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showCurrentPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                    }
                    placeholder="Enter new password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showNewPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                    }
                    placeholder="Confirm new password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full sm:w-auto">
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Language & Region */}
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="rounded-xl p-2 bg-amber-50">
                <FiGlobe className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <CardTitle className="text-base">Language & Region</CardTitle>
                <CardDescription>Set your preferred language and timezone</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select defaultValue="utc-5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                  <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                  <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                  <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="rounded-2xl border-red-200 shadow-sm">
          <CardHeader className="border-b border-red-100">
            <div className="flex items-center gap-3">
              <div className="rounded-xl p-2 bg-red-50">
                <FiTrash2 className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-base text-red-600">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions for your account</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="rounded-xl bg-red-50 p-4 border border-red-100">
                <h3 className="text-sm font-semibold text-red-900 mb-2">Delete Account</h3>
                <p className="text-xs text-red-700 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  className="gap-2"
                >
                  <FiTrash2 className="h-4 w-4" />
                  Delete My Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}


