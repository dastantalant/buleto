function(e, t, n) {
    "use strict";
    var r = n(12),
        o = n(57),
        a = n(91),
        i = n(78),
        s = n(14),
        l = n(77),
        c = Object.assign;
    e.exports = !c || n(8)(function() {
            var e = {},
                t = {},
                n = Symbol(),
                r = "abcdefghijklmnopqrst";
            return e[n] = 7,
                r.split("").forEach(function(e) {
                    t[e] = e
                }),
                7 != c({}, e)[n] || Object.keys(c({}, t)).join("") != r
        }) ? function(e, t) {
            for (var n = s(e), c = arguments.length, u = 1, d = a.f, p = i.f; c > u;)
                for (var h, f = l(arguments[u++]), m = d ? o(f).concat(d(f)) : o(f), g = m.length, y = 0; g > y;)
                    h = m[y++],
                    r && !p.call(f, h) || (n[h] = f[h]);
            return n
        } :
        c
}