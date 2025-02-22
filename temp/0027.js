function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        if (!t(e))
            throw c("error", "uncaught at check", n),
                new Error(n)
    }

    function o(e, t) {
        return S.notUndef(e) && k.call(e, t)
    }

    function a(e, t) {
        var n = e.indexOf(t);
        n >= 0 && e.splice(n, 1)
    }

    function i() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = d({}, e),
            n = new Promise(function(e, n) {
                t.resolve = e,
                    t.reject = n
            });
        return t.promise = n,
            t
    }

    function s(e) {
        var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
            n = void 0,
            r = new Promise(function(r) {
                n = setTimeout(function() {
                    return r(t)
                }, e)
            });
        return r[y] = function() {
                return clearTimeout(n)
            },
            r
    }

    function l(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : M,
            n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
            r = arguments[3],
            o = {
                name: n,
                next: e,
                throw: t,
                return: A
            };
        return r && (o[m] = !0),
            "undefined" !== typeof Symbol && (o[Symbol.iterator] = function() {
                return o
            }),
            o
    }

    function c(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
        "undefined" === typeof window ? console.log("redux-saga " + e + ": " + t + "\n" + (n && n.stack || n)) : console[e](t, n)
    }

    function u(e, t) {
        return function() {
            return e.apply(void 0, arguments)
        }
    }
    n.d(t, "u", function() {
            return h
        }),
        n.d(t, "e", function() {
            return f
        }),
        n.d(t, "b", function() {
            return g
        }),
        n.d(t, "a", function() {
            return y
        }),
        n.d(t, "c", function() {
            return v
        }),
        n.d(t, "d", function() {
            return b
        }),
        n.d(t, "o", function() {
            return w
        }),
        n.d(t, "r", function() {
            return x
        }),
        n.d(t, "l", function() {
            return E
        }),
        t.g = r,
        n.d(t, "n", function() {
            return S
        }),
        n.d(t, "s", function() {
            return O
        }),
        t.t = a,
        n.d(t, "f", function() {
            return C
        }),
        t.i = i,
        t.j = s,
        n.d(t, "v", function() {
            return T
        }),
        t.q = l,
        t.p = c,
        t.k = u,
        n.d(t, "w", function() {
            return P
        }),
        n.d(t, "m", function() {
            return N
        }),
        n.d(t, "h", function() {
            return j
        }),
        n.d(t, "x", function() {
            return D
        });
    var d = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        p = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(e) {
            return typeof e
        } :
        function(e) {
            return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        h = function(e) {
            return "@@redux-saga/" + e
        },
        f = h("TASK"),
        m = h("HELPER"),
        g = h("MATCH"),
        y = h("CANCEL_PROMISE"),
        v = h("SAGA_ACTION"),
        b = h("SELF_CANCELLATION"),
        _ = function(e) {
            return function() {
                return e
            }
        },
        w = _(!0),
        x = function() {},
        E = function(e) {
            return e
        },
        k = Object.prototype.hasOwnProperty,
        S = {
            undef: function(e) {
                return null === e || void 0 === e
            },
            notUndef: function(e) {
                return null !== e && void 0 !== e
            },
            func: function(e) {
                return "function" === typeof e
            },
            number: function(e) {
                return "number" === typeof e
            },
            string: function(e) {
                return "string" === typeof e
            },
            array: Array.isArray,
            object: function(e) {
                return e && !S.array(e) && "object" === ("undefined" === typeof e ? "undefined" : p(e))
            },
            promise: function(e) {
                return e && S.func(e.then)
            },
            iterator: function(e) {
                return e && S.func(e.next) && S.func(e.throw)
            },
            iterable: function(e) {
                return e && S.func(Symbol) ? S.func(e[Symbol.iterator]) : S.array(e)
            },
            task: function(e) {
                return e && e[f]
            },
            observable: function(e) {
                return e && S.func(e.subscribe)
            },
            buffer: function(e) {
                return e && S.func(e.isEmpty) && S.func(e.take) && S.func(e.put)
            },
            pattern: function(e) {
                return e && (S.string(e) || "symbol" === ("undefined" === typeof e ? "undefined" : p(e)) || S.func(e) || S.array(e))
            },
            channel: function(e) {
                return e && S.func(e.take) && S.func(e.close)
            },
            helper: function(e) {
                return e && e[m]
            },
            stringableFunc: function(e) {
                return S.func(e) && o(e, "toString")
            }
        },
        O = {
            assign: function(e, t) {
                for (var n in t)
                    o(t, n) && (e[n] = t[n])
            }
        },
        C = {
            from: function(e) {
                var t = Array(e.length);
                for (var n in e)
                    o(e, n) && (t[n] = e[n]);
                return t
            }
        },
        T = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
            return function() {
                return ++e
            }
        }(),
        M = function(e) {
            throw e
        },
        A = function(e) {
            return {
                value: e,
                done: !0
            }
        },
        P = function(e, t) {
            return e + " has been deprecated in favor of " + t + ", please update your code"
        },
        N = function(e) {
            return new Error("\n  redux-saga: Error checking hooks detected an inconsistent state. This is likely a bug\n  in redux-saga code and not yours. Thanks for reporting this in the project's github repo.\n  Error: " + e + "\n")
        },
        j = function(e, t) {
            return (e ? e + "." : "") + "setContext(props): argument " + t + " is not a plain object"
        },
        D = function(e) {
            return function(t) {
                return e(Object.defineProperty(t, v, {
                    value: !0
                }))
            }
        }
}