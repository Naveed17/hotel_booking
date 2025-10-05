'use client'
import classNames from 'classnames'
import type { CommonProps } from '@src/@types/common'
import { APP_NAME } from '@src/constants/app.constant'

interface LogoProps extends CommonProps {
    type?: 'full' | 'streamline'
    mode?: 'light' | 'dark'
    imgClass?: string
    logoWidth?: number | string
    style?: React.CSSProperties
    className?: string
}

const Logo = (props: LogoProps) => {
    const {

        className,
        imgClass,
        style,
        logoWidth = 'auto',
    } = props
    return (
        <div
            className={classNames('logo', className)}
            style={{
                ...style,
                ...{ width: logoWidth },
            }}
        >
            <img
                className={imgClass}
                src={'/images/logo.png'}
                alt={`${APP_NAME} logo`}
            />
        </div>
    )
}

export default Logo
