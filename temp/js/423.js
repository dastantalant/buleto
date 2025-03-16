 function (e, t, n) {
    "use strict";
    var r = n(4),
        o = n(42);
    e.exports = function (e) {
        if ("string" !== e && "number" !== e && "default" !== e)
            throw TypeError("Incorrect hint");
        return o(r(this), "number" != e)
    }
}