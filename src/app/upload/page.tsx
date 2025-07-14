'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import PageLayout from '@/components/layout/PageLayout'
import FileUpload from '@/components/FileUpload'
import UploadProgress from '@/components/UploadProgress'
import DataPreview from '@/components/DataPreview'

interface ProcessedStats {
  totalRows: number
  processedRows: number
  validRows: number
  invalidRows: number
  excludedRows: number
  fileSizeMB: number
  elapsedTime: number
  estimatedTimeRemaining?: number
}

interface PreviewStats {
  totalRows: number
  totalColumns: number
  detectedDelimiter: string
  detectedEncoding: string
  fileName: string
  fileSize: number
  hasClaimIdColumn: boolean
  claimIdColumn?: string
}

interface UploadPageState {
  step: 'upload' | 'processing' | 'preview' | 'complete'
  selectedFile: File | null
  isProcessing: boolean
  progress: number
  currentOperation: string
  processedData: Record<string, string | number | boolean | null>[]
  columnNames: string[]
  processedStats: ProcessedStats | null
  previewStats: PreviewStats | null
  error: string | null
}

export default function UploadPage() {
  const [state, setState] = useState<UploadPageState>({
    step: 'upload',
    selectedFile: null,
    isProcessing: false,
    progress: 0,
    currentOperation: '',
    processedData: [],
    columnNames: [],
    processedStats: null,
    previewStats: null,
    error: null,
  })

  const handleFileSelect = (file: File) => {
    setState(prev => ({
      ...prev,
      selectedFile: file,
      step: 'processing',
      error: null,
    }))
  }

  const handleFileValidated = (file: File, isValid: boolean) => {
    if (isValid) {
      // Simulate file processing for demo
      simulateFileProcessing(file)
    }
  }

  const simulateFileProcessing = async (file: File) => {
    setState(prev => ({
      ...prev,
      isProcessing: true,
      currentOperation: 'Reading file...',
    }))

    // Demo: simulate processing steps
    await new Promise(resolve => setTimeout(resolve, 500))
    setState(prev => ({
      ...prev,
      progress: 25,
      currentOperation: 'Parsing CSV...',
    }))

    await new Promise(resolve => setTimeout(resolve, 500))
    setState(prev => ({
      ...prev,
      progress: 50,
      currentOperation: 'Validating data...',
    }))

    await new Promise(resolve => setTimeout(resolve, 500))
    setState(prev => ({
      ...prev,
      progress: 75,
      currentOperation: 'Generating preview...',
    }))

    await new Promise(resolve => setTimeout(resolve, 500))

    // Demo: Set mock processed data
    const mockData = [
      {
        claim_id: 'CL001',
        count_of_parts: 2.5,
        damage_left: 1,
        damage_rear: 0,
      },
      {
        claim_id: 'CL002',
        count_of_parts: 1.0,
        damage_left: 0,
        damage_rear: 1,
      },
      {
        claim_id: 'CL003',
        count_of_parts: 3.2,
        damage_left: 1,
        damage_rear: 1,
      },
    ]

    setState(prev => ({
      ...prev,
      progress: 100,
      isProcessing: false,
      step: 'preview',
      processedData: mockData,
      columnNames: ['claim_id', 'count_of_parts', 'damage_left', 'damage_rear'],
      processedStats: {
        totalRows: 1000,
        processedRows: 1000,
        validRows: 997,
        invalidRows: 3,
        excludedRows: 0,
        fileSizeMB: file.size / 1024 / 1024,
        elapsedTime: 2.0,
      },
      previewStats: {
        totalRows: 1000,
        totalColumns: 4,
        detectedDelimiter: ',',
        detectedEncoding: 'UTF-8',
        fileName: file.name,
        fileSize: file.size,
        hasClaimIdColumn: true,
        claimIdColumn: 'claim_id',
      },
    }))
  }

  return (
    <PageLayout
      title='Data Upload'
      description='Upload your claims data CSV file to begin analysis'
    >
      <div className='space-y-6'>
        {/* Step Indicator */}
        <div className='flex items-center justify-center'>
          <Badge variant='outline' className='text-sm'>
            Step 1 of 4: Data Upload
          </Badge>
        </div>

        {/* File Upload Section */}
        {(state.step === 'upload' || state.step === 'processing') && (
          <Card>
            <CardHeader>
              <CardTitle>Claims Data File</CardTitle>
              <CardDescription>
                Upload your CSV file containing claims data to begin the
                analysis process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                onFileSelect={handleFileSelect}
                onFileValidated={handleFileValidated}
                acceptedTypes={['.csv']}
                maxSize={500 * 1024 * 1024} // 500MB
              />
            </CardContent>
          </Card>
        )}

        {/* File Requirements */}
        {state.step === 'upload' && (
          <Card>
            <CardHeader>
              <CardTitle>File Requirements</CardTitle>
              <CardDescription>
                Your CSV file must meet these requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className='space-y-2 text-sm text-muted-foreground'>
                <li>• Supported formats: CSV files (.csv)</li>
                <li>• Maximum file size: 500MB</li>
                <li>• Maximum records: 500,000 rows</li>
                <li>• Required: claim_id column</li>
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Processing Progress */}
        {state.step === 'processing' && state.processedStats && (
          <UploadProgress
            isProcessing={state.isProcessing}
            progress={state.progress}
            currentOperation={state.currentOperation}
            stats={state.processedStats}
            isComplete={!state.isProcessing}
            hasError={!!state.error}
            errorMessage={state.error || undefined}
          />
        )}

        {/* Data Preview */}
        {state.step === 'preview' && state.previewStats && (
          <DataPreview
            sampleData={state.processedData}
            columnNames={state.columnNames}
            stats={state.previewStats}
            isLoading={false}
          />
        )}

        {/* Action Buttons */}
        {state.step === 'preview' && (
          <div className='flex items-center justify-between'>
            <Button
              variant='outline'
              onClick={() =>
                setState(prev => ({
                  ...prev,
                  step: 'upload',
                  selectedFile: null,
                  processedData: [],
                  columnNames: [],
                  processedStats: null,
                  previewStats: null,
                  progress: 0,
                }))
              }
            >
              Upload Different File
            </Button>
            <Button
              onClick={() => {
                // Navigate to configuration page
                window.location.href = '/configure'
              }}
              disabled={!state.previewStats?.hasClaimIdColumn}
            >
              Continue to Configuration
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
