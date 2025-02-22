function(e, t, n) {
    var r = n(27),
        o = n(28),
        a = n(90)(!1),
        i = n(120)("IE_PROTO");
    e.exports = function(e, t) {
        var n, s = o(e),
            l = 0,
            c = [];
        for (n in s)
            n != i && r(s, n) && c.push(n);
        for (; t.length > l;)
            r(s, n = t[l++]) && (~a(c, n) || c.push(n));
        return c
    }
}