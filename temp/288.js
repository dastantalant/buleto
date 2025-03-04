 function (e, t, n) {
    "use strict";
    var r = Object,
        o = TypeError;
    e.exports = function () {
        if (null != this && this !== r(this))
            throw new o("RegExp.prototype.flags getter called on non-object");
        var e = "";
        return this.global && (e += "g"),
            this.ignoreCase && (e += "i"),
            this.multiline && (e += "m"),
            this.dotAll && (e += "s"),
            this.unicode && (e += "u"),
            this.sticky && (e += "y"),
            e
    }
}