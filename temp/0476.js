function(e, t, n) {
    var r = n(1),
        o = n(4),
        a = Object.preventExtensions;
    r(r.S, "Reflect", {
        preventExtensions: function(e) {
            o(e);
            try {
                return a && a(e), !0
            } catch (e) {
                return !1
            }
        }
    })
}