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

# 0.0.7
* Bug-fix on isAssign option.

# 0.0.8
* Bug-fix on isAssign option.
  * change dependency module lodash.assign -> merge 

```
# Current action
var assign = require('lodash.assign');
var ironman = {
  name: 'Tony Stark',
  info: {
    age: 20,
    company: 'Stark Industry'
  }
}

assign(ironman, { info: { tall: 183 } });
console.log(ironman);

> { name: 'Tony Stark', info: { tall: 183 } }


# I want,
var merge = require('merge');
var ironman = {
  name: 'Tony Stark',
  info: {
    age: 20,
    company: 'tark Industry'
  }
}

merge.recursive(false, ironman, { info: { tall: 183, company: 'Stark Industry' } });
console.log(ironman);

> { name: 'Tony Stark', info: { age: 20, company: 'Stark Industry', tall: 183 } }
```

* Because, StringAccess is component package for DivideConfig. DivideConfig need a 
composition between development configuration and production configuration. If you
don't want this feature (merge), the flag isAssign set to false.