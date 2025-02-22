function(e, t, n) {
    "use strict";
    var r = n(69),
        o = RegExp.prototype.exec;
    e.exports = function(e, t) {
        var n = e.exec;
        if ("function" === typeof n) {
            var a = n.call(e, t);
            if ("object" !== typeof a)
                throw new TypeError("RegExp exec method returned something other than an Object or null");
            return a
        }
        if ("RegExp" !== r(e))
            throw new TypeError("RegExp#exec called on incompatible receiver");
        return o.call(e, t)
    }
}