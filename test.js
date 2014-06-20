var collectOverPrototype = require('./');
var test = require('tape');

test('can collect an object key over the prototype chain', function(t) {
    t.plan(1);
    var A = function() { this.someKey = { big: 'smells' }; };
    var B = function() { this.someKey = { awesome: 'fish' }; };
    var C = function() { this.someKey = { swims: 'fast' }; };
    B.prototype = new A;
    C.prototype = new B;

    var c = new C;
    var collected = collectOverPrototype(c, 'someKey');
    t.deepEqual(collected, { big: 'smells', awesome: 'fish' });
});

test('can collect an object key over prototype chain and self', function(t) {
    t.plan(1);
    var A = function() { this.someKey = { big: 'smells' }; };
    var B = function() { this.someKey = { awesome: 'fish' }; };
    var C = function() { this.someKey = { swims: 'fast' }; };
    B.prototype = new A;
    C.prototype = new B;

    var c = new C;
    var collected = collectOverPrototype(c, 'someKey', true);
    t.deepEqual(collected, { big: 'smells', awesome: 'fish', swims: 'fast' });
});

test('prioritizes key values in the prototype chain closer to self', function(t) {
    t.plan(1);
    var A = function() { this.someKey = { big: 'smells' }; };
    var B = function() { this.someKey = { awesome: 'fish' }; };
    var C = function() { this.someKey = { big: 'tunas' }; };
    B.prototype = new A;
    C.prototype = new B;

    var c = new C;
    var collected = collectOverPrototype(c, 'someKey', true);
    t.deepEqual(collected, { big: 'tunas', awesome: 'fish' });
});
