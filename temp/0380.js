function(e, t, n) {
    function r(e) {
        return isFinite(e = +e) && 0 != e ? e < 0 ? -r(-e) : Math.log(e + Math.sqrt(e * e + 1)) : e
    }
    var o = n(1),
        a = Math.asinh;
    o(o.S + o.F * !(a && 1 / a(0) > 0), "Math", {
        asinh: r
    })
}