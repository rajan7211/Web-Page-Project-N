import { useState, useMemo } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
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
import CustomerStatusBoard from './CustomerStatusBoard';

export default function AdminCustomers() {
  const { users } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const customers = useMemo(() => users.filter((u) => u.role === 'Customer'), [users]);
  const searchedCustomers = useSearch(customers, searchQuery, ['name', 'email']);
  const filteredCustomers = useMemo(
    () => (statusFilter === 'All' ? searchedCustomers : searchedCustomers.filter((c) => c.status === statusFilter)),
    [searchedCustomers, statusFilter]
  );

  const pagination = usePagination(filteredCustomers.length, 15);
  const paginatedCustomers = filteredCustomers.slice(pagination.startIndex, pagination.endIndex);

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
      label: 'Joined Date',
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
    {
      key: 'id' as const,
      label: 'Actions',
      render: () => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">View</Button>
          <Button variant="ghost" size="sm">Edit</Button>
        </div>
      ),
    },
  ];

   return (
  <DashboardLayout
    title="Customers"
    subtitle="Manage all customer accounts"
  >
    {/* Drag & Drop Status Board */}
    <CustomerStatusBoard />

    <Card className="rounded-2xl border-slate-200 shadow-sm mt-6">
      <CardHeader className="border-b border-slate-100">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <CardTitle className="text-lg font-bold">
            All Customers ({filteredCustomers.length})
          </CardTitle>

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

            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full sm:w-40">
                <FiFilter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="All">
                  All Status
                </SelectItem>

                <SelectItem value="active">
                  Active
                </SelectItem>

                <SelectItem value="inactive">
                  Inactive
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <DataTable
        data={paginatedCustomers}
        columns={columns}
      />

      <Pagination
        {...pagination}
        onPageChange={pagination.goToPage}
      />
    </Card>
  </DashboardLayout>
);


}




