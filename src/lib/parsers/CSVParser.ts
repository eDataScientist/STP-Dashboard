import Papa from 'papaparse'
import { ValidationResult } from '../types/core'
import { ClaimRecord, DataSchema, DataType } from '../types/core'

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

  static async parseFile(
    file: File,
    schema: DataSchema
  ): Promise<ClaimRecord[]> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: results => {
          const claims: ClaimRecord[] = []
          for (const row of results.data as Record<string, unknown>[]) {
            const features: Record<string, number | string | boolean> = {}
            for (const [col, value] of Object.entries(row)) {
              if (col === schema.claimIdColumn) continue
              const type = schema.columnTypes[col]
              if (type) {
                features[col] = this.convertValue(value, type)
              } else {
                features[col] = String(value)
              }
            }
            claims.push({
              id: row[schema.claimIdColumn] as string,
              features,
            })
          }
          resolve(claims)
        },
        error: error => reject(error),
      })
    })
  }

  private static convertValue(
    value: unknown,
    type: DataType
  ): number | string | boolean {
    if (value === null || value === undefined) return ''
    switch (type) {
      case 'float64':
        return typeof value === 'string' ? parseFloat(value) : Number(value)
      case 'int64':
        return typeof value === 'string'
          ? parseInt(value, 10)
          : Math.floor(Number(value))
      case 'bool':
        if (typeof value === 'string')
          return value.toLowerCase() === 'true' || value === '1'
        return !!value
      case 'object':
        return String(value)
      default:
        return String(value)
    }
  }
}

export default CSVParser
