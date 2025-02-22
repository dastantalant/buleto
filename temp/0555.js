function(e, t, n) {
    "use strict";
    var r = n(555);
    t.a = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0,
            t = arguments[1];
        switch (t.type) {
            case r.b:
            case r.a:
                return t.data;
            default:
                return e
        }
    }
}