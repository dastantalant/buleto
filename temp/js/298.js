 function (e, t, n) {
    "use strict";

    function r(e) {
        var t = new o(o._44);
        return t._83 = 1,
            t._18 = e,
            t
    }
    var o = n(173);
    e.exports = o;
    var a = r(!0),
        i = r(!1),
        s = r(null),
        l = r(void 0),
        c = r(0),
        u = r("");
    o.resolve = function (e) {
        if (e instanceof o)
            return e;
        if (null === e)
            return s;
        if (void 0 === e)
            return l;
        if (!0 === e)
            return a;
        if (!1 === e)
            return i;
        if (0 === e)
            return c;
        if ("" === e)
            return u;
        if ("object" === typeof e || "function" === typeof e)
            try {
                var t = e.then;
                if ("function" === typeof t)
                    return new o(t.bind(e))
            } catch (e) {
                return new o(function (t, n) {
                    n(e)
                })
            }
        return r(e)
    },
        o.all = function (e) {
            var t = Array.prototype.slice.call(e);
            return new o(function (e, n) {
                function r(i, s) {
                    if (s && ("object" === typeof s || "function" === typeof s)) {
                        if (s instanceof o && s.then === o.prototype.then) {
                            for (; 3 === s._83;)
                                s = s._18;
                            return 1 === s._83 ? r(i, s._18) : (2 === s._83 && n(s._18),
                                void s.then(function (e) {
                                    r(i, e)
                                }, n))
                        }
                        var l = s.then;
                        if ("function" === typeof l) {
                            return void new o(l.bind(s)).then(function (e) {
                                r(i, e)
                            }, n)
                        }
                    }
                    t[i] = s,
                        0 === --a && e(t)
                }
                if (0 === t.length)
                    return e([]);
                for (var a = t.length, i = 0; i < t.length; i++)
                    r(i, t[i])
            })
        },
        o.reject = function (e) {
            return new o(function (t, n) {
                n(e)
            })
        },
        o.race = function (e) {
            return new o(function (t, n) {
                e.forEach(function (e) {
                    o.resolve(e).then(t, n)
                })
            })
        },
        o.prototype.catch = function (e) {
            return this.then(null, e)
        }
}