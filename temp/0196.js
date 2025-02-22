function(e, t, n) {
    "use strict";

    function r(e) {
        return function() {
            for (var t = arguments.length, n = Array(t), r = 0; r < t; r++)
                n[r] = arguments[r];
            return {
                type: o,
                payload: {
                    method: e,
                    args: n
                }
            }
        }
    }
    n.d(t, "a", function() {
            return o
        }),
        n.d(t, "b", function() {
            return a
        });
    var o = "@@router/CALL_HISTORY_METHOD",
        a = r("push");
    r("replace"),
        r("go"),
        r("goBack"),
        r("goForward")
}