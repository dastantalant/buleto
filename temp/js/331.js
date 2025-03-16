 function (e, t, n) {
    "use strict";

    function r(e) {
        return e.valueOf ? e.valueOf() : Object.prototype.valueOf.call(e)
    }

    function o(e, t) {
        if (e === t)
            return !0;
        if (null == e || null == t)
            return !1;
        if (Array.isArray(e))
            return Array.isArray(t) && e.length === t.length && e.every(function (e, n) {
                return o(e, t[n])
            });
        if ("object" === typeof e || "object" === typeof t) {
            var n = r(e),
                a = r(t);
            return n !== e || a !== t ? o(n, a) : Object.keys(Object.assign({}, e, t)).every(function (n) {
                return o(e[n], t[n])
            })
        }
        return !1
    }
    t.a = o
}