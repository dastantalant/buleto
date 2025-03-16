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
                type: l.d
            }, c.a, {
                endpoint: "/api/auth?login=" + e.login + "&password=" + e.password,
                method: "get",
                types: [l.h, l.a]
            }))
        }
    }

    function a(e) {
        return function (t) {
            return t(r({
                type: l.f
            }, c.a, {
                endpoint: "/api/auth/refresh",
                method: "get",
                types: [l.j, l.c],
                data: e
            }))
        }
    }

    function i() {
        return function (e) {
            return e(Object(u.b)()),
                e(r({
                    type: l.e
                }, c.a, {
                    endpoint: "/api/reauth",
                    method: "get",
                    types: [l.i, l.b]
                }))
        }
    }

    function s() {
        return {
            type: l.g
        }
    }
    t.a = o,
        t.d = a,
        t.c = i,
        t.b = s;
    var l = n(67),
        c = n(16),
        u = n(117)
}