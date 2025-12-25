'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, CheckCircle, AlertCircle } from 'lucide-react';

interface DashboardStats {
  totalContacts: number;
  totalNewsletter: number;
  unreadContacts: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalContacts: 0,
    totalNewsletter: 0,
    unreadContacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        console.error('No admin token found');
        setLoading(false);
        return;
      }
      const response = await fetch('/api/admin/stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        console.error('Failed to fetch stats:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Contacts',
      value: stats.totalContacts,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-900/20',
    },
    {
      title: 'Unread Messages',
      value: stats.unreadContacts,
      icon: AlertCircle,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-900/20',
    },
    {
      title: 'Newsletter Subscribers',
      value: stats.totalNewsletter,
      icon: BarChart3,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-900/20',
    },
  ];

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Moin!</h1>
        <p className="text-gray-400">Here's what's happening with your platform today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={`stat-card-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${card.bgColor} border border-gray-700 rounded-lg p-6 backdrop-blur-sm`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{card.title}</p>
                  <p className="text-4xl font-bold text-white mt-2">{stats[card.title.toLowerCase().replace(/\s+/g, '') as keyof DashboardStats] ?? card.value}</p>
                </div>
                <div className={`bg-gradient-to-br ${card.color} p-4 rounded-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-800 border border-gray-700 rounded-lg p-6"
      >
        <h2 className="text-xl font-bold text-white mb-4">Quick Stats</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
            <span className="text-gray-300">Messages Status</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400">All Systems Operational</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
            <span className="text-gray-300">Response Rate</span>
            <span className="text-blue-400 font-semibold">100%</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
            <span className="text-gray-300">Last Updated</span>
            <span className="text-purple-400 font-semibold">Just now</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
