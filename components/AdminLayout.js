import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt,
  faBuilding,
  faUsers,
  faFileAlt,
  faCog,
  faChartLine,
  faCogs,
  faHeadset,
  faBars,
  faTimes,
  faShieldAlt,
  faBell,
  faSignOutAlt,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const router = useRouter();

  const navigation = [
    { name: 'Overview', href: '/admin', icon: faTachometerAlt },
    { name: 'Companies', href: '/admin/companies', icon: faBuilding },
    { name: 'Users', href: '/admin/users', icon: faUsers },
    { name: 'Jobs', href: '/admin/jobs', icon: faFileAlt },
    { name: 'Workflows', href: '/admin/workflows', icon: faCog },
    { name: 'Analytics', href: '/admin/analytics', icon: faChartLine },
    { name: 'Settings', href: '/admin/settings', icon: faCogs },
    { name: 'Support', href: '/admin/support', icon: faHeadset },
  ];

  const isActive = (href) => {
    if (href === '/admin') {
      return router.pathname === '/admin';
    }
    return router.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 lg:translate-x-0 lg:static lg:inset-0"
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-white/20">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <span className="text-black font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-white">Emil AI Admin</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white/60 hover:text-white"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-white/20 text-white border border-white/30'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User section */}
          <div className="border-t border-white/20 p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-white text-sm" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Admin User</p>
                <p className="text-white/60 text-xs">System Administrator</p>
              </div>
            </div>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200">
              <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white/5 backdrop-blur-xl border-b border-white/10">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-white/60 hover:text-white"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                <FontAwesomeIcon icon={faBell} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Security indicator */}
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30">
                <FontAwesomeIcon icon={faShieldAlt} className="w-3 h-3" />
                Secure
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main>{children}</main>
      </div>
    </div>
  );
}
