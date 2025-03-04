 function (e, t, n) {
    var r = n(12),
        o = n(57),
        a = n(28),
        i = n(78).f;
    e.exports = function (e) {
        return function (t) {
            for (var n, s = a(t), l = o(s), c = l.length, u = 0, d = []; c > u;)
                n = l[u++],
                    r && !i.call(s, n) || d.push(e ? [n, s[n]] : s[n]);
            return d
        }
    }
}