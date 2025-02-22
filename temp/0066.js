function(e, t, n) {
    var r = n(9);
    e.exports = function(e, t) {
        if (!r(e) || e._t !== t)
            throw TypeError("Incompatible receiver, " + t + " required!");
        return e
    }
}