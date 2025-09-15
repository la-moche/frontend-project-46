import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

import { describe, expect, test } from '@jest/globals'

import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename)
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim()

describe('gendiff', () => {
  test('should compare flat JSON files correctly', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')
    const expected = readFile('expected_result.txt')
    
    const result = genDiff(filepath1, filepath2)
    expect(result).toEqual(expected)
  })

  test('should work with absolute paths', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')
    const expected = readFile('expected_result.txt')
    
    const result = genDiff(filepath1, filepath2)
    expect(result).toEqual(expected)
  })

  test('should throw error for non-existent file', () => {
    expect(() => {
      genDiff('nonexistent.json', getFixturePath('file2.json'))
    }).toThrow()
  })
})
