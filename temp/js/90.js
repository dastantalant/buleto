 function (e, t, n) {
    var r = n(28),
        o = n(11),
        a = n(58);
    e.exports = function (e) {
        return function (t, n, i) {
            var s, l = r(t),
                c = o(l.length),
                u = a(i, c);
            if (e && n != n) {
                for (; c > u;)
                    if ((s = l[u++]) != s)
                        return !0
            } else
                for (; c > u; u++)
                    if ((e || u in l) && l[u] === n)
                        return e || u || 0;
            return !e && -1
        }
    }
}