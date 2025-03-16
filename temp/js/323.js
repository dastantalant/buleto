 function (e, t, n) {
    "use strict";

    function r(e, t) {
        var n = {};
        for (var r in e)
            t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
        return n
    }

    function o() {
        function e(t) {
            var n = t.getState,
                r = t.dispatch,
                p = Object(i.b)();
            return p.emit = (l.emitter || a.l)(p.emit),
                e.run = s.a.bind(null, {
                    context: o,
                    subscribe: p.subscribe,
                    dispatch: r,
                    getState: n,
                    sagaMonitor: c,
                    logger: u,
                    onError: d
                }),
                function (e) {
                    return function (t) {
                        c && c.actionDispatched && c.actionDispatched(t);
                        var n = e(t);
                        return p.emit(t),
                            n
                    }
                }
        }
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            n = t.context,
            o = void 0 === n ? {} : n,
            l = r(t, ["context"]),
            c = l.sagaMonitor,
            u = l.logger,
            d = l.onError;
        if (a.n.func(l))
            throw new Error("Saga middleware no longer accept Generator functions. Use sagaMiddleware.run instead");
        if (u && !a.n.func(u))
            throw new Error("`options.logger` passed to the Saga middleware is not a function!");
        if (d && !a.n.func(d))
            throw new Error("`options.onError` passed to the Saga middleware is not a function!");
        if (l.emitter && !a.n.func(l.emitter))
            throw new Error("`options.emitter` passed to the Saga middleware is not a function!");
        return e.run = function () {
            throw new Error("Before running a Saga, you must mount the Saga middleware on the Store using applyMiddleware")
        },
            e.setContext = function (e) {
                Object(a.g)(e, a.n.object, Object(a.h)("sagaMiddleware", e)),
                    a.s.assign(o, e)
            },
            e
    }
    t.a = o;
    var a = n(26),
        i = n(66),
        s = n(184)
}