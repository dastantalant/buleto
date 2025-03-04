 function (e, t, n) {
    var r = n(1);
    r(r.S, "Math", {
        trunc: function (e) {
            return (e > 0 ? Math.floor : Math.ceil)(e)
        }
    })
}