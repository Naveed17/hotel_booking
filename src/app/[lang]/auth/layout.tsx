import Layout from '@components/auth/layout';
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Layout>
            {children}
        </Layout>
    )
}
export default AuthLayout