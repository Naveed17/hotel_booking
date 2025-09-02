'use client'
import React from 'react'
import Header from './header'
import Footer from './footer'

const Main = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
    return <>
        <Header />
        {children}
        <Footer />
    </>
}
export default Main