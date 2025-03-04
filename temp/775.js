 function (e, t, n) {
    "use strict";
    var r = n(171).supportsDescriptors,
        o = n(289),
        a = Object.getOwnPropertyDescriptor,
        i = Object.defineProperty,
        s = TypeError,
        l = Object.getPrototypeOf,
        c = /a/;
    e.exports = function () {
        if (!r || !l)
            throw new s("RegExp.prototype.flags requires a true ES5 environment that supports property descriptors");
        var e = o(),
            t = l(c),
            n = a(t, "flags");
        return n && n.get === e || i(t, "flags", {
            configurable: !0,
            enumerable: !1,
            get: e
        }),
            e
    }
}