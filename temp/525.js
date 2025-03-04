 function (e, t, n) {
    var r = n(48),
        o = n(4),
        a = n(30),
        i = r.has,
        s = r.get,
        l = r.key,
        c = function (e, t, n) {
            if (i(e, t, n))
                return s(e, t, n);
            var r = a(t);
            return null !== r ? c(e, r, n) : void 0
        };
    r.exp({
        getMetadata: function (e, t) {
            return c(e, o(t), arguments.length < 3 ? void 0 : l(arguments[2]))
        }
    })
}