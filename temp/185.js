 function (e, t, n) {
    "use strict";

    function r(e, t) {
        for (var n in t) {
            var r = t[n];
            r.configurable = r.enumerable = !0,
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, n, r)
        }
        return e
    }

    function o(e) {
        return ("*" === e ? v.wildcard : l.n.array(e) ? v.array : l.n.stringableFunc(e) ? v.default : l.n.func(e) ? v.predicate : v.default)(e)
    }

    function a(e, t, n) {
        function r(e) {
            a(),
                n(e, !0)
        }

        function o(e) {
            i.push(e),
                e.cont = function (o, a) {
                    c || (Object(l.t)(i, e),
                        e.cont = l.r,
                        a ? r(o) : (e === t && (s = o),
                            i.length || (c = !0,
                                n(s))))
                }
        }

        function a() {
            c || (c = !0,
                i.forEach(function (e) {
                    e.cont = l.r,
                        e.cancel()
                }),
                i = [])
        }
        var i = [],
            s = void 0,
            c = !1;
        return o(t), {
            addTask: o,
            cancelAll: a,
            abort: r,
            getTasks: function () {
                return i
            },
            taskNames: function () {
                return i.map(function (e) {
                    return e.name
                })
            }
        }
    }

    function i(e) {
        var t = e.context,
            n = e.fn,
            r = e.args;
        if (l.n.iterator(n))
            return n;
        var o = void 0,
            a = void 0;
        try {
            o = n.apply(t, r)
        } catch (e) {
            a = e
        }
        return l.n.iterator(o) ? o : a ? Object(l.q)(function () {
            throw a
        }) : Object(l.q)(function () {
            var e = void 0,
                t = {
                    done: !1,
                    value: o
                },
                n = function (e) {
                    return {
                        done: !0,
                        value: e
                    }
                };
            return function (r) {
                return e ? n(r) : (e = !0,
                    t)
            }
        }())
    }

    function s(e) {
        function t() {
            te.isRunning && !te.isCancelled && (te.isCancelled = !0,
                f(y))
        }

        function n() {
            e._isRunning && !e._isCancelled && (e._isCancelled = !0,
                ne.cancelAll(),
                v(y))
        }

        function f(t, n) {
            if (!te.isRunning)
                throw new Error("Trying to resume an already finished generator");
            try {
                var r = void 0;
                n ? r = e.throw(t) : t === y ? (te.isCancelled = !0,
                    f.cancel(),
                    r = l.n.func(e.return) ? e.return(y) : {
                        done: !0,
                        value: y
                    }) : r = t === g ? l.n.func(e.return) ? e.return() : {
                        done: !0
                    } : e.next(t),
                    r.done ? (te.isMainRunning = !1,
                        te.cont && te.cont(r.value)) : _(r.value, U, "", f)
            } catch (e) {
                te.isCancelled && Z(e),
                    te.isMainRunning = !1,
                    te.cont(e, !0)
            }
        }

        function v(t, n) {
            e._isRunning = !1,
                Q.close(),
                n ? (t instanceof Error && Object.defineProperty(t, "sagaStack", {
                    value: "at " + H + " \n " + (t.sagaStack || t.stack),
                    configurable: !0
                }),
                    ee.cont || (t instanceof Error && X ? X(t) : Z(t)),
                    e._error = t,
                    e._isAborted = !0,
                    e._deferredEnd && e._deferredEnd.reject(t)) : (e._result = t,
                        e._deferredEnd && e._deferredEnd.resolve(t)),
                ee.cont && ee.cont(t, n),
                ee.joiners.forEach(function (e) {
                    return e.cb(t, n)
                }),
                ee.joiners = null
        }

        function _(e, t) {
            function n(e, t) {
                i || (i = !0,
                    o.cancel = l.r,
                    K && (t ? K.effectRejected(a, e) : K.effectResolved(a, e)),
                    o(e, t))
            }
            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                o = arguments[3],
                a = Object(l.v)();
            K && K.effectTriggered({
                effectId: a,
                parentEffectId: t,
                label: r,
                effect: e
            });
            var i = void 0;
            n.cancel = l.r,
                o.cancel = function () {
                    if (!i) {
                        i = !0;
                        try {
                            n.cancel()
                        } catch (e) {
                            Z(e)
                        }
                        n.cancel = l.r,
                            K && K.effectCancelled(a)
                    }
                };
            var s = void 0;
            return l.n.promise(e) ? w(e, n) : l.n.helper(e) ? C(b(e), a, n) : l.n.iterator(e) ? x(e, a, H, n) : l.n.array(e) ? G(e, a, n) : (s = u.c.take(e)) ? E(s, n) : (s = u.c.put(e)) ? k(s, n) : (s = u.c.all(e)) ? A(s, a, n) : (s = u.c.race(e)) ? P(s, a, n) : (s = u.c.call(e)) ? S(s, a, n) : (s = u.c.cps(e)) ? O(s, n) : (s = u.c.fork(e)) ? C(s, a, n) : (s = u.c.join(e)) ? T(s, n) : (s = u.c.cancel(e)) ? M(s, n) : (s = u.c.select(e)) ? N(s, n) : (s = u.c.actionChannel(e)) ? j(s, n) : (s = u.c.flush(e)) ? R(s, n) : (s = u.c.cancelled(e)) ? D(s, n) : (s = u.c.getContext(e)) ? I(s, n) : (s = u.c.setContext(e)) ? L(s, n) : n(e)
        }

        function w(e, t) {
            var n = e[l.a];
            l.n.func(n) ? t.cancel = n : l.n.func(e.abort) && (t.cancel = function () {
                return e.abort()
            }),
                e.then(t, function (e) {
                    return t(e, !0)
                })
        }

        function x(e, t, n, r) {
            s(e, B, F, q, $, W, t, n, r)
        }

        function E(e, t) {
            var n = e.channel,
                r = e.pattern,
                a = e.maybe;
            n = n || Q;
            var i = function (e) {
                return e instanceof Error ? t(e, !0) : t(Object(d.d)(e) && !a ? g : e)
            };
            try {
                n.take(i, o(r))
            } catch (e) {
                return t(e, !0)
            }
            t.cancel = i.cancel
        }

        function k(e, t) {
            var n = e.channel,
                r = e.action,
                o = e.resolve;
            Object(c.a)(function () {
                var e = void 0;
                try {
                    e = (n ? n.put : F)(r)
                } catch (e) {
                    if (n || o)
                        return t(e, !0);
                    Z(e)
                }
                if (!o || !l.n.promise(e))
                    return t(e);
                w(e, t)
            })
        }

        function S(e, t, n) {
            var r = e.context,
                o = e.fn,
                a = e.args,
                i = void 0;
            try {
                i = o.apply(r, a)
            } catch (e) {
                return n(e, !0)
            }
            return l.n.promise(i) ? w(i, n) : l.n.iterator(i) ? x(i, t, o.name, n) : n(i)
        }

        function O(e, t) {
            var n = e.context,
                r = e.fn,
                o = e.args;
            try {
                var a = function (e, n) {
                    return l.n.undef(e) ? t(n) : t(e, !0)
                };
                r.apply(n, o.concat(a)),
                    a.cancel && (t.cancel = function () {
                        return a.cancel()
                    })
            } catch (e) {
                return t(e, !0)
            }
        }

        function C(e, t, n) {
            var r = e.context,
                o = e.fn,
                a = e.args,
                u = e.detached,
                d = i({
                    context: r,
                    fn: o,
                    args: a
                });
            try {
                Object(c.c)();
                var p = s(d, B, F, q, $, W, t, o.name, u ? null : l.r);
                u ? n(p) : d._isRunning ? (ne.addTask(p),
                    n(p)) : d._error ? ne.abort(d._error) : n(p)
            } finally {
                Object(c.b)()
            }
        }

        function T(e, t) {
            if (e.isRunning()) {
                var n = {
                    task: ee,
                    cb: t
                };
                t.cancel = function () {
                    return Object(l.t)(e.joiners, n)
                },
                    e.joiners.push(n)
            } else
                e.isAborted() ? t(e.error(), !0) : t(e.result())
        }

        function M(e, t) {
            e === l.d && (e = ee),
                e.isRunning() && e.cancel(),
                t()
        }

        function A(e, t, n) {
            function r() {
                a === o.length && (i = !0,
                    n(l.n.array(e) ? l.f.from(h({}, s, {
                        length: o.length
                    })) : s))
            }
            var o = Object.keys(e);
            if (!o.length)
                return n(l.n.array(e) ? [] : {});
            var a = 0,
                i = void 0,
                s = {},
                c = {};
            o.forEach(function (e) {
                var t = function (t, o) {
                    i || (o || Object(d.d)(t) || t === g || t === y ? (n.cancel(),
                        n(t, o)) : (s[e] = t,
                            a++,
                            r()))
                };
                t.cancel = l.r,
                    c[e] = t
            }),
                n.cancel = function () {
                    i || (i = !0,
                        o.forEach(function (e) {
                            return c[e].cancel()
                        }))
                },
                o.forEach(function (n) {
                    return _(e[n], t, n, c[n])
                })
        }

        function P(e, t, n) {
            var r = void 0,
                o = Object.keys(e),
                a = {};
            o.forEach(function (t) {
                var i = function (a, i) {
                    if (!r)
                        if (i)
                            n.cancel(),
                                n(a, !0);
                        else if (!Object(d.d)(a) && a !== g && a !== y) {
                            var s;
                            n.cancel(),
                                r = !0;
                            var c = (s = {},
                                s[t] = a,
                                s);
                            n(l.n.array(e) ? [].slice.call(h({}, c, {
                                length: o.length
                            })) : c)
                        }
                };
                i.cancel = l.r,
                    a[t] = i
            }),
                n.cancel = function () {
                    r || (r = !0,
                        o.forEach(function (e) {
                            return a[e].cancel()
                        }))
                },
                o.forEach(function (n) {
                    r || _(e[n], t, n, a[n])
                })
        }

        function N(e, t) {
            var n = e.selector,
                r = e.args;
            try {
                var o = n.apply(void 0, [q()].concat(r));
                t(o)
            } catch (e) {
                t(e, !0)
            }
        }

        function j(e, t) {
            var n = e.pattern,
                r = e.buffer,
                a = o(n);
            a.pattern = n,
                t(Object(d.c)(B, r || p.a.fixed(), a))
        }

        function D(e, t) {
            t(!!te.isCancelled)
        }

        function R(e, t) {
            e.flush(t)
        }

        function I(e, t) {
            t($[e])
        }

        function L(e, t) {
            l.s.assign($, e),
                t()
        }
        var B = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function () {
            return l.r
        },
            F = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : l.r,
            q = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : l.r,
            z = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
            W = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {},
            U = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0,
            H = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : "anonymous",
            Y = arguments[8];
        Object(l.g)(e, l.n.iterator, m);
        var G = Object(l.k)(A, Object(l.w)("[...effects]", "all([...effects])")),
            K = W.sagaMonitor,
            V = W.logger,
            X = W.onError,
            J = V || l.p,
            Z = function (e) {
                var t = e.sagaStack;
                !t && e.stack && (t = -1 !== e.stack.split("\n")[0].indexOf(e.message) ? e.stack : "Error: " + e.message + "\n" + e.stack),
                    J("error", "uncaught at " + H, t || e.message || e)
            },
            Q = Object(d.e)(B),
            $ = Object.create(z);
        f.cancel = l.r;
        var ee = function (e, t, o, a) {
            var i, s, c;
            return o._deferredEnd = null,
                s = {},
                s[l.e] = !0,
                s.id = e,
                s.name = t,
                i = "done",
                c = {},
                c[i] = c[i] || {},
                c[i].get = function () {
                    if (o._deferredEnd)
                        return o._deferredEnd.promise;
                    var e = Object(l.i)();
                    return o._deferredEnd = e,
                        o._isRunning || (o._error ? e.reject(o._error) : e.resolve(o._result)),
                        e.promise
                },
                s.cont = a,
                s.joiners = [],
                s.cancel = n,
                s.isRunning = function () {
                    return o._isRunning
                },
                s.isCancelled = function () {
                    return o._isCancelled
                },
                s.isAborted = function () {
                    return o._isAborted
                },
                s.result = function () {
                    return o._result
                },
                s.error = function () {
                    return o._error
                },
                s.setContext = function (e) {
                    Object(l.g)(e, l.n.object, Object(l.h)("task", e)),
                        l.s.assign($, e)
                },
                r(s, c),
                s
        }(U, H, e, Y),
            te = {
                name: H,
                cancel: t,
                isRunning: !0
            },
            ne = a(H, te, v);
        return Y && (Y.cancel = n),
            e._isRunning = !0,
            f(),
            ee
    }
    t.a = s;
    var l = n(26),
        c = n(183),
        u = n(49),
        d = n(66),
        p = n(85),
        h = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        f = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
            return typeof e
        } :
            function (e) {
                return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
        m = "proc first argument (Saga function result) must be an iterator",
        g = {
            toString: function () {
                return "@@redux-saga/CHANNEL_END"
            }
        },
        y = {
            toString: function () {
                return "@@redux-saga/TASK_CANCEL"
            }
        },
        v = {
            wildcard: function () {
                return l.o
            },
            default: function (e) {
                return "symbol" === ("undefined" === typeof e ? "undefined" : f(e)) ? function (t) {
                    return t.type === e
                } :
                    function (t) {
                        return t.type === String(e)
                    }
            },
            array: function (e) {
                return function (t) {
                    return e.some(function (e) {
                        return o(e)(t)
                    })
                }
            },
            predicate: function (e) {
                return function (t) {
                    return e(t)
                }
            }
        },
        b = function (e) {
            return {
                fn: e
            }
        }
}