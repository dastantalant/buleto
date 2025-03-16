 function (e, t, n) {
    "use strict";
    var r = n(36),
        o = n(43);
    e.exports = function (e) {
        var t = String(o(this)),
            n = "",
            a = r(e);
        if (a < 0 || a == 1 / 0)
            throw RangeError("Count can't be negative");
        for (; a > 0;
            (a >>>= 1) && (t += t))
            1 & a && (n += t);
        return n
    }
}