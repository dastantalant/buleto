 function (e, t, n) {
    "use strict";

    function r(e, t, n, r) {
        return function (o, a) {
            return n(e(o, a), t(r, a), a)
        }
    }

    function o(e, t, n, r, o) {
        function a(o, a) {
            return u = o,
                d = a,
                p = e(u, d),
                h = t(r, d),
                f = n(p, h, d),
                v = !0,
                f
        }

        function i() {
            return p = e(u, d),
                t.dependsOnOwnProps && (h = t(r, d)),
                f = n(p, h, d)
        }

        function s() {
            return e.dependsOnOwnProps && (p = e(u, d)),
                t.dependsOnOwnProps && (h = t(r, d)),
                f = n(p, h, d)
        }

        function l() {
            var t = e(u, d),
                r = !y(t, p);
            return p = t,
                r && (f = n(p, h, d)),
                f
        }

        function c(e, t) {
            var n = !g(t, d),
                r = !m(e, u);
            return u = e,
                d = t,
                n && r ? i() : n ? s() : r ? l() : f
        }
        var u, d, p, h, f, m = o.areStatesEqual,
            g = o.areOwnPropsEqual,
            y = o.areStatePropsEqual,
            v = !1;
        return function (e, t) {
            return v ? c(e, t) : a(e, t)
        }
    }

    function a(e, t) {
        var n = t.initMapStateToProps,
            a = t.initMapDispatchToProps,
            s = t.initMergeProps,
            l = Object(i.a)(t, ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"]),
            c = n(e, l),
            u = a(e, l),
            d = s(e, l);
        return (l.pure ? o : r)(c, u, d, e, l)
    }
    t.a = a;
    var i = n(112);
    n(321)
}