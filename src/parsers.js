import fs from 'fs'
import path from 'path'

// Получаем абсолютный путь к файлу
const getAbsolutePath = (filepath) => {
  if (path.isAbsolute(filepath)) {
    return filepath
  }
  return path.resolve(process.cwd(), filepath)
}

// Получаем расширение файла
const getFileExtension = (filepath) => {
  return path.extname(filepath).toLowerCase()
}

// Читаем файл
const readFile = (filepath) => {
  const absolutePath = getAbsolutePath(filepath)
  try {
    return fs.readFileSync(absolutePath, 'utf-8')
  } catch (error) {
    throw new Error(`Не могу прочитать файл: ${filepath} - ${error.message}`)
  }
}

// Парсим JSON
const parseJSON = (content) => {
  try {
    return JSON.parse(content)
  } catch (error) {
    throw new Error(`Неверный формат JSON: ${error.message}`)
  }
}

// Основная функция парсинга
export const parse = (filepath) => {
  const content = readFile(filepath)
  const extension = getFileExtension(filepath)
  
  switch (extension) {
    case '.json':
      return parseJSON(content)
    // Здесь можно добавить другие форматы в будущем
    default:
      throw new Error(`Неподдерживаемый формат файла: ${extension}`)
  }
}
