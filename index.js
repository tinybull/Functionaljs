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


function parseAge(age){
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

function truthy(x) {
  return (x !== false) && existy(x);
}

function existy(x) {
  return x != null;
}

[100, 1, 0, 10, -1, -2, -1].sort(comparator(lessOrEqual));