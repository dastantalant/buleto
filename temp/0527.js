function(e, t, n) {
    var r = n(224),
        o = n(233),
        a = n(48),
        i = n(4),
        s = n(30),
        l = a.keys,
        c = a.key,
        u = function(e, t) {
            var n = l(e, t),
                a = s(e);
            if (null === a)
                return n;
            var i = u(a, t);
            return i.length ? n.length ? o(new r(n.concat(i))) : i : n
        };
    a.exp({
        getMetadataKeys: function(e) {
            return u(i(e), arguments.length < 2 ? void 0 : c(arguments[1]))
        }
    })
}