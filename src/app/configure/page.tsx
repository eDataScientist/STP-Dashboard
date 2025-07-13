import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Configuration Setup - FIGS Claims Interpreter',
  description: 'Configure data schema and FIGS tree structure',
}

export default function ConfigurePage() {
  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-6'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-foreground mb-2'>
            Configuration Setup
          </h1>
          <p className='text-muted-foreground'>
            Configure data schema and FIGS tree structure
          </p>
          <div className='mt-4 text-sm text-muted-foreground'>Step 2 of 4</div>
        </div>

        <div className='space-y-6'>
          <div className='border-2 border-dashed border-border rounded-lg p-8 text-center'>
            <div className='text-muted-foreground'>
              <p className='text-lg mb-2'>
                Configuration functionality coming soon...
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
