import { writeFileSync } from 'fs';

/**
 * This function "resets" all the object values in an object to a single value.
 */
const resetObjectValues = (oldObj, newValue) => {
  const newObj = Object.fromEntries(Object.keys(oldObj).map((key) => [key, newValue]))
  writeFileSync('test.json', JSON.stringify(newObj), 'utf8')
  return newObj
}

resetObjectValues({}, '')
