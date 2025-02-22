function(e, t, n) {
    "use strict";
    var r = n(4),
        o = n(14),
        a = n(11),
        i = n(36),
        s = n(140),
        l = n(96),
        c = Math.max,
        u = Math.min,
        d = Math.floor,
        p = /\$([$&`']|\d\d?|<[^>]*>)/g,
        h = /\$([$&`']|\d\d?)/g,
        f = function(e) {
            return void 0 === e ? e : String(e)
        };
    n(97)("replace", 2, function(e, t, n, m) {
        function g(e, t, r, a, i, s) {
            var l = r + e.length,
                c = a.length,
                u = h;
            return void 0 !== i && (i = o(i),
                    u = p),
                n.call(s, u, function(n, o) {
                    var s;
                    switch (o.charAt(0)) {
                        case "$":
                            return "$";
                        case "&":
                            return e;
                        case "`":
                            return t.slice(0, r);
                        case "'":
                            return t.slice(l);
                        case "<":
                            s = i[o.slice(1, -1)];
                            break;
                        default:
                            var u = +o;
                            if (0 === u)
                                return n;
                            if (u > c) {
                                var p = d(u / 10);
                                return 0 === p ? n : p <= c ? void 0 === a[p - 1] ? o.charAt(1) : a[p - 1] + o.charAt(1) : n
                            }
                            s = a[u - 1]
                    }
                    return void 0 === s ? "" : s
                })
        }
        return [function(r, o) {
            var a = e(this),
                i = void 0 == r ? void 0 : r[t];
            return void 0 !== i ? i.call(r, a, o) : n.call(String(a), r, o)
        }, function(e, t) {
            var o = m(n, e, this, t);
            if (o.done)
                return o.value;
            var d = r(e),
                p = String(this),
                h = "function" === typeof t;
            h || (t = String(t));
            var y = d.global;
            if (y) {
                var v = d.unicode;
                d.lastIndex = 0
            }
            for (var b = [];;) {
                var _ = l(d, p);
                if (null === _)
                    break;
                if (b.push(_), !y)
                    break;
                "" === String(_[0]) && (d.lastIndex = s(p, a(d.lastIndex), v))
            }
            for (var w = "", x = 0, E = 0; E < b.length; E++) {
                _ = b[E];
                for (var k = String(_[0]), S = c(u(i(_.index), p.length), 0), O = [], C = 1; C < _.length; C++)
                    O.push(f(_[C]));
                var T = _.groups;
                if (h) {
                    var M = [k].concat(O, S, p);
                    void 0 !== T && M.push(T);
                    var A = String(t.apply(void 0, M))
                } else
                    A = g(k, p, S, O, T, t);
                S >= x && (w += p.slice(x, S) + A,
                    x = S + k.length)
            }
            return w + p.slice(x)
        }]
    })
}