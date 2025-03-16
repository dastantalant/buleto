 function (e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function o() {
        if ("function" !== typeof WeakMap)
            return null;
        var e = new WeakMap;
        return o = function () {
            return e
        },
            e
    }

    function a(e) {
        "@babel/helpers - typeof";
        return (a = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
            return typeof e
        } :
            function (e) {
                return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
        )(e)
    }

    function i(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }

    function s(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
        }
    }

    function l(e, t, n) {
        return t && s(e.prototype, t),
            n && s(e, n),
            e
    }

    function c(e, t) {
        return !t || "object" !== a(t) && "function" !== typeof t ? u(e) : t
    }

    function u(e) {
        if (void 0 === e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function d(e) {
        return (d = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function p(e, t) {
        if ("function" !== typeof t && null !== t)
            throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }),
            t && h(e, t)
    }

    function h(e, t) {
        return (h = Object.setPrototypeOf || function (e, t) {
            return e.__proto__ = t,
                e
        })(e, t)
    }

    function f(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n,
            e
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
        t.default = void 0;
    var m = function (e) {
        if (e && e.__esModule)
            return e;
        if (null === e || "object" !== a(e) && "function" !== typeof e)
            return {
                default: e
            };
        var t = o();
        if (t && t.has(e))
            return t.get(e);
        var n = {},
            r = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var i in e)
            if (Object.prototype.hasOwnProperty.call(e, i)) {
                var s = r ? Object.getOwnPropertyDescriptor(e, i) : null;
                s && (s.get || s.set) ? Object.defineProperty(n, i, s) : n[i] = e[i]
            }
        return n.default = e,
            t && t.set(e, n),
            n
    }(n(0)),
        g = r(n(2)),
        y = r(n(20)),
        v = function (e) {
            function t() {
                return i(this, t),
                    c(this, d(t).apply(this, arguments))
            }
            return p(t, e),
                l(t, [{
                    key: "handleClick",
                    value: function (e) {
                        var t = this.props,
                            n = t.isDisabled,
                            r = t.pageNumber;
                        e.preventDefault(),
                            n || this.props.onClick(r)
                    }
                }, {
                    key: "render",
                    value: function () {
                        var e, t = this.props,
                            n = t.pageText,
                            r = (t.pageNumber,
                                t.activeClass),
                            o = t.itemClass,
                            a = t.linkClass,
                            i = t.activeLinkClass,
                            s = t.disabledClass,
                            l = t.isActive,
                            c = t.isDisabled,
                            u = t.href,
                            d = t.ariaLabel,
                            p = (0,
                                y.default)(o, (e = {},
                                    f(e, r, l),
                                    f(e, s, c),
                                    e)),
                            h = (0,
                                y.default)(a, f({}, i, l));
                        return m.default.createElement("li", {
                            className: p,
                            onClick: this.handleClick.bind(this)
                        }, m.default.createElement("a", {
                            className: h,
                            href: u,
                            "aria-label": d
                        }, n))
                    }
                }]),
                t
        }(m.Component);
    t.default = v,
        f(v, "propTypes", {
            pageText: g.default.oneOfType([g.default.string, g.default.element]),
            pageNumber: g.default.number.isRequired,
            onClick: g.default.func.isRequired,
            isActive: g.default.bool.isRequired,
            isDisabled: g.default.bool,
            activeClass: g.default.string,
            activeLinkClass: g.default.string,
            itemClass: g.default.string,
            linkClass: g.default.string,
            disabledClass: g.default.string,
            href: g.default.string
        }),
        f(v, "defaultProps", {
            activeClass: "active",
            disabledClass: "disabled",
            itemClass: void 0,
            linkClass: void 0,
            activeLinkCLass: void 0,
            isActive: !1,
            isDisabled: !1,
            href: "#"
        })
}