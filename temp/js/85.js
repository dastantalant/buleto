 function (e, t, n) {
    "use strict";

    function r() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 10,
            t = arguments[1],
            n = new Array(e),
            r = 0,
            o = 0,
            c = 0,
            u = function (t) {
                n[o] = t,
                    o = (o + 1) % e,
                    r++
            },
            d = function () {
                if (0 != r) {
                    var t = n[c];
                    return n[c] = null,
                        r--,
                        c = (c + 1) % e,
                        t
                }
            },
            p = function () {
                for (var e = []; r;)
                    e.push(d());
                return e
            };
        return {
            isEmpty: function () {
                return 0 == r
            },
            put: function (d) {
                if (r < e)
                    u(d);
                else {
                    var h = void 0;
                    switch (t) {
                        case i:
                            throw new Error(a);
                        case s:
                            n[o] = d,
                                o = (o + 1) % e,
                                c = o;
                            break;
                        case l:
                            h = 2 * e,
                                n = p(),
                                r = n.length,
                                o = n.length,
                                c = 0,
                                n.length = h,
                                e = h,
                                u(d)
                    }
                }
            },
            take: d,
            flush: p
        }
    }
    n.d(t, "a", function () {
        return u
    });
    var o = n(26),
        a = "Channel's Buffer overflow!",
        i = 1,
        s = 3,
        l = 4,
        c = {
            isEmpty: o.o,
            put: o.r,
            take: o.r
        },
        u = {
            none: function () {
                return c
            },
            fixed: function (e) {
                return r(e, i)
            },
            dropping: function (e) {
                return r(e, 2)
            },
            sliding: function (e) {
                return r(e, s)
            },
            expanding: function (e) {
                return r(e, l)
            }
        }
}