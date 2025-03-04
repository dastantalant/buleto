 function (e, t, n) {
    var r = n(1),
        o = n(123);
    o && r(r.S, "Reflect", {
        setPrototypeOf: function (e, t) {
            o.check(e, t);
            try {
                return o.set(e, t), !0
            } catch (e) {
                return !1
            }
        }
    })
}