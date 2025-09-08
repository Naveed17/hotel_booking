'use client'
import ConfigProvider from '@lib/configProvider'
import type { CommonProps } from '@src/@types/common'
import { useAppSelector } from '@lib/redux/store';

const Theme = (props: CommonProps) => {
    const direction = useAppSelector(state => state.root.direction);
    const locale = useAppSelector(state => state.root.locale);
    const currency = useAppSelector(state => state.root.currency);
    return (
        <ConfigProvider
            value={{
                direction,
                locale,
                currency,
            }}
        >
            {props.children}
        </ConfigProvider>
    );
};


export default Theme
