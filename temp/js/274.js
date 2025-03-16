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
                type: a.b
            }, i.a, {
                endpoint: "/api/traderoom/tradologic",
                method: "get",
                types: [a.c, a.a],
                data: e
            }))
        }
    }
    t.a = o;
    var a = n(238),
        i = n(16)
}