 function (e, t, n) {
    var r = n(48),
        o = n(4),
        a = r.has,
        i = r.key;
    r.exp({
        hasOwnMetadata: function (e, t) {
            return a(e, o(t), arguments.length < 3 ? void 0 : i(arguments[2]))
        }
    })
}