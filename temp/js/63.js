 function (e, t, n) {
    var r = n(34),
        o = n(214),
        a = n(133),
        i = n(4),
        s = n(11),
        l = n(135),
        c = {},
        u = {},
        t = e.exports = function (e, t, n, d, p) {
            var h, f, m, g, y = p ? function () {
                return e
            } :
                l(e),
                v = r(n, d, t ? 2 : 1),
                b = 0;
            if ("function" != typeof y)
                throw TypeError(e + " is not iterable!");
            if (a(y)) {
                for (h = s(e.length); h > b; b++)
                    if ((g = t ? v(i(f = e[b])[0], f[1]) : v(e[b])) === c || g === u)
                        return g
            } else
                for (m = y.call(e); !(f = m.next()).done;)
                    if ((g = o(m, v, f.value, t)) === c || g === u)
                        return g
        };
    t.BREAK = c,
        t.RETURN = u
}