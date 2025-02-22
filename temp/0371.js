function(e, t, n) {
    var r = n(1),
        o = n(5).isFinite;
    r(r.S, "Number", {
        isFinite: function(e) {
            return "number" == typeof e && o(e)
        }
    })
}