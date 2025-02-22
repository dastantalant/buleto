function(e, t, n) {
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
        return function(t) {
            return t(r({
                type: s.d
            }, l.a, {
                endpoint: "/api/reporting/operations?datefrom=" + e.dateFrom + "&dateto=" + e.dateTo,
                method: "GET",
                types: [s.g, s.b]
            }))
        }
    }

    function a(e) {
        return function(t) {
            return t(r({
                type: s.c
            }, l.a, {
                endpoint: "/api/reporting/contracts?datefrom=" + e.dateFrom + "&dateto=" + e.dateTo,
                method: "GET",
                types: [s.f, s.a]
            }))
        }
    }

    function i() {
        return {
            type: s.e
        }
    }
    t.c = o,
        t.a = a,
        t.b = i;
    var s = n(151),
        l = n(16)
}