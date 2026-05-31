import { useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EmptyState } from '@/components/shared/EmptyState';

export default function CustomerOrders() {
  const { currentUser, getOrdersForCustomer } = useAuth();

  const orders = useMemo(
    () => (currentUser ? getOrdersForCustomer(currentUser.id) : []),
    [currentUser, getOrdersForCustomer]
  );

  return (
    <DashboardLayout title="My Orders" subtitle="View and track all your orders">
      <Card className="rounded-2xl border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-base font-semibold">
            Order History ({orders.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {orders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-semibold">{order.id}</TableCell>
                    <TableCell>{order.placedAt}</TableCell>
                    <TableCell>{order.items} items</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          order.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-700'
                            : order.status === 'Processing'
                            ? 'bg-blue-100 text-blue-700'
                            : order.status === 'Shipped'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-slate-100 text-slate-700'
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold">${order.total}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <EmptyState
              title="No orders yet"
              description="You haven't placed any orders. Start shopping to see your orders here."
            />
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

