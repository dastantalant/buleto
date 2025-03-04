 function (e, t, n) {
    "use strict";
    var r = Array.prototype.slice,
        o = n(287),
        a = Object.keys,
        i = a ? function (e) {
            return a(e)
        } :
            n(764),
        s = Object.keys;
    i.shim = function () {
        if (Object.keys) {
            (function () {
                var e = Object.keys(arguments);
                return e && e.length === arguments.length
            })(1, 2) || (Object.keys = function (e) {
                return s(o(e) ? r.call(e) : e)
            })
        } else
            Object.keys = i;
        return Object.keys || i
    },
        e.exports = i
}