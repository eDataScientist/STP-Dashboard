import { create } from 'zustand'

import type {
  VisualizationState,
  SwarmPlotPoint,
  Dimensions,
  AnimationProgress,
  FIGSPrediction,
  ClaimRecord,
} from '../lib/types/core'

import { ZoomTransform } from 'd3-zoom'

export const useVisualizationStore = create<VisualizationState>(set => ({
  swarmPlotData: [],
  hoveredPoint: null,
  swarmPlotDimensions: { width: 800, height: 600 },
  zoomTransform: null as ZoomTransform | null, // Default zoom
  currentPrediction: null,
  animationProgress: {
    currentTree: 0,
    currentStep: 0,
    totalTrees: 0,
    totalSteps: 0,
  },
  isAnimating: false,
  animationSpeed: 1,

  generateSwarmPlotData: (claims: ClaimRecord[]) => {
    // TODO: Implement swarm plot data generation with positioning
    const data: SwarmPlotPoint[] = claims.map(claim => ({
      id: claim.id,
      x: Math.random() * 800, // Stub
      y: claim.anomalyScore || 0,
      claim,
      color: '#000',
      size: 4,
      selected: false,
      hovered: false,
    }))
    set({ swarmPlotData: data })
  },

  setHoveredPoint: (point: SwarmPlotPoint | null) => {
    set({ hoveredPoint: point })
  },

  startTreeAnimation: (prediction: FIGSPrediction) => {
    set({ isAnimating: true, currentPrediction: prediction })
    // TODO: Implement animation logic
  },

  pauseAnimation: () => {
    set({ isAnimating: false })
  },

  resetAnimation: () => {
    set({
      isAnimating: false,
      animationProgress: {
        currentTree: 0,
        currentStep: 0,
        totalTrees: 0,
        totalSteps: 0,
      },
    })
  },

  updateZoom: (transform: ZoomTransform) => {
    set({ zoomTransform: transform })
  },
}))
