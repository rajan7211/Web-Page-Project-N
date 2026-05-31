import { useMemo, useState } from 'react';
import { FiUsers, FiActivity, FiDollarSign, FiTrendingUp, FiSearch } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useSearch } from '@/hooks/useSearch';
import { usePagination } from '@/hooks/usePagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/shared/DataTable';
import { Pagination } from '@/components/shared/Pagination';

export default function AdminDashboard() {
  const { users } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const customers = useMemo(() => users.filter((u) => u.role === 'Customer'), [users]);
  const filteredCustomers = useSearch(customers, searchQuery, ['name', 'email']);

  const pagination = usePagination(filteredCustomers.length, 10);
  const paginatedCustomers = filteredCustomers.slice(pagination.startIndex, pagination.endIndex);

  const stats = [
    { title: 'Total Customers', value: customers.length, icon: FiUsers, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Active', value: customers.filter((c) => c.status === 'active').length, icon: FiActivity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Revenue', value: '$12,450', icon: FiDollarSign, color: 'text-violet-600', bg: 'bg-violet-50' },
    { title: 'Growth', value: '+15%', icon: FiTrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const columns = [
    {
      key: 'name' as const,
      label: 'Customer',
      render: (value: string, row: any) => (
        <div>
          <p className="font-semibold text-slate-900">{value}</p>
          <p className="text-xs text-slate-500">{row.email}</p>
        </div>
      ),
    },
    {
      key: 'createdAt' as const,
      label: 'Joined',
      render: (value: string) => new Date(value).toLocaleDateString(),
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
  ];

  return (
    <DashboardLayout title="Admin Dashboard" subtitle="Manage customers and track metrics">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="rounded-2xl border-slate-200 shadow-sm">
              <CardContent className="p-5 flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-2">{stat.value}</p>
                </div>
                <div className={`rounded-xl p-3 text-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Customer List */}
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <CardTitle className="text-lg font-bold">Customer List ({filteredCustomers.length})</CardTitle>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full sm:w-64"
                />
              </div>
            </div>
          </CardHeader>
          <DataTable data={paginatedCustomers} columns={columns} />
          <Pagination {...pagination} onPageChange={pagination.goToPage} />
        </Card>
      </div>
    </DashboardLayout>
  );
}


