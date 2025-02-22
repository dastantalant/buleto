function(e, t, n) {
    function r(e, t) {
        var n, s, u = arguments.length < 3 ? e : arguments[2];
        return c(e) === u ? e[t] : (n = o.f(e, t)) ? i(n, "value") ? n.value : void 0 !== n.get ? n.get.call(u) : void 0 : l(s = a(e)) ? r(s, t, u) : void 0
    }
    var o = n(29),
        a = n(30),
        i = n(27),
        s = n(1),
        l = n(9),
        c = n(4);
    s(s.S, "Reflect", {
        get: r
    })
}