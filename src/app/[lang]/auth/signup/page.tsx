import * as React from 'react';
import type { Metadata } from 'next';
import { config } from '@src/config';
import SignupForm from '@components/auth/signup-form';
import { GuestGuard } from '@lib/auth/guest-guard';

export const metadata = { title: `Signup | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
    return (
        <GuestGuard>
            <SignupForm />
        </GuestGuard>
    );
}
