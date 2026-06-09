import { useState, memo } from 'react';
import { FiHeart, FiSend, FiCheckCircle } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

const Footer = memo(function Footer() {
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
    Product: ['Features', 'Integrations', 'Pricing', 'Security'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
    Resources: ['Documentation', 'Help Center', 'Community', 'Status'],
  };

  return (
    <footer className="border-t border-slate-200 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        {/* Main Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-blue-600">Whitepace</p>
                <p className="text-xs font-bold text-slate-900 -mt-1">Portal</p>
              </div>
            </Link>
            <p className="text-slate-500 text-xs leading-relaxed max-w-xs">
              The all-in-one workspace for teams that want to move faster and collaborate better.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-bold text-slate-900 mb-4 text-xs uppercase tracking-wider">
                {section}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <button className="text-xs text-slate-500 hover:text-blue-600 transition-colors">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-8 bg-slate-200/50" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            © {new Date().getFullYear()} Whitepace. Made with{' '}
            <FiHeart className="w-3 h-3 text-red-400 fill-red-400" /> All rights reserved.
          </p>

          {/* Newsletter */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none md:w-56">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="pl-3 pr-9 h-8 bg-slate-100 border-0 focus:bg-white focus:ring-1 focus:ring-blue-500 rounded-lg text-xs"
              />
              {subscribed && (
                <FiCheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
              )}
            </div>
            <Button
              type="submit"
              disabled={subscribed}
              size="sm"
              className={`rounded-lg transition-all h-8 text-xs px-3 gap-1.5 ${
                subscribed
                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
              }`}
            >
              <FiSend className="w-3 h-3" />
              <span className="hidden sm:inline">{subscribed ? 'Subscribed' : 'Subscribe'}</span>
            </Button>
          </form>
        </div>
      </div>
    </footer>
  );
});

export default Footer;


