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
        return function(e) {
            return e(r({
                type: l.d
            }, c.a, {
                endpoint: "/api/profile",
                method: "get",
                types: [l.f, l.a]
            }))
        }
    }

    function a(e) {
        return function(t) {
            return t(r({
                type: l.j
            }, c.a, {
                endpoint: "/api/profile",
                method: "PATCH",
                types: [l.h, l.c],
                data: e
            }))
        }
    }

    function i(e) {
        return function(t) {
            return t(r({
                type: l.i
            }, c.a, {
                endpoint: "/api/profile/pwd",
                method: "post",
                types: [l.g, l.b],
                data: e
            }))
        }
    }

    function s() {
        return {
            type: l.e
        }
    }
    t.a = o,
        t.d = a,
        t.c = i,
        t.b = s;
    var l = n(240),
        c = n(16)
}