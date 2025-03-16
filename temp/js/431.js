 function (e, t, n) {
    var r = n(9),
        o = n(92),
        a = n(10)("species");
    e.exports = function (e) {
        var t;
        return o(e) && (t = e.constructor,
            "function" != typeof t || t !== Array && !o(t.prototype) || (t = void 0),
            r(t) && null === (t = t[a]) && (t = void 0)),
            void 0 === t ? Array : t
    }
}