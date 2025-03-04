 function (e, t, n) {
    var r = n(48),
        o = n(4),
        a = r.key,
        i = r.map,
        s = r.store;
    r.exp({
        deleteMetadata: function (e, t) {
            var n = arguments.length < 3 ? void 0 : a(arguments[2]),
                r = i(o(t), n, !1);
            if (void 0 === r || !r.delete(e))
                return !1;
            if (r.size)
                return !0;
            var l = s.get(t);
            return l.delete(n), !!l.size || s.delete(t)
        }
    })
}