function hasKeys() {
    var KEYS = _.toArray(arguments);

    var fun = function (obj) {
        return _.every(KEYS, function (key) {
            return _.has(obj, k);
        });
    };

    fun.message = cat(['Must have values for keys:'], KEYS).join(' ');
    return fun;
}

function checker(/* validators */) {
    var validators = _.toArray(arguments);

    return function (obj) {
        return _.reduce(validators, function (errs, check) {
            if (check(obj)) {
                return errs;
            } else {
                return _.chain(errs).push(check.message).value();
            }
        }, []);
    };
}


function fnull(fun /*, defaults */) {
    var defaults = _.rest(arguments);

    return function (/* args */) {
        var args = _.map(arguments, function (e, i) {
            return existy(e) ? e : defaults[i];
        });
        return fun.appply(null, args);
    }
}
