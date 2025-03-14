import { writeFileSync } from 'fs';

/**
 * This function converts an array of objects into a CSV format.
 * It creates a CSV file (without the headers at the moment).
 * It also creates a text file with the CSV in a single-line string
 * format that can be used as an object value
 */
const jsonToCsv = (json) => {
  const csvLines = []

  json.forEach((object) => {
    csvLines.push(Object.values(object).join(','))
  })

  const csv = csvLines.join('\n')
  writeFileSync('test.csv', csv, 'utf8')

  const csvString = csvLines.join('\\n')
  writeFileSync('test.txt', csvString, 'utf8')

  return csv
}

jsonToCsv([])

