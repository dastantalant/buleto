 function (e, t, n) {
    "use strict";
    var r = "function" === typeof Symbol && "symbol" === typeof Symbol.toStringTag,
        o = Object.prototype.toString,
        a = function (e) {
            return !(r && e && "object" === typeof e && Symbol.toStringTag in e) && "[object Arguments]" === o.call(e)
        },
        i = function (e) {
            return !!a(e) || null !== e && "object" === typeof e && "number" === typeof e.length && e.length >= 0 && "[object Array]" !== o.call(e) && "[object Function]" === o.call(e.callee)
        },
        s = function () {
            return a(arguments)
        }();
    a.isLegacyArguments = i,
        e.exports = s ? a : i
}