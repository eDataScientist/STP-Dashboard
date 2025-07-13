'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface Step {
  id: string
  name: string
  href: string
  current: boolean
  completed: boolean
}

function getStepsFromPath(pathname: string): Step[] {
  const steps = [
    { id: 'upload', name: 'Upload', href: '/upload' },
    { id: 'configure', name: 'Configure', href: '/configure' },
    { id: 'analyze', name: 'Analyze', href: '/analyze' },
  ]

  return steps.map((step, index) => {
    const isCurrent = pathname === step.href
    const isCompleted = steps.findIndex(s => s.href === pathname) > index

    return {
      ...step,
      current: isCurrent,
      completed: isCompleted,
    }
  })
}

export default function ApplicationHeader() {
  const pathname = usePathname()
  const steps = getStepsFromPath(pathname)

  return (
    <header className='bg-background border-b border-border'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Link href='/' className='hover:opacity-80 transition-opacity'>
              <div>
                <h1 className='text-xl font-bold text-foreground'>
                  FIGS Claims Interpreter
                </h1>
                <p className='text-sm text-muted-foreground'>
                  Interactive Anomaly Score Analysis Tool
                </p>
              </div>
            </Link>
            <div className='text-xs text-muted-foreground ml-4'>v1.0</div>
          </div>

          {pathname !== '/' && (
            <nav className='flex items-center space-x-2'>
              {steps.map((step, index) => (
                <div key={step.id} className='flex items-center'>
                  <Link
                    href={step.href}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      step.current
                        ? 'bg-primary text-primary-foreground'
                        : step.completed
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {step.name}
                  </Link>
                  {index < steps.length - 1 && (
                    <span className='mx-2 text-muted-foreground'>→</span>
                  )}
                </div>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}
