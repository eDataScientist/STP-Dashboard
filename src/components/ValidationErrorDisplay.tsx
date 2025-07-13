'use client'

import React from 'react'
import {
  ValidationResult,
  ValidationError,
  ValidationWarning,
} from '../lib/types/core'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { AlertTriangle, XCircle, Info } from 'lucide-react'

interface ValidationErrorDisplayProps {
  result: ValidationResult
  title?: string
  showWarnings?: boolean
}

const ValidationErrorDisplay: React.FC<ValidationErrorDisplayProps> = ({
  result,
  title = 'Validation Results',
  showWarnings = true,
}) => {
  if (result.isValid && (!showWarnings || result.warnings.length === 0)) {
    return null
  }

  return (
    <Card className='mt-4'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          {result.isValid ? (
            <Info className='h-5 w-5 text-blue-500' />
          ) : (
            <XCircle className='h-5 w-5 text-destructive' />
          )}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {result.summary && (
          <p className='text-sm text-muted-foreground'>{result.summary}</p>
        )}

        {result.errors.length > 0 && (
          <div className='space-y-2'>
            <h4 className='font-medium text-destructive flex items-center gap-2'>
              <XCircle className='h-4 w-4' />
              Errors ({result.errors.length})
            </h4>
            <div className='space-y-1'>
              {result.errors.map((error, index) => (
                <ErrorItem key={index} error={error} />
              ))}
            </div>
          </div>
        )}

        {showWarnings && result.warnings.length > 0 && (
          <div className='space-y-2'>
            <h4 className='font-medium text-yellow-600 flex items-center gap-2'>
              <AlertTriangle className='h-4 w-4' />
              Warnings ({result.warnings.length})
            </h4>
            <div className='space-y-1'>
              {result.warnings.map((warning, index) => (
                <WarningItem key={index} warning={warning} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface ErrorItemProps {
  error: ValidationError
}

const ErrorItem: React.FC<ErrorItemProps> = ({ error }) => {
  return (
    <div className='bg-destructive/10 border border-destructive/20 rounded-md p-3'>
      <div className='flex items-start gap-2'>
        <XCircle className='h-4 w-4 text-destructive mt-0.5 flex-shrink-0' />
        <div className='flex-1'>
          <p className='text-sm text-destructive font-medium'>
            {error.message}
          </p>
          {error.field && (
            <p className='text-xs text-muted-foreground mt-1'>
              Field:{' '}
              <code className='bg-muted px-1 rounded'>{error.field}</code>
            </p>
          )}
          {error.line && (
            <p className='text-xs text-muted-foreground mt-1'>
              Line: {error.line}
              {error.column && `, Column: ${error.column}`}
            </p>
          )}
          {error.code && (
            <p className='text-xs text-muted-foreground mt-1'>
              Code: <code className='bg-muted px-1 rounded'>{error.code}</code>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

interface WarningItemProps {
  warning: ValidationWarning
}

const WarningItem: React.FC<WarningItemProps> = ({ warning }) => {
  return (
    <div className='bg-yellow-50 border border-yellow-200 rounded-md p-3'>
      <div className='flex items-start gap-2'>
        <AlertTriangle className='h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0' />
        <div className='flex-1'>
          <p className='text-sm text-yellow-800 font-medium'>
            {warning.message}
          </p>
          {warning.field && (
            <p className='text-xs text-yellow-700 mt-1'>
              Field:{' '}
              <code className='bg-yellow-100 px-1 rounded'>
                {warning.field}
              </code>
            </p>
          )}
          {warning.line && (
            <p className='text-xs text-yellow-700 mt-1'>Line: {warning.line}</p>
          )}
          {warning.code && (
            <p className='text-xs text-yellow-700 mt-1'>
              Code:{' '}
              <code className='bg-yellow-100 px-1 rounded'>{warning.code}</code>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ValidationErrorDisplay
