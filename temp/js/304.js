 function (e, t, n) {
    "use strict";

    function r(e, t) {
        var n = e.length;
        e.push(t);
        e: for (; ;) {
            var r = n - 1 >>> 1,
                o = e[r];
            if (!(void 0 !== o && 0 < i(o, t)))
                break e;
            e[r] = t,
                e[n] = o,
                n = r
        }
    }

    function o(e) {
        return e = e[0],
            void 0 === e ? null : e
    }

    function a(e) {
        var t = e[0];
        if (void 0 !== t) {
            var n = e.pop();
            if (n !== t) {
                e[0] = n;
                e: for (var r = 0, o = e.length; r < o;) {
                    var a = 2 * (r + 1) - 1,
                        s = e[a],
                        l = a + 1,
                        c = e[l];
                    if (void 0 !== s && 0 > i(s, n))
                        void 0 !== c && 0 > i(c, s) ? (e[r] = c,
                            e[l] = n,
                            r = l) : (e[r] = s,
                                e[a] = n,
                                r = a);
                    else {
                        if (!(void 0 !== c && 0 > i(c, n)))
                            break e;
                        e[r] = c,
                            e[l] = n,
                            r = l
                    }
                }
            }
            return t
        }
        return null
    }

    function i(e, t) {
        var n = e.sortIndex - t.sortIndex;
        return 0 !== n ? n : e.id - t.id
    }

    function s(e) {
        for (var t = o(D); null !== t;) {
            if (null === t.callback)
                a(D);
            else {
                if (!(t.startTime <= e))
                    break;
                a(D),
                    t.sortIndex = t.expirationTime,
                    r(j, t)
            }
            t = o(D)
        }
    }

    function l(e) {
        if (q = !1,
            s(e), !F)
            if (null !== o(j))
                F = !0,
                    d(c);
            else {
                var t = o(D);
                null !== t && p(l, t.startTime - e)
            }
    }

    function c(e, n) {
        F = !1,
            q && (q = !1,
                h()),
            B = !0;
        var r = L;
        try {
            for (s(n),
                I = o(j); null !== I && (!(I.expirationTime > n) || e && !f());) {
                var i = I.callback;
                if (null !== i) {
                    I.callback = null,
                        L = I.priorityLevel;
                    var c = i(I.expirationTime <= n);
                    n = t.unstable_now(),
                        "function" === typeof c ? I.callback = c : I === o(j) && a(j),
                        s(n)
                } else
                    a(j);
                I = o(j)
            }
            if (null !== I)
                var u = !0;
            else {
                var d = o(D);
                null !== d && p(l, d.startTime - n),
                    u = !1
            }
            return u
        } finally {
            I = null,
                L = r,
                B = !1
        }
    }

    function u(e) {
        switch (e) {
            case 1:
                return -1;
            case 2:
                return 250;
            case 5:
                return 1073741823;
            case 4:
                return 1e4;
            default:
                return 5e3
        }
    }
    var d, p, h, f, m;
    if ("undefined" === typeof window || "function" !== typeof MessageChannel) {
        var g = null,
            y = null,
            v = function () {
                if (null !== g)
                    try {
                        var e = t.unstable_now();
                        g(!0, e),
                            g = null
                    } catch (e) {
                        throw setTimeout(v, 0),
                        e
                    }
            },
            b = Date.now();
        t.unstable_now = function () {
            return Date.now() - b
        },
            d = function (e) {
                null !== g ? setTimeout(d, 0, e) : (g = e,
                    setTimeout(v, 0))
            },
            p = function (e, t) {
                y = setTimeout(e, t)
            },
            h = function () {
                clearTimeout(y)
            },
            f = function () {
                return !1
            },
            m = t.unstable_forceFrameRate = function () { }
    } else {
        var _ = window.performance,
            w = window.Date,
            x = window.setTimeout,
            E = window.clearTimeout;
        if ("undefined" !== typeof console) {
            var k = window.cancelAnimationFrame;
            "function" !== typeof window.requestAnimationFrame && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"),
                "function" !== typeof k && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills")
        }
        if ("object" === typeof _ && "function" === typeof _.now)
            t.unstable_now = function () {
                return _.now()
            };
        else {
            var S = w.now();
            t.unstable_now = function () {
                return w.now() - S
            }
        }
        var O = !1,
            C = null,
            T = -1,
            M = 5,
            A = 0;
        f = function () {
            return t.unstable_now() >= A
        },
            m = function () { },
            t.unstable_forceFrameRate = function (e) {
                0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported") : M = 0 < e ? Math.floor(1e3 / e) : 5
            };
        var P = new MessageChannel,
            N = P.port2;
        P.port1.onmessage = function () {
            if (null !== C) {
                var e = t.unstable_now();
                A = e + M;
                try {
                    C(!0, e) ? N.postMessage(null) : (O = !1,
                        C = null)
                } catch (e) {
                    throw N.postMessage(null),
                    e
                }
            } else
                O = !1
        },
            d = function (e) {
                C = e,
                    O || (O = !0,
                        N.postMessage(null))
            },
            p = function (e, n) {
                T = x(function () {
                    e(t.unstable_now())
                }, n)
            },
            h = function () {
                E(T),
                    T = -1
            }
    }
    var j = [],
        D = [],
        R = 1,
        I = null,
        L = 3,
        B = !1,
        F = !1,
        q = !1,
        z = m;
    t.unstable_IdlePriority = 5,
        t.unstable_ImmediatePriority = 1,
        t.unstable_LowPriority = 4,
        t.unstable_NormalPriority = 3,
        t.unstable_Profiling = null,
        t.unstable_UserBlockingPriority = 2,
        t.unstable_cancelCallback = function (e) {
            e.callback = null
        },
        t.unstable_continueExecution = function () {
            F || B || (F = !0,
                d(c))
        },
        t.unstable_getCurrentPriorityLevel = function () {
            return L
        },
        t.unstable_getFirstCallbackNode = function () {
            return o(j)
        },
        t.unstable_next = function (e) {
            switch (L) {
                case 1:
                case 2:
                case 3:
                    var t = 3;
                    break;
                default:
                    t = L
            }
            var n = L;
            L = t;
            try {
                return e()
            } finally {
                L = n
            }
        },
        t.unstable_pauseExecution = function () { },
        t.unstable_requestPaint = z,
        t.unstable_runWithPriority = function (e, t) {
            switch (e) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                default:
                    e = 3
            }
            var n = L;
            L = e;
            try {
                return t()
            } finally {
                L = n
            }
        },
        t.unstable_scheduleCallback = function (e, n, a) {
            var i = t.unstable_now();
            if ("object" === typeof a && null !== a) {
                var s = a.delay;
                s = "number" === typeof s && 0 < s ? i + s : i,
                    a = "number" === typeof a.timeout ? a.timeout : u(e)
            } else
                a = u(e),
                    s = i;
            return a = s + a,
                e = {
                    id: R++,
                    callback: n,
                    priorityLevel: e,
                    startTime: s,
                    expirationTime: a,
                    sortIndex: -1
                },
                s > i ? (e.sortIndex = s,
                    r(D, e),
                    null === o(j) && e === o(D) && (q ? h() : q = !0,
                        p(l, s - i))) : (e.sortIndex = a,
                            r(j, e),
                            F || B || (F = !0,
                                d(c))),
                e
        },
        t.unstable_shouldYield = function () {
            var e = t.unstable_now();
            s(e);
            var n = o(j);
            return n !== I && null !== I && null !== n && null !== n.callback && n.startTime <= e && n.expirationTime < I.expirationTime || f()
        },
        t.unstable_wrapCallback = function (e) {
            var t = L;
            return function () {
                var n = L;
                L = t;
                try {
                    return e.apply(this, arguments)
                } finally {
                    L = n
                }
            }
        }
}