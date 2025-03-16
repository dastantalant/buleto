 function (e, t) {
    e.exports = function (e, t) {
        var n = t === Object(t) ? function (e) {
            return t[e]
        } :
            t;
        return function (t) {
            return String(t).replace(e, n)
        }
    }
}