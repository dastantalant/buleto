 function (e, t, n) {
    "use strict";
    var r = n(1),
        o = n(36),
        a = n(210),
        i = n(126),
        s = 1..toFixed,
        l = Math.floor,
        c = [0, 0, 0, 0, 0, 0],
        u = "Number.toFixed: incorrect invocation!",
        d = function (e, t) {
            for (var n = -1, r = t; ++n < 6;)
                r += e * c[n],
                    c[n] = r % 1e7,
                    r = l(r / 1e7)
        },
        p = function (e) {
            for (var t = 6, n = 0; --t >= 0;)
                n += c[t],
                    c[t] = l(n / e),
                    n = n % e * 1e7
        },
        h = function () {
            for (var e = 6, t = ""; --e >= 0;)
                if ("" !== t || 0 === e || 0 !== c[e]) {
                    var n = String(c[e]);
                    t = "" === t ? n : t + i.call("0", 7 - n.length) + n
                }
            return t
        },
        f = function (e, t, n) {
            return 0 === t ? n : t % 2 === 1 ? f(e, t - 1, n * e) : f(e * e, t / 2, n)
        },
        m = function (e) {
            for (var t = 0, n = e; n >= 4096;)
                t += 12,
                    n /= 4096;
            for (; n >= 2;)
                t += 1,
                    n /= 2;
            return t
        };
    r(r.P + r.F * (!!s && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== (0xde0b6b3a7640080).toFixed(0)) || !n(8)(function () {
        s.call({})
    })), "Number", {
        toFixed: function (e) {
            var t, n, r, s, l = a(this, u),
                c = o(e),
                g = "",
                y = "0";
            if (c < 0 || c > 20)
                throw RangeError(u);
            if (l != l)
                return "NaN";
            if (l <= -1e21 || l >= 1e21)
                return String(l);
            if (l < 0 && (g = "-",
                l = -l),
                l > 1e-21)
                if (t = m(l * f(2, 69, 1)) - 69,
                    n = t < 0 ? l * f(2, -t, 1) : l / f(2, t, 1),
                    n *= 4503599627370496,
                    (t = 52 - t) > 0) {
                    for (d(0, n),
                        r = c; r >= 7;)
                        d(1e7, 0),
                            r -= 7;
                    for (d(f(10, r, 1), 0),
                        r = t - 1; r >= 23;)
                        p(1 << 23),
                            r -= 23;
                    p(1 << r),
                        d(1, 1),
                        p(2),
                        y = h()
                } else
                    d(0, n),
                        d(1 << -t, 0),
                        y = h() + i.call("0", c);
            return c > 0 ? (s = y.length,
                y = g + (s <= c ? "0." + i.call("0", c - s) + y : y.slice(0, s - c) + "." + y.slice(s - c))) : y = g + y,
                y
        }
    })
}