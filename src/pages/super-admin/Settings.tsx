import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function SuperAdminSettings() {
  return (
    <DashboardLayout title="System Settings" subtitle="Configure platform settings">
      <div className="max-w-3xl space-y-6">
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-base">Platform Configuration</CardTitle>
            <CardDescription>Manage system-wide settings</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label>Platform Name</Label>
              <Input defaultValue="Whitepace Portal" />
            </div>
            <div className="space-y-2">
              <Label>Support Email</Label>
              <Input defaultValue="support@whitepace.com" type="email" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-base">Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label>Two-Factor Authentication</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Session Timeout</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>IP Whitelist</Label>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm border-red-200">
          <CardHeader className="border-b border-red-100">
            <CardTitle className="text-base text-red-600">Danger Zone</CardTitle>
            <CardDescription>Irreversible system actions</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-3">
            <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">
              Clear All Logs
            </Button>
            <Button variant="destructive" className="w-full">
              Reset Platform
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}


