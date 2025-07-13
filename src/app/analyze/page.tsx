import { Metadata } from 'next'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Statistics</CardTitle>
              <CardDescription>
                Overview of your claims data and analysis results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='border-2 border-dashed border-border rounded-lg p-8 text-center'>
                <div className='text-muted-foreground'>
                  <p className='text-lg mb-2'>
                    Statistics panel coming soon...
                  </p>
                  <p className='text-sm'>
                    This will be implemented in task P0-036
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='h-[600px]'>
            <CardHeader>
              <CardTitle>Swarm Plot Visualization</CardTitle>
              <CardDescription>
                Interactive swarm plot showing claims by anomaly score
              </CardDescription>
            </CardHeader>
            <CardContent className='h-full'>
              <div className='border-2 border-dashed border-border rounded-lg p-8 text-center h-full flex items-center justify-center'>
                <div className='text-muted-foreground'>
                  <p className='text-lg mb-2'>Swarm plot coming soon...</p>
                  <p className='text-sm'>
                    This will be implemented in tasks P0-032 and P0-033
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
