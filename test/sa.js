
describe('StringAccess', function () {
  function createObject () {
    return {
      ironman: {
        name: 'Tony Stark',
        info: {
          age: 20,
          cell: '000-1111-2222'
        }
      }
    };
  }

  before('StringAccess_before', function () {
    require('chai').should();
  });

  it('StringAccess_exporter', function () {
    var sa = require('../lib/StringAccess')();
    var testObject, name, age;

    testObject = createObject();
    name = sa.exporter(testObject, 'ironman.name');
    age = sa.exporter(testObject, 'ironman.info.age');

    name.should.equal('Tony Stark');
    age.should.equal(20);

    name = sa.exporter(testObject, ['ironman', 'name']);
    age = sa.exporter(testObject, ['ironman', 'info', 'age']);

    name.should.equal('Tony Stark');
    age.should.equal(20);
  });

  it('StringAccess_exporter_invalid_path', function () {
    var sa = require('../lib/StringAccess')();
    var testObject, name;

    try {
      testObject = createObject();
      name = sa.exporter(testObject, { path: 'ironman.name' });
    } catch (err) {
      err.should.to.be.instanceof(Error);
    }
  });

  it('StringAccess_importer', function () {
    var sa = require('../lib/StringAccess')();

    var testObject = createObject();
    sa.importer(testObject, 'ironman.info.company', 'Stark Industry');
    sa.importer(testObject, 'ironman.tall', 99);

    testObject.ironman.info.company.should.equal('Stark Industry');
    testObject.ironman.tall.should.equal(99);

    testObject = createObject();
    sa.importer(testObject, ['ironman', 'info', 'company'], 'Stark Industry');
    sa.importer(testObject, ['ironman', 'tall'], 99);

    testObject.ironman.info.company.should.equal('Stark Industry');
    testObject.ironman.tall.should.equal(99);
  });

  it('StringAccess_importer_isCreate', function () {
    var sa = require('../lib/StringAccess')({ isCreate: true });

    var testObject = createObject();
    sa.importer(testObject, 'ironman.person.company', 'Stark Industry');
    sa.importer(testObject, 'ironman.tall', 99);

    testObject.ironman.person.company.should.equal('Stark Industry');
    testObject.ironman.tall.should.equal(99);

    testObject = createObject();
    sa.importer(testObject, ['ironman', 'info', 'company'], 'Stark Industry');
    sa.importer(testObject, ['ironman', 'tall'], 99);

    testObject.ironman.info.company.should.equal('Stark Industry');
    testObject.ironman.tall.should.equal(99);
  });

  it('StringAccess_importer_invalid_path', function () {
    var sa = require('../lib/StringAccess')();

    var testObject = createObject();

    try {
      sa.importer(testObject, { path: 'ironman.info.company' }, 'Stark Industry');
    } catch (err) {
      err.should.to.be.instanceof(Error);
    }
  });
});