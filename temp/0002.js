function(e, t, n) {
    var r = n(5),
        o = n(33),
        a = n(22),
        i = n(23),
        s = n(34),
        l = function(e, t, n) {
            var c, u, d, p, h = e & l.F,
                f = e & l.G,
                m = e & l.S,
                g = e & l.P,
                y = e & l.B,
                v = f ? r : m ? r[t] || (r[t] = {}) : (r[t] || {}).prototype,
                b = f ? o : o[t] || (o[t] = {}),
                _ = b.prototype || (b.prototype = {});
            f && (n = t);
            for (c in n)
                u = !h && v && void 0 !== v[c],
                d = (u ? v : n)[c],
                p = y && u ? s(d, r) : g && "function" == typeof d ? s(Function.call, d) : d,
                v && i(v, c, d, e & l.U),
                b[c] != d && a(b, c, p),
                g && _[c] != d && (_[c] = d)
        };
    r.core = o,
        l.F = 1,
        l.G = 2,
        l.S = 4,
        l.P = 8,
        l.B = 16,
        l.W = 32,
        l.U = 64,
        l.R = 128,
        e.exports = l
}