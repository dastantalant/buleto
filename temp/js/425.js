 function (e, t, n) {
    "use strict";
    var r = n(34),
        o = n(1),
        a = n(14),
        i = n(214),
        s = n(133),
        l = n(11),
        c = n(134),
        u = n(135);
    o(o.S + o.F * !n(95)(function (e) {
        Array.from(e)
    }), "Array", {
        from: function (e) {
            var t, n, o, d, p = a(e),
                h = "function" == typeof this ? this : Array,
                f = arguments.length,
                m = f > 1 ? arguments[1] : void 0,
                g = void 0 !== m,
                y = 0,
                v = u(p);
            if (g && (m = r(m, f > 2 ? arguments[2] : void 0, 2)),
                void 0 == v || h == Array && s(v))
                for (t = l(p.length),
                    n = new h(t); t > y; y++)
                    c(n, y, g ? m(p[y], y) : p[y]);
            else
                for (d = v.call(p),
                    n = new h; !(o = d.next()).done; y++)
                    c(n, y, g ? i(d, m, [o.value, y], !0) : o.value);
            return n.length = y,
                n
        }
    })
}