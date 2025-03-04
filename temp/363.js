 function (e, t, n) {
    "use strict";
    var r = n(9),
        o = n(30),
        a = n(10)("hasInstance"),
        i = Function.prototype;
    a in i || n(13).f(i, a, {
        value: function (e) {
            if ("function" != typeof this || !r(e))
                return !1;
            if (!r(this.prototype))
                return e instanceof this;
            for (; e = o(e);)
                if (this.prototype === e)
                    return !0;
            return !1
        }
    })
}