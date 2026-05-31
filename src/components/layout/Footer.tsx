import { useState } from 'react';
import { FiHeart, FiSend, FiCheckCircle } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  const footerLinks = {
    Product: ['Features', 'Integrations', 'Pricing', 'Changelog'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
  };

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="text-xl font-bold text-slate-800">whitepace</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              The all-in-one workspace for teams that want to move faster and collaborate better.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-semibold text-slate-900 mb-4 text-sm">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <button className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-slate-400 flex items-center gap-1.5">
            © {new Date().getFullYear()} Whitepace. Made with{' '}
            <FiHeart className="w-3 h-3 text-red-400 fill-red-400" /> All rights reserved.
          </p>

          {/* Newsletter form */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="rounded-xl border-slate-200 bg-slate-50 pr-9 focus-visible:ring-blue-100"
              />
              {subscribed && (
                <FiCheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
              )}
            </div>
            <Button
              type="submit"
              disabled={subscribed}
              size="sm"
              className={`rounded-xl gap-2 transition-all ${
                subscribed
                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20'
              }`}
            >
              <FiSend className="w-3.5 h-3.5" />
              {subscribed ? 'Subscribed!' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </div>
    </footer>
  );
}



