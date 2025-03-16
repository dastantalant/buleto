 function (e, t, n) {
    "use strict";
    var r = n(170),
        o = n(772),
        a = o("%Function%"),
        i = a.apply,
        s = a.call;
    e.exports = function () {
        return r.apply(s, arguments)
    },
        e.exports.apply = function () {
            return r.apply(i, arguments)
        }
}