import { ReactNode, useMemo, useState, useCallback, memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FiHome,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiLogOut,
  FiChevronRight,
  FiShield,
  FiHelpCircle,
  FiAlertTriangle,
  FiBell,
  FiSearch,
  FiChevronDown,
} from "react-icons/fi";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Footer from "@/components/layout/Footer";

// Navbar Component
const DashboardNavbar = memo(function DashboardNavbar({
  title,
  subtitle,
  onMobileOpen,
  currentUser,
  getInitials,
  handleLogout,
}: any) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-slate-200/80 bg-white/80 backdrop-blur-2xl shadow-sm">
      <div className="h-full px-4 lg:px-8 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMobileOpen}
            className="lg:hidden h-9 w-9 rounded-lg hover:bg-slate-100/80"
          >
            <FiMenu className="h-5 w-5 text-slate-700" />
          </Button>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group flex-shrink-0"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-lg blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
              <div className="relative w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30 transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-sm">W</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <p className="text-[8px] font-bold uppercase tracking-wider text-blue-600">
                Whitepace
              </p>
              <p className="text-xs font-bold text-slate-900">Portal</p>
            </div>
          </Link>

          {/* Page Title */}
          <div className="hidden md:flex items-center gap-3 pl-4 border-l border-slate-200/50 min-w-0">
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-slate-900">{title}</h1>
              {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 flex-shrink-0">

          {/* Center Navigation */}
<div className="hidden lg:flex items-center gap-2">
  <Link
    to="/"
    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-200 font-medium text-sm"
  >
    <FiHome className="h-4 w-4" />
    Home
  </Link>
</div>
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 rounded-lg hover:bg-slate-100/80"
              >
                <FiBell className="h-4 w-4 text-slate-600" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-gradient-to-br from-red-500 to-pink-500 rounded-full animate-pulse" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 rounded-xl shadow-2xl border-slate-200"
            >
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-bold text-slate-900">
                  Notifications
                </p>
              </div>
              <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200/50">
                  <p className="text-xs font-semibold text-blue-900">
                    New order received
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    Order #1234 just came in
                  </p>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="gap-2 rounded-lg hover:bg-slate-100/80 px-2 h-9"
              >
                <Avatar className="h-7 w-7 ring-2 ring-white shadow-sm">
                  {currentUser?.profileImage ? (
                    <AvatarImage
                      src={currentUser.profileImage}
                      alt={currentUser.name}
                      className="object-cover"
                    />
                  ) : null}
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-bold">
                    {getInitials(currentUser?.name || "U")}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline text-xs font-semibold text-slate-700 max-w-[70px] truncate">
                  {currentUser?.firstName}
                </span>
                <FiChevronDown className="h-3 w-3 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-64 rounded-xl shadow-2xl border-slate-200"
            >
              <div className="px-4 py-4 bg-gradient-to-br from-slate-50 to-blue-50/30 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    {currentUser?.profileImage ? (
                      <AvatarImage
                        src={currentUser.profileImage}
                        alt={currentUser.name}
                      />
                    ) : null}
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                      {getInitials(currentUser?.name || "U")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900">
                      {currentUser?.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {currentUser?.email}
                    </p>
                    <span className="mt-1.5 inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-md">
                      {currentUser?.role}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-2 space-y-1">
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start gap-2 rounded-lg text-xs h-8"
                  size="sm"
                >
                  <Link to="/profile">
                    <FiUser className="h-3.5 w-3.5" />
                    View Profile
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start gap-2 rounded-lg text-xs h-8"
                  size="sm"
                >
                  <Link to="/settings">
                    <FiSettings className="h-3.5 w-3.5" />
                    Settings
                  </Link>
                </Button>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenu
                open={showLogoutConfirm}
                onOpenChange={setShowLogoutConfirm}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 rounded-lg text-red-600 hover:bg-red-50 text-xs h-8 mx-2 mt-1"
                    size="sm"
                  >
                    <FiLogOut className="h-3.5 w-3.5" />
                    Logout
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-64 rounded-xl shadow-2xl"
                >
                  <div className="px-4 py-3">
                    <p className="text-sm font-bold text-slate-900">
                      Confirm Logout
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      You'll need to login again to access your account.
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="flex gap-2 p-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowLogoutConfirm(false)}
                      className="flex-1 rounded-lg text-xs h-8"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleLogout}
                      className="flex-1 rounded-lg text-xs h-8"
                    >
                      Logout
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
});

// Sidebar Component
const DashboardSidebar = memo(function DashboardSidebar({
  menuItems,
  activePath,
  mobileOpen,
  onMobileClose,
  currentUser,
  getInitials,
  handleLogout,
}: any) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar - Fixed on left, does NOT extend to bottom */}
      <aside
        className={`fixed top-16 left-0 bottom-0 z-40 w-64 flex flex-col bg-white border-r border-slate-200/50 shadow-xl transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* User Profile Section - Fixed at top */}
        <div className="flex-shrink-0 px-4 py-4 border-b border-slate-200/50">
          <Link
            to="/profile"
            className="relative group cursor-pointer block rounded-lg p-3 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 hover:from-blue-50 hover:to-indigo-50 transition-all"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 ring-2 ring-white shadow-md flex-shrink-0">
                {currentUser?.profileImage ? (
                  <AvatarImage
                    src={currentUser.profileImage}
                    alt={currentUser.name}
                    className="object-cover"
                  />
                ) : null}
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-bold">
                  {getInitials(currentUser?.name || "U")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {currentUser?.firstName}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {currentUser?.email}
                </p>
              </div>
              <FiChevronRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
            </div>
          </Link>
        </div>

        {/* Navigation Menu - Scrollable */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
          <div className="px-3 mb-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Navigation
            </p>
          </div>

          {menuItems.map(({ label, path, icon: Icon, badge }: any) => {
            const isActive = activePath === path;

            return (
              <Link
                key={label}
                to={path}
                onClick={onMobileClose}
                className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 active:scale-95"
                }`}
              >
                <Icon
                  className={`h-4 w-4 flex-shrink-0 transition-transform ${
                    isActive ? "scale-110" : "group-hover:scale-110"
                  }`}
                />

                <span className="flex-1 truncate">{label}</span>

                {badge && (
                  <span
                    className={`px-2 py-0.5 text-[9px] font-bold rounded-full transition-all ${
                      isActive
                        ? "bg-white/25 text-white"
                        : "bg-red-100/80 text-red-600"
                    }`}
                  >
                    {badge}
                  </span>
                )}

                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-l-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="flex-shrink-0 h-px bg-slate-200/50" />

        {/* Bottom Section - Fixed at bottom */}
        <div className="flex-shrink-0 px-3 py-4 space-y-2 bg-gradient-to-t from-slate-50/50 to-transparent">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-slate-600 hover:bg-slate-100/80 rounded-lg text-xs h-8"
            size="sm"
          >
            <FiHelpCircle className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">Help & Support</span>
          </Button>

          <DropdownMenu
            open={showLogoutConfirm}
            onOpenChange={setShowLogoutConfirm}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 text-red-600 hover:bg-red-50/80 border-red-200/50 rounded-lg text-xs h-8"
                size="sm"
              >
                <FiLogOut className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">Logout</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-64 rounded-xl shadow-2xl"
            >
              <div className="px-4 py-3">
                <p className="text-sm font-bold text-slate-900">
                  Confirm Logout?
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  You'll need to login again.
                </p>
              </div>
              <DropdownMenuSeparator />
              <div className="flex gap-2 p-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 rounded-lg text-xs h-8"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleLogout}
                  className="flex-1 rounded-lg text-xs h-8"
                >
                  Logout
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <p className="text-[9px] text-center text-slate-400 pt-1">v1.0.0</p>
        </div>
      </aside>
    </>
  );
});

// Main Component
interface MenuItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const roleMenu: Record<string, MenuItem[]> = {
  "Super Admin": [
    { label: "Dashboard", path: "/super-admin", icon: FiHome },
    {
      label: "All Users",
      path: "/super-admin/users",
      icon: FiUsers,
      badge: 12,
    },
    { label: "Admins", path: "/super-admin/admins", icon: FiShield },
    { label: "Analytics", path: "/super-admin/analytics", icon: FiBarChart2 },
    { label: "Settings", path: "/super-admin/settings", icon: FiSettings },
  ],
  Admin: [
    { label: "Dashboard", path: "/admin", icon: FiHome },
    { label: "Customers", path: "/admin/customers", icon: FiUsers },
    { label: "Reports", path: "/admin/reports", icon: FiBarChart2 },
    { label: "Settings", path: "/admin/settings", icon: FiSettings },
  ],
  Customer: [
    { label: "Dashboard", path: "/customer", icon: FiHome },
    { label: "My Profile", path: "/customer/profile", icon: FiUser },
    {
      label: "My Orders",
      path: "/customer/orders",
      icon: FiShoppingBag,
      badge: 3,
    },
    { label: "Settings", path: "/customer/settings", icon: FiSettings },
  ],
};

interface DashboardLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function DashboardLayout({
  title,
  subtitle,
  children,
}: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    currentUser,
    logout,
    originalUser,
    isImpersonating,
    stopImpersonating,
  } = useAuth();

  const menuItems = useMemo(
    () => (currentUser?.role ? roleMenu[currentUser.role] || [] : []),
    [currentUser?.role],
  );

  const activePath = location.pathname;

  const handleLogout = useCallback(() => {
    logout();
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 2000,
    });
    navigate("/login");
  }, [logout, navigate]);

  const getInitials = useCallback((name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`;
    }
    return name.charAt(0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex flex-col">
      {/* Navbar */}
      <DashboardNavbar
        title={title}
        subtitle={subtitle}
        mobileOpen={mobileOpen}
        onMobileOpen={() => setMobileOpen(true)}
        currentUser={currentUser}
        getInitials={getInitials}
        handleLogout={handleLogout}
      />

      {/* Main Layout */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <DashboardSidebar
          menuItems={menuItems}
          activePath={activePath}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
          currentUser={currentUser}
          getInitials={getInitials}
          handleLogout={handleLogout}
        />

        {/* Content Area with Footer */}
        <main className="flex-1 lg:pl-64 flex flex-col overflow-hidden">
          {/* Page Content - Only this scrolls */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-8">
            <div className="max-w-7xl mx-auto w-full">
              {/* Mobile Header */}
              <div className="md:hidden mb-6 space-y-2">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-sm text-slate-600">{subtitle}</p>
                )}
              </div>

              {/* Impersonation Banner */}
              {isImpersonating && originalUser && (
                <div className="mb-6 relative overflow-hidden rounded-xl border border-amber-200/50 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 p-4 shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-200/10 to-orange-200/10 pointer-events-none" />
                  <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-amber-100/80 flex items-center justify-center">
                        <FiAlertTriangle className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-amber-900">
                          Impersonating: {currentUser?.name}
                        </p>
                        <p className="text-xs text-amber-700 mt-1">
                          Viewing as Super Admin {originalUser?.name}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={stopImpersonating}
                      className="border-amber-300 text-amber-700 hover:bg-amber-100/80 rounded-lg whitespace-nowrap font-semibold"
                    >
                      Stop Impersonating
                    </Button>
                  </div>
                </div>
              )}

              {/* Content Card */}
              <div className="rounded-xl border border-slate-200/50 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                <div className="p-6 lg:p-8">{children}</div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
