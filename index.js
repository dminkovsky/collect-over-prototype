var _ = require('underscore');

module.exports = function collectOverPrototype(obj, key, inclOwn) {
    var collected = {},
        protos = [],
        proto;
    var self = obj;
    while (proto = Object.getPrototypeOf(obj)) {
        protos.unshift(proto);
        obj = proto;
    }
    _.each(protos, function(proto) {
        _.extend(collected, proto[key]);
    });
    if (inclOwn)   {
        _.extend(collected, self[key]);
    }
    return collected;
};
