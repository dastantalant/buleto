function(e, t, n) {
    "use strict";
    var r = n(1),
        o = n(11),
        a = n(131),
        i = "".endsWith;
    r(r.P + r.F * n(132)("endsWith"), "String", {
        endsWith: function(e) {
            var t = a(this, e, "endsWith"),
                n = arguments.length > 1 ? arguments[1] : void 0,
                r = o(t.length),
                s = void 0 === n ? r : Math.min(o(n), r),
                l = String(e);
            return i ? i.call(t, l, s) : t.slice(s - l.length, s) === l
        }
    })
}