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

const formatStylish = (diff) => {
  const lines = diff.map(({ key, type, value }) => {
    switch (type) {
      case 'added':
        return `  + ${key}: ${value}`
      case 'removed':
        return `  - ${key}: ${value}`
      case 'unchanged':
        return `    ${key}: ${value}`
      case 'changed':
        return `  - ${key}: ${value.oldValue}\n  + ${key}: ${value.newValue}`
      default:
        return `    ${key}: ${value}`
    }
  })
  
  return `{\n${lines.join('\n')}\n}`
}

export default genDiff
