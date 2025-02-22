function(e, t, n) {
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
        p = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value" in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n),
                    r && e(t, r),
                    t
            }
        }(),
        h = Object(d.e)({
            account_tabs_replenish: {
                id: "account_tabs.replenish",
                defaultMessage: "\u041f\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u044c"
            },
            account_tabs_withdraw: {
                id: "account_tabs.withdraw",
                defaultMessage: "\u0412\u044b\u0432\u0435\u0441\u0442\u0438"
            },
            account_tabs_opex: {
                id: "account_tabs.opex-checks",
                defaultMessage: "\u0427\u0435\u043a\u0438 Opex"
            },
            account_tabs_operations: {
                id: "account_tabs.operations",
                defaultMessage: "\u041e\u043f\u0435\u0440\u0430\u0446\u0438\u0438"
            },
            account_tabs_deals: {
                id: "account_tabs.deals",
                defaultMessage: "\u0421\u0434\u0435\u043b\u043a\u0438"
            },
            account_tabs_profile: {
                id: "account_tabs.profile",
                defaultMessage: "\u041f\u0440\u043e\u0444\u0438\u043b\u044c"
            },
            account_tabs_account_number: {
                id: "account_tabs.account_number",
                defaultMessage: "\u2116 \u0441\u0447\u0451\u0442\u0430"
            }
        }),
        f = function(e) {
            function t() {
                return r(this, t),
                    o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return a(t, e),
                p(t, [{
                    key: "render",
                    value: function() {
                        var e = this.props.user,
                            t = "account-tabs-menu-item-link";
                        return this.props.match.path.includes("/withdraw") && (t += " active"),
                            void 0 !== e.accountNumber && s.a.createElement("div", {
                                className: "account-tabs"
                            }, s.a.createElement("ul", {
                                className: "account-tabs-menu"
                            }, s.a.createElement("li", {
                                className: "account-tabs-menu-item"
                            }, s.a.createElement(u.b, {
                                exact: !0,
                                to: "/payments",
                                className: "account-tabs-menu-item-link"
                            }, s.a.createElement(d.b, h.account_tabs_replenish))), s.a.createElement("li", {
                                className: "account-tabs-menu-item active"
                            }, s.a.createElement(u.b, {
                                exact: !0,
                                to: "/withdraw",
                                className: t
                            }, s.a.createElement(d.b, h.account_tabs_withdraw))), s.a.createElement("li", {
                                className: "account-tabs-menu-item"
                            }, s.a.createElement(u.b, {
                                exact: !0,
                                to: "/opex-checks",
                                className: "account-tabs-menu-item-link"
                            }, s.a.createElement(d.b, h.account_tabs_opex))), s.a.createElement("li", {
                                className: "account-tabs-menu-item"
                            }, s.a.createElement(u.b, {
                                exact: !0,
                                to: "/operations",
                                className: "account-tabs-menu-item-link"
                            }, s.a.createElement(d.b, h.account_tabs_operations))), s.a.createElement("li", {
                                className: "account-tabs-menu-item"
                            }, s.a.createElement(u.b, {
                                exact: !0,
                                to: "/deals",
                                className: "account-tabs-menu-item-link"
                            }, s.a.createElement(d.b, h.account_tabs_deals))), s.a.createElement("li", {
                                className: "account-tabs-menu-item"
                            }, s.a.createElement(u.b, {
                                exact: !0,
                                to: "/profile",
                                className: "account-tabs-menu-item-link"
                            }, s.a.createElement(d.b, h.account_tabs_profile)))), s.a.createElement("span", {
                                className: "account-tabs-info"
                            }, s.a.createElement(d.b, h.account_tabs_account_number), ": ", s.a.createElement("b", null, e.accountNumber)))
                    }
                }]),
                t
        }(i.Component);
    f.propTypes = {
            user: c.a.object.isRequired
        },
        t.a = Object(u.d)(f)
}