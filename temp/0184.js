function(e, t, n) {
    "use strict";

    function r(e) {
        try {
            a(),
                e()
        } finally {
            i()
        }
    }

    function o(e) {
        l.push(e),
            c || (a(),
                s())
    }

    function a() {
        c++
    }

    function i() {
        c--
    }

    function s() {
        i();
        for (var e = void 0; !c && void 0 !== (e = l.shift());)
            r(e)
    }
    t.a = o,
        t.c = a,
        t.b = s;
    var l = [],
        c = 0
}