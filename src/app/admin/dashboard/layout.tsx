'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/app/components/DashboardSidebar';
import DashboardHeader from '@/app/components/DashboardHeader';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (!savedToken) {
      router.push('/admin');
    } else {
      setToken(savedToken);
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!token) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader adminName="Moin" onLogout={handleLogout} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
