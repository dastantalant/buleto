 function (e, t, n) {
    "use strict";
    var r = n(768),
        o = RegExp.prototype.exec,
        a = Object.getOwnPropertyDescriptor,
        i = function (e) {
            try {
                var t = e.lastIndex;
                return e.lastIndex = 0,
                    o.call(e), !0
            } catch (e) {
                return !1
            } finally {
                e.lastIndex = t
            }
        },
        s = Object.prototype.toString,
        l = "function" === typeof Symbol && "symbol" === typeof Symbol.toStringTag;
    e.exports = function (e) {
        if (!e || "object" !== typeof e)
            return !1;
        if (!l)
            return "[object RegExp]" === s.call(e);
        var t = a(e, "lastIndex");
        return !(!t || !r(t, "value")) && i(e)
    }
}