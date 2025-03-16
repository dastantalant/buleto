 function (e, t, n) {
    var r = n(1),
        o = n(43),
        a = n(8),
        i = n(124),
        s = "[" + i + "]",
        l = "\u200b\x85",
        c = RegExp("^" + s + s + "*"),
        u = RegExp(s + s + "*$"),
        d = function (e, t, n) {
            var o = {},
                s = a(function () {
                    return !!i[e]() || l[e]() != l
                }),
                c = o[e] = s ? t(p) : i[e];
            n && (o[n] = c),
                r(r.P + r.F * s, "String", o)
        },
        p = d.trim = function (e, t) {
            return e = String(o(e)),
                1 & t && (e = e.replace(c, "")),
                2 & t && (e = e.replace(u, "")),
                e
        };
    e.exports = d
}