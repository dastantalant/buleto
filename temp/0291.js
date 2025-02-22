function(e, t, n) {
    "use strict";
    n.d(t, "c", function() {
            return r
        }),
        n.d(t, "a", function() {
            return o
        }),
        n.d(t, "b", function() {
            return a
        });
    var r = function(e) {
            return Array.isArray(e) ? e[0] : e
        },
        o = function(e) {
            if ("function" === typeof e) {
                for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
                    n[r - 1] = arguments[r];
                return e.apply(void 0, n)
            }
        },
        a = function(e, t) {
            if ("function" === typeof e)
                return o(e, t);
            null != e && (e.current = t)
        }
}