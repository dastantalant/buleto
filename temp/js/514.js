 function (e, t, n) {
    var r = n(1);
    r(r.S, "Math", {
        isubh: function (e, t, n, r) {
            var o = e >>> 0,
                a = t >>> 0,
                i = n >>> 0;
            return a - (r >>> 0) - ((~o & i | ~(o ^ i) & o - i >>> 0) >>> 31) | 0
        }
    })
}