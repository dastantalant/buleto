function(e, t, n) {
    "use strict";
    var r = n(1),
        o = n(100),
        a = n(144),
        i = n(4),
        s = n(58),
        l = n(11),
        c = n(9),
        u = n(5).ArrayBuffer,
        d = n(80),
        p = a.ArrayBuffer,
        h = a.DataView,
        f = o.ABV && u.isView,
        m = p.prototype.slice,
        g = o.VIEW;
    r(r.G + r.W + r.F * (u !== p), {
            ArrayBuffer: p
        }),
        r(r.S + r.F * !o.CONSTR, "ArrayBuffer", {
            isView: function(e) {
                return f && f(e) || c(e) && g in e
            }
        }),
        r(r.P + r.U + r.F * n(8)(function() {
            return !new p(2).slice(1, void 0).byteLength
        }), "ArrayBuffer", {
            slice: function(e, t) {
                if (void 0 !== m && void 0 === t)
                    return m.call(i(this), e);
                for (var n = i(this).byteLength, r = s(e, n), o = s(void 0 === t ? n : t, n), a = new(d(this, p))(l(o - r)), c = new h(this), u = new h(a), f = 0; r < o;)
                    u.setUint8(f++, c.getUint8(r++));
                return a
            }
        }),
        n(61)("ArrayBuffer")
}