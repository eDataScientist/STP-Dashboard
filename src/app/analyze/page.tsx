import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analysis Dashboard - FIGS Claims Interpreter',
  description: 'Interactive visualization and analysis of claims data',
}

export default function AnalyzePage() {
  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-6'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-foreground mb-2'>
            Analysis Dashboard
          </h1>
          <p className='text-muted-foreground'>
            Interactive visualization and analysis of claims data
          </p>
          <div className='mt-4 text-sm text-muted-foreground'>Step 3 of 4</div>
        </div>

        <div className='space-y-6'>
          <div className='border-2 border-dashed border-border rounded-lg p-8 text-center'>
            <div className='text-muted-foreground'>
              <p className='text-lg mb-2'>
                Dashboard functionality coming soon...
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
