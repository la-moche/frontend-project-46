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

  // for ../src/index.js
  test('should return error message for unsupported format', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')
  
    const result = genDiff(filepath1, filepath2, 'unsupported-format')
    expect(result).toContain('Format unsupported-format is not supported yet')
  })

  // for unsupported file formats in parsers.js
  test('should throw error for unsupported file format', () => {
    // Create a temporary file with an unsupported extension
    const unsupportedFile = getFixturePath('test.unsupported')
  
    expect(() => {
      genDiff(unsupportedFile, getFixturePath('file2.json'))
    }).toThrow('Unsupported file format')
  })
})
