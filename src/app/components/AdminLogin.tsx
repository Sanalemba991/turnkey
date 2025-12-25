'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('adminToken', data.token);
      router.push('/admin/dashboard');
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">Admin Portal</h1>
          <p className="text-gray-400 mt-2">Turnkey Gaming Dashboard</p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="bg-gray-800 rounded-lg shadow-2xl p-8 border border-gray-700"
        >
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded-lg text-red-200 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          {/* Username Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              placeholder="Enter your username"
              disabled={isLoading}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              placeholder="Enter your password"
              disabled={isLoading}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Demo Credentials */}
          <div className="mt-6 p-3 bg-blue-900 border border-blue-700 rounded-lg">
            <p className="text-blue-200 text-xs">
              <span className="font-semibold">Demo Credentials:</span><br />
              Username: <span className="font-mono">admin</span><br />
              Password: <span className="font-mono">admin123456</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
