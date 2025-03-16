 function (e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n,
            e
    }

    function o() {
        return function (e) {
            return e(r({
                type: a.b
            }, i.a, {
                endpoint: "/get-country",
                method: "get",
                types: [a.c, a.a]
            }))
        }
    }
    t.a = o;
    var a = n(235),
        i = n(16)
}