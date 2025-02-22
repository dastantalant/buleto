function(e, t, n) {
    var r = Date.prototype,
        o = r.toString,
        a = r.getTime;
    new Date(NaN) + "" != "Invalid Date" && n(23)(r, "toString", function() {
        var e = a.call(this);
        return e === e ? o.call(this) : "Invalid Date"
    })
}