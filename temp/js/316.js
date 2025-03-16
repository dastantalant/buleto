 function (e, t, n) {
    "use strict";

    function r(e) {
        var t, n = e.Symbol;
        return "function" === typeof n ? n.observable ? t = n.observable : (t = n("observable"),
            n.observable = t) : t = "@@observable",
            t
    }
    t.a = r
}