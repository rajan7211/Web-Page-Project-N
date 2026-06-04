import { ReactNode, useMemo, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FiHome,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiX,
  FiLogOut,
  FiChevronRight,
  FiShield,
  FiHelpCircle,
  FiAlertTriangle,
} from 'react-icons/fi';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface MenuItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const roleMenu: Record<string, MenuItem[]> = {
  'Super Admin': [
    { label: 'Dashboard', path: '/super-admin', icon: FiHome },
    { label: 'All Users', path: '/super-admin/users', icon: FiUsers },
    { label: 'Admins', path: '/super-admin/admins', icon: FiShield },
    { label: 'Analytics', path: '/super-admin/analytics', icon: FiBarChart2 },
    { label: 'Settings', path: '/super-admin/settings', icon: FiSettings },
  ],
  Admin: [
    { label: 'Dashboard', path: '/admin', icon: FiHome },
    { label: 'Customers', path: '/admin/customers', icon: FiUsers },
    { label: 'Reports', path: '/admin/reports', icon: FiBarChart2 },
    { label: 'Settings', path: '/admin/settings', icon: FiSettings },
  ],
  Customer: [
    { label: 'Dashboard', path: '/customer', icon: FiHome },
    { label: 'My Profile', path: '/customer/profile', icon: FiUser },
    { label: 'My Orders', path: '/customer/orders', icon: FiShoppingBag },
    { label: 'Settings', path: '/customer/settings', icon: FiSettings },
  ],
};

interface DashboardLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function DashboardLayout({ title, subtitle, children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, originalUser, isImpersonating, stopImpersonating } = useAuth();

  const menuItems = useMemo(
    () => (currentUser?.role ? roleMenu[currentUser.role] || [] : []),
    [currentUser?.role]
  );

  const activePath = location.pathname;

  const handleLogout = useCallback(() => {
    logout();
    toast.success('Logged out successfully!', {
      position: 'top-right',
      autoClose: 2000,
    });
    navigate('/login');
    setShowLogoutConfirm(false);
  }, [logout, navigate]);

  const userInitial = useMemo(
    () => currentUser?.firstName?.charAt(0)?.toUpperCase() || 'U',
    [currentUser?.firstName]
  );

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`;
    }
    return name.charAt(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="flex">
      {/* sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 flex flex-col bg-white border-r border-slate-200 shadow-2xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Logo Section */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                  Whitepace
                </p>
                <h1 className="text-sm font-bold text-slate-900">Portal</h1>
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(false)}
              className="lg:hidden h-9 w-9 rounded-lg"
            >
              <FiX className="h-5 w-5 text-slate-500" />
            </Button>
          </div>

          {/* User Profile Section */}
          <div className="px-4 py-5">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-sm group-hover:blur-md transition-all" />
              <div className="relative flex items-center gap-3 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-3 border border-slate-200">
                <Avatar className="h-11 w-11 ring-2 ring-white shadow-md flex-shrink-0">
                  {currentUser?.profileImage ? (
                    <AvatarImage
                      src={currentUser.profileImage}
                      alt={currentUser.name}
                      className="object-cover"
                    />
                  ) : null}
                  
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-sm">
                    {getInitials(currentUser?.name || 'User')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900">
                    {currentUser?.firstName}
                  </p>
                  <p className="truncate text-xs text-slate-500">{currentUser?.email}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-100" />

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
              Menu
            </p>
            {menuItems.map(({ label, path, icon: Icon }) => {
              const isActive =
                activePath === path || activePath.startsWith(path + '/');
              return (
                <Link
                  key={label}
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span>{label}</span>
                  {isActive && (
                    <FiChevronRight className="absolute right-3 h-4 w-4 text-white/80" />
                  )}
                </Link>
              );
            })}
          </nav>

          <Separator className="bg-slate-100" />

          {/* Bottom Section */}
          <div className="px-4 py-4 space-y-3">
            {/* Help Button */}
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              <FiHelpCircle className="h-5 w-5" />
              Help & Support
            </Button>

            {/* Modern Logout Button */}
            <DropdownMenu open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200 rounded-xl transition-all duration-200"
                >
                  <FiLogOut className="h-5 w-5" />
                  Logout
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 rounded-2xl shadow-xl">
                <div className="px-4 py-3">
                  <p className="text-sm font-semibold text-slate-900">Logout?</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Are you sure you want to logout from your account?
                  </p>
                </div>
                <DropdownMenuSeparator />
                <div className="flex gap-2 p-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 rounded-lg"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleLogout}
                    className="flex-1 gap-2 rounded-lg"
                  >
                    <FiLogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* App Version */}
            <p className="text-[10px] text-center text-slate-400">
              Version 1.0.0
            </p>
          </div>
        </aside>

        <div className="flex-1 flex flex-col min-h-screen">
          {/* Header */}
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileOpen(true)}
                  className="lg:hidden h-10 w-10 rounded-xl"
                >
                  <FiMenu className="h-5 w-5 text-slate-600" />
                </Button>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{title}</h2>
                  {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
                </div>
              </div>

            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6">
            {/* Impersonation Alert Banner */}
            {isImpersonating && originalUser && (
              <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FiAlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-amber-900">
                      Impersonating: {currentUser?.name}
                    </p>
                    <p className="text-xs text-amber-700 mt-0.5">
                      You are viewing this account as Super Admin {originalUser?.name}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={stopImpersonating}
                  className="border-amber-300 text-amber-700 hover:bg-amber-100"
                >
                  Stop Impersonating
                </Button>
              </div>
            )}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              {children}
            </div>
          </main>

          {/* Footer */}
          <footer className="border-t border-slate-200 bg-white px-6 py-4">
            <p className="text-xs text-slate-500 text-center">
              © {new Date().getFullYear()} Whitepace Portal. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}






