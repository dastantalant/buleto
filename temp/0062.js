function(e, t, n) {
    "use strict";
    var r = n(5),
        o = n(13),
        a = n(12),
        i = n(10)("species");
    e.exports = function(e) {
        var t = r[e];
        a && t && !t[i] && o.f(t, i, {
            configurable: !0,
            get: function() {
                return this
            }
        })
    }
}