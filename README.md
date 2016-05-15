StringAccess
============

String Access is a import, export library using by dot-notation string. See below.

# Exporter

```js
var sa = require('stringaccess');
var superheros = {
  ironman: {
    name: 'Tony Stark',
    indivisual: {
      species: 'Human',
      placeOfOrigin: 'Earth',
      partnerships: 'War Machine'
    }
  },
  thor: {
    name: 'Thor Odinson',
    indivisual: {
      species: 'Asgardian',
      placeOfOrigin: 'Asgard'
    }
  }
};

console.log(sa.exporter(superheros, 'ironman.name'));

# shell output
Tony Stark
```

# Importer

```js
var sa = require('stringaccess');
var superheros = {
  ironman: {
    name: 'Tony Stark',
    indivisual: {
      species: 'Human',
      placeOfOrigin: 'Earth',
      partnerships: 'War Machine'
    }
  },
  thor: {
    name: 'Thor Odinson',
    indivisual: {
      species: 'Asgardian',
      placeOfOrigin: 'Asgard'
    }
  }
};

sa.importer(superheros, 'hulk', { 
  name: 'Robert Bruce Banne',
});

sa = require('../lib/StringAccess')({ isCreate: true });   // isCreate options is create object on blank path
sa.importer(superheros, 'hulk.indivisual.species', 'Unknown');

console.log(superheros.hulk.name);
console.log(superheros.hulk.indivisual.species);

# shell output
Robert Bruce Banne
Unknown
```

# Options
* isCreate: Create object on blank path