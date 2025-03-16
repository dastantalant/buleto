 function (e, t, n) {
    var r = n(10)("unscopables"),
        o = Array.prototype;
    void 0 == o[r] && n(22)(o, r, {}),
        e.exports = function (e) {
            o[r][e] = !0
        }
}