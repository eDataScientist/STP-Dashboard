import { Metadata } from 'next'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import PageLayout from '@/components/layout/PageLayout'

export const metadata: Metadata = {
  title: 'Data Upload - FIGS Claims Interpreter',
  description: 'Upload your claims data CSV file to begin analysis',
}

export default function UploadPage() {
  return (
    <PageLayout
      title='Data Upload'
      description='Upload your claims data CSV file to begin analysis'
    >
      <div className='space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle>Claims Data File</CardTitle>
            <CardDescription>
              Upload your CSV file containing claims data to begin the analysis
              process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='border-2 border-dashed border-border rounded-lg p-8 text-center'>
              <div className='text-muted-foreground'>
                <p className='text-lg mb-2'>
                  Upload functionality coming soon...
                </p>
                <p className='text-sm'>
                  This will be implemented in task P0-023
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

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
      </div>
    </PageLayout>
  )
}
