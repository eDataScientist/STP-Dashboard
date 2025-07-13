# FIGS Interactive Claims Interpreter
## Software Blueprint & Implementation Guide

**Version:** 1.0  
**Date:** July 13, 2025  
**Technology Stack:** Next.js 14, TypeScript, shadcn/ui, Tailwind CSS, D3.js

---

## 1. Implementation Phases & Build Order

### Phase 1: Foundation & Data Layer (Week 1-2)
```
Priority Order:
1. Project setup and base infrastructure
2. Type definitions and data models
3. File upload and parsing utilities
4. Schema validation system
5. Basic error handling framework
```

### Phase 2: Core Visualization (Week 3-4)
```
Priority Order:
1. Swarm plot basic rendering
2. Point positioning and layout algorithms
3. Basic interaction system (hover, click)
4. Tree structure parser and validator
5. Tree visualization component foundation
```

### Phase 3: Interactive Features (Week 5-6)
```
Priority Order:
1. Tree traversal animation system
2. Popup modal framework
3. Calculation display components
4. Navigation and zoom controls
5. Edge case handling (missing data, outliers)
```

### Phase 4: Polish & Optimization (Week 7-8)
```
Priority Order:
1. Performance optimization for large datasets
2. Configuration management system
3. Export functionality
4. Responsive design implementation
5. Testing and documentation
```

---

## 2. Application Architecture Overview

```typescript
src/
├── app/                     # Next.js App Router
├── components/              # React Components
│   ├── core/               # Core application components
│   ├── ui/                 # shadcn/ui components
│   ├── visualization/      # D3.js visualization components
│   └── layout/             # Layout and navigation
├── lib/                    # Utility libraries
│   ├── parsers/           # Data parsing utilities
│   ├── validators/        # Validation logic
│   ├── calculators/       # FIGS calculation engine
│   ├── animators/         # Animation utilities
│   └── types/             # TypeScript definitions
├── hooks/                  # Custom React hooks
├── stores/                # State management (Zustand)
├── utils/                 # General utilities
└── constants/             # Application constants
```

---

## 3. Core Type Definitions

```typescript
// lib/types/core.ts
interface ClaimRecord {
  id: string
  features: Record<string, number | string | boolean>
  anomalyScore?: number
  classification?: ClaimClassification
  exclusionReason?: string
  isUnivariate?: boolean
  outlierFeatures?: string[]
}

interface ClaimClassification {
  primary: 'STP' | 'Non-STP' | 'Excluded'
  secondary?: string
  confidence?: number
}

interface DataSchema {
  columnTypes: Record<string, 'float64' | 'int64' | 'object' | 'bool'>
  requiredColumns: string[]
  claimIdColumn: string
  scoreColumn?: string
}

interface FIGSTree {
  id: string
  name: string
  root: TreeNode
  contribution?: number
}

interface TreeNode {
  type: 'decision' | 'leaf'
  feature?: string
  threshold?: number
  operator?: '<=' | '>' | '<' | '>=' | '='
  value?: number
  left?: TreeNode
  right?: TreeNode
  path?: boolean // true if this node was taken in traversal
}

interface TreeTraversal {
  treeId: string
  path: TreeTraversalStep[]
  finalValue: number
  contribution: number
}

interface TreeTraversalStep {
  nodeId: string
  feature: string
  threshold: number
  actualValue: number
  comparison: string
  result: boolean
  direction: 'left' | 'right'
}

interface FIGSPrediction {
  claimId: string
  treeTraversals: TreeTraversal[]
  individualContributions: number[]
  totalSum: number
  finalScore: number
  classification: ClaimClassification
  appliedSigmoid: boolean
}
```

---

## 4. Data Management Layer

### 4.1 File Upload & Parsing Module

```typescript
// lib/parsers/CSVParser.ts
class CSVParser {
  static async parseFile(file: File, schema: DataSchema): Promise<ClaimRecord[]>
  static validateFormat(file: File): Promise<ValidationResult>
  static detectDelimiter(content: string): string
  static detectEncoding(file: File): Promise<string>
  static processLargeFile(file: File, chunkSize: number, onProgress: ProgressCallback): Promise<ClaimRecord[]>
}

// lib/parsers/TreeParser.ts
class TreeParser {
  static parseTextFormat(treeText: string): FIGSTree[]
  static validateTreeStructure(trees: FIGSTree[]): ValidationResult
  static convertToYAML(trees: FIGSTree[]): string
  static parseYAMLFormat(yamlText: string): FIGSTree[]
  static validateTreeFeatures(trees: FIGSTree[], schema: DataSchema): ValidationResult
}

// lib/validators/SchemaValidator.ts
class SchemaValidator {
  static validateJSON(schemaText: string): ValidationResult
  static validateColumns(schema: DataSchema, csvHeaders: string[]): ValidationResult
  static validateDataTypes(schema: DataSchema, sampleData: any[]): ValidationResult
  static generateDefaultSchema(csvHeaders: string[]): DataSchema
}
```

### 4.2 FIGS Calculation Engine

```typescript
// lib/calculators/FIGSEngine.ts
class FIGSEngine {
  constructor(trees: FIGSTree[])
  
  calculatePrediction(claim: ClaimRecord): FIGSPrediction
  traverseTree(tree: FIGSTree, claim: ClaimRecord): TreeTraversal
  calculateFinalScore(contributions: number[], applySigmoid: boolean): number
  classifyScore(score: number, thresholds: ScoreThresholds): ClaimClassification
  
  private evaluateNode(node: TreeNode, features: Record<string, any>): boolean
  private findPath(node: TreeNode, features: Record<string, any>): TreeNode[]
  private calculateContribution(traversal: TreeTraversal): number
}

// lib/calculators/ScoreCalculator.ts
class ScoreCalculator {
  static sigmoid(x: number): number
  static applyThresholds(score: number, thresholds: ScoreThresholds): string
  static calculateConfidence(score: number, historicalData?: ClaimRecord[]): number
}
```

---

## 5. State Management Architecture

```typescript
// stores/applicationStore.ts
interface ApplicationState {
  // Data State
  claimsData: ClaimRecord[]
  dataSchema: DataSchema | null
  treesConfig: FIGSTree[]
  isDataLoaded: boolean
  isDataProcessing: boolean
  
  // UI State
  selectedClaim: ClaimRecord | null
  isTreePopupOpen: boolean
  currentView: 'swarm' | 'tree' | 'upload'
  
  // Visualization State
  swarmPlotConfig: SwarmPlotConfig
  treeVisualizationConfig: TreeVisualizationConfig
  animationState: AnimationState
  
  // Configuration State
  scoreThresholds: ScoreThresholds
  uiPreferences: UIPreferences
  
  // Actions
  loadClaimsData: (file: File, schema: DataSchema) => Promise<void>
  loadTreesConfig: (trees: FIGSTree[]) => void
  selectClaim: (claim: ClaimRecord) => void
  closeTreePopup: () => void
  updateThresholds: (thresholds: ScoreThresholds) => void
  resetApplicationState: () => void
}

// stores/visualizationStore.ts
interface VisualizationState {
  // Swarm Plot State
  swarmPlotData: SwarmPlotPoint[]
  hoveredPoint: SwarmPlotPoint | null
  swarmPlotDimensions: Dimensions
  zoomTransform: ZoomTransform
  
  // Tree Visualization State
  currentPrediction: FIGSPrediction | null
  animationProgress: AnimationProgress
  isAnimating: boolean
  animationSpeed: number
  
  // Actions
  generateSwarmPlotData: (claims: ClaimRecord[]) => void
  setHoveredPoint: (point: SwarmPlotPoint | null) => void
  startTreeAnimation: (prediction: FIGSPrediction) => void
  pauseAnimation: () => void
  resetAnimation: () => void
  updateZoom: (transform: ZoomTransform) => void
}
```

---

## 6. Core Component Architecture

### 6.1 Application Shell Components

```typescript
// components/core/ApplicationShell.tsx
const ApplicationShell = () => {
  return (
    <div className="min-h-screen bg-background">
      <ApplicationHeader />
      <main className="container mx-auto px-4 py-6">
        <DataUploadZone />
        <MainVisualizationArea />
      </main>
      <TreeVisualizationPopup />
      <ToastContainer />
    </div>
  )
}

// components/core/DataUploadZone.tsx
const DataUploadZone = () => {
  const [uploadState, setUploadState] = useState<UploadState>('idle')
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Data Upload & Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CSVUploadComponent />
          <SchemaConfigComponent />
          <TreeConfigComponent />
        </div>
        <DataValidationSummary />
      </CardContent>
    </Card>
  )
}

// components/core/MainVisualizationArea.tsx
const MainVisualizationArea = () => {
  const { claimsData, isDataLoaded } = useApplicationStore()
  
  if (!isDataLoaded) {
    return <DataUploadPrompt />
  }
  
  return (
    <Card className="h-[calc(100vh-300px)]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Claims Anomaly Analysis</CardTitle>
          <VisualizationControls />
        </div>
      </CardHeader>
      <CardContent className="h-full">
        <SwarmPlotVisualization />
      </CardContent>
    </Card>
  )
}
```

### 6.2 Upload & Configuration Components

```typescript
// components/upload/CSVUploadComponent.tsx
const CSVUploadComponent = () => {
  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  
  const handleFileDrop = async (files: FileList) => {
    const file = files[0]
    await validateAndProcessCSV(file)
  }
  
  return (
    <div className={cn("upload-zone", { "drag-active": dragActive })}>
      <FileDropZone onDrop={handleFileDrop} />
      <UploadProgressBar progress={uploadProgress} />
      <FileValidationResults />
    </div>
  )
}

// components/upload/SchemaConfigComponent.tsx
const SchemaConfigComponent = () => {
  const [schemaInput, setSchemaInput] = useState('')
  const [validationResult, setValidationResult] = useState<ValidationResult>()
  
  return (
    <div className="space-y-4">
      <Label>Data Schema Configuration</Label>
      <Textarea 
        placeholder="Paste JSON schema or upload file..."
        value={schemaInput}
        onChange={(e) => setSchemaInput(e.target.value)}
      />
      <Button onClick={() => validateSchema(schemaInput)}>
        Validate Schema
      </Button>
      <ValidationResultDisplay result={validationResult} />
    </div>
  )
}

// components/upload/TreeConfigComponent.tsx
const TreeConfigComponent = () => {
  const [treeInput, setTreeInput] = useState('')
  const [parsedTrees, setParsedTrees] = useState<FIGSTree[]>([])
  
  return (
    <div className="space-y-4">
      <Label>FIGS Tree Configuration</Label>
      <Textarea 
        placeholder="Paste tree structure..."
        value={treeInput}
        onChange={(e) => setTreeInput(e.target.value)}
        rows={10}
      />
      <Button onClick={() => parseTreeStructure(treeInput)}>
        Parse Trees
      </Button>
      <TreeParsingResults trees={parsedTrees} />
    </div>
  )
}
```

### 6.3 Swarm Plot Visualization Components

```typescript
// components/visualization/SwarmPlotVisualization.tsx
const SwarmPlotVisualization = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const { claimsData, selectClaim } = useApplicationStore()
  const { swarmPlotData, hoveredPoint, setHoveredPoint } = useVisualizationStore()
  
  useEffect(() => {
    if (!svgRef.current || !swarmPlotData.length) return
    
    const visualization = new SwarmPlotRenderer(svgRef.current)
    visualization.render(swarmPlotData)
    visualization.setupInteractions({
      onHover: setHoveredPoint,
      onClick: selectClaim
    })
    
    return () => visualization.cleanup()
  }, [swarmPlotData])
  
  return (
    <div className="h-full relative">
      <svg ref={svgRef} className="w-full h-full" />
      <SwarmPlotTooltip point={hoveredPoint} />
      <SwarmPlotControls />
    </div>
  )
}

// components/visualization/SwarmPlotRenderer.ts
class SwarmPlotRenderer {
  private svg: d3.Selection<SVGSVGElement, unknown, null, undefined>
  private xScale: d3.ScaleLinear<number, number>
  private yScale: d3.ScaleLinear<number, number>
  private simulation: d3.Simulation<SwarmPlotPoint, undefined>
  
  constructor(svgElement: SVGSVGElement) {
    this.svg = d3.select(svgElement)
    this.setupScales()
    this.setupSimulation()
  }
  
  render(data: SwarmPlotPoint[]): void {
    this.renderAxes()
    this.renderThresholdLines()
    this.renderPoints(data)
    this.startSimulation(data)
  }
  
  setupInteractions(callbacks: InteractionCallbacks): void {
    this.svg.selectAll('.point')
      .on('mouseover', callbacks.onHover)
      .on('mouseout', () => callbacks.onHover(null))
      .on('click', callbacks.onClick)
  }
  
  private renderPoints(data: SwarmPlotPoint[]): void {
    const points = this.svg.selectAll('.point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'point')
      .attr('r', 4)
      .attr('fill', (d) => this.getPointColor(d))
      .attr('stroke', '#fff')
      .attr('stroke-width', 1)
  }
  
  private getPointColor(point: SwarmPlotPoint): string {
    switch (point.classification) {
      case 'STP': return '#22c55e'
      case 'Non-STP': return '#ef4444'
      case 'Excluded': return '#6b7280'
      default: return '#f59e0b'
    }
  }
}
```

### 6.4 Tree Visualization Components

```typescript
// components/visualization/TreeVisualizationPopup.tsx
const TreeVisualizationPopup = () => {
  const { selectedClaim, isTreePopupOpen, closeTreePopup } = useApplicationStore()
  const { currentPrediction } = useVisualizationStore()
  
  if (!isTreePopupOpen || !selectedClaim || !currentPrediction) {
    return null
  }
  
  return (
    <Dialog open={isTreePopupOpen} onOpenChange={closeTreePopup}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0">
        <TreePopupHeader claim={selectedClaim} prediction={currentPrediction} />
        <TreeVisualizationCanvas prediction={currentPrediction} />
        <TreePopupFooter />
      </DialogContent>
    </Dialog>
  )
}

// components/visualization/TreeVisualizationCanvas.tsx
const TreeVisualizationCanvas = ({ prediction }: { prediction: FIGSPrediction }) => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const { animationState, startTreeAnimation } = useVisualizationStore()
  
  useEffect(() => {
    if (!canvasRef.current) return
    
    const canvas = new TreeCanvas(canvasRef.current)
    canvas.renderTrees(prediction.treeTraversals)
    
    return () => canvas.cleanup()
  }, [prediction])
  
  return (
    <div className="flex-1 overflow-auto p-4">
      <div ref={canvasRef} className="min-h-full" />
      <TreeAnimationControls 
        onPlay={() => startTreeAnimation(prediction)}
        isPlaying={animationState.isPlaying}
      />
      <FinalScoreCalculation prediction={prediction} />
    </div>
  )
}

// components/visualization/TreeCanvas.ts
class TreeCanvas {
  private container: HTMLElement
  private trees: TreeVisualization[]
  private animationQueue: AnimationStep[]
  
  constructor(container: HTMLElement) {
    this.container = container
    this.trees = []
  }
  
  renderTrees(traversals: TreeTraversal[]): void {
    traversals.forEach((traversal, index) => {
      const treeContainer = this.createTreeContainer(index)
      const treeViz = new TreeVisualization(treeContainer, traversal)
      this.trees.push(treeViz)
    })
  }
  
  animateTraversal(traversals: TreeTraversal[]): Promise<void> {
    return new Promise((resolve) => {
      const animator = new TreeAnimator(this.trees)
      animator.animateSequentially(traversals, resolve)
    })
  }
  
  private createTreeContainer(index: number): HTMLElement {
    const container = document.createElement('div')
    container.className = 'tree-container mb-8'
    container.innerHTML = `
      <div class="tree-header">
        <h3 class="text-lg font-semibold">Tree #${index}</h3>
        <div class="contribution-display"></div>
      </div>
      <div class="tree-svg-container"></div>
    `
    this.container.appendChild(container)
    return container
  }
}

// components/visualization/TreeVisualization.ts
class TreeVisualization {
  private svg: d3.Selection<SVGSVGElement, unknown, null, undefined>
  private traversal: TreeTraversal
  private nodePositions: Map<string, [number, number]>
  
  constructor(container: HTMLElement, traversal: TreeTraversal) {
    this.traversal = traversal
    this.svg = d3.select(container)
      .select('.tree-svg-container')
      .append('svg')
      .attr('width', '100%')
      .attr('height', 400)
    
    this.calculateLayout()
    this.renderTree()
  }
  
  renderTree(): void {
    this.renderNodes()
    this.renderEdges()
    this.renderLabels()
  }
  
  animateTraversal(): Promise<void> {
    return new Promise((resolve) => {
      this.traversal.path.forEach((step, index) => {
        setTimeout(() => {
          this.highlightNode(step.nodeId)
          this.showComparison(step)
          if (index === this.traversal.path.length - 1) {
            this.highlightFinalValue()
            resolve()
          }
        }, index * 800)
      })
    })
  }
  
  private renderNodes(): void {
    const nodes = this.svg.selectAll('.node')
      .data(this.getNodesFromTraversal())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d) => `translate(${this.nodePositions.get(d.id)})`)
    
    nodes.append('rect')
      .attr('width', 120)
      .attr('height', 60)
      .attr('rx', 8)
      .attr('fill', (d) => d.type === 'leaf' ? '#dbeafe' : '#f3f4f6')
      .attr('stroke', '#9ca3af')
  }
  
  private highlightNode(nodeId: string): void {
    this.svg.select(`.node[data-id="${nodeId}"]`)
      .select('rect')
      .transition()
      .duration(300)
      .attr('fill', '#3b82f6')
      .attr('stroke', '#1d4ed8')
  }
}
```

---

## 7. Animation System Architecture

```typescript
// lib/animators/TreeAnimator.ts
class TreeAnimator {
  private trees: TreeVisualization[]
  private animationQueue: AnimationStep[]
  private currentStep: number = 0
  
  constructor(trees: TreeVisualization[]) {
    this.trees = trees
  }
  
  animateSequentially(traversals: TreeTraversal[], onComplete: () => void): void {
    this.buildAnimationQueue(traversals)
    this.executeAnimationQueue(onComplete)
  }
  
  private buildAnimationQueue(traversals: TreeTraversal[]): void {
    this.animationQueue = []
    
    traversals.forEach((traversal, treeIndex) => {
      traversal.path.forEach((step, stepIndex) => {
        this.animationQueue.push({
          type: 'highlight_node',
          treeIndex,
          nodeId: step.nodeId,
          duration: 500
        })
        
        this.animationQueue.push({
          type: 'show_comparison',
          treeIndex,
          step,
          duration: 800
        })
      })
      
      this.animationQueue.push({
        type: 'highlight_path',
        treeIndex,
        path: traversal.path,
        duration: 1000
      })
    })
    
    this.animationQueue.push({
      type: 'show_final_calculation',
      duration: 1500
    })
  }
  
  private executeAnimationQueue(onComplete: () => void): void {
    if (this.currentStep >= this.animationQueue.length) {
      onComplete()
      return
    }
    
    const step = this.animationQueue[this.currentStep]
    this.executeAnimationStep(step, () => {
      this.currentStep++
      this.executeAnimationQueue(onComplete)
    })
  }
}

// lib/animators/AnimationStep.ts
interface AnimationStep {
  type: 'highlight_node' | 'show_comparison' | 'highlight_path' | 'show_final_calculation'
  treeIndex?: number
  nodeId?: string
  step?: TreeTraversalStep
  path?: TreeTraversalStep[]
  duration: number
}
```

---

## 8. Utility Modules & Factories

### 8.1 Data Processing Utilities

```typescript
// utils/dataProcessing.ts
export class DataProcessor {
  static async processLargeDataset(
    data: any[], 
    chunkSize: number, 
    processor: (chunk: any[]) => Promise<any[]>
  ): Promise<any[]> {
    const results = []
    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize)
      const processed = await processor(chunk)
      results.push(...processed)
    }
    return results
  }
  
  static generateSwarmPlotPositions(
    data: ClaimRecord[], 
    width: number, 
    height: number
  ): SwarmPlotPoint[] {
    // Implement beeswarm algorithm
    // Return positioned points with x,y coordinates
  }
  
  static detectOutliers(data: number[]): { outliers: number[], threshold: number } {
    // Implement IQR or statistical outlier detection
  }
}

// utils/performanceOptimization.ts
export class PerformanceOptimizer {
  static implementVirtualization(
    container: HTMLElement,
    data: any[],
    renderItem: (item: any, index: number) => HTMLElement,
    itemHeight: number
  ): VirtualizedList {
    // Implement virtual scrolling for large datasets
  }
  
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(null, args), delay)
    }
  }
  
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func.apply(null, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }
}
```

### 8.2 Visualization Utilities

```typescript
// utils/visualizationHelpers.ts
export class VisualizationHelpers {
  static createColorScale(
    domain: [number, number],
    colors: string[]
  ): d3.ScaleSequential<string> {
    return d3.scaleSequential()
      .domain(domain)
      .interpolator(d3.interpolateRgbBasis(colors))
  }
  
  static calculateOptimalLayout(
    containerWidth: number,
    containerHeight: number,
    itemCount: number
  ): LayoutDimensions {
    // Calculate optimal spacing and sizing
  }
  
  static generateTooltipContent(
    point: SwarmPlotPoint,
    template: TooltipTemplate
  ): string {
    // Generate HTML content for tooltips
  }
  
  static exportVisualizationAsPNG(
    svgElement: SVGSVGElement,
    filename: string,
    resolution: number = 300
  ): Promise<void> {
    // Convert SVG to PNG and trigger download
  }
}

// utils/mathHelpers.ts
export class MathHelpers {
  static sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x))
  }
  
  static clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
  }
  
  static interpolate(start: number, end: number, progress: number): number {
    return start + (end - start) * progress
  }
  
  static generateJitter(baseY: number, spread: number): number {
    return baseY + (Math.random() - 0.5) * spread
  }
}
```

---

## 9. Error Handling & Validation Framework

```typescript
// lib/errorHandling/ErrorBoundary.tsx
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Application Error:', error, errorInfo)
    // Send error to logging service
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallbackComponent error={this.state.error} />
    }
    
    return this.props.children
  }
}

// lib/validation/ValidationEngine.ts
class ValidationEngine {
  static validateCSVStructure(file: File): Promise<ValidationResult> {
    // Validate file format, size, structure
  }
  
  static validateDataSchema(schema: any): ValidationResult {
    // Validate JSON schema format and content
  }
  
  static validateTreeStructure(trees: any[]): ValidationResult {
    // Validate tree format and completeness
  }
  
  static validateFeatureConsistency(
    trees: FIGSTree[], 
    schema: DataSchema
  ): ValidationResult {
    // Ensure all tree features exist in schema
  }
}

// lib/errorHandling/ErrorReporting.ts
class ErrorReporter {
  static reportError(error: Error, context: ErrorContext): void {
    // Log error with context information
  }
  
  static reportPerformanceIssue(metric: PerformanceMetric): void {
    // Log performance issues
  }
  
  static reportUserAction(action: UserAction): void {
    // Log user interactions for debugging
  }
}
```

---

## 10. Testing Architecture

```typescript
// tests/utils/testHelpers.ts
export class TestHelpers {
  static generateMockClaimData(count: number): ClaimRecord[] {
    // Generate realistic test data
  }
  
  static generateMockTreeStructure(): FIGSTree[] {
    // Generate test tree structure
  }
  
  static createMockFileUpload(content: string, filename: string): File {
    // Create mock file objects for testing
  }
  
  static waitForAnimation(duration: number): Promise<void> {
    // Helper for testing animations
  }
}

// tests/components/SwarmPlot.test.tsx
describe('SwarmPlotVisualization', () => {
  it('should render points correctly', () => {
    // Test point rendering
  })
  
  it('should handle hover interactions', () => {
    // Test hover behavior
  })
  
  it('should handle large datasets', () => {
    // Test performance with large data
  })
})

// tests/lib/FIGSEngine.test.ts
describe('FIGSEngine', () => {
  it('should calculate predictions correctly', () => {
    // Test calculation accuracy
  })
  
  it('should handle missing data', () => {
    // Test edge cases
  })
})
```

---

## 11. Performance Optimization Strategy

```typescript
// hooks/usePerformanceOptimization.ts
export const usePerformanceOptimization = (dataSize: number) => {
  const shouldUseVirtualization = dataSize > 10000
  const shouldUseWebWorker = dataSize > 50000
  const chunkSize = Math.min(1000, Math.floor(dataSize / 10))
  
  return {
    shouldUseVirtualization,
    shouldUseWebWorker,
    chunkSize,
    renderingStrategy: dataSize > 100000 ? 'canvas' : 'svg'
  }
}

// workers/dataProcessingWorker.ts
self.onmessage = function(e) {
  const { data, operation } = e.data
  
  switch (operation) {
    case 'processLargeDataset':
      const result = processDatasetChunk(data)
      self.postMessage({ result })
      break
    case 'calculateSwarmPositions':
      const positions = calculatePositions(data)
      self.postMessage({ positions })
      break
  }
}
```

---

## 12. Configuration Management

```typescript
// lib/config/ConfigManager.ts
class ConfigManager {
  private static instance: ConfigManager
  private config: ApplicationConfig
  
  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager()
    }
    return ConfigManager.instance
  }
  
  loadConfiguration(config: Partial<ApplicationConfig>): void {
    this.config = { ...this.getDefaultConfig(), ...config }
  }
  
  get<T extends keyof ApplicationConfig>(key: T): ApplicationConfig[T] {
    return this.config[key]
  }
  
  private getDefaultConfig(): ApplicationConfig {
    return {
      scoreThresholds: { low: 0.3, high: 0.7 },
      animationSpeed: 1.0,
      maxDataPoints: 500000,
      virtualizedThreshold: 10000,
      exportFormats: ['png', 'pdf', 'csv']
    }
  }
}

// constants/defaultConfig.ts
export const DEFAULT_CONFIG: ApplicationConfig = {
  ui: {
    theme: 'light',
    compactMode: false,
    showAdvancedControls: false
  },
  visualization: {
    pointSize: 4,
    animationDuration: 2000,
    colorScheme: 'default'
  },
  performance: {
    enableVirtualization: true,
    enableWebWorkers: true,
    maxRenderPoints: 10000
  }
}
```

---

## Summary

This blueprint provides a comprehensive, modular architecture that:

1. **Prioritizes Implementation**: Clear build order from foundation to polish
2. **Ensures Scalability**: Handles large datasets with performance optimizations
3. **Maintains Flexibility**: Modular components that can be easily modified
4. **Supports Testing**: Comprehensive testing utilities and mock data
5. **Handles Complexity**: Sophisticated animation and visualization systems
6. **Enables Configuration**: Flexible configuration management
7. **Provides Robustness**: Error handling and validation at every layer

The development team can follow this blueprint to build a sophisticated, performant, and maintainable application that meets all the specified requirements while remaining adaptable for future enhancements.