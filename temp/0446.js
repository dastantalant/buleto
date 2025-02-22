function(e, t, n) {
    var r = n(5),
        o = n(125),
        a = n(13).f,
        i = n(60).f,
        s = n(94),
        l = n(79),
        c = r.RegExp,
        u = c,
        d = c.prototype,
        p = /a/g,
        h = /a/g,
        f = new c(p) !== p;
    if (n(12) && (!f || n(8)(function() {
            return h[n(10)("match")] = !1,
                c(p) != p || c(h) == h || "/a/i" != c(p, "i")
        }))) {
        c = function(e, t) {
            var n = this instanceof c,
                r = s(e),
                a = void 0 === t;
            return !n && r && e.constructor === c && a ? e : o(f ? new u(r && !a ? e.source : e, t) : u((r = e instanceof c) ? e.source : e, r && a ? l.call(e) : t), n ? this : d, c)
        };
        for (var m = i(u), g = 0; m.length > g;)
            ! function(e) {
                e in c || a(c, e, {
                    configurable: !0,
                    get: function() {
                        return u[e]
                    },
                    set: function(t) {
                        u[e] = t
                    }
                })
            }(m[g++]);
        d.constructor = c,
            c.prototype = d,
            n(23)(r, "RegExp", c)
    }
    n(61)("RegExp")
}