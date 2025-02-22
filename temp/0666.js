function(e, t, n) {
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
        return function(t) {
            return t(r({
                type: i.b
            }, s.a, {
                endpoint: "/api/join/",
                method: "PUT",
                types: [i.d, i.a],
                data: e
            }))
        }
    }

    function a() {
        return {
            type: i.c
        }
    }
    t.b = o,
        t.a = a;
    var i = n(236),
        s = n(16)
}