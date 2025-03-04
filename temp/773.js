 function (e, t, n) {
    "use strict";
    (function (t) {
        var r = t.Symbol,
            o = n(774);
        e.exports = function () {
            return "function" === typeof r && ("function" === typeof Symbol && ("symbol" === typeof r("foo") && ("symbol" === typeof Symbol("bar") && o())))
        }
    }).call(t, n(25))
}