import { ReactNode } from 'react'

interface PageLayoutProps {
  children: ReactNode
  title?: string
  description?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  className?: string
}

export default function PageLayout({
  children,
  title,
  description,
  maxWidth = 'full',
  className = '',
}: PageLayoutProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
  }

  return (
    <div className='min-h-screen bg-background'>
      <div
        className={`container mx-auto px-4 py-6 ${maxWidthClasses[maxWidth]} ${className}`}
      >
        {(title || description) && (
          <div className='mb-8'>
            {title && (
              <h1 className='text-3xl font-bold text-foreground mb-2'>
                {title}
              </h1>
            )}
            {description && (
              <p className='text-muted-foreground'>{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
