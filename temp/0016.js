function(e, t, n) {
    "use strict";

    function r(e) {
        if ("object" !== typeof e || null === e)
            return !1;
        for (var t = e; null !== Object.getPrototypeOf(t);)
            t = Object.getPrototypeOf(t);
        return Object.getPrototypeOf(e) === t
    }

    function o(e, t, n) {
        function a() {
            g === f && (g = f.slice())
        }

        function i() {
            if (v)
                throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
            return h
        }

        function s(e) {
            if ("function" !== typeof e)
                throw new Error("Expected the listener to be a function.");
            if (v)
                throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribelistener for more details.");
            var t = !0;
            return a(),
                g.push(e),
                function() {
                    if (t) {
                        if (v)
                            throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribelistener for more details.");
                        t = !1,
                            a();
                        var n = g.indexOf(e);
                        g.splice(n, 1),
                            f = null
                    }
                }
        }

        function l(e) {
            if (!r(e))
                throw new Error("Actions must be plain objects. Use custom middleware for async actions.");
            if ("undefined" === typeof e.type)
                throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
            if (v)
                throw new Error("Reducers may not dispatch actions.");
            try {
                v = !0,
                    h = p(h, e)
            } finally {
                v = !1
            }
            for (var t = f = g, n = 0; n < t.length; n++) {
                (0,
                    t[n])()
            }
            return e
        }

        function c(e) {
            if ("function" !== typeof e)
                throw new Error("Expected the nextReducer to be a function.");
            p = e,
                l({
                    type: y.REPLACE
                })
        }

        function u() {
            var e, t = s;
            return e = {
                    subscribe: function(e) {
                        function n() {
                            e.next && e.next(i())
                        }
                        if ("object" !== typeof e || null === e)
                            throw new TypeError("Expected the observer to be an object.");
                        return n(), {
                            unsubscribe: t(n)
                        }
                    }
                },
                e[m.a] = function() {
                    return this
                },
                e
        }
        var d;
        if ("function" === typeof t && "function" === typeof n || "function" === typeof n && "function" === typeof arguments[3])
            throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function.");
        if ("function" === typeof t && "undefined" === typeof n && (n = t,
                t = void 0),
            "undefined" !== typeof n) {
            if ("function" !== typeof n)
                throw new Error("Expected the enhancer to be a function.");
            return n(o)(e, t)
        }
        if ("function" !== typeof e)
            throw new Error("Expected the reducer to be a function.");
        var p = e,
            h = t,
            f = [],
            g = f,
            v = !1;
        return l({
                type: y.INIT
            }),
            d = {
                dispatch: l,
                subscribe: s,
                getState: i,
                replaceReducer: c
            },
            d[m.a] = u,
            d
    }

    function a(e, t) {
        var n = t && t.type;
        return "Given " + (n && 'action "' + String(n) + '"' || "an action") + ', reducer "' + e + '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'
    }

    function i(e) {
        Object.keys(e).forEach(function(t) {
            var n = e[t];
            if ("undefined" === typeof n(void 0, {
                    type: y.INIT
                }))
                throw new Error('Reducer "' + t + "\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");
            if ("undefined" === typeof n(void 0, {
                    type: y.PROBE_UNKNOWN_ACTION()
                }))
                throw new Error('Reducer "' + t + "\" returned undefined when probed with a random type. Don't try to handle " + y.INIT + ' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.')
        })
    }

    function s(e) {
        for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
            var o = t[r];
            "function" === typeof e[o] && (n[o] = e[o])
        }
        var s, l = Object.keys(n);
        try {
            i(n)
        } catch (e) {
            s = e
        }
        return function(e, t) {
            if (void 0 === e && (e = {}),
                s)
                throw s;
            for (var r = !1, o = {}, i = 0; i < l.length; i++) {
                var c = l[i],
                    u = n[c],
                    d = e[c],
                    p = u(d, t);
                if ("undefined" === typeof p) {
                    var h = a(c, t);
                    throw new Error(h)
                }
                o[c] = p,
                    r = r || p !== d
            }
            return r = r || l.length !== Object.keys(e).length,
                r ? o : e
        }
    }

    function l(e, t) {
        return function() {
            return t(e.apply(this, arguments))
        }
    }

    function c(e, t) {
        if ("function" === typeof e)
            return l(e, t);
        if ("object" !== typeof e || null === e)
            throw new Error("bindActionCreators expected an object or a function, instead received " + (null === e ? "null" : typeof e) + '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
        var n = {};
        for (var r in e) {
            var o = e[r];
            "function" === typeof o && (n[r] = l(o, t))
        }
        return n
    }

    function u(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
    }

    function d(e, t) {
        var n = Object.keys(e);
        return Object.getOwnPropertySymbols && n.push.apply(n, Object.getOwnPropertySymbols(e)),
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })),
            n
    }

    function p(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? d(n, !0).forEach(function(t) {
                u(e, t, n[t])
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : d(n).forEach(function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
            })
        }
        return e
    }

    function h() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
        return 0 === t.length ? function(e) {
                return e
            } :
            1 === t.length ? t[0] : t.reduce(function(e, t) {
                return function() {
                    return e(t.apply(void 0, arguments))
                }
            })
    }

    function f() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
        return function(e) {
            return function() {
                var n = e.apply(void 0, arguments),
                    r = function() {
                        throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.")
                    },
                    o = {
                        getState: n.getState,
                        dispatch: function() {
                            return r.apply(void 0, arguments)
                        }
                    },
                    a = t.map(function(e) {
                        return e(o)
                    });
                return r = h.apply(void 0, a)(n.dispatch),
                    p({}, n, {
                        dispatch: r
                    })
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        n.d(t, "__DO_NOT_USE__ActionTypes", function() {
            return y
        }),
        n.d(t, "applyMiddleware", function() {
            return f
        }),
        n.d(t, "bindActionCreators", function() {
            return c
        }),
        n.d(t, "combineReducers", function() {
            return s
        }),
        n.d(t, "compose", function() {
            return h
        }),
        n.d(t, "createStore", function() {
            return o
        });
    var m = n(314),
        g = function() {
            return Math.random().toString(36).substring(7).split("").join(".")
        },
        y = {
            INIT: "@@redux/INIT" + g(),
            REPLACE: "@@redux/REPLACE" + g(),
            PROBE_UNKNOWN_ACTION: function() {
                return "@@redux/PROBE_UNKNOWN_ACTION" + g()
            }
        }
}