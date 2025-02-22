function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        for (var r = t.length - 1; r >= 0; r--) {
            var o = t[r](e);
            if (o)
                return o
        }
        return function(t, r) {
            throw new Error("Invalid value of type " + typeof e + " for " + n + " argument when connecting component " + r.wrappedComponentName + ".")
        }
    }

    function o(e, t) {
        return e === t
    }
    var a = n(84),
        i = n(112),
        s = n(176),
        l = n(312),
        c = n(313),
        u = n(318),
        d = n(319),
        p = n(320);
    t.a = function(e) {
        var t = void 0 === e ? {} : e,
            n = t.connectHOC,
            h = void 0 === n ? s.a : n,
            f = t.mapStateToPropsFactories,
            m = void 0 === f ? u.a : f,
            g = t.mapDispatchToPropsFactories,
            y = void 0 === g ? c.a : g,
            v = t.mergePropsFactories,
            b = void 0 === v ? d.a : v,
            _ = t.selectorFactory,
            w = void 0 === _ ? p.a : _;
        return function(e, t, n, s) {
            void 0 === s && (s = {});
            var c = s,
                u = c.pure,
                d = void 0 === u || u,
                p = c.areStatesEqual,
                f = void 0 === p ? o : p,
                g = c.areOwnPropsEqual,
                v = void 0 === g ? l.a : g,
                _ = c.areStatePropsEqual,
                x = void 0 === _ ? l.a : _,
                E = c.areMergedPropsEqual,
                k = void 0 === E ? l.a : E,
                S = Object(i.a)(c, ["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"]),
                O = r(e, m, "mapStateToProps"),
                C = r(t, y, "mapDispatchToProps"),
                T = r(n, b, "mergeProps");
            return h(w, Object(a.a)({
                methodName: "connect",
                getDisplayName: function(e) {
                    return "Connect(" + e + ")"
                },
                shouldHandleStateChanges: Boolean(e),
                initMapStateToProps: O,
                initMapDispatchToProps: C,
                initMergeProps: T,
                pure: d,
                areStatesEqual: f,
                areOwnPropsEqual: v,
                areStatePropsEqual: x,
                areMergedPropsEqual: k
            }, S))
        }
    }()
}