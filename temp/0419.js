function(e, t, n) {
    "use strict";
    var r = n(1),
        o = n(14),
        a = n(42);
    r(r.P + r.F * n(8)(function() {
        return null !== new Date(NaN).toJSON() || 1 !== Date.prototype.toJSON.call({
            toISOString: function() {
                return 1
            }
        })
    }), "Date", {
        toJSON: function(e) {
            var t = o(this),
                n = a(t);
            return "number" != typeof n || isFinite(n) ? t.toISOString() : null
        }
    })
}