import { FIGSTree, TreeNode, ValidationResult, DataSchema } from '../types/core'

class TreeParser {
  static parseTextFormat(treeText: string): FIGSTree[] {
    const trees: FIGSTree[] = []
    const lines = treeText.split('\n').filter(line => line.trim())

    let currentTree: FIGSTree | null = null
    let nodeStack: { node: TreeNode; depth: number }[] = []

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue

      // Calculate depth by counting leading tabs/spaces
      const depth = line.length - line.trimStart().length

      // Check if this is a tree header (contains "Tree #")
      if (trimmed.includes('Tree #') && trimmed.includes('root')) {
        // Start new tree
        const treeMatch = trimmed.match(/Tree #(\d+)/)
        const treeId = treeMatch ? treeMatch[1] : String(trees.length)

        currentTree = {
          id: treeId,
          name: `Tree #${treeId}`,
          root: this.parseNodeFromLine(trimmed),
        }

        nodeStack = [{ node: currentTree.root, depth }]
        trees.push(currentTree)
      } else if (trimmed.startsWith('Val:')) {
        // Leaf node
        const valueMatch = trimmed.match(/Val:\s*([-+]?\d*\.?\d+)/)
        const value = valueMatch ? parseFloat(valueMatch[1]) : 0

        const leafNode: TreeNode = {
          type: 'leaf',
          value,
        }

        this.attachNodeToParent(nodeStack, leafNode, depth)
      } else if (this.isDecisionNode(trimmed)) {
        // Decision node
        const decisionNode = this.parseNodeFromLine(trimmed)
        this.attachNodeToParent(nodeStack, decisionNode, depth)
        nodeStack.push({ node: decisionNode, depth })
      }
    }

    return trees
  }

  private static parseNodeFromLine(line: string): TreeNode {
    // Parse format: "feature <= threshold (description)"
    const match = line.match(/(\w+)\s*([<>=!]+)\s*([-+]?\d*\.?\d+)/)

    if (match) {
      const [, feature, operator, threshold] = match
      return {
        type: 'decision',
        feature,
        operator: operator as TreeNode['operator'],
        threshold: parseFloat(threshold),
      }
    }

    // Fallback for malformed lines
    return {
      type: 'decision',
      feature: 'unknown',
      operator: '<=',
      threshold: 0,
    }
  }

  private static isDecisionNode(line: string): boolean {
    return /\w+\s*[<>=!]+\s*[-+]?\d*\.?\d+/.test(line)
  }

  private static attachNodeToParent(
    nodeStack: { node: TreeNode; depth: number }[],
    newNode: TreeNode,
    depth: number
  ): void {
    // Find the correct parent based on depth
    while (
      nodeStack.length > 0 &&
      nodeStack[nodeStack.length - 1].depth >= depth
    ) {
      nodeStack.pop()
    }

    if (nodeStack.length > 0) {
      const parent = nodeStack[nodeStack.length - 1].node
      if (!parent.left) {
        parent.left = newNode
      } else if (!parent.right) {
        parent.right = newNode
      }
    }
  }

  static validateTreeStructure(trees: FIGSTree[]): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
    }

    for (const tree of trees) {
      const treeErrors = this.validateSingleTree(tree)
      result.errors.push(...treeErrors)
    }

    result.isValid = result.errors.length === 0
    return result
  }

  private static validateSingleTree(
    tree: FIGSTree
  ): ValidationResult['errors'] {
    const errors: ValidationResult['errors'] = []

    if (!tree.root) {
      errors.push({ message: `Tree ${tree.id} has no root node` })
      return errors
    }

    // Validate tree structure recursively
    this.validateNode(tree.root, tree.id, errors)

    return errors
  }

  private static validateNode(
    node: TreeNode,
    treeId: string,
    errors: ValidationResult['errors']
  ): void {
    if (node.type === 'decision') {
      if (!node.feature) {
        errors.push({
          message: `Decision node in tree ${treeId} missing feature`,
        })
      }
      if (node.threshold === undefined) {
        errors.push({
          message: `Decision node in tree ${treeId} missing threshold`,
        })
      }
      if (!node.operator) {
        errors.push({
          message: `Decision node in tree ${treeId} missing operator`,
        })
      }

      // Recursively validate children
      if (node.left) this.validateNode(node.left, treeId, errors)
      if (node.right) this.validateNode(node.right, treeId, errors)
    } else if (node.type === 'leaf') {
      if (node.value === undefined) {
        errors.push({ message: `Leaf node in tree ${treeId} missing value` })
      }
    }
  }

  static validateTreeFeatures(
    trees: FIGSTree[],
    schema: DataSchema
  ): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
    }

    const availableFeatures = Object.keys(schema.columnTypes)

    for (const tree of trees) {
      this.checkNodeFeatures(
        tree.root,
        tree.id,
        availableFeatures,
        result.errors
      )
    }

    result.isValid = result.errors.length === 0
    return result
  }

  private static checkNodeFeatures(
    node: TreeNode,
    treeId: string,
    availableFeatures: string[],
    errors: ValidationResult['errors']
  ): void {
    if (node.type === 'decision' && node.feature) {
      if (!availableFeatures.includes(node.feature)) {
        errors.push({
          message: `Feature '${node.feature}' in tree ${treeId} not found in schema`,
          field: node.feature,
        })
      }
    }

    if (node.left)
      this.checkNodeFeatures(node.left, treeId, availableFeatures, errors)
    if (node.right)
      this.checkNodeFeatures(node.right, treeId, availableFeatures, errors)
  }
}

export default TreeParser
