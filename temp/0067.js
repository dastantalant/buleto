function(e, t, n) {
    "use strict";

    function r() {
        function e(e) {
            return n.push(e),
                function() {
                    return Object(s.t)(n, e)
                }
        }

        function t(e) {
            for (var t = n.slice(), r = 0, o = t.length; r < o; r++)
                t[r](e)
        }
        var n = [];
        return {
            subscribe: e,
            emit: t
        }
    }

    function o() {
        function e() {
            if (i && c.length)
                throw Object(s.m)("Cannot have a closed channel with pending takers");
            if (c.length && !a.isEmpty())
                throw Object(s.m)("Cannot have pending takers with non empty buffer")
        }

        function t(t) {
            if (e(),
                Object(s.g)(t, s.n.notUndef, f), !i) {
                if (!c.length)
                    return a.put(t);
                for (var n = 0; n < c.length; n++) {
                    var r = c[n];
                    if (!r[s.b] || r[s.b](t))
                        return c.splice(n, 1),
                            r(t)
                }
            }
        }

        function n(t) {
            e(),
                Object(s.g)(t, s.n.func, "channel.take's callback must be a function"),
                i && a.isEmpty() ? t(d) : a.isEmpty() ? (c.push(t),
                    t.cancel = function() {
                        return Object(s.t)(c, t)
                    }
                ) : t(a.take())
        }

        function r(t) {
            if (e(),
                Object(s.g)(t, s.n.func, "channel.flush' callback must be a function"),
                i && a.isEmpty())
                return void t(d);
            t(a.flush())
        }

        function o() {
            if (e(), !i && (i = !0,
                    c.length)) {
                var t = c;
                c = [];
                for (var n = 0, r = t.length; n < r; n++)
                    t[n](d)
            }
        }
        var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : l.a.fixed(),
            i = !1,
            c = [];
        return Object(s.g)(a, s.n.buffer, h), {
            take: n,
            put: t,
            flush: r,
            close: o,
            get __takers__() {
                return c
            },
            get __closed__() {
                return i
            }
        }
    }

    function a(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : l.a.none(),
            n = arguments[2];
        arguments.length > 2 && Object(s.g)(n, s.n.func, "Invalid match function passed to eventChannel");
        var r = o(t),
            a = function() {
                r.__closed__ || (i && i(),
                    r.close())
            },
            i = e(function(e) {
                if (p(e))
                    return void a();
                n && !n(e) || r.put(e)
            });
        if (r.__closed__ && i(), !s.n.func(i))
            throw new Error("in eventChannel: subscribe should return a function to unsubscribe");
        return {
            take: r.take,
            flush: r.flush,
            close: a
        }
    }

    function i(e) {
        var t = a(function(t) {
            return e(function(e) {
                if (e[s.c])
                    return void t(e);
                Object(c.a)(function() {
                    return t(e)
                })
            })
        });
        return u({}, t, {
            take: function(e, n) {
                arguments.length > 1 && (Object(s.g)(n, s.n.func, "channel.take's matcher argument must be a function"),
                        e[s.b] = n),
                    t.take(e)
            }
        })
    }
    n.d(t, "a", function() {
            return d
        }),
        n.d(t, "d", function() {
            return p
        }),
        t.b = r,
        t.c = a,
        t.e = i;
    var s = n(26),
        l = n(85),
        c = n(183),
        u = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        d = {
            type: "@@redux-saga/CHANNEL_END"
        },
        p = function(e) {
            return e && "@@redux-saga/CHANNEL_END" === e.type
        },
        h = "invalid buffer passed to channel factory function",
        f = "Saga was provided with an undefined action"
}