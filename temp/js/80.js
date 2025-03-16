 function (e, t, n) {
    var r = n(4),
        o = n(17),
        a = n(10)("species");
    e.exports = function (e, t) {
        var n, i = r(e).constructor;
        return void 0 === i || void 0 == (n = r(i)[a]) ? t : o(n)
    }
}