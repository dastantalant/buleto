 function (e, t, n) {
    "use strict";
    var r = n(1),
        o = n(143),
        a = n(220);
    r(r.S, "Promise", {
        try: function (e) {
            var t = o.f(this),
                n = a(e);
            return (n.e ? t.reject : t.resolve)(n.v),
                t.promise
        }
    })
}