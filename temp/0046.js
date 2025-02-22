function(e, t, n) {
    var r = n(34),
        o = n(77),
        a = n(14),
        i = n(11),
        s = n(136);
    e.exports = function(e, t) {
        var n = 1 == e,
            l = 2 == e,
            c = 3 == e,
            u = 4 == e,
            d = 6 == e,
            p = 5 == e || d,
            h = t || s;
        return function(t, s, f) {
            for (var m, g, y = a(t), v = o(y), b = r(s, f, 3), _ = i(v.length), w = 0, x = n ? h(t, _) : l ? h(t, 0) : void 0; _ > w; w++)
                if ((p || w in v) && (m = v[w],
                        g = b(m, w, y),
                        e))
                    if (n)
                        x[w] = g;
                    else if (g)
                switch (e) {
                    case 3:
                        return !0;
                    case 5:
                        return m;
                    case 6:
                        return w;
                    case 2:
                        x.push(m)
                }
            else if (u)
                return !1;
            return d ? -1 : c || u ? u : x
        }
    }
}