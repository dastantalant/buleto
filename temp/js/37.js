 function (e, t, n) {
    "use strict";
    var r = n(8);
    e.exports = function (e, t) {
        return !!e && r(function () {
            t ? e.call(null, function () { }, 1) : e.call(null)
        })
    }
}