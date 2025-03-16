 function (e, t, n) {
    "use strict";
    var r = n(5),
        o = n(1),
        a = n(23),
        i = n(64),
        s = n(51),
        l = n(63),
        c = n(62),
        u = n(9),
        d = n(8),
        p = n(95),
        h = n(68),
        f = n(125);
    e.exports = function (e, t, n, m, g, y) {
        var v = r[e],
            b = v,
            _ = g ? "set" : "add",
            w = b && b.prototype,
            x = {},
            E = function (e) {
                var t = w[e];
                a(w, e, "delete" == e ? function (e) {
                    return !(y && !u(e)) && t.call(this, 0 === e ? 0 : e)
                } :
                    "has" == e ? function (e) {
                        return !(y && !u(e)) && t.call(this, 0 === e ? 0 : e)
                    } :
                        "get" == e ? function (e) {
                            return y && !u(e) ? void 0 : t.call(this, 0 === e ? 0 : e)
                        } :
                            "add" == e ? function (e) {
                                return t.call(this, 0 === e ? 0 : e),
                                    this
                            } :
                                function (e, n) {
                                    return t.call(this, 0 === e ? 0 : e, n),
                                        this
                                }
                )
            };
        if ("function" == typeof b && (y || w.forEach && !d(function () {
            (new b).entries().next()
        }))) {
            var k = new b,
                S = k[_](y ? {} : -0, 1) != k,
                O = d(function () {
                    k.has(1)
                }),
                C = p(function (e) {
                    new b(e)
                }),
                T = !y && d(function () {
                    for (var e = new b, t = 5; t--;)
                        e[_](t, t);
                    return !e.has(-0)
                });
            C || (b = t(function (t, n) {
                c(t, b, e);
                var r = f(new v, t, b);
                return void 0 != n && l(n, g, r[_], r),
                    r
            }),
                b.prototype = w,
                w.constructor = b),
                (O || T) && (E("delete"),
                    E("has"),
                    g && E("get")),
                (T || S) && E(_),
                y && w.clear && delete w.clear
        } else
            b = m.getConstructor(t, e, g, _),
                i(b.prototype, n),
                s.NEED = !0;
        return h(b, e),
            x[e] = b,
            o(o.G + o.W + o.F * (b != v), x),
            y || m.setStrong(b, e, g),
            b
    }
}