function(e, t, n) {
    "use strict";
    var r = n(1),
        o = n(17),
        a = n(34),
        i = n(63);
    e.exports = function(e) {
        r(r.S, e, {
            from: function(e) {
                var t, n, r, s, l = arguments[1];
                return o(this),
                    t = void 0 !== l,
                    t && o(l),
                    void 0 == e ? new this : (n = [],
                        t ? (r = 0,
                            s = a(l, arguments[2], 2),
                            i(e, !1, function(e) {
                                n.push(s(e, r++))
                            })) : i(e, !1, n.push, n),
                        new this(n))
            }
        })
    }
}