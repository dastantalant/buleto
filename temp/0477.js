function(e, t, n) {
    function r(e, t, n) {
        var l, p, h = arguments.length < 4 ? e : arguments[3],
            f = a.f(u(e), t);
        if (!f) {
            if (d(p = i(e)))
                return r(p, t, n, h);
            f = c(0)
        }
        if (s(f, "value")) {
            if (!1 === f.writable || !d(h))
                return !1;
            if (l = a.f(h, t)) {
                if (l.get || l.set || !1 === l.writable)
                    return !1;
                l.value = n,
                    o.f(h, t, l)
            } else
                o.f(h, t, c(0, n));
            return !0
        }
        return void 0 !== f.set && (f.set.call(h, n), !0)
    }
    var o = n(13),
        a = n(29),
        i = n(30),
        s = n(27),
        l = n(1),
        c = n(55),
        u = n(4),
        d = n(9);
    l(l.S, "Reflect", {
        set: r
    })
}