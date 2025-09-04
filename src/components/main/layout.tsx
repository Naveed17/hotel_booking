'use client'
import React from 'react'
import Header from './header'
import Footer from './footer'

const Main = ({ children, dictionary }: { children: React.ReactNode; dictionary: any }): React.JSX.Element => {
    return <>
        <Header dictionary={dictionary} />
        {children}
        <Footer />
    </>
}
export default Main