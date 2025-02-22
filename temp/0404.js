function(e, t, n) {
    "use strict";
    var r = n(1),
        o = n(11),
        a = n(131),
        i = "".startsWith;
    r(r.P + r.F * n(132)("startsWith"), "String", {
        startsWith: function(e) {
            var t = a(this, e, "startsWith"),
                n = o(Math.min(arguments.length > 1 ? arguments[1] : void 0, t.length)),
                r = String(e);
            return i ? i.call(t, r, n) : t.slice(n, n + r.length) === r
        }
    })
}