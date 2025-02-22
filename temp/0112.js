function(e, t, n) {
    "use strict";

    function r(e) {
        "undefined" !== typeof console && "function" === typeof console.error && console.error(e);
        try {
            throw new Error(e)
        } catch (e) {}
    }
    t.a = r
}