import Main from '@components/main/layout'
import { getDictionary } from '@src/get-dictionary';
import React from 'react';
import InstallDialog from "@components/InstallDialog";
const MainLayout = async ({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) => {
    const { lang } = await params
    const dict = await getDictionary(lang)
    return (
        <Main dictionary={dict}>
            <main>{children}</main>
            <InstallDialog />
        </Main>
    )
}
export default MainLayout
