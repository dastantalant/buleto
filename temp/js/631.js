 function (e, t, n) {
    "use strict";

    function r(e, t, n, r, a, i, s, l) {
        if (o(t), !e) {
            var c;
            if (void 0 === t)
                c = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
            else {
                var u = [n, r, a, i, s, l],
                    d = 0;
                c = new Error(t.replace(/%s/g, function () {
                    return u[d++]
                })),
                    c.name = "Invariant Violation"
            }
            throw c.framesToPop = 1,
            c
        }
    }
    var o = function (e) { };
    e.exports = r
}