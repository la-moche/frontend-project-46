import fs from 'fs'
import path from 'path'

import yaml from 'js-yaml'

const getAbsolutePath = (filepath) => {
  if (path.isAbsolute(filepath)) {
    return filepath
  }
  return path.resolve(process.cwd(), filepath)
}

const getFileExtension = (filepath) => {
  return path.extname(filepath).toLowerCase()
}

const readFile = (filepath) => {
  const absolutePath = getAbsolutePath(filepath)
  try {
    return fs.readFileSync(absolutePath, 'utf-8')
  }
  catch (error) {
    throw new Error(`Cannot read file: ${filepath} - ${error.message}`)
  }
}

const parseJSON = (content) => {
  try {
    return JSON.parse(content)
  }
  catch (error) {
    throw new Error(`Invalid JSON format: ${error.message}`)
  }
}

const parseYAML = (content) => {
  try {
    return yaml.load(content)
  }
  catch (error) {
    throw new Error(`Invalid YAML format: ${error.message}`)
  }
}

export const parse = (filepath) => {
  const content = readFile(filepath)
  const extension = getFileExtension(filepath)

  switch (extension) {
    case '.json':
      return parseJSON(content)
    case '.yml':
    case '.yaml':
      return parseYAML(content)
    default:
      throw new Error(`Unsupported file format: ${extension}`)
  }
}
