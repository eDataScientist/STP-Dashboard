import { create } from 'zustand'
import {
  ClaimRecord,
  DataSchema,
  FIGSTree,
  ScoreThresholds,
} from '../lib/types/core'

const useApplicationStore = create<{
  claimsData: ClaimRecord[]
  dataSchema: DataSchema | null
  treesConfig: FIGSTree[]
  isDataLoaded: boolean
  scoreThresholds: ScoreThresholds
}>(() => ({
  claimsData: [],
  dataSchema: null,
  treesConfig: [],
  isDataLoaded: false,
  scoreThresholds: {
    stpThreshold: 0.3,
    nonStpThreshold: 0.7,
  },
}))

export default useApplicationStore
