function(e, t, n) {
    "use strict";
    var r = n(67),
        o = [];
    t.a = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : o,
            t = arguments[1];
        switch (t.type) {
            case r.i:
            case r.h:
                return t.data.pairs ? t.data.pairs : e;
            case r.g:
                return o;
            default:
                return e
        }
    }
}