function(e, t, n) {
    "use strict";
    var r = n(1),
        o = n(43),
        a = n(11),
        i = n(94),
        s = n(79),
        l = RegExp.prototype,
        c = function(e, t) {
            this._r = e,
                this._s = t
        };
    n(130)(c, "RegExp String", function() {
            var e = this._r.exec(this._s);
            return {
                value: e,
                done: null === e
            }
        }),
        r(r.P, "String", {
            matchAll: function(e) {
                if (o(this), !i(e))
                    throw TypeError(e + " is not a regexp!");
                var t = String(this),
                    n = "flags" in l ? String(e.flags) : s.call(e),
                    r = new RegExp(e.source, ~n.indexOf("g") ? n : "g" + n);
                return r.lastIndex = a(e.lastIndex),
                    new c(r, t)
            }
        })
}