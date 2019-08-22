import _ from 'lodash';

function splat(fun) {
  return function (array) {
    return fun.apply(null, array);
  };
}

function unsplat(fun) {
  return function () {
    return fun.call(null, _.toArray(arguments));
  }
}

function parseAge(age) {
  if (!_.isString(age)) throw new Error('Expecting a string');
  var a;

  console.log('Attempting to parse an age');
  a = parseInt(age, 10);
  if (_.isNaN(a)) {
    console.log(['Could not parse age:', age].join(' '));
    a = 0;
  }

  return a;
}

parseAge('42');
parseAge(42);
parseAge('frob');

function fail(thing) {
  throw new Error(thing);
}

function warn(thing) {
  console.log(['WARNING:', thing].join(' '));
}

function note(thing) {
  console.log(['NOTE:', thing].join(' '));
}


function parseAge(age) {
  if (!_.isString(age)) fail('Expecting a string');
  var a;

  note('Attempting to parse an age');
  a = parseInt(age, 10);
  if (_.isNaN(a)) {
    warn(['Could not parse age:', age].join(' '));
    a = 0;
  }

  return a;
}

function isIndexed(data) {
  return _.isArray(data) || _.isString(data);
}


function nth(a, index) {
  if (!_.isNumber(index)) fail('Expected a number as the index');
  if (!isIndexed(a)) fail('Not supported on non-indexed type');
  if ((index < 0) || (a.length - 1 < index)) fail('Index value is out of bounds');
  return a[index];
}

function second(a) {
  return nth(a, 1);
}



function compareLessThanOrEqual(x, y) {
  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
}

function lessOrEqual(x, y) {
  return x <= y;
}

function comparator(pred) {
  return function (x, y) {
    if (truthy(pred(x, y))) {
      return -1;
    } else if (truthy(pred(y, x))) {
      return 1;
    } else {
      return 0;
    }
  };
}

[100, 1, 0, 10, -1, -2, -1].sort(comparator(lessOrEqual));

function truthy(x) {
  return (x !== false) && existy(x);
}

function existy(x) {
  return x != null;
}

[100, 1, 0, 10, -1, -2, -1].sort(comparator(lessOrEqual));


function lameCSV(str) {
  return _.reduce(str.split('\n'), function (table, row) {
    table.push(_.map(row.split(','), function (c) { return c.trim(); }));
    return table;
  }, [])
}

var peopleTable = lameCSV('name,age,hair\nMerble,3,red\nBob,64,blonde');

_.rest(peopleTable).sort();

function selectNames(table) {
  return _.rest(_.map(table, _.first));
}

function selectAges(table) {
  return _.rest(_.map(table, second));
}

function selectHairColor(table) {
  return _.rest(_.map(table, function (row) { return nth(row, 2); }));
}