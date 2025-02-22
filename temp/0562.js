function(e, t, n) {
    "use strict";
    var r = [];
    t.a = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r,
            t = arguments[1];
        switch (t.type) {
            case "WS_LAST_RESULTS":
                return t.data;
            default:
                return e
        }
    }
}