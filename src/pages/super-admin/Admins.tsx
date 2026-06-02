import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/shared/DataTable';
import { FiShield } from 'react-icons/fi';

export default function SuperAdminAdmins() {
  const { users, impersonateUser } = useAuth();
  const navigate = useNavigate();
  const admins = useMemo(() => users.filter((u) => u.role === 'Admin'), [users]);

  const handleImpersonate = (userId: string) => {
    impersonateUser(userId);
    navigate('/admin');
  };

  const columns = [
    {
      key: 'name' as const,
      label: 'Admin',
      render: (value: string, row: any) => (
        <div>
          <p className="font-semibold text-slate-900">{value}</p>
          <p className="text-xs text-slate-500">{row.email}</p>
        </div>
      ),
    },
    {
      key: 'status' as const,
      label: 'Status',
      render: (value: string) => (
        <Badge className={value === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'createdAt' as const,
      label: 'Joined',
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'id' as const,
      label: 'Actions',
      render: (value: string) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleImpersonate(value)}
            className="gap-1 text-blue-600 hover:text-blue-700"
          >
            <FiLogIn className="h-4 w-4" />
            Impersonate
          </Button>
          <Button variant="ghost" size="sm">Manage</Button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout title="Admin Management" subtitle="Manage admin accounts">
      <div className="space-y-6">
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="rounded-xl p-4 bg-blue-50 text-blue-600 text-3xl">
              <FiShield />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Admins</p>
              <p className="text-3xl font-bold text-slate-900">{admins.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-lg font-bold">Admin List</CardTitle>
          </CardHeader>
          <DataTable data={admins} columns={columns} />
        </Card>
      </div>
    </DashboardLayout>
  );
}