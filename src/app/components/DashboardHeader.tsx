'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, LogOut, Clock, User, Database, Server } from 'lucide-react';

interface DashboardHeaderProps {
  adminName: string;
  onLogout: () => void;
}

export default function DashboardHeader({ adminName, onLogout }: DashboardHeaderProps) {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [dbStatus, setDbStatus] = useState<'connected' | 'disconnected' | 'loading'>('loading');
  const [serverStatus, setServerStatus] = useState<'online' | 'offline'>('online');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Update time every second
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Check database and server status
    checkStatus();
    const statusInterval = setInterval(checkStatus, 10000); // Check every 10 seconds

    return () => {
      clearInterval(interval);
      clearInterval(statusInterval);
    };
  }, []);

  const checkStatus = async () => {
    try {
      const response = await fetch('/api/admin/status');
      if (response.ok) {
        const data = await response.json();
        setDbStatus(data.db === 'connected' ? 'connected' : 'disconnected');
        setServerStatus('online');
      }
    } catch (error) {
      setDbStatus('disconnected');
      setServerStatus('offline');
    }
  };

  const getDbStatusColor = () => {
    switch (dbStatus) {
      case 'connected':
        return 'bg-green-500';
      case 'disconnected':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Logo/Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 hover:bg-gray-700 rounded-lg transition"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
          <div>
            <h2 className="text-white font-bold text-lg">Turnkey Admin</h2>
          </div>
        </div>

        {/* Middle Section - Date & Time */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="hidden md:flex items-center gap-4 text-gray-300 text-sm"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{currentTime}</span>
          </div>
          <div className="w-px h-4 bg-gray-700"></div>
          <div className="text-gray-400">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </motion.div>

        {/* Right Section - Status & Profile */}
        <div className="flex items-center gap-6">
          {/* Status Indicators */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Database Status */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 rounded-lg"
              title={`Database: ${dbStatus}`}
            >
              <Database className="w-4 h-4 text-gray-400" />
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${getDbStatusColor()}`}></div>
                <span className="text-xs text-gray-300 font-medium">
                  {dbStatus === 'loading' ? 'Checking...' : dbStatus === 'connected' ? 'DB' : 'DB Error'}
                </span>
              </div>
            </motion.div>

            {/* Server Status */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 rounded-lg"
              title={`Server: ${serverStatus}`}
            >
              <Server className="w-4 h-4 text-gray-400" />
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${serverStatus === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-xs text-gray-300 font-medium">
                  {serverStatus === 'online' ? 'Online' : 'Offline'}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-700"></div>

          {/* Admin Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-white text-sm font-medium">{adminName}</p>
              <p className="text-gray-400 text-xs">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogout}
            className="p-2 hover:bg-red-600/20 rounded-lg transition text-red-400 hover:text-red-300"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </header>
  );
}
