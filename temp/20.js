 function (e, t, n) {
    var r, o;
    ! function () {
        "use strict";

        function n() {
            for (var e = [], t = 0; t < arguments.length; t++) {
                var r = arguments[t];
                if (r) {
                    var o = typeof r;
                    if ("string" === o || "number" === o)
                        e.push(r);
                    else if (Array.isArray(r)) {
                        if (r.length) {
                            var i = n.apply(null, r);
                            i && e.push(i)
                        }
                    } else if ("object" === o)
                        if (r.toString === Object.prototype.toString)
                            for (var s in r)
                                a.call(r, s) && r[s] && e.push(s);
                        else
                            e.push(r.toString())
                }
            }
            return e.join(" ")
        }
        var a = {}.hasOwnProperty;
        "undefined" !== typeof e && e.exports ? (n.default = n,
            e.exports = n) : (r = [],
                void 0 !== (o = function () {
                    return n
                }
                    .apply(t, r)) && (e.exports = o))
    }()
}