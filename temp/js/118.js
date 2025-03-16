 function (e, t, n) {
    var r = n(9),
        o = n(5).document,
        a = r(o) && r(o.createElement);
    e.exports = function (e) {
        return a ? o.createElement(e) : {}
    }
}