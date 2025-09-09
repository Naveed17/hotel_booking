import * as React from 'react';
import type { Metadata } from 'next';
import Layout from '@components/auth/layout';
import { config } from '@src/config';
import SignupForm from '@components/auth/signup-form';

export const metadata = { title: `Signup | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
    return (
        <Layout>
            <SignupForm />
        </Layout>
    );
}
