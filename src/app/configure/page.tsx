import { Metadata } from 'next'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Configuration Setup - FIGS Claims Interpreter',
  description: 'Configure data schema and FIGS tree structure',
}

export default function ConfigurePage() {
  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-6'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <Card>
            <CardHeader>
              <CardTitle>Data Schema Configuration</CardTitle>
              <CardDescription>
                Define data types for your CSV columns (JSON format matching
                pandas .info() output)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='border-2 border-dashed border-border rounded-lg p-8 text-center'>
                <div className='text-muted-foreground'>
                  <p className='text-lg mb-2'>Schema input coming soon...</p>
                  <p className='text-sm'>
                    This will be implemented in task P0-027
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FIGS Tree Structure</CardTitle>
              <CardDescription>
                Paste your FIGS tree structure in the exact format from your
                model output
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='border-2 border-dashed border-border rounded-lg p-8 text-center'>
                <div className='text-muted-foreground'>
                  <p className='text-lg mb-2'>Tree input coming soon...</p>
                  <p className='text-sm'>
                    This will be implemented in task P0-028
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='lg:col-span-2'>
            <CardHeader>
              <CardTitle>Validation Results</CardTitle>
              <CardDescription>
                Schema and tree validation results will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='border-2 border-dashed border-border rounded-lg p-8 text-center'>
                <div className='text-muted-foreground'>
                  <p className='text-lg mb-2'>
                    Validation display coming soon...
                  </p>
                  <p className='text-sm'>
                    This will be implemented in tasks P1-029 and P1-030
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
