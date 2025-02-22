function(e, t, n) {
    "use strict";

    function r() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "*";
        if (arguments.length && Object(p.g)(arguments[0], p.n.notUndef, "take(patternOrChannel): patternOrChannel is undefined"),
            p.n.pattern(e))
            return A(f, {
                pattern: e
            });
        if (p.n.channel(e))
            return A(f, {
                channel: e
            });
        throw new Error("take(patternOrChannel): argument " + String(e) + " is not valid channel or a valid pattern")
    }

    function o(e, t) {
        return arguments.length > 1 ? (Object(p.g)(e, p.n.notUndef, "put(channel, action): argument channel is undefined"),
                Object(p.g)(e, p.n.channel, "put(channel, action): argument " + e + " is not a valid channel"),
                Object(p.g)(t, p.n.notUndef, "put(channel, action): argument action is undefined")) : (Object(p.g)(e, p.n.notUndef, "put(action): argument action is undefined"),
                t = e,
                e = null),
            A(m, {
                channel: e,
                action: t
            })
    }

    function a(e) {
        return A(g, e)
    }

    function i(e, t, n) {
        Object(p.g)(t, p.n.notUndef, e + ": argument fn is undefined");
        var r = null;
        if (p.n.array(t)) {
            var o = t;
            r = o[0],
                t = o[1]
        } else if (t.fn) {
            var a = t;
            r = a.context,
                t = a.fn
        }
        return r && p.n.string(t) && p.n.func(r[t]) && (t = r[t]),
            Object(p.g)(t, p.n.func, e + ": argument " + t + " is not a function"), {
                context: r,
                fn: t,
                args: n
            }
    }

    function s(e) {
        for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
            n[r - 1] = arguments[r];
        return A(v, i("call", e, n))
    }

    function l(e) {
        for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
            n[r - 1] = arguments[r];
        return A(_, i("fork", e, n))
    }

    function c() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
        if (t.length > 1)
            return a(t.map(function(e) {
                return c(e)
            }));
        var r = t[0];
        return 1 === t.length && (Object(p.g)(r, p.n.notUndef, "cancel(task): argument task is undefined"),
                Object(p.g)(r, p.n.task, "cancel(task): argument " + r + " is not a valid Task object " + M)),
            A(x, r || p.d)
    }

    function u(e) {
        for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
            n[r - 1] = arguments[r];
        return 0 === arguments.length ? e = p.l : (Object(p.g)(e, p.n.notUndef, "select(selector,[...]): argument selector is undefined"),
                Object(p.g)(e, p.n.func, "select(selector,[...]): argument " + e + " is not a function")),
            A(E, {
                selector: e,
                args: n
            })
    }

    function d(e, t) {
        return Object(p.g)(e, p.n.notUndef, "actionChannel(pattern,...): argument pattern is undefined"),
            arguments.length > 1 && (Object(p.g)(t, p.n.notUndef, "actionChannel(pattern, buffer): argument buffer is undefined"),
                Object(p.g)(t, p.n.buffer, "actionChannel(pattern, buffer): argument " + t + " is not a valid buffer")),
            A(k, {
                pattern: e,
                buffer: t
            })
    }
    t.i = r,
        t.g = o,
        t.b = a,
        t.d = s,
        t.f = l,
        t.e = c,
        t.h = u,
        t.a = d,
        n.d(t, "c", function() {
            return N
        });
    var p = n(26),
        h = Object(p.u)("IO"),
        f = "TAKE",
        m = "PUT",
        g = "ALL",
        y = "RACE",
        v = "CALL",
        b = "CPS",
        _ = "FORK",
        w = "JOIN",
        x = "CANCEL",
        E = "SELECT",
        k = "ACTION_CHANNEL",
        S = "CANCELLED",
        O = "FLUSH",
        C = "GET_CONTEXT",
        T = "SET_CONTEXT",
        M = "\n(HINT: if you are getting this errors in tests, consider using createMockTask from redux-saga/utils)",
        A = function(e, t) {
            var n;
            return n = {},
                n[h] = !0,
                n[e] = t,
                n
        };
    r.maybe = function() {
        var e = r.apply(void 0, arguments);
        return e[f].maybe = !0,
            e
    };
    r.maybe;
    o.resolve = function() {
            var e = o.apply(void 0, arguments);
            return e[m].resolve = !0,
                e
        },
        o.sync = Object(p.k)(o.resolve, Object(p.w)("put.sync", "put.resolve"));
    var P = function(e) {
            return function(t) {
                return t && t[h] && t[e]
            }
        },
        N = {
            take: P(f),
            put: P(m),
            all: P(g),
            race: P(y),
            call: P(v),
            cps: P(b),
            fork: P(_),
            join: P(w),
            cancel: P(x),
            select: P(E),
            actionChannel: P(k),
            cancelled: P(S),
            flush: P(O),
            getContext: P(C),
            setContext: P(T)
        }
}