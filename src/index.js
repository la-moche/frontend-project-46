import { parse } from './parsers.js'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  // Читаем и парсим оба файла
  const data1 = parse(filepath1)
  const data2 = parse(filepath2)
  
  // Пока просто возвращаем информацию о том, что распарсили
  return `Сравниваем:\nФайл1: ${JSON.stringify(data1, null, 2)}\nФайл2: ${JSON.stringify(data2, null, 2)}\nФормат: ${format}`
}

export default genDiff
