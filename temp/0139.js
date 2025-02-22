function(e, t, n) {
    "use strict";
    var r = n(52),
        o = n(217),
        a = n(71),
        i = n(28);
    e.exports = n(129)(Array, "Array", function(e, t) {
            this._t = i(e),
                this._i = 0,
                this._k = t
        }, function() {
            var e = this._t,
                t = this._k,
                n = this._i++;
            return !e || n >= e.length ? (this._t = void 0,
                o(1)) : "keys" == t ? o(0, n) : "values" == t ? o(0, e[n]) : o(0, [n, e[n]])
        }, "values"),
        a.Arguments = a.Array,
        r("keys"),
        r("values"),
        r("entries")
}