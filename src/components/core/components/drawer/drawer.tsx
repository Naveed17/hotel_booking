import classNames from 'classnames'
import { motion, AnimatePresence } from 'framer-motion'
import type { MouseEvent, ReactNode } from 'react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export interface DrawerProps {
    bodyClass?: string
    children?: ReactNode
    className?: string
    closable?: boolean
    footer?: string | ReactNode
    footerClass?: string
    headerClass?: string
    height?: string | number
    isOpen?: boolean
    lockScroll?: boolean
    onClose?: (e?: MouseEvent<HTMLButtonElement>) => void
    placement?: 'top' | 'right' | 'bottom' | 'left'
    showBackdrop?: boolean
    title?: string | ReactNode
    width?: string | number
}

const Drawer = (props: DrawerProps) => {
    const {
        bodyClass,
        children,
        className,
        closable = true,
        footer,
        footerClass,
        headerClass,
        height = 400,
        isOpen = false,
        lockScroll = true,
        onClose,
        placement = 'right',
        showBackdrop = true,
        title,
        width = 400,
    } = props

    useEffect(() => {
        if (lockScroll && isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, lockScroll])

    const onCloseClick = (e: MouseEvent<HTMLButtonElement>) => {
        onClose?.(e)
    }

    const renderCloseButton = (
        <button 
            type="button" 
            onClick={onCloseClick}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
            <X size={20} />
        </button>
    )

    const getStyle = (): {
        dimensionClass?: string
        contentStyle?: {
            width?: string | number
            height?: string | number
        }
        motionStyle: {
            [x: string]: string
        }
    } => {
        if (placement === 'left' || placement === 'right') {
            return {
                dimensionClass: 'vertical h-full',
                contentStyle: { width },
                motionStyle: {
                    [placement]: `-${width}${typeof width === 'number' ? 'px' : ''}`,
                },
            }
        }

        if (placement === 'top' || placement === 'bottom') {
            return {
                dimensionClass: 'horizontal w-full',
                contentStyle: { height },
                motionStyle: {
                    [placement]: `-${height}${typeof height === 'number' ? 'px' : ''}`,
                },
            }
        }

        return {
            motionStyle: {},
        }
    }

    const { dimensionClass, contentStyle, motionStyle } = getStyle()

    if (typeof window === 'undefined') return null

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 w-screen h-screen z-[9999]">
                    {showBackdrop && (
                        <motion.div
                            className="absolute inset-0 w-full h-full bg-black/30 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => onClose?.()}
                        />
                    )}
                    <motion.div
                        className={classNames(
                            'bg-white dark:bg-gray-800 shadow-xl absolute flex flex-col',
                            dimensionClass,
                            className
                        )}
                        style={{
                            ...contentStyle,
                            [placement]: 0,
                        }}
                        initial={motionStyle}
                        animate={{ [placement]: 0 }}
                        exit={motionStyle}
                        transition={{ type: 'tween', duration: 0.3 }}
                    >
                        {title || closable ? (
                            <div className={classNames('drawer-header flex items-center justify-between py-4 px-6 border-b border-gray-200 dark:border-gray-700', headerClass)}>
                                {typeof title === 'string' ? (
                                    <h4 className="text-lg font-semibold">{title}</h4>
                                ) : (
                                    <span>{title}</span>
                                )}
                                {closable && renderCloseButton}
                            </div>
                        ) : null}
                        <div className={classNames('drawer-body p-6 h-full overflow-y-auto', bodyClass)}>
                            {children}
                        </div>
                        {footer && (
                            <div className={classNames('drawer-footer flex items-center justify-between py-4 px-6 border-t border-gray-200 dark:border-gray-700', footerClass)}>
                                {footer}
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    )
}

Drawer.displayName = 'Drawer'

export default Drawer
