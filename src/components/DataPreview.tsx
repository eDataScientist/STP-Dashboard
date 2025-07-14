import React from 'react'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FileText, BarChart3, Info } from 'lucide-react'

interface DataPreviewStats {
  totalRows: number
  totalColumns: number
  detectedDelimiter: string
  detectedEncoding: string
  fileName: string
  fileSize: number
  hasClaimIdColumn: boolean
  claimIdColumn?: string
}

interface DataPreviewProps {
  sampleData: Record<string, string | number | boolean | null>[]
  columnNames: string[]
  stats: DataPreviewStats
  isLoading?: boolean
  error?: string
  className?: string
}

export const DataPreview: React.FC<DataPreviewProps> = ({
  sampleData,
  columnNames,
  stats,
  isLoading = false,
  error,
  className,
}) => {
  // Component implementation will be added in next increments
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle>Data Preview</CardTitle>
        <CardDescription>Sample of your uploaded data</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className='flex items-center justify-center p-8'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
              <div className='text-sm text-muted-foreground'>
                Loading data preview...
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className='flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg'>
            <Info className='w-5 h-5 text-red-600' />
            <div className='text-sm text-red-700'>{error}</div>
          </div>
        )}

        {!isLoading && !error && (
          <div className='space-y-6'>
            {/* Summary Statistics */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='flex items-center gap-3 p-4 bg-blue-50 rounded-lg'>
                <FileText className='w-5 h-5 text-blue-600' />
                <div>
                  <div className='text-2xl font-bold text-blue-600'>
                    {stats.totalRows.toLocaleString()}
                  </div>
                  <div className='text-sm text-muted-foreground'>
                    Total Rows
                  </div>
                </div>
              </div>

              <div className='flex items-center gap-3 p-4 bg-green-50 rounded-lg'>
                <BarChart3 className='w-5 h-5 text-green-600' />
                <div>
                  <div className='text-2xl font-bold text-green-600'>
                    {stats.totalColumns}
                  </div>
                  <div className='text-sm text-muted-foreground'>
                    Total Columns
                  </div>
                </div>
              </div>

              <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg'>
                <div className='w-5 h-5 flex items-center justify-center text-gray-600 font-bold'>
                  {stats.detectedDelimiter === ','
                    ? ','
                    : stats.detectedDelimiter === ';'
                      ? ';'
                      : stats.detectedDelimiter === '\t'
                        ? '⇥'
                        : '|'}
                </div>
                <div>
                  <div className='text-lg font-semibold text-gray-600'>
                    {stats.detectedDelimiter === ','
                      ? 'Comma'
                      : stats.detectedDelimiter === ';'
                        ? 'Semicolon'
                        : stats.detectedDelimiter === '\t'
                          ? 'Tab'
                          : 'Pipe'}
                  </div>
                  <div className='text-sm text-muted-foreground'>Delimiter</div>
                </div>
              </div>

              <div className='flex items-center gap-3 p-4 bg-purple-50 rounded-lg'>
                <div className='w-5 h-5 flex items-center justify-center text-purple-600 font-bold'>
                  {stats.detectedEncoding.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className='text-lg font-semibold text-purple-600'>
                    {stats.detectedEncoding}
                  </div>
                  <div className='text-sm text-muted-foreground'>Encoding</div>
                </div>
              </div>
            </div>

            {/* File Information */}
            <div className='p-4 bg-gray-50 rounded-lg'>
              <div className='flex items-center justify-between mb-2'>
                <span className='font-medium'>File Information</span>
                <div className='flex items-center gap-2'>
                  <Badge
                    variant={stats.hasClaimIdColumn ? 'success' : 'destructive'}
                  >
                    {stats.hasClaimIdColumn
                      ? '✓ claim_id found'
                      : '✗ claim_id missing'}
                  </Badge>
                </div>
              </div>
              <div className='text-sm text-muted-foreground space-y-1'>
                <div>File Name: {stats.fileName}</div>
                <div>
                  File Size: {(stats.fileSize / 1024 / 1024).toFixed(2)} MB
                </div>
                {stats.claimIdColumn && (
                  <div>Claim ID Column: {stats.claimIdColumn}</div>
                )}
              </div>
            </div>

            {/* Sample Data Table */}
            {sampleData.length > 0 && (
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <h4 className='font-medium'>Sample Data</h4>
                  <Badge variant='outline'>
                    Showing first {Math.min(sampleData.length, 3)} rows
                  </Badge>
                </div>

                <div className='border rounded-lg'>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {columnNames.slice(0, 5).map((column, index) => (
                          <TableHead key={index}>{column}</TableHead>
                        ))}
                        {columnNames.length > 5 && (
                          <TableHead className='text-center'>
                            ... and {columnNames.length - 5} more
                          </TableHead>
                        )}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleData.slice(0, 3).map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                          {columnNames.slice(0, 5).map((column, colIndex) => (
                            <TableCell
                              key={colIndex}
                              className='max-w-[200px] truncate'
                            >
                              {row[column]?.toString() || '—'}
                            </TableCell>
                          ))}
                          {columnNames.length > 5 && (
                            <TableCell className='text-center text-muted-foreground'>
                              ...
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default DataPreview
