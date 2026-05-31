import { useState, useMemo } from 'react';
import { FiSearch, FiFilter, FiUserPlus } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useSearch } from '@/hooks/useSearch';
import { usePagination } from '@/hooks/usePagination';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/shared/DataTable';
import { Pagination } from '@/components/shared/Pagination';

export default function SuperAdminUsers() {
  const { users } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const searchedUsers = useSearch(users, searchQuery, ['name', 'email']);
  const filteredUsers = useMemo(() => {
    let result = searchedUsers;
    if (roleFilter !== 'All') result = result.filter((u) => u.role === roleFilter);
    if (statusFilter !== 'All') result = result.filter((u) => u.status === statusFilter);
    return result;
  }, [searchedUsers, roleFilter, statusFilter]);

  const pagination = usePagination(filteredUsers.length, 15);
  const paginatedUsers = filteredUsers.slice(pagination.startIndex, pagination.endIndex);

  const getRoleBadge = (role: string) => {
    if (role === 'Super Admin') return 'bg-slate-900 text-white';
    if (role === 'Admin') return 'bg-blue-100 text-blue-700';
    return 'bg-emerald-100 text-emerald-700';
  };

  const columns = [
    {
      key: 'name' as const,
      label: 'User',
      render: (value: string, row: any) => (
        <div>
          <p className="font-semibold text-slate-900">{value}</p>
          <p className="text-xs text-slate-500">{row.email}</p>
        </div>
      ),
    },
    {
      key: 'role' as const,
      label: 'Role',
      render: (value: string) => <Badge className={`text-xs font-bold ${getRoleBadge(value)}`}>{value}</Badge>,
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
      render: () => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">Edit</Button>
          <Button variant="ghost" size="sm" className="text-red-600">Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout title="All Users" subtitle="Manage all system users">
      <Card className="rounded-2xl border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100">
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <CardTitle className="text-lg font-bold">User Management ({filteredUsers.length})</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full sm:w-64"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-36">
                  <FiFilter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Roles</SelectItem>
                  <SelectItem value="Super Admin">Super Admin</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Customer">Customer</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button className="gap-2">
                <FiUserPlus className="h-4 w-4" />
                Add User
              </Button>
            </div>
          </div>
        </CardHeader>
        <DataTable data={paginatedUsers} columns={columns} />
        <Pagination {...pagination} onPageChange={pagination.goToPage} />
      </Card>
    </DashboardLayout>
  );
}



