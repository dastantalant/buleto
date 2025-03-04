 function (e, t, n) {
    "use strict";

    function r(e) {
        return function (t) {
            var n = t.dispatch,
                r = t.getState;
            return function (t) {
                return function (o) {
                    return "function" === typeof o ? o(n, r, e) : t(o)
                }
            }
        }
    }
    var o = r();
    o.withExtraArgument = r,
        t.a = o
}