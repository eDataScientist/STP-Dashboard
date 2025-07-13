import Papa from 'papaparse'
import { ValidationResult } from '../types/core'

class CSVParser {
  static async validateFormat(file: File): Promise<ValidationResult> {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
    }

    // Check file type
    if (!file.name.toLowerCase().endsWith('.csv') && file.type !== 'text/csv') {
      result.isValid = false
      result.errors.push({ message: 'File must be CSV format' })
    }

    // Check size (500MB = 500 * 1024 * 1024 bytes)
    const maxSize = 500 * 1024 * 1024
    if (file.size > maxSize) {
      result.isValid = false
      result.errors.push({ message: `File size exceeds 500MB` })
    }

    // Basic content validation
    try {
      const sample = await file.slice(0, 1024).text() // first 1KB
      const parseResult = Papa.parse(sample, { preview: 5 })
      if (parseResult.errors.length > 0) {
        result.isValid = false
        result.errors.push(
          ...parseResult.errors.map(err => ({ message: err.message }))
        )
      }
    } catch (error) {
      result.isValid = false
      result.errors.push({
        message: `Failed to read file content: ${(error as Error).message}`,
      })
    }

    return result
  }
}

export default CSVParser
