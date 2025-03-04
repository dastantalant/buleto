 function (e, t, n) {
    "use strict";
    var r = n(4),
        o = n(205),
        a = n(96);
    n(97)("search", 1, function (e, t, n, i) {
        return [function (n) {
            var r = e(this),
                o = void 0 == n ? void 0 : n[t];
            return void 0 !== o ? o.call(n, r) : new RegExp(n)[t](String(r))
        }, function (e) {
            var t = i(n, e, this);
            if (t.done)
                return t.value;
            var s = r(e),
                l = String(this),
                c = s.lastIndex;
            o(c, 0) || (s.lastIndex = 0);
            var u = a(s, l);
            return o(s.lastIndex, c) || (s.lastIndex = c),
                null === u ? -1 : u.index
        }]
    })
}