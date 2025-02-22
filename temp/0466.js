function(e, t, n) {
    var r = n(1),
        o = n(59),
        a = n(17),
        i = n(4),
        s = n(9),
        l = n(8),
        c = n(206),
        u = (n(5).Reflect || {}).construct,
        d = l(function() {
            function e() {}
            return !(u(function() {}, [], e) instanceof e)
        }),
        p = !l(function() {
            u(function() {})
        });
    r(r.S + r.F * (d || p), "Reflect", {
        construct: function(e, t) {
            a(e),
                i(t);
            var n = arguments.length < 3 ? e : a(arguments[2]);
            if (p && !d)
                return u(e, t, n);
            if (e == n) {
                switch (t.length) {
                    case 0:
                        return new e;
                    case 1:
                        return new e(t[0]);
                    case 2:
                        return new e(t[0], t[1]);
                    case 3:
                        return new e(t[0], t[1], t[2]);
                    case 4:
                        return new e(t[0], t[1], t[2], t[3])
                }
                var r = [null];
                return r.push.apply(r, t),
                    new(c.apply(e, r))
            }
            var l = n.prototype,
                h = o(s(l) ? l : Object.prototype),
                f = Function.apply.call(e, h, t);
            return s(f) ? f : h
        }
    })
}