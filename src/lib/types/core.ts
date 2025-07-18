/**
 * Core Data Types for FIGS Claims Interpreter
 *
 * This file contains the foundational TypeScript interfaces and types
 * used throughout the application for data modeling and type safety.
 */

import { ZoomTransform } from 'd3-zoom'

// =============================================================================
// CLAIM-RELATED TYPES
// =============================================================================

/**
 * Represents a single claim record with all its features and metadata
 */
export interface ClaimRecord {
  /** Unique identifier for the claim */
  id: string

  /** Feature values extracted from the CSV data */
  features: Record<string, number | string | boolean>

  /** Calculated anomaly score (0-1 range typically) */
  anomalyScore?: number

  /** Classification result from the model */
  classification?: ClaimClassification

  /** Reason for exclusion if claim was excluded */
  exclusionReason?: string

  /** Flag indicating if this is a univariate outlier */
  isUnivariate?: boolean

  /** Features that triggered univariate outlier detection */
  outlierFeatures?: string[]

  /** Raw data row from CSV for reference */
  rawData?: Record<string, unknown>
}

/**
 * Classification information for a claim
 */
export interface ClaimClassification {
  /** Primary classification result */
  primary: 'STP' | 'Non-STP' | 'Excluded'

  /** Secondary classification or reason */
  secondary?: string

  /** Confidence level in the classification (0-1) */
  confidence?: number

  /** Threshold used for classification */
  threshold?: number
}

// =============================================================================
// DATA SCHEMA TYPES
// =============================================================================

/**
 * Supported data types for CSV columns
 */
export type DataType = 'float64' | 'int64' | 'object' | 'bool' | 'datetime'

/**
 * Schema configuration for validating and processing CSV data
 */
export interface DataSchema {
  /** Data type specifications for each column */
  columnTypes: Record<string, DataType>

  /** Columns that must be present in the CSV */
  requiredColumns: string[]

  /** Name of the column containing claim IDs */
  claimIdColumn: string

  /** Name of the column containing anomaly scores (optional) */
  scoreColumn?: string

  /** Name of the column containing classification results (optional) */
  classificationColumn?: string

  /** Name of the column containing exclusion reasons (optional) */
  exclusionReasonColumn?: string

  /** Columns to ignore during processing */
  ignoredColumns?: string[]

  /** Schema validation metadata */
  metadata?: {
    name?: string
    version?: string
    description?: string
    createdAt?: Date
    updatedAt?: Date
  }
}

// =============================================================================
// VALIDATION TYPES
// =============================================================================

/**
 * Result of a validation operation
 */
export interface ValidationResult {
  /** Whether validation passed */
  isValid: boolean

  /** Error messages if validation failed */
  errors: ValidationError[]

  /** Warning messages (non-fatal issues) */
  warnings: ValidationWarning[]

  /** Summary of validation results */
  summary?: string
}

/**
 * Individual validation error
 */
export interface ValidationError {
  /** Error message */
  message: string

  /** Field or location where error occurred */
  field?: string

  /** Line number if applicable */
  line?: number

  /** Column number if applicable */
  column?: number

  /** Error code for programmatic handling */
  code?: string

  /** Additional context or details */
  details?: unknown
}

/**
 * Individual validation warning
 */
export interface ValidationWarning {
  /** Warning message */
  message: string

  /** Field or location where warning occurred */
  field?: string

  /** Line number if applicable */
  line?: number

  /** Warning code for programmatic handling */
  code?: string
}

// =============================================================================
// FILE PROCESSING TYPES
// =============================================================================

/**
 * Configuration for CSV file processing
 */
export interface CSVProcessingConfig {
  /** Field delimiter (comma, semicolon, tab, etc.) */
  delimiter?: string

  /** Text encoding */
  encoding?: string

  /** Whether first row contains headers */
  hasHeaders?: boolean

  /** Maximum number of rows to process */
  maxRows?: number

  /** Chunk size for processing large files */
  chunkSize?: number

  /** Skip empty rows */
  skipEmptyRows?: boolean

  /** Quote character */
  quoteChar?: string

  /** Escape character */
  escapeChar?: string
}

/**
 * Progress callback for file processing operations
 */
export interface ProgressCallback {
  /** Called when progress updates */
  (progress: {
    /** Percentage complete (0-100) */
    percentage: number

    /** Number of rows processed */
    rowsProcessed: number

    /** Total number of rows */
    totalRows: number

    /** Current processing status */
    status: 'parsing' | 'validating' | 'processing' | 'complete'

    /** Optional status message */
    message?: string
  }): void
}

// =============================================================================
// SCORE THRESHOLD TYPES
// =============================================================================

/**
 * Threshold configuration for score classification
 */
export interface ScoreThresholds {
  /** Threshold for STP classification */
  stpThreshold: number

  /** Threshold for Non-STP classification */
  nonStpThreshold: number

  /** Low confidence threshold */
  lowConfidenceThreshold?: number

  /** High confidence threshold */
  highConfidenceThreshold?: number

  /** Custom threshold labels */
  labels?: {
    stp?: string
    nonStp?: string
    excluded?: string
  }
}

// =============================================================================
// VISUALIZATION TYPES
// =============================================================================

/**
 * Configuration for visualizations
 */
export interface VisualizationConfig {
  /** Chart dimensions */
  dimensions: {
    width: number
    height: number
    margin: {
      top: number
      right: number
      bottom: number
      left: number
    }
  }

  /** Color scheme configuration */
  colors: {
    stp: string
    nonStp: string
    excluded: string
    univariate: string
    selected: string
    hover: string
  }

  /** Animation settings */
  animation: {
    duration: number
    easing: string
    enabled: boolean
  }

  /** Interaction settings */
  interaction: {
    zoomEnabled: boolean
    panEnabled: boolean
    hoverEnabled: boolean
    clickEnabled: boolean
  }
}

/**
 * Point data for swarm plot visualization
 */
export interface SwarmPlotPoint {
  /** Unique identifier */
  id: string

  /** X coordinate */
  x: number

  /** Y coordinate */
  y: number

  /** Original claim data */
  claim: ClaimRecord

  /** Visual properties */
  color: string

  /** Size of the point */
  size: number

  /** Whether point is currently selected */
  selected: boolean

  /** Whether point is currently hovered */
  hovered: boolean
}

/**
 * Dimensions for visualization components
 */
export interface Dimensions {
  width: number
  height: number
}

/**
 * Progress state for animations
 */
export interface AnimationProgress {
  currentTree: number
  currentStep: number
  totalTrees: number
  totalSteps: number
}

/**
 * State for animation control
 */
export interface AnimationState {
  isAnimating: boolean
  speed: number
  paused: boolean
}

/**
 * Configuration specific to swarm plot
 */
export interface SwarmPlotConfig {
  pointSize: number
  jitterAmount: number
  colors: Record<string, string>
  thresholdLines: number[]
  enableVirtualization: boolean
}

/**
 * Configuration specific to tree visualization
 */
export interface TreeVisualizationConfig {
  nodeWidth: number
  nodeHeight: number
  levelSpacing: number
  animationDuration: number
  showNodeValues: boolean
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Generic API response structure
 */
export interface ApiResponse<T> {
  /** Response data */
  data: T

  /** Success flag */
  success: boolean

  /** Error message if success is false */
  error?: string

  /** Response metadata */
  metadata?: {
    timestamp: Date
    version: string
    requestId?: string
  }
}

/**
 * Generic loading state
 */
export interface LoadingState {
  /** Whether operation is in progress */
  isLoading: boolean

  /** Current progress percentage (0-100) */
  progress?: number

  /** Current status message */
  message?: string

  /** Error if operation failed */
  error?: string
}

/**
 * Generic selection state
 */
export interface SelectionState<T> {
  /** Currently selected items */
  selected: T[]

  /** Whether selection is active */
  isSelecting: boolean

  /** Selection mode */
  mode: 'single' | 'multiple'

  /** Last selected item */
  lastSelected?: T
}

// =============================================================================
// EXPORT TYPES
// =============================================================================

/**
 * Export configuration options
 */
export interface ExportConfig {
  /** Export format */
  format: 'json' | 'csv' | 'pdf' | 'png' | 'svg'

  /** Include metadata in export */
  includeMetadata?: boolean

  /** Include raw data in export */
  includeRawData?: boolean

  /** Export filename */
  filename?: string

  /** Export options specific to format */
  options?: Record<string, unknown>
}

/**
 * Export result
 */
export interface ExportResult {
  /** Whether export was successful */
  success: boolean

  /** Export data (URL, blob, or data) */
  data?: string | Blob | ArrayBuffer

  /** Filename used for export */
  filename: string

  /** Export format */
  format: ExportConfig['format']

  /** Error message if export failed */
  error?: string

  /** Export metadata */
  metadata?: {
    size: number
    createdAt: Date
    recordCount: number
  }
}

// =============================================================================
// FIGS TREE TYPES
// =============================================================================

export interface FIGSTree {
  id: string
  name: string
  root: TreeNode
  contribution?: number
}

export interface TreeNode {
  type: 'decision' | 'leaf'
  feature?: string
  threshold?: number
  operator?: '<=' | '>' | '<' | '>=' | '='
  value?: number
  left?: TreeNode
  right?: TreeNode
  path?: boolean // true if this node was taken in traversal
}

export interface TreeTraversal {
  treeId: string
  path: TreeTraversalStep[]
  finalValue: number
  contribution: number
}

export interface TreeTraversalStep {
  nodeId: string
  feature: string
  threshold: number
  actualValue: number
  comparison: string
  result: boolean
  direction: 'left' | 'right'
}

export interface FIGSPrediction {
  claimId: string
  treeTraversals: TreeTraversal[]
  individualContributions: number[]
  totalSum: number
  finalScore: number
  classification: ClaimClassification
  appliedSigmoid: boolean
}

// =============================================================================
// CONFIGURATION TYPES
// =============================================================================

/**
 * Overall application configuration
 */
export interface ApplicationConfig {
  scoreThresholds: ScoreThresholds
  animationSpeed: number
  maxDataPoints: number
  virtualizedThreshold: number
  exportFormats: string[]
  ui: UIPreferences
  performance: PerformanceConfig
}

/**
 * UI preferences configuration
 */
export interface UIPreferences {
  theme: 'light' | 'dark'
  compactMode: boolean
  showAdvancedControls: boolean
  language: string
}

/**
 * Performance-related configuration
 */
export interface PerformanceConfig {
  enableVirtualization: boolean
  enableWebWorkers: boolean
  maxRenderPoints: number
}

/**
 * State interface for the application store
 */
export interface ApplicationState {
  claimsData: ClaimRecord[]
  dataSchema: DataSchema | null
  treesConfig: FIGSTree[]
  isDataLoaded: boolean
  isDataProcessing: boolean
  selectedClaim: ClaimRecord | null
  isTreePopupOpen: boolean
  currentView: 'swarm' | 'tree' | 'upload'
  swarmPlotConfig: SwarmPlotConfig
  treeVisualizationConfig: TreeVisualizationConfig
  animationState: AnimationState
  scoreThresholds: ScoreThresholds
  uiPreferences: UIPreferences
  loadClaimsData: (file: File, schema: DataSchema) => Promise<void>
  loadTreesConfig: (trees: FIGSTree[]) => void
  selectClaim: (claim: ClaimRecord) => void
  closeTreePopup: () => void
  updateThresholds: (thresholds: ScoreThresholds) => void
  resetApplicationState: () => void
}

/**
 * State interface for the visualization store
 */
export interface VisualizationState {
  swarmPlotData: SwarmPlotPoint[]
  hoveredPoint: SwarmPlotPoint | null
  swarmPlotDimensions: Dimensions
  zoomTransform: ZoomTransform | null
  currentPrediction: FIGSPrediction | null
  animationProgress: AnimationProgress
  isAnimating: boolean
  animationSpeed: number
  generateSwarmPlotData: (claims: ClaimRecord[]) => void
  setHoveredPoint: (point: SwarmPlotPoint | null) => void
  startTreeAnimation: (prediction: FIGSPrediction) => void
  pauseAnimation: () => void
  resetAnimation: () => void
  updateZoom: (transform: ZoomTransform) => void
}
