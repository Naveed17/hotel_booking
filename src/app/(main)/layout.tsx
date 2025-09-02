import Main from '@components/main/layout'
import React from 'react'
const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Main>
            <main>{children}</main>
        </Main>
    )
}
export default MainLayout
