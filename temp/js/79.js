 function (e, t, n) {
    "use strict";
    var r = n(4);
    e.exports = function () {
        var e = r(this),
            t = "";
        return e.global && (t += "g"),
            e.ignoreCase && (t += "i"),
            e.multiline && (t += "m"),
            e.unicode && (t += "u"),
            e.sticky && (t += "y"),
            t
    }
}