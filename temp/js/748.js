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
    var i = n(0),
        s = n.n(i),
        l = n(7),
        c = n(83),
        u = n.n(c),
        d = n(3),
        p = function () {
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
        }(),
        h = Object(d.e)({
            header_side_menu_trade: {
                id: "header.side_menu.trade",
                defaultMessage: "\u0422\u043e\u0440\u0433\u043e\u0432\u043b\u044f"
            },
            header_side_menu_binary: {
                id: "header.side_menu.binary",
                defaultMessage: "\u0412\u0438\u0434\u044b \u043e\u043f\u0446\u0438\u043e\u043d\u043e\u0432"
            },
            header_side_menu_corridors: {
                id: "header.side_menu.corridors",
                defaultMessage: "\u041a\u043e\u0440\u0438\u0434\u043e\u0440\u044b"
            }
        }),
        f = function (e) {
            function t() {
                var e, n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = a = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))),
                    a.state = {
                        selectTradeOpened: !1
                    },
                    a.toggleSelect = function () {
                        a.setState(function (e) {
                            return {
                                selectTradeOpened: !e.selectTradeOpened
                            }
                        })
                    },
                    a.onClickOut = function () {
                        a.setState({
                            selectTradeOpened: !1
                        })
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                p(t, [{
                    key: "render",
                    value: function () {
                        var e = this.state.selectTradeOpened,
                            t = e ? "header-dropdown header-dropdown--about opened" : "header-dropdown header-dropdown--about";
                        return s.a.createElement(u.a, {
                            onClickOut: this.onClickOut
                        }, s.a.createElement("div", {
                            className: t,
                            onClick: this.toggleSelect
                        }, s.a.createElement("div", {
                            className: "header-dropdown__btn header-dropdown__btn--about unauthorized-header-menu__link"
                        }, s.a.createElement(d.b, h.header_side_menu_trade)), s.a.createElement("div", {
                            className: "header-dropdown__menu header-dropdown__menu--about"
                        }, s.a.createElement("ul", {
                            className: "dropdown__menu dropdown__menu--about"
                        }, s.a.createElement("li", {
                            className: "dropdown__menu__item"
                        }, s.a.createElement(l.b, {
                            to: "/trading-options",
                            className: "dropdown__menu__link"
                        }, s.a.createElement(d.b, h.header_side_menu_binary))), s.a.createElement("li", {
                            className: "dropdown__menu__item"
                        }, s.a.createElement(l.b, {
                            to: "/combo",
                            className: "dropdown__menu__link"
                        }, s.a.createElement(d.b, h.header_side_menu_corridors)))))))
                    }
                }]),
                t
        }(i.Component);
    t.a = f
}