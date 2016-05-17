
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

  it('StringAccess_root_path', function () {
    var sa = require('../lib/StringAccess')();

    var testObject = createObject();

    testObject = sa.importer(testObject, '', { superman: { name: 'Clack' }});
    var superman = sa.exporter(testObject, 'superman');

    superman.name.should.equal('Clack');

    var tmp = sa.exporter(testObject, '');

    tmp.ironman.name.should.equal('Tony Stark');
    tmp.superman.name.should.equal('Clack');
  });

  it('StringAccess_importer', function () {
    var sa = require('../lib/StringAccess')();

    var testObject = createObject();
    testObject = sa.importer(testObject, 'ironman.info.company', 'Stark Industry');
    testObject = sa.importer(testObject, 'ironman.tall', 99);

    testObject.ironman.info.company.should.equal('Stark Industry');
    testObject.ironman.tall.should.equal(99);

    testObject = createObject();
    testObject = sa.importer(testObject, ['ironman', 'info', 'company'], 'Stark Industry');
    testObject = sa.importer(testObject, ['ironman', 'tall'], 99);

    testObject.ironman.info.company.should.equal('Stark Industry');
    testObject.ironman.tall.should.equal(99);
  });

  it('StringAccess_importer_isCreate', function () {
    var sa = require('../lib/StringAccess')({ isCreate: true });

    var testObject = createObject();
    testObject = sa.importer(testObject, 'ironman.person.company', 'Stark Industry');
    testObject = sa.importer(testObject, 'ironman.tall', 99);

    testObject.ironman.person.company.should.equal('Stark Industry');
    testObject.ironman.tall.should.equal(99);

    testObject = createObject();
    testObject = sa.importer(testObject, ['ironman', 'info', 'company'], 'Stark Industry');
    testObject = sa.importer(testObject, ['ironman', 'tall'], 99);

    testObject.ironman.info.company.should.equal('Stark Industry');
    testObject.ironman.tall.should.equal(99);
  });

  it('StringAccess_importer_object', function () {
    var sa = require('../lib/StringAccess')({ isAssign: true });
    var testObject = createObject();

    testObject = sa.importer(testObject, 'ironman.info', { company: 'Stark Industry' });

    testObject.ironman.info.age.should.equal(20);
    testObject.ironman.info.cell.should.equal('000-1111-2222');
    testObject.ironman.info.company.should.equal('Stark Industry');
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