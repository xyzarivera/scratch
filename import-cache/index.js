import test1 from './test1.json' with { type: 'json' };
import test2 from './test2.json' with { type: 'json' };
import assert from 'assert';
import { updateKey } from './updateKey.js';

const deepCopied = structuredClone(test1);
const referenceCopied = test2;

console.log({deepCopied, test1}); 
console.log(assert.deepStrictEqual(deepCopied, test1)); // undefined

console.log({referenceCopied, test2}); 
console.log(assert.deepStrictEqual(referenceCopied, test2)); // undefined

const vandalized1 = updateKey(deepCopied)
console.log({vandalized1, deepCopied, test1}); 
console.log(assert.deepStrictEqual(vandalized1, deepCopied.key)); // undefined
// console.log(assert.deepStrictEqual(vandalized1, test1.key)); // error

const vandalized2 = updateKey(referenceCopied)
console.log({vandalized2, referenceCopied, test2}); 
console.log(assert.deepStrictEqual(vandalized2, referenceCopied.key)); // undefined
console.log(assert.deepStrictEqual(vandalized2, test2.key)); // undefined

