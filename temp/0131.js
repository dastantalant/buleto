function(e, t, n) {
    "use strict";
    var r = n(59),
        o = n(55),
        a = n(68),
        i = {};
    n(22)(i, n(10)("iterator"), function() {
            return this
        }),
        e.exports = function(e, t, n) {
            e.prototype = r(i, {
                    next: o(1, n)
                }),
                a(e, t + " Iterator")
        }
}