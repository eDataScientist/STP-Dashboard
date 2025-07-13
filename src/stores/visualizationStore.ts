import { create } from 'zustand'
import { SwarmPlotPoint, FIGSPrediction } from '../lib/types/core'

const useVisualizationStore = create<{
  swarmPlotData: SwarmPlotPoint[]
  hoveredPoint: SwarmPlotPoint | null
  currentPrediction: FIGSPrediction | null
  isAnimating: boolean
  animationSpeed: number
}>(() => ({
  swarmPlotData: [],
  hoveredPoint: null,
  currentPrediction: null,
  isAnimating: false,
  animationSpeed: 1,
}))

export default useVisualizationStore
