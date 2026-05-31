import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FiTrendingUp, FiUsers, FiDollarSign, FiActivity } from 'react-icons/fi';

export default function SuperAdminAnalytics() {
  const analytics = [
    { title: 'Total Revenue', value: '$45,231', change: '+20.1%', icon: FiDollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Total Users', value: '2,456', change: '+12.5%', icon: FiUsers, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Active Sessions', value: '543', change: '+5.3%', icon: FiActivity, color: 'text-violet-600', bg: 'bg-violet-50' },
    { title: 'Growth Rate', value: '+18%', change: '+3.2%', icon: FiTrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <DashboardLayout title="Analytics" subtitle="Platform performance metrics">
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {analytics.map((stat) => (
            <Card key={stat.title} className="rounded-2xl border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
                    <p className="text-xs text-emerald-600 font-medium mt-1">{stat.change}</p>
                  </div>
                  <div className={`rounded-xl p-3 ${stat.bg} ${stat.color} text-2xl`}>
                    <stat.icon />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-base">Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue trend</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-64 flex items-center justify-center text-slate-400">
              Chart placeholder - Integrate chart library here
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}


