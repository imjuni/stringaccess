'use strict';

var clonedeep = require('lodash.clonedeep');
var merge = require('merge');

function StringAccess(option) {
  var opt = option || {};

  opt.isCreate = opt.isCreate || false;
  opt.isAssign = opt.isAssign || false;

  function setOptions (newOption) {
    opt = newOption;
  }

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
      } else if (typeof path === 'object' && path instanceof Array) {
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

      if (opt.isAssign) {
        var currentType = typeof current[last];
        var valueType = typeof value;

        if (currentType == 'string' || currentType == 'number' || currentType == 'boolean') {
          current[last] = value;
        } else if (currentType == 'function') {
          current[last] = value;
        } else if (currentType == 'undefined') {
          current[last] = value;
        } else if (currentType == 'object' && current[last] === null) {
          current[last] = value;
        } else if (currentType == 'object' && current[last] instanceof Array) {
          current[last] = value;
        } else {
          if (valueType == 'object' && value !== null && !(value instanceof Array)) {

            current[last] = merge.recursive(false, current[last], value);

          } else {
            current[last] = value;
          }
        }
      } else {
        current[last] = value;
      }
    }

    return dst;
  }

  return {
    exporter: exporter,
    importer: importer,
    setOptions: setOptions
  };
}

module.exports = StringAccess;