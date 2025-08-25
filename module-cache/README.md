## module caching for objects

https://nodejs.org/api/modules.html#caching

> _Modules are cached after the first time they are loaded._ 

imported modules are cached and shared by reference - MUTABLE
once mutated, every other module that imports will get the changes

### Fix

1. Freezing the Object upon import
`const config = Object.freeze(structuredClone(rawConfig));`

2. Cloning per module
`export default () => structuredClone(config);`


### Results

```
Node.js v24.6.0
~/saiza/scratch/import-cache on import-cache
> node ./index.js
{ deepCopied: { key: 'hi' }, test1: { key: 'hi' } }
undefined
{ referenceCopied: { key: 'hello' }, test2: { key: 'hello' } }
undefined
{
  vandalized1: 'bar',
  deepCopied: { key: 'bar' },
  test1: { key: 'hi' }
}
undefined
{
  vandalized2: 'bar',
  referenceCopied: { key: 'bar' },
  test2: { key: 'bar' }
}
undefined
~/saiza/scratch/import-cache on import-cache
> node ./index.js
{ deepCopied: { key: 'hi' }, test1: { key: 'hi' } }
undefined
{ referenceCopied: { key: 'hello' }, test2: { key: 'hello' } }
undefined
{
  vandalized1: 'bar',
  deepCopied: { key: 'bar' },
  test1: { key: 'hi' }
}
undefined
{
  vandalized2: 'bar',
  referenceCopied: { key: 'bar' },
  test2: { key: 'bar' }
}
undefined
undefined
```
