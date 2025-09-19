import * as React from 'react';
import type { Metadata } from 'next';
import { config } from '@src/config';
import SignInForm from '@components/auth/sign-in-form';
import { GuestGuard } from '@lib/auth/guest-guard';

export const metadata = { title: `Sign in | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (

    <GuestGuard>
      <SignInForm />
    </GuestGuard>

  );
}
