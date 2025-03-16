 function (e, t, n) {
    var r = n(1),
        o = n(4),
        a = Object.isExtensible;
    r(r.S, "Reflect", {
        isExtensible: function (e) {
            return o(e), !a || a(e)
        }
    })
}