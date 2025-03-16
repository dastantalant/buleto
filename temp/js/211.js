 function (e, t, n) {
    var r = n(9),
        o = Math.floor;
    e.exports = function (e) {
        return !r(e) && isFinite(e) && o(e) === e
    }
}