function(e, t, n) {
    var r = n(94),
        o = n(43);
    e.exports = function(e, t, n) {
        if (r(t))
            throw TypeError("String#" + n + " doesn't accept regex!");
        return String(o(e))
    }
}