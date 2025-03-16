 function (e, t, n) {
    var r = n(35),
        o = n(10)("toStringTag"),
        a = "Arguments" == r(function () {
            return arguments
        }()),
        i = function (e, t) {
            try {
                return e[t]
            } catch (e) { }
        };
    e.exports = function (e) {
        var t, n, s;
        return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = i(t = Object(e), o)) ? n : a ? r(t) : "Object" == (s = r(t)) && "function" == typeof t.callee ? "Arguments" : s
    }
}