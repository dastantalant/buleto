 function (e, t, n) {
    var r = n(1),
        o = n(540)(/[\\^$*+?.()|[\]{}]/g, "\\$&");
    r(r.S, "RegExp", {
        escape: function (e) {
            return o(e)
        }
    })
}