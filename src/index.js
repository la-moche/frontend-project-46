import _ from 'lodash'

import { parse } from './parsers.js'
import buildDiff from './diffBuilder.js'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parse(filepath1)
  const data2 = parse(filepath2)
  
  const diff = buildDiff(data1, data2)
  
  if (format === 'stylish') {
    return formatStylish(diff)
  }
  
  return `Format ${format} is not supported yet`
}

const formatStylish = (diff, depth = 1) => {
  const indent = ' '.repeat(4 * depth - 4)
  const lines = diff.map((node) => {
    const currentIndent = ' '.repeat(4 * depth - 2)
    
    switch (node.type) {
      case 'added':
        return `${currentIndent}+ ${node.key}: ${formatValue(node.value, depth + 1)}`
      case 'removed':
        return `${currentIndent}- ${node.key}: ${formatValue(node.value, depth + 1)}`
      case 'unchanged':
        return `${currentIndent}  ${node.key}: ${formatValue(node.value, depth + 1)}`
      case 'changed':
        return [
          `${currentIndent}- ${node.key}: ${formatValue(node.value.oldValue, depth + 1)}`,
          `${currentIndent}+ ${node.key}: ${formatValue(node.value.newValue, depth + 1)}`
        ].join('\n')
      case 'nested':
        return `${currentIndent}  ${node.key}: ${formatStylish(node.children, depth + 1)}`
      default:
        return `${currentIndent}  ${node.key}: ${formatValue(node.value, depth + 1)}`
    }
  })

  return `{\n${lines.join('\n')}\n${indent}}`
}

const formatValue = (value, depth) => {
  if (_.isPlainObject(value)) {
    const indent = ' '.repeat(4 * depth)
    const bracketIndent = ' '.repeat(4 * depth - 4)
    const lines = _.entries(value).map(([key, val]) => {
      return `${indent}${key}: ${formatValue(val, depth + 1)}`
    })
    return `{\n${lines.join('\n')}\n${bracketIndent}}`
  }
  
  if (value === null) return 'null'
  if (value === '') return ''
  return String(value)
}

export default genDiff
