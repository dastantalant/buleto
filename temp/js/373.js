 function (e, t, n) {
    var r = n(1),
        o = n(211),
        a = Math.abs;
    r(r.S, "Number", {
        isSafeInteger: function (e) {
            return o(e) && a(e) <= 9007199254740991
        }
    })
}