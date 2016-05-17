'use strict';

function StringAccess(option) {
  var opt = option || {};
  var clonedeep = require('lodash.clonedeep');

  function exporter (obj, path) {
    var paths, current;

    if (path === '' || (typeof path === 'object' && path.length === 0)) {
      return obj;
    } else {
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
  }

  function importer (src, path, value) {
    var paths, current, last;
    var dst = clonedeep(src);

    if (path === '' || (typeof path === 'object' && path.length === 0)) {
      dst = Object.assign(dst, value);
    } else {
      if (typeof path === 'string') {
        paths = path.split('.');
        last = paths[paths.length - 1];

        paths = paths.slice(0, paths.length - 1);
        current = dst;
      } else if (typeof path === 'object' && path.length) {
        paths = path;
        last = paths[paths.length - 1];

        paths = paths.slice(0, paths.length - 1);
        current = dst;
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
    }

    return dst;
  }

  return {
    exporter: exporter,
    importer: importer
  };
}

module.exports = StringAccess;