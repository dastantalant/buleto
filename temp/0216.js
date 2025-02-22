function(e, t, n) {
    var r = n(17),
        o = n(14),
        a = n(77),
        i = n(11);
    e.exports = function(e, t, n, s, l) {
        r(t);
        var c = o(e),
            u = a(c),
            d = i(c.length),
            p = l ? d - 1 : 0,
            h = l ? -1 : 1;
        if (n < 2)
            for (;;) {
                if (p in u) {
                    s = u[p],
                        p += h;
                    break
                }
                if (p += h,
                    l ? p < 0 : d <= p)
                    throw TypeError("Reduce of empty array with no initial value")
            }
        for (; l ? p >= 0 : d > p; p += h)
            p in u && (s = t(s, u[p], p, c));
        return s
    }
}