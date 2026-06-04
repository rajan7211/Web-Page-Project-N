import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FiShoppingCart, FiUser, FiPackage, FiSettings, FiLogOut } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, currentUser, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!showProfile) return;
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showProfile]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    toast.success('Logout successful!');
    logout();
    setShowProfile(false);
    navigate('/', { replace: true });
  };

  // Navigation links based on authentication
  const navLinks = isAuthenticated && currentUser
    ? [
        { to: '/', label: 'Home' },
        ...(currentUser.role === 'Customer'
          ? [{ to: '/customer', label: 'Dashboard' }]
          : currentUser.role === 'Admin'
          ? [{ to: '/admin', label: 'Dashboard' }]
          : [{ to: '/super-admin', label: 'Dashboard' }]),
      ]
    : [{ to: '/', label: 'Home' }];

  const isActive = (path: string) => location.pathname === path;
  const userInitial = currentUser?.name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-slate-200/50 shadow-sm'
          : 'bg-white border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-xl font-bold text-slate-800 hidden sm:block">whitepace</span>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={`${link.to}-${link.label}`}>
                <Button
                  asChild
                  variant={isActive(link.to) ? 'secondary' : 'ghost'}
                  size="sm"
                  className={
                    isActive(link.to)
                      ? 'text-blue-700 bg-blue-50 hover:bg-blue-100'
                      : 'text-slate-500'
                  }
                >
                  <Link to={link.to}>{link.label}</Link>
                </Button>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {/* Cart Icon (Customer Only) */}
                {currentUser?.role === 'Customer' && (
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="relative hidden sm:flex"
                  >
                    <Link to="/cart">
                      <FiShoppingCart className="w-5 h-5 text-slate-600" />
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                        0
                      </span>
                    </Link>
                  </Button>
                )}

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setShowProfile((prev) => !prev)}
                    className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all duration-200 border border-slate-200"
                  >
                    <Avatar className="h-7 w-7">
                      {currentUser?.profileImage ? (
                        <AvatarImage
                          src={currentUser.profileImage}
                          alt={currentUser.name}
                          className="object-cover"
                        />
                      ) : null}
                      <AvatarFallback className="bg-blue-600 text-white text-xs font-semibold">
                        {userInitial}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-slate-700 hidden sm:block max-w-[120px] truncate">
                      {currentUser?.firstName || currentUser?.name}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden transition-all duration-200 origin-top-right z-50 ${
                      showProfile
                        ? 'opacity-100 scale-100 translate-y-0 visible'
                        : 'opacity-0 scale-95 -translate-y-1 invisible pointer-events-none'
                    }`}
                  >
                    {/* Profile Header */}
                    <div className="p-4 bg-slate-50/80 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        {/* ✅ UPDATED: Display Profile Image or Fallback Avatar */}
                        <Avatar className="h-10 w-10">
                          {currentUser?.profileImage ? (
                            <AvatarImage
                              src={currentUser.profileImage}
                              alt={currentUser.name}
                              className="object-cover"
                            />
                          ) : null}
                          <AvatarFallback className="bg-blue-600 text-white font-semibold">
                            {userInitial}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold text-slate-900 truncate">
                            {currentUser?.name}
                          </h3>
                          <p className="text-xs text-slate-500 truncate">{currentUser?.email}</p>
                          <Badge
                            variant="secondary"
                            className="mt-1 text-[10px] px-1.5 py-0 bg-blue-100 text-blue-700 hover:bg-blue-100"
                          >
                            {currentUser?.role}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      {currentUser?.role === 'Customer' && (
                        <>
                          <Button
                            asChild
                            variant="ghost"
                            className="w-full justify-start gap-3 text-slate-700 font-medium"
                            size="sm"
                          >
                            <Link to="/customer/profile" onClick={() => setShowProfile(false)}>
                              <FiUser className="w-4 h-4" /> My Profile
                            </Link>
                          </Button>
                          <Button
                            asChild
                            variant="ghost"
                            className="w-full justify-start gap-3 text-slate-700 font-medium"
                            size="sm"
                          >
                            <Link to="/customer/orders" onClick={() => setShowProfile(false)}>
                              <FiPackage className="w-4 h-4" /> My Orders
                            </Link>
                          </Button>
                          <Button
                            asChild
                            variant="ghost"
                            className="w-full justify-start gap-3 text-slate-700 font-medium"
                            size="sm"
                          >
                            <Link to="/customer/settings" onClick={() => setShowProfile(false)}>
                              <FiSettings className="w-4 h-4" /> Settings
                            </Link>
                          </Button>
                          <Separator className="my-1" />
                        </>
                      )}
                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full justify-start gap-3 text-red-600 hover:bg-red-50 hover:text-red-700 font-medium"
                        size="sm"
                      >
                        <FiLogOut className="w-4 h-4" /> Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* NOT Authenticated - Show Login & Register Buttons */
              <div className="hidden md:flex items-center gap-2">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="
                    text-slate-600
                    hover:text-blue-600
                    hover:bg-blue-50
                    hover:-translate-y-0.5
                    transition-all duration-200
                    rounded-lg
                  "
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="
                    bg-gradient-to-r from-blue-600 to-indigo-600
                    hover:from-blue-700 hover:to-indigo-700
                    text-white font-medium
                    shadow-md shadow-blue-500/20
                    hover:shadow-lg hover:shadow-blue-500/30
                    hover:-translate-y-0.5
                    transition-all duration-200
                    rounded-lg
                  "
                >
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute left-0 right-0 bg-white border-b border-slate-200 shadow-lg transition-all duration-300 ease-out overflow-hidden ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0 max-h-[500px] visible'
            : 'opacity-0 -translate-y-2 max-h-0 invisible pointer-events-none'
        }`}
      >
        <div className="px-4 py-4 space-y-2">
          {/* Navigation Links */}
          {navLinks.map((link) => (
            <Button
              key={`${link.to}-${link.label}-mobile`}
              asChild
              variant={isActive(link.to) ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${
                isActive(link.to) ? 'text-blue-700 bg-blue-50' : 'text-slate-600'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link to={link.to}>{link.label}</Link>
            </Button>
          ))}

          {/* Auth Buttons (Only in Mobile Menu) */}
          {!isAuthenticated && (
            <div className="pt-3 mt-3 border-t border-slate-100 space-y-2">
              <Button
                asChild
                variant="outline"
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                asChild
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          )}

          {/* Logout (Only for Authenticated Users in Mobile) */}
          {isAuthenticated && (
            <div className="pt-3 mt-3 border-t border-slate-100">
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start gap-3 text-red-600 hover:bg-red-50"
              >
                <FiLogOut className="w-4 h-4" /> Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}











