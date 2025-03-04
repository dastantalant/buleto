 function (e, t, n) {
    "use strict";
    var r, o = n(5),
        a = n(45)(0),
        i = n(23),
        s = n(51),
        l = n(204),
        c = n(226),
        u = n(9),
        d = n(65),
        p = n(65),
        h = !o.ActiveXObject && "ActiveXObject" in o,
        f = s.getWeak,
        m = Object.isExtensible,
        g = c.ufstore,
        y = function (e) {
            return function () {
                return e(this, arguments.length > 0 ? arguments[0] : void 0)
            }
        },
        v = {
            get: function (e) {
                if (u(e)) {
                    var t = f(e);
                    return !0 === t ? g(d(this, "WeakMap")).get(e) : t ? t[this._i] : void 0
                }
            },
            set: function (e, t) {
                return c.def(d(this, "WeakMap"), e, t)
            }
        },
        b = e.exports = n(99)("WeakMap", y, v, c, !0, !0);
    p && h && (r = c.getConstructor(y, "WeakMap"),
        l(r.prototype, v),
        s.NEED = !0,
        a(["delete", "has", "get", "set"], function (e) {
            var t = b.prototype,
                n = t[e];
            i(t, e, function (t, o) {
                if (u(t) && !m(t)) {
                    this._f || (this._f = new r);
                    var a = this._f[e](t, o);
                    return "set" == e ? this : a
                }
                return n.call(this, t, o)
            })
        }))
}