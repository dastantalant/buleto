 function (e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n,
            e
    }

    function o(e) {
        var t = e.application.get("languageId"),
            n = l.a[t];
        return {
            locale: n,
            messages: S[n]
        }
    }
    var a, i = n(6),
        s = n(3),
        l = n(588),
        c = n(589),
        u = n.n(c),
        d = n(590),
        p = n.n(d),
        h = n(591),
        f = n.n(h),
        m = n(592),
        g = n.n(m),
        y = n(593),
        v = n.n(y),
        b = n(594),
        _ = n.n(b),
        w = n(595),
        x = n.n(w),
        E = n(596),
        k = n.n(E),
        S = (a = {},
            r(a, "ru", v.a),
            r(a, "en", _.a),
            r(a, "zh", x.a),
            r(a, "uz", k.a),
            a);
    Object(s.d)(u.a),
        Object(s.d)(p.a),
        Object(s.d)(f.a),
        Object(s.d)(g.a),
        t.a = Object(i.b)(o)(s.c)
}