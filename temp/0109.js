function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
        return t.reduce(function(e, t) {
            return function() {
                return e(t.apply(void 0, arguments))
            }
        }, function(e) {
            return e
        })
    };
    t.default = r
}