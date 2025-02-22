function(e, t, n) {
    "use strict";

    function r(e) {
        return "/" === e.charAt(0) ? e : "/" + e
    }

    function o(e) {
        return "/" === e.charAt(0) ? e.substr(1) : e
    }

    function a(e, t) {
        return 0 === e.toLowerCase().indexOf(t.toLowerCase()) && -1 !== "/?#".indexOf(e.charAt(t.length))
    }

    function i(e, t) {
        return a(e, t) ? e.substr(t.length) : e
    }

    function s(e) {
        return "/" === e.charAt(e.length - 1) ? e.slice(0, -1) : e
    }

    function l(e) {
        var t = e || "/",
            n = "",
            r = "",
            o = t.indexOf("#"); -
        1 !== o && (r = t.substr(o),
            t = t.substr(0, o));
        var a = t.indexOf("?");
        return -1 !== a && (n = t.substr(a),
            t = t.substr(0, a)), {
            pathname: t,
            search: "?" === n ? "" : n,
            hash: "#" === r ? "" : r
        }
    }

    function c(e) {
        var t = e.pathname,
            n = e.search,
            r = e.hash,
            o = t || "/";
        return n && "?" !== n && (o += "?" === n.charAt(0) ? n : "?" + n),
            r && "#" !== r && (o += "#" === r.charAt(0) ? r : "#" + r),
            o
    }

    function u(e, t, n, r) {
        var o;
        "string" === typeof e ? (o = l(e),
            o.state = t) : (o = Object(C.a)({}, e),
            void 0 === o.pathname && (o.pathname = ""),
            o.search ? "?" !== o.search.charAt(0) && (o.search = "?" + o.search) : o.search = "",
            o.hash ? "#" !== o.hash.charAt(0) && (o.hash = "#" + o.hash) : o.hash = "",
            void 0 !== t && void 0 === o.state && (o.state = t));
        try {
            o.pathname = decodeURI(o.pathname)
        } catch (e) {
            throw e instanceof URIError ? new URIError('Pathname "' + o.pathname + '" could not be decoded. This is likely caused by an invalid percent-encoding.') : e
        }
        return n && (o.key = n),
            r ? o.pathname ? "/" !== o.pathname.charAt(0) && (o.pathname = Object(T.a)(o.pathname, r.pathname)) : o.pathname = r.pathname : o.pathname || (o.pathname = "/"),
            o
    }

    function d(e, t) {
        return e.pathname === t.pathname && e.search === t.search && e.hash === t.hash && e.key === t.key && Object(M.a)(e.state, t.state)
    }

    function p() {
        function e(e) {
            return o = e,
                function() {
                    o === e && (o = null)
                }
        }

        function t(e, t, n, r) {
            if (null != o) {
                var a = "function" === typeof o ? o(e, t) : o;
                "string" === typeof a ? "function" === typeof n ? n(a, r) : r(!0) : r(!1 !== a)
            } else
                r(!0)
        }

        function n(e) {
            function t() {
                n && e.apply(void 0, arguments)
            }
            var n = !0;
            return a.push(t),
                function() {
                    n = !1,
                        a = a.filter(function(e) {
                            return e !== t
                        })
                }
        }

        function r() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
                t[n] = arguments[n];
            a.forEach(function(e) {
                return e.apply(void 0, t)
            })
        }
        var o = null,
            a = [];
        return {
            setPrompt: e,
            confirmTransitionTo: t,
            appendListener: n,
            notifyListeners: r
        }
    }

    function h(e, t) {
        t(window.confirm(e))
    }

    function f() {
        var e = window.navigator.userAgent;
        return (-1 === e.indexOf("Android 2.") && -1 === e.indexOf("Android 4.0") || -1 === e.indexOf("Mobile Safari") || -1 !== e.indexOf("Chrome") || -1 !== e.indexOf("Windows Phone")) && (window.history && "pushState" in window.history)
    }

    function m() {
        return -1 === window.navigator.userAgent.indexOf("Trident")
    }

    function g() {
        return -1 === window.navigator.userAgent.indexOf("Firefox")
    }

    function y(e) {
        return void 0 === e.state && -1 === navigator.userAgent.indexOf("CriOS")
    }

    function v() {
        try {
            return window.history.state || {}
        } catch (e) {
            return {}
        }
    }

    function b(e) {
        function t(e) {
            var t = e || {},
                n = t.key,
                r = t.state,
                o = window.location,
                a = o.pathname,
                s = o.search,
                l = o.hash,
                c = a + s + l;
            return U && (c = i(c, U)),
                u(c, r, n)
        }

        function n() {
            return Math.random().toString(36).substr(2, W)
        }

        function o(e) {
            Object(C.a)(J, e),
                J.length = M.length,
                H.notifyListeners(J.location, J.action)
        }

        function a(e) {
            y(e) || d(t(e.state))
        }

        function l() {
            d(t(v()))
        }

        function d(e) {
            if (Y)
                Y = !1,
                o();
            else {
                H.confirmTransitionTo(e, "POP", q, function(t) {
                    t ? o({
                        action: "POP",
                        location: e
                    }) : g(e)
                })
            }
        }

        function g(e) {
            var t = J.location,
                n = K.indexOf(t.key); -
            1 === n && (n = 0);
            var r = K.indexOf(e.key); -
            1 === r && (r = 0);
            var o = n - r;
            o && (Y = !0,
                x(o))
        }

        function b(e) {
            return U + c(e)
        }

        function _(e, t) {
            var r = u(e, t, n(), J.location);
            H.confirmTransitionTo(r, "PUSH", q, function(e) {
                if (e) {
                    var t = b(r),
                        n = r.key,
                        a = r.state;
                    if (D)
                        if (M.pushState({
                                key: n,
                                state: a
                            }, null, t),
                            B)
                            window.location.href = t;
                        else {
                            var i = K.indexOf(J.location.key),
                                s = K.slice(0, i + 1);
                            s.push(r.key),
                                K = s,
                                o({
                                    action: "PUSH",
                                    location: r
                                })
                        }
                    else
                        window.location.href = t
                }
            })
        }

        function w(e, t) {
            var r = u(e, t, n(), J.location);
            H.confirmTransitionTo(r, "REPLACE", q, function(e) {
                if (e) {
                    var t = b(r),
                        n = r.key,
                        a = r.state;
                    if (D)
                        if (M.replaceState({
                                key: n,
                                state: a
                            }, null, t),
                            B)
                            window.location.replace(t);
                        else {
                            var i = K.indexOf(J.location.key); -
                            1 !== i && (K[i] = r.key),
                                o({
                                    action: "REPLACE",
                                    location: r
                                })
                        }
                    else
                        window.location.replace(t)
                }
            })
        }

        function x(e) {
            M.go(e)
        }

        function E() {
            x(-1)
        }

        function k() {
            x(1)
        }

        function S(e) {
            V += e,
                1 === V && 1 === e ? (window.addEventListener(N, a),
                    R && window.addEventListener(j, l)) : 0 === V && (window.removeEventListener(N, a),
                    R && window.removeEventListener(j, l))
        }

        function O(e) {
            void 0 === e && (e = !1);
            var t = H.setPrompt(e);
            return X || (S(1),
                    X = !0),
                function() {
                    return X && (X = !1,
                            S(-1)),
                        t()
                }
        }

        function T(e) {
            var t = H.appendListener(e);
            return S(1),
                function() {
                    S(-1),
                        t()
                }
        }
        void 0 === e && (e = {}),
            P || Object(A.a)(!1);
        var M = window.history,
            D = f(),
            R = !m(),
            I = e,
            L = I.forceRefresh,
            B = void 0 !== L && L,
            F = I.getUserConfirmation,
            q = void 0 === F ? h : F,
            z = I.keyLength,
            W = void 0 === z ? 6 : z,
            U = e.basename ? s(r(e.basename)) : "",
            H = p(),
            Y = !1,
            G = t(v()),
            K = [G.key],
            V = 0,
            X = !1,
            J = {
                length: M.length,
                action: "POP",
                location: G,
                createHref: b,
                push: _,
                replace: w,
                go: x,
                goBack: E,
                goForward: k,
                block: O,
                listen: T
            };
        return J
    }

    function _(e) {
        var t = e.indexOf("#");
        return -1 === t ? e : e.slice(0, t)
    }

    function w() {
        var e = window.location.href,
            t = e.indexOf("#");
        return -1 === t ? "" : e.substring(t + 1)
    }

    function x(e) {
        window.location.hash = e
    }

    function E(e) {
        window.location.replace(_(window.location.href) + "#" + e)
    }

    function k(e) {
        function t() {
            var e = W(w());
            return F && (e = i(e, F)),
                u(e)
        }

        function n(e) {
            Object(C.a)(Q, e),
                Q.length = M.length,
                U.notifyListeners(Q.location, Q.action)
        }

        function o(e, t) {
            return e.pathname === t.pathname && e.search === t.search && e.hash === t.hash
        }

        function a() {
            var e = w(),
                n = z(e);
            if (e !== n)
                E(n);
            else {
                var r = t(),
                    a = Q.location;
                if (!H && o(a, r))
                    return;
                if (Y === c(r))
                    return;
                Y = null,
                    l(r)
            }
        }

        function l(e) {
            if (H)
                H = !1,
                n();
            else {
                U.confirmTransitionTo(e, "POP", I, function(t) {
                    t ? n({
                        action: "POP",
                        location: e
                    }) : d(e)
                })
            }
        }

        function d(e) {
            var t = Q.location,
                n = X.lastIndexOf(c(t)); -
            1 === n && (n = 0);
            var r = X.lastIndexOf(c(e)); -
            1 === r && (r = 0);
            var o = n - r;
            o && (H = !0,
                v(o))
        }

        function f(e) {
            var t = document.querySelector("base"),
                n = "";
            return t && t.getAttribute("href") && (n = _(window.location.href)),
                n + "#" + z(F + c(e))
        }

        function m(e, t) {
            var r = u(e, void 0, void 0, Q.location);
            U.confirmTransitionTo(r, "PUSH", I, function(e) {
                if (e) {
                    var t = c(r),
                        o = z(F + t);
                    if (w() !== o) {
                        Y = t,
                            x(o);
                        var a = X.lastIndexOf(c(Q.location)),
                            i = X.slice(0, a + 1);
                        i.push(t),
                            X = i,
                            n({
                                action: "PUSH",
                                location: r
                            })
                    } else
                        n()
                }
            })
        }

        function y(e, t) {
            var r = u(e, void 0, void 0, Q.location);
            U.confirmTransitionTo(r, "REPLACE", I, function(e) {
                if (e) {
                    var t = c(r),
                        o = z(F + t);
                    w() !== o && (Y = t,
                        E(o));
                    var a = X.indexOf(c(Q.location)); -
                    1 !== a && (X[a] = t),
                        n({
                            action: "REPLACE",
                            location: r
                        })
                }
            })
        }

        function v(e) {
            M.go(e)
        }

        function b() {
            v(-1)
        }

        function k() {
            v(1)
        }

        function S(e) {
            J += e,
                1 === J && 1 === e ? window.addEventListener(D, a) : 0 === J && window.removeEventListener(D, a)
        }

        function O(e) {
            void 0 === e && (e = !1);
            var t = U.setPrompt(e);
            return Z || (S(1),
                    Z = !0),
                function() {
                    return Z && (Z = !1,
                            S(-1)),
                        t()
                }
        }

        function T(e) {
            var t = U.appendListener(e);
            return S(1),
                function() {
                    S(-1),
                        t()
                }
        }
        void 0 === e && (e = {}),
            P || Object(A.a)(!1);
        var M = window.history,
            N = (g(),
                e),
            j = N.getUserConfirmation,
            I = void 0 === j ? h : j,
            L = N.hashType,
            B = void 0 === L ? "slash" : L,
            F = e.basename ? s(r(e.basename)) : "",
            q = R[B],
            z = q.encodePath,
            W = q.decodePath,
            U = p(),
            H = !1,
            Y = null,
            G = w(),
            K = z(G);
        G !== K && E(K);
        var V = t(),
            X = [c(V)],
            J = 0,
            Z = !1,
            Q = {
                length: M.length,
                action: "POP",
                location: V,
                createHref: f,
                push: m,
                replace: y,
                go: v,
                goBack: b,
                goForward: k,
                block: O,
                listen: T
            };
        return Q
    }

    function S(e, t, n) {
        return Math.min(Math.max(e, t), n)
    }

    function O(e) {
        function t(e) {
            Object(C.a)(T, e),
                T.length = T.entries.length,
                x.notifyListeners(T.location, T.action)
        }

        function n() {
            return Math.random().toString(36).substr(2, w)
        }

        function r(e, r) {
            var o = u(e, r, n(), T.location);
            x.confirmTransitionTo(o, "PUSH", m, function(e) {
                if (e) {
                    var n = T.index,
                        r = n + 1,
                        a = T.entries.slice(0);
                    a.length > r ? a.splice(r, a.length - r, o) : a.push(o),
                        t({
                            action: "PUSH",
                            location: o,
                            index: r,
                            entries: a
                        })
                }
            })
        }

        function o(e, r) {
            var o = u(e, r, n(), T.location);
            x.confirmTransitionTo(o, "REPLACE", m, function(e) {
                e && (T.entries[T.index] = o,
                    t({
                        action: "REPLACE",
                        location: o
                    }))
            })
        }

        function a(e) {
            var n = S(T.index + e, 0, T.entries.length - 1),
                r = T.entries[n];
            x.confirmTransitionTo(r, "POP", m, function(e) {
                e ? t({
                    action: "POP",
                    location: r,
                    index: n
                }) : t()
            })
        }

        function i() {
            a(-1)
        }

        function s() {
            a(1)
        }

        function l(e) {
            var t = T.index + e;
            return t >= 0 && t < T.entries.length
        }

        function d(e) {
            return void 0 === e && (e = !1),
                x.setPrompt(e)
        }

        function h(e) {
            return x.appendListener(e)
        }
        void 0 === e && (e = {});
        var f = e,
            m = f.getUserConfirmation,
            g = f.initialEntries,
            y = void 0 === g ? ["/"] : g,
            v = f.initialIndex,
            b = void 0 === v ? 0 : v,
            _ = f.keyLength,
            w = void 0 === _ ? 6 : _,
            x = p(),
            E = S(b, 0, y.length - 1),
            k = y.map(function(e) {
                return "string" === typeof e ? u(e, void 0, n()) : u(e, void 0, e.key || n())
            }),
            O = c,
            T = {
                length: k.length,
                action: "POP",
                location: k[E],
                index: E,
                entries: k,
                createHref: O,
                push: r,
                replace: o,
                go: a,
                goBack: i,
                goForward: s,
                canGo: l,
                block: d,
                listen: h
            };
        return T
    }
    n.d(t, "a", function() {
            return b
        }),
        n.d(t, "b", function() {
            return k
        }),
        n.d(t, "d", function() {
            return O
        }),
        n.d(t, "c", function() {
            return u
        }),
        n.d(t, "f", function() {
            return d
        }),
        n.d(t, "e", function() {
            return c
        });
    var C = n(84),
        T = n(330),
        M = n(331),
        A = (n(332),
            n(333)),
        P = !("undefined" === typeof window || !window.document || !window.document.createElement),
        N = "popstate",
        j = "hashchange",
        D = "hashchange",
        R = {
            hashbang: {
                encodePath: function(e) {
                    return "!" === e.charAt(0) ? e : "!/" + o(e)
                },
                decodePath: function(e) {
                    return "!" === e.charAt(0) ? e.substr(1) : e
                }
            },
            noslash: {
                encodePath: o,
                decodePath: r
            },
            slash: {
                encodePath: r,
                decodePath: r
            }
        }
}