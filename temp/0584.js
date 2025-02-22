function(e, t, n) {
    "use strict";

    function r(e) {
        return 400 * e / 146097
    }

    function o(e) {
        var t = new Date(e);
        return t.setHours(0, 0, 0, 0),
            t
    }

    function a(e, t) {
        var n = o(e),
            r = o(t),
            a = n.getTime() - n.getTimezoneOffset() * l,
            i = r.getTime() - r.getTimezoneOffset() * l;
        return Math.round((a - i) / c)
    }

    function i(e, t) {
        e = +e,
            t = +t;
        var n = s(t - e),
            o = s(n / 1e3),
            i = s(o / 60),
            l = s(i / 60),
            c = a(t, e),
            u = s(c / 7),
            d = r(c),
            p = s(12 * d),
            h = s(d);
        return {
            millisecond: n,
            second: o,
            "second-short": o,
            minute: i,
            "minute-short": i,
            hour: l,
            "hour-short": l,
            day: c,
            "day-short": c,
            week: u,
            "week-short": u,
            month: p,
            "month-short": p,
            year: h,
            "year-short": h
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = Math.round,
        l = 6e4,
        c = 864e5;
    t.default = i
}