'use client'

import React from 'react'
import { Toaster } from 'sonner'

interface ToastNotificationSystemProps {
  position?:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-center'
    | 'bottom-center'
  theme?: 'light' | 'dark' | 'system'
  closeButton?: boolean
  richColors?: boolean
  expand?: boolean
  duration?: number
}

const ToastNotificationSystem: React.FC<ToastNotificationSystemProps> = ({
  position = 'top-right',
  theme = 'system',
  closeButton = true,
  richColors = true,
  expand = false,
  duration = 4000,
}) => {
  return (
    <Toaster
      position={position}
      theme={theme}
      closeButton={closeButton}
      richColors={richColors}
      expand={expand}
      duration={duration}
      toastOptions={{
        style: {
          background: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--border))',
        },
        className: 'font-sans',
      }}
    />
  )
}

export default ToastNotificationSystem
