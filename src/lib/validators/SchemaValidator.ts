import { ValidationResult, DataSchema } from '../types/core'

class SchemaValidator {
  static validateJSON(schemaText: string): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
    }

    try {
      const parsed = JSON.parse(schemaText)

      // Check if it's an object
      if (typeof parsed !== 'object' || parsed === null) {
        result.isValid = false
        result.errors.push({ message: 'Schema must be a JSON object' })
        return result
      }

      // Check for required structure
      if (!parsed.columnTypes || typeof parsed.columnTypes !== 'object') {
        result.isValid = false
        result.errors.push({
          message: 'Schema must contain columnTypes object',
        })
      }

      if (!parsed.claimIdColumn || typeof parsed.claimIdColumn !== 'string') {
        result.isValid = false
        result.errors.push({
          message: 'Schema must contain claimIdColumn string',
        })
      }

      if (!parsed.requiredColumns || !Array.isArray(parsed.requiredColumns)) {
        result.isValid = false
        result.errors.push({
          message: 'Schema must contain requiredColumns array',
        })
      }

      // Validate data types
      const validTypes = ['float64', 'int64', 'object', 'bool', 'datetime']
      if (parsed.columnTypes) {
        for (const [column, type] of Object.entries(parsed.columnTypes)) {
          if (!validTypes.includes(type as string)) {
            result.isValid = false
            result.errors.push({
              message: `Invalid data type '${type}' for column '${column}'. Valid types: ${validTypes.join(', ')}`,
              field: column,
            })
          }
        }
      }
    } catch (error) {
      result.isValid = false
      result.errors.push({
        message: `Invalid JSON format: ${(error as Error).message}`,
      })
    }

    return result
  }

  static validateColumns(
    schema: DataSchema,
    csvHeaders: string[]
  ): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
    }

    // Check if claim ID column exists
    if (!csvHeaders.includes(schema.claimIdColumn)) {
      result.isValid = false
      result.errors.push({
        message: `Claim ID column '${schema.claimIdColumn}' not found in CSV headers`,
        field: schema.claimIdColumn,
      })
    }

    // Check required columns
    for (const requiredCol of schema.requiredColumns) {
      if (!csvHeaders.includes(requiredCol)) {
        result.isValid = false
        result.errors.push({
          message: `Required column '${requiredCol}' not found in CSV headers`,
          field: requiredCol,
        })
      }
    }

    // Check for unmapped columns
    for (const header of csvHeaders) {
      if (!schema.columnTypes[header] && header !== schema.claimIdColumn) {
        result.warnings.push({
          message: `Column '${header}' is not mapped in schema`,
          field: header,
        })
      }
    }

    return result
  }
}

export default SchemaValidator
