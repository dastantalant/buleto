function(e, t, n) {
    var r = n(4),
        o = n(199),
        a = n(42),
        i = Object.defineProperty;
    t.f = n(12) ? Object.defineProperty : function(e, t, n) {
        if (r(e),
            t = a(t, !0),
            r(n),
            o)
            try {
                return i(e, t, n)
            } catch (e) {}
        if ("get" in n || "set" in n)
            throw TypeError("Accessors not supported!");
        return "value" in n && (e[t] = n.value),
            e
    }
}