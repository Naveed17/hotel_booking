'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { useUser } from '@src/hooks/use-user';
import { Alert } from '@components/core/alert';


export interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const [isChecking, setIsChecking] = React.useState(true);

  React.useEffect(() => {
    if (!isLoading) {
      if (error) {
        setIsChecking(false);
        return;
      }

      if (!user) {
        router.replace('/auth/sign-in');
        return;
      }

      setIsChecking(false);
    }
  }, [user, error, isLoading, router]);

  const isReady = !isLoading && !isChecking;
  if (!isReady) {
    return null;
  }


  if (error) {
    return <Alert variant="destructive">{error}</Alert>;
  }

  return <>{children}</>;
}
