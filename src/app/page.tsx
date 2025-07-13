import Link from 'next/link'

export default function HomePage() {
  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <div className='mb-8'>
            <h1 className='text-4xl font-bold text-foreground mb-4'>
              FIGS Claims Interpreter
            </h1>
            <p className='text-xl text-muted-foreground mb-2'>
              Interactive Anomaly Score Analysis Tool
            </p>
            <p className='text-lg text-muted-foreground'>
              Visualize and understand FIGS model predictions for claims data
            </p>
          </div>

          <div className='mb-12'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
              <div className='p-6 border rounded-lg'>
                <h3 className='font-semibold text-lg mb-2'>1. Upload</h3>
                <p className='text-muted-foreground'>
                  Upload your claims data CSV file
                </p>
              </div>
              <div className='p-6 border rounded-lg'>
                <h3 className='font-semibold text-lg mb-2'>2. Configure</h3>
                <p className='text-muted-foreground'>
                  Set up data schema and FIGS tree structure
                </p>
              </div>
              <div className='p-6 border rounded-lg'>
                <h3 className='font-semibold text-lg mb-2'>3. Analyze</h3>
                <p className='text-muted-foreground'>
                  Explore interactive visualizations
                </p>
              </div>
            </div>

            <Link
              href='/upload'
              className='inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors'
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
