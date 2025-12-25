'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LayoutDashboard, Mail, BookOpen, ChevronRight } from 'lucide-react';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
    description: 'Overview and statistics',
  },
  {
    title: 'Contact Enquiry',
    href: '/admin/dashboard/contacts',
    icon: Mail,
    description: 'Manage contact messages',
  },
  {
    title: 'Newsletter Enquiry',
    href: '/admin/dashboard/newsletter',
    icon: BookOpen,
    description: 'Manage subscribers',
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-gray-800 border-r border-gray-700">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <div>
            <h1 className="text-white font-bold">Turnkey</h1>
            <p className="text-gray-400 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={item.href}>
                <button
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <p className={`font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>
                      {item.title}
                    </p>
                    <p className={`text-xs ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                      {item.description}
                    </p>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 flex-shrink-0" />}
                </button>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="bg-gray-700/50 rounded-lg p-3">
          <p className="text-gray-400 text-xs mb-2">Admin</p>
          <p className="text-white font-semibold">Moin</p>
          <p className="text-gray-500 text-xs mt-1">System Administrator</p>
        </div>
      </div>
    </aside>
  );
}
