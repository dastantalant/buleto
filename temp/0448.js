function(e, t, n) {
    "use strict";
    var r = n(4),
        o = n(11),
        a = n(140),
        i = n(96);
    n(97)("match", 1, function(e, t, n, s) {
        return [function(n) {
            var r = e(this),
                o = void 0 == n ? void 0 : n[t];
            return void 0 !== o ? o.call(n, r) : new RegExp(n)[t](String(r))
        }, function(e) {
            var t = s(n, e, this);
            if (t.done)
                return t.value;
            var l = r(e),
                c = String(this);
            if (!l.global)
                return i(l, c);
            var u = l.unicode;
            l.lastIndex = 0;
            for (var d, p = [], h = 0; null !== (d = i(l, c));) {
                var f = String(d[0]);
                p[h] = f,
                    "" === f && (l.lastIndex = a(c, o(l.lastIndex), u)),
                    h++
            }
            return 0 === h ? null : p
        }]
    })
}