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

    function o(e) {
        return function (t) {
            return t(r({
                type: s.d
            }, l.a, {
                endpoint: "/api/traderoom/tradologic/deposit",
                method: "post",
                types: [s.f, s.a],
                data: e
            }))
        }
    }

    function a(e) {
        return function (t) {
            return t(r({
                type: s.e
            }, l.a, {
                endpoint: "/api/traderoom/tradologic/withdrawal",
                method: "post",
                types: [s.g, s.b],
                data: e
            }))
        }
    }

    function i() {
        return {
            type: s.c
        }
    }
    t.b = o,
        t.c = a,
        t.a = i;
    var s = n(145),
        l = n(16)
}