function(e, t, n) {
    "use strict";

    function r(e) {
        return a.n.channel(e) ? "channel" : Array.isArray(e) ? String(e.map(function(e) {
            return String(e)
        })) : String(e)
    }

    function o(e, t) {
        function n(t, n) {
            if (l === s)
                return i;
            if (n)
                throw l = s,
                    n;
            o && o(t);
            var r = e[l](),
                a = r[0],
                c = r[1],
                u = r[2];
            return l = a,
                o = u,
                l === s ? i : c
        }
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "iterator",
            o = void 0,
            l = t;
        return Object(a.q)(n, function(e) {
            return n(null, e)
        }, r, !0)
    }
    n.d(t, "b", function() {
            return s
        }),
        t.c = r,
        t.a = o;
    var a = n(26),
        i = {
            done: !0,
            value: void 0
        },
        s = {}
}