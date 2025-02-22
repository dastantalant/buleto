function(e, t, n) {
    var r = n(11),
        o = n(126),
        a = n(43);
    e.exports = function(e, t, n, i) {
        var s = String(a(e)),
            l = s.length,
            c = void 0 === n ? " " : String(n),
            u = r(t);
        if (u <= l || "" == c)
            return s;
        var d = u - l,
            p = o.call(c, Math.ceil(d / c.length));
        return p.length > d && (p = p.slice(0, d)),
            i ? p + s : s + p
    }
}