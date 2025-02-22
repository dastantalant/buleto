function(e, t, n) {
    "use strict";
    var r = n(1),
        o = n(33),
        a = n(5),
        i = n(80),
        s = n(221);
    r(r.P + r.R, "Promise", {
        finally: function(e) {
            var t = i(this, o.Promise || a.Promise),
                n = "function" == typeof e;
            return this.then(n ? function(n) {
                    return s(t, e()).then(function() {
                        return n
                    })
                } :
                e, n ? function(n) {
                    return s(t, e()).then(function() {
                        throw n
                    })
                } :
                e)
        }
    })
}