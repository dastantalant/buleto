 function (e, t, n) {
    "use strict";
    var r = n(1);
    e.exports = function (e) {
        r(r.S, e, {
            of: function () {
                for (var e = arguments.length, t = new Array(e); e--;)
                    t[e] = arguments[e];
                return new this(t)
            }
        })
    }
}