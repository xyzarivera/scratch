import { writeFileSync } from 'fs';

const jsonToCsv = (json) => {
  const csvLines = []

  json.forEach((object) => {
    const line = Object.values(object).join(',')
    console.log({line})
   csvLines.push(line)
  })

  const csv = csvLines.join('\n')
  writeFileSync('test.csv', csv, 'utf8')

  const csvString = csvLines.join('\\n')
  writeFileSync('test.txt', csvString, 'utf8')

  return {csv}
}

const result = jsonToCsv([])
console.log( result )

