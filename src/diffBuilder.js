import _ from 'lodash'

const buildDiff = (data1, data2) => {
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const allKeys = _.union(keys1, keys2)
  const sortedKeys = _.sortBy(allKeys)

  return sortedKeys.map((key) => {
    const hasKey1 = _.has(data1, key)
    const hasKey2 = _.has(data2, key)
    const value1 = data1[key]
    const value2 = data2[key]

    if (!hasKey2) {
      return { key, type: 'removed', value: value1 }
    }

    if (!hasKey1) {
      return { key, type: 'added', value: value2 }
    }

    if (_.isEqual(value1, value2)) {
      return { key, type: 'unchanged', value: value1 }
    }

    return {
      key,
      type: 'changed',
      value: { oldValue: value1, newValue: value2 }
    }
  })
}

export default buildDiff
