 function (e, t, n) {
    "use strict";
    var r = Date.prototype.getDay,
        o = function (e) {
            try {
                return r.call(e), !0
            } catch (e) {
                return !1
            }
        },
        a = Object.prototype.toString,
        i = "function" === typeof Symbol && "symbol" === typeof Symbol.toStringTag;
    e.exports = function (e) {
        return "object" === typeof e && null !== e && (i ? o(e) : "[object Date]" === a.call(e))
    }
}