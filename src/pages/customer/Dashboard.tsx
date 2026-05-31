import { useMemo } from 'react';
import { FiShoppingBag, FiHeart, FiClock, FiTrendingUp } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function CustomerDashboard() {
  const { currentUser, getOrdersForCustomer } = useAuth();

  const orders = useMemo(
    () => (currentUser ? getOrdersForCustomer(currentUser.id) : []),
    [currentUser, getOrdersForCustomer]
  );

  const stats = [
    {
      title: 'Total Orders',
      value: orders.length,
      icon: FiShoppingBag,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Pending',
      value: orders.filter((o) => o.status !== 'Delivered').length,
      icon: FiClock,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      title: 'Completed',
      value: orders.filter((o) => o.status === 'Delivered').length,
      icon: FiHeart,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      title: 'Total Spent',
      value: `$${orders.reduce((sum, o) => sum + o.total, 0)}`,
      icon: FiTrendingUp,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
    },
  ];

  return (
    <DashboardLayout
      title="Customer Dashboard"
      subtitle="Your account overview"
    >
      <div className="space-y-6">
        {/* Welcome Card */}
        <Card className="rounded-2xl border-slate-200 shadow-sm bg-gradient-to-br from-blue-50 to-slate-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-blue-600 text-white text-xl font-bold">
                  {currentUser?.firstName?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Welcome back, {currentUser?.firstName}!
                </h2>
                <p className="text-slate-600">Here's what's happening with your account</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="rounded-2xl border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`rounded-xl p-3 ${stat.bg} ${stat.color} text-2xl`}>
                    <stat.icon />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Orders */}
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-base font-semibold">Recent Orders</CardTitle>
            <CardDescription>Track your latest order details</CardDescription>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-semibold">{order.id}</TableCell>
                    <TableCell>{order.placedAt}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          order.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-700'
                            : order.status === 'Processing'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-amber-100 text-amber-700'
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold">${order.total}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-slate-400">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
}


