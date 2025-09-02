'use client'
import ConfigProvider from '@lib/configProvider'
import { themeConfig } from '@src/theme/theme.config'
import useDarkMode from '@hooks/useDarkMode'
import type { CommonProps } from '@src/@types/common'

const Theme = (props: CommonProps) => {
    useDarkMode();
    return (
        <ConfigProvider
            value={{
                ...themeConfig,
            }}
        >
            {props.children}
        </ConfigProvider>
    )
}

export default Theme
