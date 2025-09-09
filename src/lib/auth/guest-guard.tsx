'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Alert } from '@src/components/ui/alert';
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
      if (isLoading) return;

      if (error) {
        setIsChecking(false);
        return;
      }

      if (user) {
        router.replace('/');
        return;
      }
      setIsChecking(false);
    };

    verifyGuestAccess().catch(console.error);
  }, [user, error, isLoading, router]);

  if (isLoading || isChecking) {
    return <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-500`}
    >
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500" />
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
