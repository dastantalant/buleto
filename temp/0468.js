function(e, t, n) {
    var r = n(1),
        o = n(29).f,
        a = n(4);
    r(r.S, "Reflect", {
        deleteProperty: function(e, t) {
            var n = o(a(e), t);
            return !(n && !n.configurable) && delete e[t]
        }
    })
}