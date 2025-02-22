function(e, t, n) {
    var r = n(48),
        o = n(4),
        a = n(30),
        i = r.has,
        s = r.key,
        l = function(e, t, n) {
            if (i(e, t, n))
                return !0;
            var r = a(t);
            return null !== r && l(e, r, n)
        };
    r.exp({
        hasMetadata: function(e, t) {
            return l(e, o(t), arguments.length < 3 ? void 0 : s(arguments[2]))
        }
    })
}