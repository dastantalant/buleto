function(e, t, n) {
    "use strict";
    var r = n(5),
        o = n(27),
        a = n(35),
        i = n(125),
        s = n(42),
        l = n(8),
        c = n(60).f,
        u = n(29).f,
        d = n(13).f,
        p = n(70).trim,
        h = r.Number,
        f = h,
        m = h.prototype,
        g = "Number" == a(n(59)(m)),
        y = "trim" in String.prototype,
        v = function(e) {
            var t = s(e, !1);
            if ("string" == typeof t && t.length > 2) {
                t = y ? t.trim() : p(t, 3);
                var n, r, o, a = t.charCodeAt(0);
                if (43 === a || 45 === a) {
                    if (88 === (n = t.charCodeAt(2)) || 120 === n)
                        return NaN
                } else if (48 === a) {
                    switch (t.charCodeAt(1)) {
                        case 66:
                        case 98:
                            r = 2,
                                o = 49;
                            break;
                        case 79:
                        case 111:
                            r = 8,
                                o = 55;
                            break;
                        default:
                            return +t
                    }
                    for (var i, l = t.slice(2), c = 0, u = l.length; c < u; c++)
                        if ((i = l.charCodeAt(c)) < 48 || i > o)
                            return NaN;
                    return parseInt(l, r)
                }
            }
            return +t
        };
    if (!h(" 0o1") || !h("0b1") || h("+0x1")) {
        h = function(e) {
            var t = arguments.length < 1 ? 0 : e,
                n = this;
            return n instanceof h && (g ? l(function() {
                m.valueOf.call(n)
            }) : "Number" != a(n)) ? i(new f(v(t)), n, h) : v(t)
        };
        for (var b, _ = n(12) ? c(f) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), w = 0; _.length > w; w++)
            o(f, b = _[w]) && !o(h, b) && d(h, b, u(f, b));
        h.prototype = m,
            m.constructor = h,
            n(23)(r, "Number", h)
    }
}