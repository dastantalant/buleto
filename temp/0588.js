function(e, t, n) {
    "use strict";

    function r(e) {
        return JSON.stringify(e.map(function(e) {
            return e && "object" === typeof e ? o(e) : e
        }))
    }

    function o(e) {
        return Object.keys(e).sort().map(function(t) {
            var n;
            return n = {},
                n[t] = e[t],
                n
        })
    }
    var a = function(e, t) {
        return void 0 === t && (t = {}),
            function() {
                for (var n, o = [], a = 0; a < arguments.length; a++)
                    o[a] = arguments[a];
                var i = r(o),
                    s = i && t[i];
                return s || (s = new((n = e).bind.apply(n, [void 0].concat(o))),
                        i && (t[i] = s)),
                    s
            }
    };
    t.a = a
}