function(e, t, n) {
    "use strict";

    function r() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : i,
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = t.type,
            r = t.payload;
        return n === a ? o({}, e, {
            location: r
        }) : e
    }
    n.d(t, "a", function() {
            return a
        }),
        t.b = r;
    var o = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        a = "@@router/LOCATION_CHANGE",
        i = {
            location: null
        }
}