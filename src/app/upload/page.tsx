import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Data Upload - FIGS Claims Interpreter',
  description: 'Upload your claims data CSV file to begin analysis',
}

export default function UploadPage() {
  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-6'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-foreground mb-2'>
            Data Upload
          </h1>
          <p className='text-muted-foreground'>
            Upload your claims data CSV file to begin analysis
          </p>
          <div className='mt-4 text-sm text-muted-foreground'>Step 1 of 4</div>
        </div>

        <div className='space-y-6'>
          <div className='border-2 border-dashed border-border rounded-lg p-8 text-center'>
            <div className='text-muted-foreground'>
              <p className='text-lg mb-2'>
                Upload functionality coming soon...
              </p>
              <p className='text-sm'>
                This will be implemented in upcoming tasks
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
