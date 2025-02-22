function(e, t, n) {
    var r = n(48),
        o = n(4),
        a = r.keys,
        i = r.key;
    r.exp({
        getOwnMetadataKeys: function(e) {
            return a(o(e), arguments.length < 2 ? void 0 : i(arguments[1]))
        }
    })
}