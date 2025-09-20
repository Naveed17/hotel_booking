'use client'
import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDashboard } from '@src/context/dashboardContext';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const DashboardRedirect = () => {
  const { user } = useDashboard();
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang as string || 'en';

  useEffect(() => {
    if (user?.role) {
      router.push(`/${lang}/dashboard/${user.role}`);
    }
  }, [user, router, lang]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Dashboard</h2>
        <p className="text-gray-600">Redirecting you to your dashboard...</p>
      </motion.div>
    </div>
  );
};

export default DashboardRedirect;