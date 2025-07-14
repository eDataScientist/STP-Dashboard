import React from 'react'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'
import {
  CheckCircle,
  AlertCircle,
  Clock,
  FileText,
  BarChart3,
} from 'lucide-react'

interface UploadProgressStats {
  totalRows: number
  processedRows: number
  validRows: number
  invalidRows: number
  excludedRows: number
  fileSizeMB: number
  elapsedTime: number
  estimatedTimeRemaining?: number
}

interface UploadProgressProps {
  isProcessing: boolean
  progress: number
  currentOperation: string
  stats: UploadProgressStats
  isComplete: boolean
  hasError: boolean
  errorMessage?: string
  onCancel?: () => void
  className?: string
}

export const UploadProgress: React.FC<UploadProgressProps> = ({
  isProcessing,
  progress,
  currentOperation,
  stats,
  isComplete,
  hasError,
  errorMessage,
  onCancel,
  className,
}) => {
  const formatTime = (seconds: number): string => {
    if (seconds < 60) return `${Math.round(seconds)}s`
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.round(seconds % 60)
    return `${minutes}m ${remainingSeconds}s`
  }

  return (
    <div
      className={cn(
        'w-full p-6 bg-white rounded-lg shadow-sm border',
        className
      )}
    >
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-3'>
          <FileText className='w-6 h-6 text-blue-600' />
          <div>
            <h3 className='text-lg font-semibold'>Processing Data</h3>
            <p className='text-sm text-muted-foreground'>
              {stats.fileSizeMB.toFixed(2)} MB •{' '}
              {stats.totalRows.toLocaleString()} rows
            </p>
          </div>
        </div>
        {onCancel && isProcessing && (
          <button
            onClick={onCancel}
            className='text-sm text-muted-foreground hover:text-red-600'
          >
            Cancel
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div className='mb-6'>
        <div className='flex justify-between text-sm mb-2'>
          <span className='font-medium'>{currentOperation}</span>
          <span className='text-muted-foreground'>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className='h-2' />
      </div>

      {/* Processing Statistics */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
        <div className='text-center'>
          <div className='text-2xl font-bold text-blue-600'>
            {stats.processedRows.toLocaleString()}
          </div>
          <div className='text-sm text-muted-foreground'>Processed</div>
        </div>
        <div className='text-center'>
          <div className='text-2xl font-bold text-green-600'>
            {stats.validRows.toLocaleString()}
          </div>
          <div className='text-sm text-muted-foreground'>Valid</div>
        </div>
        <div className='text-center'>
          <div className='text-2xl font-bold text-red-600'>
            {stats.invalidRows.toLocaleString()}
          </div>
          <div className='text-sm text-muted-foreground'>Invalid</div>
        </div>
        <div className='text-center'>
          <div className='text-2xl font-bold text-gray-600'>
            {stats.excludedRows.toLocaleString()}
          </div>
          <div className='text-sm text-muted-foreground'>Excluded</div>
        </div>
      </div>

      {/* Timing Information */}
      <div className='flex items-center justify-between text-sm text-muted-foreground mb-4'>
        <div className='flex items-center gap-2'>
          <Clock className='w-4 h-4' />
          <span>Elapsed: {formatTime(stats.elapsedTime)}</span>
        </div>
        {stats.estimatedTimeRemaining && isProcessing && (
          <div>
            Estimated remaining: {formatTime(stats.estimatedTimeRemaining)}
          </div>
        )}
      </div>

      {/* Completion State */}
      {isComplete && !hasError && (
        <div className='flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg'>
          <CheckCircle className='w-5 h-5 text-green-600' />
          <div>
            <div className='font-medium text-green-800'>
              Processing Complete!
            </div>
            <div className='text-sm text-green-700'>
              Successfully processed {stats.validRows.toLocaleString()} valid
              rows
              {stats.invalidRows > 0 &&
                ` (${stats.invalidRows.toLocaleString()} invalid)`}
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className='flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg'>
          <AlertCircle className='w-5 h-5 text-red-600' />
          <div>
            <div className='font-medium text-red-800'>Processing Failed</div>
            <div className='text-sm text-red-700'>
              {errorMessage || 'An error occurred during processing'}
            </div>
          </div>
        </div>
      )}

      {/* Summary Statistics (shown when complete) */}
      {isComplete && !hasError && (
        <div className='mt-4 p-4 bg-gray-50 rounded-lg'>
          <div className='flex items-center gap-2 mb-2'>
            <BarChart3 className='w-4 h-4 text-gray-600' />
            <span className='font-medium text-gray-800'>
              Processing Summary
            </span>
          </div>
          <div className='text-sm text-gray-600 space-y-1'>
            <div>Total processing time: {formatTime(stats.elapsedTime)}</div>
            <div>
              Processing rate:{' '}
              {Math.round(stats.totalRows / stats.elapsedTime).toLocaleString()}{' '}
              rows/second
            </div>
            <div>
              Data quality:{' '}
              {((stats.validRows / stats.totalRows) * 100).toFixed(1)}% valid
              data
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadProgress
