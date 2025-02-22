function(e, t, n) {
    "use strict";

    function r(e) {
        var t, n, r, a, i = Array.prototype.slice.call(arguments, 1);
        for (t = 0,
            n = i.length; t < n; t += 1)
            if (r = i[t])
                for (a in r)
                    o.call(r, a) && (e[a] = r[a]);
        return e
    }
    t.extend = r;
    var o = Object.prototype.hasOwnProperty;
    t.hop = o
}