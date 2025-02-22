function(e, t, n) {
    "use strict";

    function r(e, t) {
        return t.length > 0 && t.length === e.length ? e : t
    }
    t.a = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
            t = arguments[1];
        switch (t.type) {
            case "WS_FACTORS":
                return r(e, t.data);
            default:
                return e
        }
    }
}