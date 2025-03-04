 function (e, t, n) {
    "use strict";

    function r(e) {
        if (null === e || void 0 === e)
            throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(e)
    }
    var o = Object.getOwnPropertySymbols,
        a = Object.prototype.hasOwnProperty,
        i = Object.prototype.propertyIsEnumerable;
    e.exports = function () {
        try {
            if (!Object.assign)
                return !1;
            var e = new String("abc");
            if (e[5] = "de",
                "5" === Object.getOwnPropertyNames(e)[0])
                return !1;
            for (var t = {}, n = 0; n < 10; n++)
                t["_" + String.fromCharCode(n)] = n;
            if ("0123456789" !== Object.getOwnPropertyNames(t).map(function (e) {
                return t[e]
            }).join(""))
                return !1;
            var r = {};
            return "abcdefghijklmnopqrst".split("").forEach(function (e) {
                r[e] = e
            }),
                "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
        } catch (e) {
            return !1
        }
    }() ? Object.assign : function (e, t) {
        for (var n, s, l = r(e), c = 1; c < arguments.length; c++) {
            n = Object(arguments[c]);
            for (var u in n)
                a.call(n, u) && (l[u] = n[u]);
            if (o) {
                s = o(n);
                for (var d = 0; d < s.length; d++)
                    i.call(n, s[d]) && (l[s[d]] = n[s[d]])
            }
        }
        return l
    }
}