 function (e, t, n) {
    "use strict";
    var r = n(1),
        o = n(4),
        a = function (e) {
            this._t = o(e),
                this._i = 0;
            var t, n = this._k = [];
            for (t in e)
                n.push(t)
        };
    n(130)(a, "Object", function () {
        var e, t = this,
            n = t._k;
        do {
            if (t._i >= n.length)
                return {
                    value: void 0,
                    done: !0
                }
        } while (!((e = n[t._i++]) in t._t));
        return {
            value: e,
            done: !1
        }
    }),
        r(r.S, "Reflect", {
            enumerate: function (e) {
                return new a(e)
            }
        })
}