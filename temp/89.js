 function (e, t, n) {
    "use strict";
    var r = n(190),
        o = n.n(r),
        a = {},
        i = 0,
        s = function (e, t) {
            var n = "" + t.end + t.strict + t.sensitive,
                r = a[n] || (a[n] = {});
            if (r[e])
                return r[e];
            var s = [],
                l = o()(e, s, t),
                c = {
                    re: l,
                    keys: s
                };
            return i < 1e4 && (r[e] = c,
                i++),
                c
        },
        l = function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = arguments[2];
            "string" === typeof t && (t = {
                path: t
            });
            var r = t,
                o = r.path,
                a = r.exact,
                i = void 0 !== a && a,
                l = r.strict,
                c = void 0 !== l && l,
                u = r.sensitive,
                d = void 0 !== u && u;
            if (null == o)
                return n;
            var p = s(o, {
                end: i,
                strict: c,
                sensitive: d
            }),
                h = p.re,
                f = p.keys,
                m = h.exec(e);
            if (!m)
                return null;
            var g = m[0],
                y = m.slice(1),
                v = e === g;
            return i && !v ? null : {
                path: o,
                url: "/" === o && "" === g ? "/" : g,
                isExact: v,
                params: f.reduce(function (e, t, n) {
                    return e[t.name] = y[n],
                        e
                }, {})
            }
        };
    t.a = l
}