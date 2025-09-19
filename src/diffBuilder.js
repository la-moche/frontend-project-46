import _ from 'lodash'

const buildDiff = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2))
  const sortedKeys = _.sortBy(keys)

  return sortedKeys.map(key => {
    const value1 = data1[key]
    const value2 = data2[key]
    const hasKey1 = _.has(data1, key)
    const hasKey2 = _.has(data2, key)

    if (!hasKey2) {
      return { key, type: 'removed', value: value1 }
    }

    if (!hasKey1) {
      return { key, type: 'added', value: value2 }
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        type: 'nested',
        children: buildDiff(value1, value2),
      }
    }

    if (_.isEqual(value1, value2)) {
      return { key, type: 'unchanged', value: value1 }
    }

    return {
      key,
      type: 'changed',
      value: { oldValue: value1, newValue: value2 },
    }
  })
}

export default buildDiff
