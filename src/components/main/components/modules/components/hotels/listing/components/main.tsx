'use client';
import Container from '@components/core/container';
import { useHotelFilters } from '@src/context/hotelFilterContext';
import Filter from './filter';
import { useMemo } from 'react';
const filterChips = [

    {
        icon: <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_503_1717)">
                <path
                    d="M9.11963 1.93961C9.15367 1.87085 9.20624 1.81297 9.27142 1.77251C9.33659 1.73204 9.41179 1.7106 9.4885 1.7106C9.56522 1.7106 9.64041 1.73204 9.70559 1.77251C9.77077 1.81297 9.82334 1.87085 9.85737 1.93961L11.6512 5.57316C11.7694 5.81232 11.9439 6.01923 12.1596 6.17613C12.3753 6.33303 12.6259 6.43524 12.8899 6.47398L16.9016 7.06107C16.9776 7.07208 17.049 7.10414 17.1078 7.15363C17.1665 7.20312 17.2102 7.26806 17.234 7.3411C17.2578 7.41414 17.2606 7.49238 17.2422 7.56695C17.2238 7.64152 17.1849 7.70946 17.1299 7.76308L14.2287 10.5882C14.0373 10.7747 13.8942 11.0048 13.8115 11.2589C13.7289 11.513 13.7092 11.7833 13.7542 12.0466L14.4391 16.0382C14.4525 16.1142 14.4443 16.1924 14.4154 16.2639C14.3865 16.3355 14.3381 16.3974 14.2757 16.4428C14.2133 16.4881 14.1393 16.515 14.0624 16.5203C13.9854 16.5257 13.9085 16.5093 13.8404 16.4731L10.2542 14.5876C10.0179 14.4635 9.75501 14.3987 9.48812 14.3987C9.22122 14.3987 8.95833 14.4635 8.72203 14.5876L5.13662 16.4731C5.06854 16.5091 4.99171 16.5253 4.91487 16.5199C4.83804 16.5144 4.76427 16.4875 4.70197 16.4422C4.63967 16.3969 4.59134 16.335 4.56247 16.2636C4.5336 16.1921 4.52535 16.1141 4.53867 16.0382L5.22282 12.0474C5.26801 11.7839 5.24843 11.5134 5.16577 11.2592C5.08311 11.005 4.93985 10.7747 4.74834 10.5882L1.84708 7.76386C1.79163 7.7103 1.75234 7.64225 1.73368 7.56745C1.71501 7.49265 1.71774 7.41411 1.74153 7.34078C1.76533 7.26745 1.80924 7.20228 1.86827 7.15269C1.92729 7.1031 1.99906 7.07108 2.07539 7.06029L6.08636 6.47398C6.3506 6.43554 6.60153 6.33347 6.81757 6.17655C7.0336 6.01963 7.20827 5.81256 7.32654 5.57316L9.11963 1.93961Z"
                    stroke="currentColor"
                    strokeOpacity="0.8"
                    strokeWidth="1.55313"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_503_1717">
                    <rect
                        width="18.6376"
                        height="18.6376"
                        fill="white"
                        transform="translate(0.169678 0.157379)"
                    />
                </clipPath>
            </defs>
        </svg>
        , label: "Top Rated"
    },
    {
        icon: <svg
            width="20"
            height="19"
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9.8357 2.69366C9.86922 2.63278 9.91846 2.58201 9.97829 2.54665C10.0381 2.5113 10.1063 2.49265 10.1758 2.49265C10.2453 2.49265 10.3136 2.5113 10.3734 2.54665C10.4332 2.58201 10.4825 2.63278 10.516 2.69366L12.8084 7.04554C12.8631 7.14631 12.9394 7.23372 13.0318 7.30151C13.1243 7.36929 13.2306 7.41577 13.3431 7.43759C13.4557 7.45942 13.5717 7.45606 13.6828 7.42775C13.7939 7.39943 13.8973 7.34688 13.9857 7.27385L17.307 4.42851C17.3708 4.37665 17.4494 4.34636 17.5314 4.342C17.6135 4.33764 17.6949 4.35943 17.7637 4.40424C17.8326 4.44904 17.8855 4.51456 17.9148 4.59134C17.9441 4.66813 17.9483 4.75223 17.9267 4.83154L15.726 12.7883C15.681 12.9511 15.5843 13.0948 15.4503 13.1977C15.3163 13.3005 15.1525 13.3569 14.9836 13.3583H5.36888C5.19985 13.3571 5.03582 13.3008 4.90169 13.1979C4.76757 13.095 4.67067 12.9512 4.62571 12.7883L2.42569 4.83232C2.40415 4.75301 2.40832 4.66891 2.43761 4.59212C2.4669 4.51533 2.5198 4.44982 2.5887 4.40501C2.65759 4.3602 2.73893 4.33841 2.821 4.34277C2.90307 4.34714 2.98164 4.37742 3.0454 4.42928L6.366 7.27462C6.45437 7.34765 6.55781 7.40021 6.66891 7.42852C6.78 7.45683 6.89598 7.4602 7.00853 7.43837C7.12107 7.41654 7.22739 7.37007 7.31985 7.30228C7.4123 7.2345 7.4886 7.14708 7.54327 7.04631L9.8357 2.69366Z"
                stroke="currentColor"
                strokeOpacity="0.8"
                strokeWidth="1.55313"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4.73999 16.4653H15.6119"
                stroke="currentColor"
                strokeOpacity="0.8"
                strokeWidth="1.55313"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>, label: "High Value"
    },
    {
        icon: <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_503_1699)">
                <path d="M10.0042 9.4762H10.0121" stroke="currentColor" strokeWidth="1.55313" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.1102 4.81678V3.26364C13.1102 2.85173 12.9466 2.45668 12.6553 2.16541C12.3641 1.87414 11.969 1.71051 11.5571 1.71051H8.45084C8.03892 1.71051 7.64388 1.87414 7.35261 2.16541C7.06134 2.45668 6.89771 2.85173 6.89771 3.26364V4.81678" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.55313" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.7699 10.2528C15.4656 11.7741 12.7653 12.585 10.0042 12.585C7.24307 12.585 4.54276 11.7741 2.23853 10.2528" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.55313" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.2167 4.8168H3.79166C2.93389 4.8168 2.23853 5.51216 2.23853 6.36994V14.1356C2.23853 14.9934 2.93389 15.6887 3.79166 15.6887H16.2167C17.0745 15.6887 17.7699 14.9934 17.7699 14.1356V6.36994C17.7699 5.51216 17.0745 4.8168 16.2167 4.8168Z" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.55313" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_503_1699">
                    <rect width="18.6376" height="18.6376" fill="white" transform="translate(0.685303 0.157379)" />
                </clipPath>
            </defs>
        </svg>
        , label: "Business"
    },


];
type ListingLayoutProps = {
    children: React.ReactNode;
    dict?: any;
    slug?: string[] | string | null;
};

export default function ListingLayout({ children, dict }: ListingLayoutProps) {
    const { setQuickFilter, filters } = useHotelFilters();
    const handleQuickFilter = (filter: string) => {
        setQuickFilter(filter);
    };
    return (
        <div className="flex flex-col gap-4 bg-bg-page">
            <div className="w-full">
                <div className="bg-white border-b border-gray-100">
                    <Container className="py-3 lg:py-4">
                        <div className="flex items-center gap-2 mb-3 lg:mb-4">
                            <span className="text-text-muted font-medium text-sm lg:text-base">Quick Filter :</span>
                        </div>
                        <div className="flex gap-2 lg:gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {filterChips.map((chip, index) => (
                                <button
                                    onClick={() => handleQuickFilter(chip.label)}
                                    key={index}
                                    className={`flex items-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 filter-chip ${chip.label === filters.quickFilter ? "!bg-travel-blue !text-white" : ""} rounded-lg lg:rounded-xl text-xs lg:text-sm font-medium text-muted hover:bg-gray-200 transition-colors whitespace-nowrap flex-shrink-0`}
                                >
                                    {chip.icon && <span className="text-sm lg:text-base">{chip.icon}</span>}
                                    {chip.label}
                                </button>
                            ))}
                        </div>
                    </Container>
                </div>
                <Container className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-36 gap-8">
                        {/* Sidebar */}
                        <aside className="col-span-1 md:col-span-10 mb-6">
                            <Filter dict={dict} />
                        </aside>

                        {/* Main Results */}
                        <main className="col-span-1 md:col-span-26 mb-4">
                            {children}
                        </main>
                    </div>
                </Container>

            </div>
        </div>
    );
}