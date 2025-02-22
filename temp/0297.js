function(e, t, n) {
    "use strict";

    function r() {
        c = !1,
            s._47 = null,
            s._71 = null
    }

    function o(e) {
        function t(t) {
            (e.allRejections || i(d[t].error, e.whitelist || l)) && (d[t].displayId = u++,
                e.onUnhandled ? (d[t].logged = !0,
                    e.onUnhandled(d[t].displayId, d[t].error)) : (d[t].logged = !0,
                    a(d[t].displayId, d[t].error)))
        }

        function n(t) {
            d[t].logged && (e.onHandled ? e.onHandled(d[t].displayId, d[t].error) : d[t].onUnhandled || (console.warn("Promise Rejection Handled (id: " + d[t].displayId + "):"),
                console.warn('  This means you can ignore any previous messages of the form "Possible Unhandled Promise Rejection" with id ' + d[t].displayId + ".")))
        }
        e = e || {},
            c && r(),
            c = !0;
        var o = 0,
            u = 0,
            d = {};
        s._47 = function(e) {
                2 === e._83 && d[e._56] && (d[e._56].logged ? n(e._56) : clearTimeout(d[e._56].timeout),
                    delete d[e._56])
            },
            s._71 = function(e, n) {
                0 === e._75 && (e._56 = o++,
                    d[e._56] = {
                        displayId: null,
                        error: n,
                        timeout: setTimeout(t.bind(null, e._56), i(n, l) ? 100 : 2e3),
                        logged: !1
                    })
            }
    }

    function a(e, t) {
        console.warn("Possible Unhandled Promise Rejection (id: " + e + "):"),
            ((t && (t.stack || t)) + "").split("\n").forEach(function(e) {
                console.warn("  " + e)
            })
    }

    function i(e, t) {
        return t.some(function(t) {
            return e instanceof t
        })
    }
    var s = n(173),
        l = [ReferenceError, TypeError, RangeError],
        c = !1;
    t.disable = r,
        t.enable = o
}