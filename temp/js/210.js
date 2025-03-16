 function (e, t, n) {
    var r = n(35);
    e.exports = function (e, t) {
        if ("number" != typeof e && "Number" != r(e))
            throw TypeError(t);
        return +e
    }
}