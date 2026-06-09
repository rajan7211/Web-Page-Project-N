import { useState } from 'react';
import { FiUsers, FiShield, FiUser, FiCheckCircle, FiSearch } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useSearch } from '@/hooks/useSearch';
import { usePagination } from '@/hooks/usePagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function SuperAdminDashboard() {
  const { users } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // Search users
  const searchedUsers = useSearch(users, searchQuery, ['name', 'email', 'role']);

  // Pagination
  const pagination = usePagination(searchedUsers.length, 5);
  const paginatedUsers = searchedUsers.slice(pagination.startIndex, pagination.endIndex);

  // Simple stats
  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      icon: FiUsers,
      color: 'bg-blue-500',
    },
    {
      title: 'Admins',
      value: users.filter((u) => u.role === 'Admin').length,
      icon: FiShield,
      color: 'bg-indigo-500',
    },
    {
      title: 'Customers',
      value: users.filter((u) => u.role === 'Customer').length,
      icon: FiUser,
      color: 'bg-emerald-500',
    },
    {
      title: 'Active',
      value: users.filter((u) => u.status === 'active').length,
      icon: FiCheckCircle,
      color: 'bg-sky-500',
    },
  ];

  return (
    <DashboardLayout title="Dashboard" subtitle="System overview and user management">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="rounded-xl border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`rounded-lg p-3 text-white ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* User Table */}
        <Card className="rounded-xl border-slate-200">
          <CardHeader className="border-b border-slate-100">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <CardTitle className="text-base font-semibold">
                All Users ({searchedUsers.length})
              </CardTitle>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full sm:w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {paginatedUsers.length > 0 ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="font-semibold">User</TableHead>
                      <TableHead className="font-semibold">Role</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-slate-50">
                        <TableCell>
                          <div>
                            <p className="font-medium text-slate-900">{user.name}</p>
                            <p className="text-sm text-slate-500">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              user.role === 'Super Admin'
                                ? 'bg-slate-900 text-white'
                                : user.role === 'Admin'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                user.status === 'active'
                                  ? 'bg-emerald-500'
                                  : 'bg-amber-400'
                              }`}
                            />
                            <span className="text-sm text-slate-600 capitalize">
                              {user.status}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Simple Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
                  <p className="text-sm text-slate-500">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => pagination.prevPage()}
                      disabled={!pagination.hasPrev}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => pagination.nextPage()}
                      disabled={!pagination.hasNext}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-slate-500">No users found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}