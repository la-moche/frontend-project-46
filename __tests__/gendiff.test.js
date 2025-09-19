import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFileSync } from 'fs'

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

  // Test for unsupported format in index.js
  test('should throw error for unsupported format', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')
  
  expect(() => {
    genDiff(filepath1, filepath2, 'unsupported-format')
  }).toThrow('Unknown format: unsupported-format')
  })

  // Test for unsupported file formats in parsers.js
  test('should throw error for unsupported file format', () => {
    const unsupportedFile = getFixturePath('test.unsupported')
  
    expect(() => {
      genDiff(unsupportedFile, getFixturePath('file2.json'))
    }).toThrow('Unsupported file format')
  })

  test('should throw error for invalid JSON file', () => {
    const invalidJsonFile = getFixturePath('invalid.json')
  
    // Create file with invalid JSON
    fs.writeFileSync(invalidJsonFile, '{ invalid: json, }')
  
    expect(() => {
      genDiff(invalidJsonFile, getFixturePath('file2.json'))
    }).toThrow('Invalid JSON format')
  
    // Clean up temporary file
    fs.unlinkSync(invalidJsonFile)
  })

  test('should throw error for unreadable file', () => {
    const unreadableFile = getFixturePath('unreadable.json')
  
    // Create file without read permissions
    fs.writeFileSync(unreadableFile, '{}')
    fs.chmodSync(unreadableFile, 0o000) // Remove read permissions
  
    expect(() => {
      genDiff(unreadableFile, getFixturePath('file2.json'))
    }).toThrow('Cannot read file')
  
    // Restore permissions and clean up
    fs.chmodSync(unreadableFile, 0o644)
    fs.unlinkSync(unreadableFile)
  })

  test('should compare flat YAML files correctly', () => {
    const filepath1 = getFixturePath('file1.yml')
    const filepath2 = getFixturePath('file2.yml')
    const expected = readFile('expected_result.txt') // same result
  
    const result = genDiff(filepath1, filepath2)
    expect(result).toEqual(expected)
  })

  test('should compare nested structures correctly', () => {
    const filepath1 = getFixturePath('nested1.json')
    const filepath2 = getFixturePath('nested2.json')
    const expected = readFile('nested_expected.txt')
  
    const result = genDiff(filepath1, filepath2)
    expect(result).toEqual(expected)
})

  test('should format diff in plain format', () => {
    const filepath1 = getFixturePath('nested1.json')
    const filepath2 = getFixturePath('nested2.json')
    const result = genDiff(filepath1, filepath2, 'plain')
  
    expect(result).toContain("Property 'common.follow' was added with value: false")
    expect(result).toContain("Property 'common.setting2' was removed")
    expect(result).toContain("Property 'common.setting3' was updated. From true to null")
  })

  test('should format diff in json format', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')
    const result = genDiff(filepath1, filepath2, 'json')
  
    // Проверяем что это валидный JSON
    expect(() => JSON.parse(result)).not.toThrow()
  
    // Проверяем структуру
    const parsed = JSON.parse(result)
    expect(Array.isArray(parsed)).toBe(true)
    expect(parsed[0]).toHaveProperty('key')
    expect(parsed[0]).toHaveProperty('type')
  })
})
