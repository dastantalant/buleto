 function (e, t, n) {
    "use strict";

    function r(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" !== typeof t && "function" !== typeof t ? e : t
    }

    function a(e, t) {
        if ("function" !== typeof t && null !== t)
            throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }

    function i(e) {
        var t = function (t) {
            function n() {
                var e, t, a, i;
                r(this, n);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return t = a = o(this, (e = n.__proto__ || Object.getPrototypeOf(n)).call.apply(e, [this].concat(l))),
                    a.componentDidMount = function () {
                        a.loadJivoChanel()
                    },
                    a.componentDidUpdate = function (e) {
                        a.props.accountNumber === e.accountNumber && a.props.languageId === e.languageId && a.props.pathname === e.pathname || a.loadJivoChanel(),
                            "/traderoom" === e.pathname && a.destroy()
                    },
                    a.componentWillUnmount = function () {
                        a.destroy()
                    },
                    a.loadJivoChanel = function () {
                        if (a.destroy(),
                            a.checkAvailable()) {
                            var e = u.a[a.props.languageId] || u.a[1],
                                t = document.createElement("script");
                            t.src = "//code.jivo.ru/widget/" + e,
                                t.className = "jivo_script",
                                t.async = !0,
                                document.body.appendChild(t)
                        }
                    },
                    a.checkAvailable = function () {
                        return "/traderoom" !== a.props.pathname
                    },
                    a.updateJivoChatVisibility = function () {
                        a.checkAvailable() ? a.init() : a.destroy()
                    },
                    a.init = function () {
                        window.jivo_init && window.jivo_init()
                    },
                    a.destroy = function () {
                        if (window.jivo_destroy) {
                            window.jivo_destroy();
                            try {
                                document.querySelectorAll(".jivo_script").forEach(function (e) {
                                    return e.remove()
                                })
                            } catch (e) { }
                        }
                    },
                    i = t,
                    o(a, i)
            }
            return a(n, t),
                d(n, [{
                    key: "render",
                    value: function () {
                        return l.a.createElement(e, this.props)
                    }
                }]),
                n
        }(l.a.Component),
            n = function (e) {
                return {
                    accountNumber: e.application.get("user").accountNumber,
                    pathname: e.routing.location.pathname,
                    languageId: e.application.get("languageId")
                }
            };
        return Object(c.b)(n)(t)
    }
    t.a = i;
    var s = n(0),
        l = n.n(s),
        c = n(6),
        u = n(743),
        d = function () {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value" in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                }
            }
            return function (t, n, r) {
                return n && e(t.prototype, n),
                    r && e(t, r),
                    t
            }
        }()
}