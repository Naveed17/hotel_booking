'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Alert } from '@src/components/core/alert';
import { useUser } from '@src/hooks/use-user';


export interface GuestGuardProps {
  children: React.ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const [isChecking, setIsChecking] = React.useState(true);

  React.useEffect(() => {
    const verifyGuestAccess = async () => {
      if (!isLoading) {
        if (error) {
          setIsChecking(false);
          return;
        }
      }

      if (user) {
        router.replace('/dashboard');
        return;
      }
      setIsChecking(false);
    };

    verifyGuestAccess().catch(console.error);
  }, [user, error, isLoading, router]);

  if (isLoading || isChecking) {
    return <div
      className={`fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-500`}
    >
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 p-8 flex flex-col items-center gap-6">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            AUTHENTICATING
          </div>
          <p className="text-gray-600 font-medium">Verifying access permissions...</p>
        </div>
      </div>
    </div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        {typeof error === 'string' ? error : 'Something went wrong. Please try again.'}
      </Alert>
    );
  }


  return <React.Fragment>{children}</React.Fragment>;
}
