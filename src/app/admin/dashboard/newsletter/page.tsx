'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Trash2, AlertCircle } from 'lucide-react';

interface Newsletter {
  _id: string;
  email: string;
  subscribedAt: string;
  status: 'active' | 'inactive';
}

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [demoData] = useState<Newsletter[]>([
    {
      _id: '1',
      email: 'subscriber1@example.com',
      subscribedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
    },
    {
      _id: '2',
      email: 'subscriber2@example.com',
      subscribedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
    },
    {
      _id: '3',
      email: 'subscriber3@example.com',
      subscribedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
    },
    {
      _id: '4',
      email: 'subscriber4@example.com',
      subscribedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
    },
    {
      _id: '5',
      email: 'inactive@example.com',
      subscribedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'inactive',
    },
  ]);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      // Using demo data for now
      setTimeout(() => {
        setSubscribers(demoData);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to unsubscribe this email?')) return;
    setDeleteLoading(id);
    setTimeout(() => {
      setSubscribers(subscribers.filter((s) => s._id !== id));
      setDeleteLoading(null);
    }, 500);
  };

  const activeSubscribers = subscribers.filter((s) => s.status === 'active').length;
  const inactiveSubscribers = subscribers.filter((s) => s.status === 'inactive').length;

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-white text-2xl">Loading subscribers...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Newsletter Subscribers</h1>
        <p className="text-gray-400">Manage your newsletter subscription list</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 border border-blue-700 rounded-lg p-6"
        >
          <p className="text-gray-400 text-sm mb-2">Total Subscribers</p>
          <p className="text-4xl font-bold text-white">{subscribers.length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-900/30 to-green-900/10 border border-green-700 rounded-lg p-6"
        >
          <p className="text-gray-400 text-sm mb-2">Active</p>
          <p className="text-4xl font-bold text-green-400">{activeSubscribers}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-red-900/30 to-red-900/10 border border-red-700 rounded-lg p-6"
        >
          <p className="text-gray-400 text-sm mb-2">Inactive</p>
          <p className="text-4xl font-bold text-red-400">{inactiveSubscribers}</p>
        </motion.div>
      </div>

      {/* Subscribers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
      >
        {subscribers.length === 0 ? (
          <div className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No subscribers found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700/50 border-b border-gray-700">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Subscribed Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {subscribers.map((subscriber, index) => (
                  <motion.tr
                    key={subscriber._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-700/30 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-white">{subscriber.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          subscriber.status === 'active'
                            ? 'bg-green-900/50 text-green-200'
                            : 'bg-red-900/50 text-red-200'
                        }`}
                      >
                        {subscriber.status.charAt(0).toUpperCase() + subscriber.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {new Date(subscriber.subscribedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(subscriber._id)}
                        disabled={deleteLoading === subscriber._id}
                        className="text-red-400 hover:text-red-300 disabled:opacity-50 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
