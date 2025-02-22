function(e, t, n) {
    var r = n(13),
        o = n(1),
        a = n(4),
        i = n(42);
    o(o.S + o.F * n(8)(function() {
        Reflect.defineProperty(r.f({}, 1, {
            value: 1
        }), 1, {
            value: 2
        })
    }), "Reflect", {
        defineProperty: function(e, t, n) {
            a(e),
                t = i(t, !0),
                a(n);
            try {
                return r.f(e, t, n), !0
            } catch (e) {
                return !1
            }
        }
    })
}