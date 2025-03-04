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
        l = n(2),
        c = n.n(l),
        u = n(7),
        d = n(3),
        p = n(72),
        h = function () {
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
        f = Object(d.e)({
            dropdown_balance_title: {
                id: "dropdown.balance.title",
                defaultMessage: "\u0411\u0410\u041b\u0410\u041d\u0421"
            },
            dropdown_balance_main: {
                id: "dropdown.balance.main",
                defaultMessage: "\u041e\u0441\u043d\u043e\u0432\u043d\u043e\u0439 \u0441\u0447\u0451\u0442"
            },
            dropdown_balance_description: {
                id: "dropdown.balance.description",
                defaultMessage: "\u0414\u043b\u044f \u043f\u043e\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f/\u0432\u044b\u0432\u043e\u0434\u0430 \u0441\u0440\u0435\u0434\u0441\u0442\u0432, \u0430 \u0442\u0430\u043a\u0436\u0435 \u0434\u043b\u044f \u0442\u043e\u0440\u0433\u043e\u0432\u043b\u0438 \u043e\u043f\u0446\u0438\u043e\u043d\u0430\u043c\u0438 \u0442\u0438\u043f\u0430  \xab\u041a\u043e\u043c\u0431\u043e\xbb."
            },
            dropdown_balance_description_2: {
                id: "dropdown.balance.description_2",
                defaultMessage: "\u0414\u043b\u044f \u0442\u043e\u0440\u0433\u043e\u0432\u043b\u0438 \u0432 \u0421\u0438\u043c\u043b\u0435\u043a\u0441\u0435 \u0438 \u0424\u043e\u0440\u0435\u043a\u0441\u0435."
            },
            dropdown_balance_transfer: {
                id: "dropdown.balance.transfer",
                defaultMessage: "\u041f\u0435\u0440\u0435\u0432\u043e\u0434 \u043c\u0435\u0436\u0434\u0443 \u0441\u0447\u0435\u0442\u0430\u043c\u0438"
            },
            dropdown_balance_trading: {
                id: "dropdown.balance.trading",
                defaultMessage: "\u0422\u043e\u0440\u0433\u043e\u0432\u044b\u0439 \u0441\u0447\u0451\u0442"
            }
        }),
        m = function (e) {
            function t() {
                var e, n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = a = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))),
                    a.state = {
                        selectBalanceOpened: !1
                    },
                    a.toggleSelect = function () {
                        a.props.history.push("/payments")
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                h(t, [{
                    key: "render",
                    value: function () {
                        var e = this.props.balance,
                            t = this.state.selectBalanceOpened,
                            n = t ? "header-dropdown header-dropdown--balance opened" : "header-dropdown header-dropdown--balance";
                        return s.a.createElement("div", {
                            className: n,
                            onClick: this.toggleSelect
                        }, s.a.createElement("div", {
                            className: "header-dropdown__btn header-dropdown__btn--balance"
                        }, s.a.createElement("i", {
                            className: "header-dropdown__icon header-dropdown__icon--balance"
                        }), s.a.createElement("p", {
                            className: "header-dropdown__label header-dropdown__label--balance"
                        }, s.a.createElement(d.b, f.dropdown_balance_title), s.a.createElement("span", {
                            className: "header-dropdown__text"
                        }, s.a.createElement("span", {
                            className: "header-dropdown__text-balance"
                        }, Object(p.a)(e))))))
                    }
                }]),
                t
        }(i.Component);
    m.propTypes = {
        balance: c.a.number.isRequired,
        tradingBalance: c.a.number.isRequired
    },
        t.a = Object(u.d)(m)
}