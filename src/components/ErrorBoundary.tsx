'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({ error, errorInfo })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <Card className='max-w-2xl mx-auto mt-8'>
          <CardHeader>
            <CardTitle className='text-destructive'>
              Something went wrong
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-muted-foreground'>
              An unexpected error occurred. Please try refreshing the page or
              contact support if the problem persists.
            </p>

            {this.state.error && (
              <details className='bg-muted p-4 rounded-md'>
                <summary className='cursor-pointer font-medium'>
                  Error Details
                </summary>
                <div className='mt-2 text-sm font-mono'>
                  <p className='text-destructive'>{this.state.error.message}</p>
                  {this.state.error.stack && (
                    <pre className='mt-2 text-xs overflow-auto'>
                      {this.state.error.stack}
                    </pre>
                  )}
                </div>
              </details>
            )}

            <div className='flex gap-2'>
              <Button onClick={this.handleReset} variant='outline'>
                Try Again
              </Button>
              <Button onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
            </div>
          </CardContent>
        </Card>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
