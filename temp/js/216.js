 function (e, t, n) {
    "use strict";
    var r = n(14),
        o = n(58),
        a = n(11);
    e.exports = [].copyWithin || function (e, t) {
        var n = r(this),
            i = a(n.length),
            s = o(e, i),
            l = o(t, i),
            c = arguments.length > 2 ? arguments[2] : void 0,
            u = Math.min((void 0 === c ? i : o(c, i)) - l, i - s),
            d = 1;
        for (l < s && s < l + u && (d = -1,
            l += u - 1,
            s += u - 1); u-- > 0;)
            l in n ? n[s] = n[l] : delete n[s],
                s += d,
                l += d;
        return n
    }
}