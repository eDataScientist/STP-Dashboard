import React, { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import CSVParser from '@/lib/parsers/CSVParser'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  onFileValidated?: (file: File, isValid: boolean) => void
  acceptedTypes?: string[]
  maxSize?: number
  className?: string
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  onFileValidated,
  acceptedTypes = ['.csv'],
  maxSize = 500 * 1024 * 1024, // 500MB default
  className,
}) => {
  const [uploadState, setUploadState] = useState<
    'idle' | 'dragActive' | 'uploading' | 'success' | 'error'
  >('idle')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (uploadState !== 'dragActive') {
        setUploadState('dragActive')
      }
    },
    [uploadState]
  )

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setUploadState('idle')
  }, [])

  const handleFileSelection = useCallback(
    async (file: File) => {
      setSelectedFile(file)
      setError(null)
      setUploadState('uploading')
      setProgress(0)

      try {
        // Validate file size
        if (file.size > maxSize) {
          setError(
            `File size exceeds maximum limit of ${(maxSize / 1024 / 1024).toFixed(0)}MB`
          )
          setUploadState('error')
          onFileValidated?.(file, false)
          return
        }

        // Validate file format
        const validationResult = await CSVParser.validateFormat(file)

        if (!validationResult.isValid) {
          const errorMessage = validationResult.errors
            .map(e => e.message)
            .join(', ')
          setError(errorMessage)
          setUploadState('error')
          onFileValidated?.(file, false)
          return
        }

        // Simulate progress for large files
        if (file.size > 10 * 1024 * 1024) {
          // 10MB
          for (let i = 0; i <= 100; i += 10) {
            setProgress(i)
            await new Promise(resolve => setTimeout(resolve, 100))
          }
        }

        setUploadState('success')
        setProgress(100)
        onFileSelect(file)
        onFileValidated?.(file, true)
      } catch (error) {
        setError(`Failed to process file: ${(error as Error).message}`)
        setUploadState('error')
        onFileValidated?.(file, false)
      }
    },
    [onFileSelect, onFileValidated, maxSize]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setUploadState('idle')

      const files = e.dataTransfer.files
      if (files.length > 0) {
        handleFileSelection(files[0])
      }
    },
    [handleFileSelection]
  )

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        handleFileSelection(files[0])
      }
    },
    [handleFileSelection]
  )

  const handleBrowseClick = useCallback(() => {
    const fileInput = document.getElementById('file-input') as HTMLInputElement
    fileInput?.click()
  }, [])

  // Component implementation will be added in next increments
  return (
    <div className={cn('w-full', className)}>
      <input
        id='file-input'
        type='file'
        accept={acceptedTypes.join(',')}
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
        aria-label='File upload input'
      />
      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
          'hover:border-primary hover:bg-primary/5',
          {
            'border-primary bg-primary/10': uploadState === 'dragActive',
            'border-green-500 bg-green-50': uploadState === 'success',
            'border-red-500 bg-red-50': uploadState === 'error',
          }
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        <div className='flex flex-col items-center gap-4'>
          <Upload className='w-12 h-12 text-muted-foreground' />
          <div className='text-lg font-medium'>
            {uploadState === 'dragActive'
              ? 'Drop file to upload'
              : uploadState === 'uploading'
                ? 'Processing file...'
                : 'Drag and drop your CSV file here'}
          </div>
          <div className='text-sm text-muted-foreground'>
            {uploadState === 'uploading'
              ? `${progress}% complete`
              : 'or click to browse files'}
          </div>
          {uploadState === 'uploading' && (
            <Progress value={progress} className='w-full max-w-xs' />
          )}
        </div>
      </div>

      {/* File info and error display */}
      {selectedFile && (
        <div className='mt-4 p-4 bg-gray-50 rounded-lg'>
          <div className='flex items-center gap-3'>
            <FileText className='w-5 h-5 text-blue-600' />
            <div className='flex-1'>
              <div className='font-medium'>{selectedFile.name}</div>
              <div className='text-sm text-muted-foreground'>
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </div>
            </div>
            {uploadState === 'success' && (
              <CheckCircle className='w-5 h-5 text-green-600' />
            )}
            {uploadState === 'error' && (
              <AlertCircle className='w-5 h-5 text-red-600' />
            )}
          </div>
        </div>
      )}

      {error && (
        <div className='mt-4 p-4 bg-red-50 border border-red-200 rounded-lg'>
          <div className='flex items-center gap-3'>
            <AlertCircle className='w-5 h-5 text-red-600' />
            <div className='text-sm text-red-700'>{error}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FileUpload
