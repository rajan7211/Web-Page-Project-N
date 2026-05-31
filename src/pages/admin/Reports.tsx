import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FiDownload, FiTrendingUp, FiDollarSign, FiUsers } from 'react-icons/fi';

export default function AdminReports() {
  const reports = [
    { title: 'Sales Report', description: 'Monthly sales overview', icon: FiDollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Customer Growth', description: 'New customer acquisition', icon: FiUsers, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Revenue Analytics', description: 'Detailed revenue breakdown', icon: FiTrendingUp, color: 'text-violet-600', bg: 'bg-violet-50' },
  ];

  return (
    <DashboardLayout title="Reports" subtitle="View and download business reports">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.title} className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100">
              <div className="flex items-start gap-3">
                <div className={`rounded-xl p-3 ${report.bg} ${report.color} text-xl`}>
                  <report.icon />
                </div>
                <div>
                  <CardTitle className="text-base">{report.title}</CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <Button className="w-full gap-2">
                <FiDownload className="h-4 w-4" />
                Download Report
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}