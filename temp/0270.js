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

    function o() {
        return {
            type: s.b
        }
    }

    function a(e) {
        return function(t) {
            var n;
            return t((n = {
                    type: s.e
                },
                r(n, l.a, {
                    endpoint: "/crypto",
                    method: "POST",
                    types: [s.g, s.d],
                    data: e
                }),
                r(n, "extra", e),
                n))
        }
    }

    function i(e) {
        return function(t) {
            return t(r({
                type: s.a
            }, l.a, {
                endpoint: "/crypto/" + e,
                method: "GET",
                types: [s.f, s.c]
            }))
        }
    }
    t.b = o,
        t.c = a,
        t.a = i;
    var s = n(237),
        l = n(16)
}