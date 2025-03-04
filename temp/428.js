 function (e, t, n) {
    "use strict";
    var r = n(1),
        o = n(122),
        a = n(35),
        i = n(58),
        s = n(11),
        l = [].slice;
    r(r.P + r.F * n(8)(function () {
        o && l.call(o)
    }), "Array", {
        slice: function (e, t) {
            var n = s(this.length),
                r = a(this);
            if (t = void 0 === t ? n : t,
                "Array" == r)
                return l.call(this, e, t);
            for (var o = i(e, n), c = i(t, n), u = s(c - o), d = new Array(u), p = 0; p < u; p++)
                d[p] = "String" == r ? this.charAt(o + p) : this[o + p];
            return d
        }
    })
}