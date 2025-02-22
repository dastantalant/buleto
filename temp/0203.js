function(e, t, n) {
    var r = n(13),
        o = n(4),
        a = n(57);
    e.exports = n(12) ? Object.defineProperties : function(e, t) {
        o(e);
        for (var n, i = a(t), s = i.length, l = 0; s > l;)
            r.f(e, n = i[l++], t[n]);
        return e
    }
}