function(e, t, n) {
    "use strict";
    var r = n(17),
        o = n(9),
        a = n(207),
        i = [].slice,
        s = {},
        l = function(e, t, n) {
            if (!(t in s)) {
                for (var r = [], o = 0; o < t; o++)
                    r[o] = "a[" + o + "]";
                s[t] = Function("F,a", "return new F(" + r.join(",") + ")")
            }
            return s[t](e, n)
        };
    e.exports = Function.bind || function(e) {
        var t = r(this),
            n = i.call(arguments, 1),
            s = function() {
                var r = n.concat(i.call(arguments));
                return this instanceof s ? l(t, r.length, r) : a(t, r, e)
            };
        return o(t.prototype) && (s.prototype = t.prototype),
            s
    }
}