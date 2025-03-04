 function (e, t, n) {
    "use strict";
    var r = Array.prototype.slice,
        o = Object.prototype.toString;
    e.exports = function (e) {
        var t = this;
        if ("function" !== typeof t || "[object Function]" !== o.call(t))
            throw new TypeError("Function.prototype.bind called on incompatible " + t);
        for (var n, a = r.call(arguments, 1), i = function () {
            if (this instanceof n) {
                var o = t.apply(this, a.concat(r.call(arguments)));
                return Object(o) === o ? o : this
            }
            return t.apply(e, a.concat(r.call(arguments)))
        }, s = Math.max(0, t.length - a.length), l = [], c = 0; c < s; c++)
            l.push("$" + c);
        if (n = Function("binder", "return function (" + l.join(",") + "){ return binder.apply(this,arguments); }")(i),
            t.prototype) {
            var u = function () { };
            u.prototype = t.prototype,
                n.prototype = new u,
                u.prototype = null
        }
        return n
    }
}