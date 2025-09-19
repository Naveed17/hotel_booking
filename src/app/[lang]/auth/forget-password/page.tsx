import * as React from 'react';
import type { Metadata } from 'next';
import { config } from '@src/config';
import ForgetPasswordForm from '@components/auth/forget-password-form';
import { GuestGuard } from '@lib/auth/guest-guard';
export const metadata = { title: `Forget password | Auth | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (

    <GuestGuard>
      <ForgetPasswordForm />
    </GuestGuard>

  );
}
