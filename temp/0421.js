function(e, t, n) {
    "use strict";
    var r = n(8),
        o = Date.prototype.getTime,
        a = Date.prototype.toISOString,
        i = function(e) {
            return e > 9 ? e : "0" + e
        };
    e.exports = r(function() {
            return "0385-07-25T07:06:39.999Z" != a.call(new Date(-5e13 - 1))
        }) || !r(function() {
            a.call(new Date(NaN))
        }) ? function() {
            if (!isFinite(o.call(this)))
                throw RangeError("Invalid time value");
            var e = this,
                t = e.getUTCFullYear(),
                n = e.getUTCMilliseconds(),
                r = t < 0 ? "-" : t > 9999 ? "+" : "";
            return r + ("00000" + Math.abs(t)).slice(r ? -6 : -4) + "-" + i(e.getUTCMonth() + 1) + "-" + i(e.getUTCDate()) + "T" + i(e.getUTCHours()) + ":" + i(e.getUTCMinutes()) + ":" + i(e.getUTCSeconds()) + "." + (n > 99 ? n : "0" + i(n)) + "Z"
        } :
        a
}