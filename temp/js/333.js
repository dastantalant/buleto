 function (e, t, n) {
    "use strict";

    function r(e, t) {
        if (!e) {
            if (o)
                throw new Error(a);
            throw new Error(a + ": " + (t || ""))
        }
    }
    var o = !0,
        a = "Invariant failed";
    t.a = r
}