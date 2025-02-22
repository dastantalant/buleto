function(e, t, n) {
    "use strict";
    var r = n(288),
        o = n(171).supportsDescriptors,
        a = Object.getOwnPropertyDescriptor,
        i = TypeError;
    e.exports = function() {
        if (!o)
            throw new i("RegExp.prototype.flags requires a true ES5 environment that supports property descriptors");
        if ("gim" === /a/gim.flags) {
            var e = a(RegExp.prototype, "flags");
            if (e && "function" === typeof e.get && "boolean" === typeof /a/.dotAll)
                return e.get
        }
        return r
    }
}