'use strict';

function StringAccess(option) {
  var opt = option || {};

  function exporter (obj, path) {
    var paths, current;

    if (typeof path === 'string') {
      paths = path.split('.');
    } else if (typeof path === 'object' && path.length) {
      paths = path;
    } else {
      throw new Error('invalid path');
    }

    current = obj;

    paths.forEach(function (element) {
      current = current[element];
    });

    return current;
  }

  function importer (obj, path, value) {
    var paths, current, last;

    if (typeof path === 'string') {
      paths = path.split('.');
      last = paths[paths.length - 1];

      paths = paths.slice(0, paths.length - 1);
      current = obj;
    } else if (typeof path === 'object' && path.length) {
      paths = path;
      last = paths[paths.length - 1];

      paths = paths.slice(0, paths.length - 1);
      current = obj;
    } else {
      throw new Error('invalid path');
    }

    paths.forEach(function (element, index) {
      if (paths.length > index) {
        if (!!opt.isCreate && !current[element]) {
          current[element] = {};
        }

        current = current[element];
      }
    });

    current[last] = value;

    return current;
  }

  return {
    exporter: exporter,
    importer: importer
  };
}

module.exports = StringAccess;