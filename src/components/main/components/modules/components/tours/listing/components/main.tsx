'use client'
import React from 'react'
import ToursFilter from './filter'
import Container from '@components/core/container';

interface ToursMainProps {
    children?: React.ReactNode;
}

const ToursMain = ({ children }: ToursMainProps): React.JSX.Element => {
    const handleFilterChange = (filters: any) => {
        console.log('Filters changed:', filters);
        // Handle filter changes here
    };

    return (
        <div className="min-h-screen py-8">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <ToursFilter onFilterChange={handleFilterChange} />
                    </div>

                    {/* Tours Listing */}
                    <div className="lg:col-span-3">
                        {children}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default ToursMain