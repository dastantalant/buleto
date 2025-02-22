function(e, t, n) {
    var r = n(56)("meta"),
        o = n(9),
        a = n(27),
        i = n(13).f,
        s = 0,
        l = Object.isExtensible || function() {
            return !0
        },
        c = !n(8)(function() {
            return l(Object.preventExtensions({}))
        }),
        u = function(e) {
            i(e, r, {
                value: {
                    i: "O" + ++s,
                    w: {}
                }
            })
        },
        d = function(e, t) {
            if (!o(e))
                return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
            if (!a(e, r)) {
                if (!l(e))
                    return "F";
                if (!t)
                    return "E";
                u(e)
            }
            return e[r].i
        },
        p = function(e, t) {
            if (!a(e, r)) {
                if (!l(e))
                    return !0;
                if (!t)
                    return !1;
                u(e)
            }
            return e[r].w
        },
        h = function(e) {
            return c && f.NEED && l(e) && !a(e, r) && u(e),
                e
        },
        f = e.exports = {
            KEY: r,
            NEED: !1,
            fastKey: d,
            getWeak: p,
            onFreeze: h
        }
}