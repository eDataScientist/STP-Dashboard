import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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
              <Card>
                <CardHeader>
                  <CardTitle>1. Upload</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Upload your claims data CSV file
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. Configure</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Set up data schema and FIGS tree structure
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. Analyze</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Explore interactive visualizations
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            <Button asChild size='lg'>
              <Link href='/upload'>Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
