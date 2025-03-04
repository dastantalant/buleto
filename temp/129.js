 function (e, t, n) {
    "use strict";
    var r = n(50),
        o = n(1),
        a = n(23),
        i = n(22),
        s = n(71),
        l = n(130),
        c = n(68),
        u = n(30),
        d = n(10)("iterator"),
        p = !([].keys && "next" in [].keys()),
        h = function () {
            return this
        };
    e.exports = function (e, t, n, f, m, g, y) {
        l(n, t, f);
        var v, b, _, w = function (e) {
            if (!p && e in S)
                return S[e];
            switch (e) {
                case "keys":
                case "values":
                    return function () {
                        return new n(this, e)
                    }
            }
            return function () {
                return new n(this, e)
            }
        },
            x = t + " Iterator",
            E = "values" == m,
            k = !1,
            S = e.prototype,
            O = S[d] || S["@@iterator"] || m && S[m],
            C = O || w(m),
            T = m ? E ? w("entries") : C : void 0,
            M = "Array" == t ? S.entries || O : O;
        if (M && (_ = u(M.call(new e))) !== Object.prototype && _.next && (c(_, x, !0),
            r || "function" == typeof _[d] || i(_, d, h)),
            E && O && "values" !== O.name && (k = !0,
                C = function () {
                    return O.call(this)
                }
            ),
            r && !y || !p && !k && S[d] || i(S, d, C),
            s[t] = C,
            s[x] = h,
            m)
            if (v = {
                values: E ? C : w("values"),
                keys: g ? C : w("keys"),
                entries: T
            },
                y)
                for (b in v)
                    b in S || a(S, b, v[b]);
            else
                o(o.P + o.F * (p || k), t, v);
        return v
    }
}