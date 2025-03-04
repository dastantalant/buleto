 function (e, t, n) {
    "use strict";
    e.exports = function () {
        if ("function" !== typeof Symbol || "function" !== typeof Object.getOwnPropertySymbols)
            return !1;
        if ("symbol" === typeof Symbol.iterator)
            return !0;
        var e = {},
            t = Symbol("test"),
            n = Object(t);
        if ("string" === typeof t)
            return !1;
        if ("[object Symbol]" !== Object.prototype.toString.call(t))
            return !1;
        if ("[object Symbol]" !== Object.prototype.toString.call(n))
            return !1;
        e[t] = 42;
        for (t in e)
            return !1;
        if ("function" === typeof Object.keys && 0 !== Object.keys(e).length)
            return !1;
        if ("function" === typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(e).length)
            return !1;
        var r = Object.getOwnPropertySymbols(e);
        if (1 !== r.length || r[0] !== t)
            return !1;
        if (!Object.prototype.propertyIsEnumerable.call(e, t))
            return !1;
        if ("function" === typeof Object.getOwnPropertyDescriptor) {
            var o = Object.getOwnPropertyDescriptor(e, t);
            if (42 !== o.value || !0 !== o.enumerable)
                return !1
        }
        return !0
    }
}