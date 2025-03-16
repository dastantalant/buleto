 function (e, t, n) {
    var r = n(9),
        o = n(123).set;
    e.exports = function (e, t, n) {
        var a, i = t.constructor;
        return i !== n && "function" == typeof i && (a = i.prototype) !== n.prototype && r(a) && o && o(e, a),
            e
    }
}