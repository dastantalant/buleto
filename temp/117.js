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
                type: i.e
            }, s.a, {
                endpoint: "/api/balance",
                method: "get",
                types: [i.h, i.c]
            }))
        }
    }

    function a() {
        return function (e) {
            return e(r({
                type: i.f
            }, s.a, {
                endpoint: "/api/balance/trading",
                method: "get",
                types: [i.i, i.d]
            }))
        }
    }
    t.a = o,
        t.b = a;
    var i = n(196),
        s = n(16)
}