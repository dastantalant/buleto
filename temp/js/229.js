 function (e, t, n) {
    "use strict";

    function r(e, t, n, c, u, d, p, h) {
        for (var f, m, g = u, y = 0, v = !!p && s(p, h, 3); y < c;) {
            if (y in n) {
                if (f = v ? v(n[y], y, t) : n[y],
                    m = !1,
                    a(f) && (m = f[l],
                        m = void 0 !== m ? !!m : o(f)),
                    m && d > 0)
                    g = r(e, t, f, i(f.length), g, d - 1) - 1;
                else {
                    if (g >= 9007199254740991)
                        throw TypeError();
                    e[g] = f
                }
                g++
            }
            y++
        }
        return g
    }
    var o = n(92),
        a = n(9),
        i = n(11),
        s = n(34),
        l = n(10)("isConcatSpreadable");
    e.exports = r
}