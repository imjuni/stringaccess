# 0.0.3
* Initial version upload

# 0.0.4
* Change spec in importer -> copy new Array, and return it
* Fix istanbul and npm test command configuration

```
# Test
npm test

# Coverage
npm run coverage
```

# 0.0.5
* Add feature, root path
  * path value is '' or [], importer working to same Object.assign and exporter is return object
* Replace Object.assign to lodash.cloneDeep
  * Object.assign is shallow copy, so change deep copy
  
# 0.0.6
* Add option in importer
  * path point a object, replace it. But isAssign option set true, don't replace assign it. 
    See test/sa.js in StringAccess_importer_object test.
* README.md fix