 function (e, t, n) {
    "use strict";
    var r = n(286),
        o = "function" === typeof Symbol && "symbol" === typeof Symbol("foo"),
        a = Object.prototype.toString,
        i = Array.prototype.concat,
        s = Object.defineProperty,
        l = function (e) {
            return "function" === typeof e && "[object Function]" === a.call(e)
        },
        c = s && function () {
            var e = {};
            try {
                s(e, "x", {
                    enumerable: !1,
                    value: e
                });
                for (var t in e)
                    return !1;
                return e.x === e
            } catch (e) {
                return !1
            }
        }(),
        u = function (e, t, n, r) {
            (!(t in e) || l(r) && r()) && (c ? s(e, t, {
                configurable: !0,
                enumerable: !1,
                value: n,
                writable: !0
            }) : e[t] = n)
        },
        d = function (e, t) {
            var n = arguments.length > 2 ? arguments[2] : {},
                a = r(t);
            o && (a = i.call(a, Object.getOwnPropertySymbols(t)));
            for (var s = 0; s < a.length; s += 1)
                u(e, a[s], t[a[s]], n[a[s]])
        };
    d.supportsDescriptors = !!c,
        e.exports = d
}