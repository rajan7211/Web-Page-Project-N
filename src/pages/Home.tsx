import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiShield,
  FiUsers,
  FiPackage,
  FiCheck,
  FiStar,
  FiTrendingUp,
  FiLayout,
} from "react-icons/fi";
import { useQuery } from '@tanstack/react-query';
import { useAuth } from "../hooks/useAuth";
import { fetchProducts } from "../services/products";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { EmptyState } from "../components/shared/EmptyState";
import { LoadingSpinner } from "../components/shared/LoadingSpinner";
import { Product } from '../types';
import { Button } from "@/components/ui/button";

export default function Home() {
  const { isAuthenticated, currentUser } = useAuth();

  const { data: products = [], isLoading, isError } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60,
    retry: 1,
  });

  const {
    visibleItems: visibleProducts,
    lastElementRef,
    hasMore,
  } = useInfiniteScroll<Product>(products, 6);

  // Get dashboard route based on user role
  const getDashboardUrl = () => {
    if (!currentUser) return "/register";
    switch (currentUser.role) {
      case 'Customer':
        return '/customer';
      case 'Admin':
        return '/admin';
      case 'Super Admin':
        return '/super-admin';
      default:
        return '/register';
    }
  };

  const welcomeLink = isAuthenticated && currentUser ? getDashboardUrl() : "/register";

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-slate-50">
      {/* Welcome Banner */}
      {isAuthenticated && currentUser && (
        <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-4 px-4 text-center font-medium border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
            <span>Welcome back, <span className="font-bold text-blue-400">{currentUser.firstName}</span>!</span>
            <Button
              asChild
              variant="ghost"
              className="text-blue-300 hover:text-white hover:bg-white/10 rounded-lg gap-1.5"
              size="sm"
            >
              <Link to={welcomeLink} className="flex items-center">
                Go to Dashboard
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/50 to-white border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            {/* Badge */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
                <FiStar className="w-4 h-4 text-blue-600" />
                <span className="text-blue-700 font-semibold text-sm">
                  Premium Platform for Modern Teams
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="text-center space-y-4">
              <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent leading-tight">
                Work Smarter, Not Harder
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                The all-in-one workspace for teams. Manage dashboards, track analytics, and handle orders with a modern, intuitive interface.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <Link to={welcomeLink} className="flex items-center gap-2">
                  {isAuthenticated ? "Open Dashboard" : "Get Started Free"}
                  <FiArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              {!isAuthenticated && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-xl border-slate-300 hover:border-slate-400"
                >
                  <Link to="/login">Sign In</Link>
                </Button>
              )}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8 border-t border-slate-200 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <FiCheck className="w-4 h-4 text-green-600" />
                <span>10,000+ Active Users</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheck className="w-4 h-4 text-green-600" />
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheck className="w-4 h-4 text-green-600" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Powerful Features Built for You
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to manage your workspace efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={<FiShield className="w-8 h-8" />}
              title="Secure Access"
              desc="Role-based access control keeps your data protected with enterprise-grade security."
              color="blue"
            />
            <Feature
              icon={<FiUsers className="w-8 h-8" />}
              title="Team Management"
              desc="Easily manage users, permissions, and collaborate with your team members."
              color="indigo"
            />
            <Feature
              icon={<FiPackage className="w-8 h-8" />}
              title="Modern Design"
              desc="Built with the latest UI trends for a fast, beautiful, and intuitive experience."
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
              <FiTrendingUp className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 font-semibold text-sm">Featured Collection</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Explore Our Products</h2>
            <p className="text-xl text-slate-400">
              Discover tools and features built for your success
            </p>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center py-16">
              <LoadingSpinner />
            </div>
          ) : isError ? (
            <EmptyState
              title="Unable to Load Products"
              description="There was a problem fetching products. Please try again later."
            />
          ) : products.length === 0 ? (
            <EmptyState
              title="No Products Available"
              description="Check back soon for exciting new products."
            />
          ) : (
            <>
              {/* Products Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleProducts.map((product, index) => {
                  const isLast = index === visibleProducts.length - 1;

                  return (
                    <div
                      key={product.id}
                      ref={isLast ? lastElementRef : undefined}
                      className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500/50 shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                      {/* Background Gradient on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Image Container */}
                      <div className="relative overflow-hidden bg-slate-700 h-56">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Content Container */}
                      <div className="relative p-6 space-y-4">
                        {/* Title & Price */}
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="font-bold text-xl text-white line-clamp-2">
                            {product.title}
                          </h3>
                          <span className="text-blue-400 font-bold text-lg whitespace-nowrap">
                            {product.price}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-slate-400 text-sm line-clamp-2">
                          {product.description}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-2 pt-2">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <FiStar
                                key={i}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                          <span className="text-xs text-slate-500">(128 reviews)</span>
                        </div>

                        {/* Button */}
                        <Button
                          asChild
                          className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all group-hover:shadow-lg"
                        >
                          <button>Add to Cart</button>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Load More Indicator */}
              {hasMore && (
                <div className="flex justify-center mt-12">
                  <div className="flex items-center gap-3 px-6 py-3 bg-slate-800 rounded-full border border-slate-700">
                    <div className="w-4 h-4 border-2 border-slate-600 border-t-blue-500 rounded-full animate-spin" />
                    <span className="text-slate-300 font-medium">Loading more products...</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-slate-900 mb-4">
                  Why Teams Choose{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Whitepace
                  </span>
                </h2>
                <p className="text-xl text-slate-600">
                  Built for teams that demand clarity, speed, and reliability.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4">
                {[
                  { icon: FiCheck, text: "Lightning-fast dashboards and analytics" },
                  { icon: FiCheck, text: "Bank-level security and encryption" },
                  { icon: FiCheck, text: "Real-time collaboration tools" },
                  { icon: FiCheck, text: "24/7 premium support" },
                  { icon: FiCheck, text: "Seamless integrations" },
                  { icon: FiCheck, text: "Unlimited scalability" },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-lg text-slate-700 font-medium">
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* CTA Button */}
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 mt-6"
              >
                <Link to={welcomeLink} className="flex items-center gap-2">
                  {isAuthenticated ? <FiLayout className="w-5 h-5" /> : <FiArrowRight className="w-5 h-5" />}
                  {isAuthenticated ? "Go to Dashboard" : "Start Free Today"}
                </Link>
              </Button>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-3xl blur-2xl" />
              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-200/50 p-8 shadow-xl">
                <div className="space-y-6">
                  {/* Dashboard Preview */}
                  <div className="h-40 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl opacity-30 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-300 rounded-full w-3/4" />
                    <div className="h-3 bg-slate-300 rounded-full w-1/2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of teams already using Whitepace Portal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-xl"
            >
              <Link to={welcomeLink} className="flex items-center gap-2">
                {isAuthenticated ? "Open Dashboard" : "Get Started"}
                <FiArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            {!isAuthenticated && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-bold rounded-xl"
              >
                <Link to="/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// Feature Component
function Feature({
  icon,
  title,
  desc,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: 'blue' | 'indigo' | 'purple';
}) {
  const colorMap = {
    blue: 'bg-blue-100 text-blue-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <div className="relative group p-8 bg-white rounded-2xl border border-slate-200 hover:border-blue-400/50 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative space-y-4">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colorMap[color]} group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}








