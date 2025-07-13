import { create } from 'zustand'

import type {
  ApplicationState,
  ClaimRecord,
  DataSchema,
  FIGSTree,
  ClaimClassification,
  ScoreThresholds,
  UIPreferences,
  AnimationState,
  SwarmPlotConfig,
  TreeVisualizationConfig,
} from '../lib/types/core'

export const useApplicationStore = create<ApplicationState>((set, get) => ({
  claimsData: [],
  dataSchema: null,
  treesConfig: [],
  isDataLoaded: false,
  isDataProcessing: false,
  selectedClaim: null,
  isTreePopupOpen: false,
  currentView: 'upload',
  swarmPlotConfig: {
    pointSize: 4,
    jitterAmount: 10,
    colors: {
      stp: '#22c55e',
      nonStp: '#ef4444',
      excluded: '#6b7280',
      univariate: '#f59e0b',
    },
    thresholdLines: [0.3, 0.7],
    enableVirtualization: true,
  },
  treeVisualizationConfig: {
    nodeWidth: 120,
    nodeHeight: 60,
    levelSpacing: 100,
    animationDuration: 800,
    showNodeValues: true,
  },
  animationState: { isAnimating: false, speed: 1, paused: false },
  scoreThresholds: { stpThreshold: 0.3, nonStpThreshold: 0.7 },
  uiPreferences: {
    theme: 'light',
    compactMode: false,
    showAdvancedControls: false,
    language: 'en',
  },

  loadClaimsData: async (file: File, schema: DataSchema) => {
    set({ isDataProcessing: true })
    // TODO: Implement CSV parsing and validation
    // const claims = await CSVParser.parseFile(file, schema)
    set({
      claimsData: [], // Replace with actual parsed data
      dataSchema: schema,
      isDataLoaded: true,
      isDataProcessing: false,
    })
  },

  loadTreesConfig: (trees: FIGSTree[]) => {
    set({ treesConfig: trees })
  },

  selectClaim: (claim: ClaimRecord) => {
    set({ selectedClaim: claim, isTreePopupOpen: true })
  },

  closeTreePopup: () => {
    set({ isTreePopupOpen: false, selectedClaim: null })
  },

  updateThresholds: (thresholds: ScoreThresholds) => {
    set({ scoreThresholds: thresholds })
    // TODO: Trigger reclassification if needed
  },

  resetApplicationState: () => {
    set({
      claimsData: [],
      dataSchema: null,
      treesConfig: [],
      isDataLoaded: false,
      isDataProcessing: false,
      selectedClaim: null,
      isTreePopupOpen: false,
      currentView: 'upload',
    })
  },
}))
