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
            header_corridors_menu_account_number: {
                id: "header.corridors_menu.account_number",
                defaultMessage: "\u2116 \u0441\u0447\u0435\u0442\u0430:"
            },
            header_corridors_menu_replenish: {
                id: "header.corridors_menu.replenish",
                defaultMessage: "\u041f\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u044c"
            },
            header_corridors_menu_withdraw: {
                id: "header.corridors_menu.withdraw",
                defaultMessage: "\u0412\u044b\u0432\u0435\u0441\u0442\u0438"
            },
            header_corridors_menu_opex: {
                id: "header.corridors_menu.opex",
                defaultMessage: "\u0427\u0435\u043a\u0438 Opex"
            },
            header_corridors_menu_operations: {
                id: "header.corridors_menu.operations",
                defaultMessage: "\u041e\u043f\u0435\u0440\u0430\u0446\u0438\u0438"
            },
            header_corridors_menu_deals: {
                id: "header.corridors_menu.deals",
                defaultMessage: "\u0421\u0434\u0435\u043b\u043a\u0438"
            },
            header_corridors_menu_profile: {
                id: "header.corridors_menu.profile",
                defaultMessage: "\u041f\u0440\u043e\u0444\u0438\u043b\u044c"
            },
            header_corridors_menu_logout: {
                id: "header.corridors_menu.logout",
                defaultMessage: "\u0412\u044b\u0439\u0442\u0438"
            },
            header_corridors_menu_copy: {
                id: "header.corridors_menu.copy",
                defaultMessage: "\u0441\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d\u043e \u0432 \u0431\u0443\u0444\u0435\u0440 \u043e\u0431\u043c\u0435\u043d\u0430"
            },
            header_corridors_menu_copied: {
                id: "header.corridors_menu.copied",
                defaultMessage: "\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043d\u043e\u043c\u0435\u0440 \u0441\u0447\u0451\u0442\u0430 \u0432 \u0431\u0443\u0444\u0435\u0440 \u043e\u0431\u043c\u0435\u043d\u0430"
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
                        selectUserOpened: !1,
                        copied: !1
                    },
                    a.onCopy = function (e) {
                        var t = document.createElement("textarea");
                        t.innerText = e,
                            document.body.appendChild(t),
                            t.select(),
                            a.iosCopyToClipboard(t),
                            document.execCommand("copy"),
                            t.remove(),
                            a.setState({
                                copied: !0
                            })
                    },
                    a.iosCopyToClipboard = function (e) {
                        var t = e.contentEditable,
                            n = e.readOnly,
                            r = document.createRange();
                        e.contenteditable = !0,
                            e.readonly = !1,
                            r.selectNodeContents(e);
                        var o = window.getSelection();
                        o.removeAllRanges(),
                            o.addRange(r),
                            e.setSelectionRange(0, 999999),
                            e.contentEditable = t,
                            e.readOnly = n,
                            document.execCommand("copy")
                    },
                    a.onMouseOut = function () {
                        a.setState({
                            copied: !1
                        })
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                p(t, [{
                    key: "render",
                    value: function () {
                        var e = this.props,
                            t = e.user,
                            n = e.loseAuthAction,
                            r = e.intl,
                            o = this.state.copied;
                        return s.a.createElement("div", {
                            className: "corridors-menu"
                        }, s.a.createElement("ul", {
                            className: "dropdown__menu dropdown__menu--user"
                        }, s.a.createElement("li", {
                            className: "dropdown__menu__item dropdown__menu__item--user",
                            eventkey: 1,
                            onMouseOut: this.onMouseOut,
                            id: "menu-user-acc"
                        }, s.a.createElement("i", {
                            className: "dropdown__menu__icon"
                        }), s.a.createElement("button", {
                            className: "dropdown__menu__link dropdown__menu__link--user user-acc"
                        }, s.a.createElement("span", {
                            className: "user-name"
                        }, t.name), s.a.createElement("p", {
                            className: "user-acc",
                            onClick: this.onCopy.bind(this, t.accountNumber)
                        }, s.a.createElement(d.b, h.header_corridors_menu_account_number), " ", s.a.createElement("span", {
                            className: "user-acc-number"
                        }, t.accountNumber), s.a.createElement("span", {
                            className: "tooltip"
                        }, o ? r.formatMessage(h.header_corridors_menu_copy) : r.formatMessage(h.header_corridors_menu_copied))))), s.a.createElement("li", {
                            className: "dropdown__menu__item dropdown__menu__item--deposit",
                            eventkey: 2
                        }, s.a.createElement("i", {
                            className: "dropdown__menu__icon dropdown__menu__icon--deposit"
                        }), s.a.createElement(u.b, {
                            exact: !0,
                            to: "/payments",
                            className: "dropdown__menu__link"
                        }, s.a.createElement(d.b, h.header_corridors_menu_replenish))), s.a.createElement("li", {
                            className: "dropdown__menu__item dropdown__menu__item--withdraw",
                            eventkey: 3
                        }, s.a.createElement("i", {
                            className: "dropdown__menu__icon dropdown__menu__icon--withdraw"
                        }), s.a.createElement(u.b, {
                            exact: !0,
                            to: "/withdraw",
                            className: "dropdown__menu__link"
                        }, s.a.createElement(d.b, h.header_corridors_menu_withdraw))), s.a.createElement("li", {
                            className: "dropdown__menu__item dropdown__menu__item--withdraw",
                            eventkey: 3
                        }, s.a.createElement("i", {
                            className: "dropdown__menu__icon dropdown__menu__icon--withdraw"
                        }), s.a.createElement(u.b, {
                            exact: !0,
                            to: "/opex-checks",
                            className: "dropdown__menu__link"
                        }, s.a.createElement(d.b, h.header_corridors_menu_opex))), s.a.createElement("li", {
                            className: "dropdown__menu__item dropdown__menu__item--transactions",
                            eventkey: 4
                        }, s.a.createElement("i", {
                            className: "dropdown__menu__icon dropdown__menu__icon--transactions"
                        }), s.a.createElement(u.b, {
                            exact: !0,
                            to: "/operations",
                            className: "dropdown__menu__link"
                        }, s.a.createElement(d.b, h.header_corridors_menu_operations))), s.a.createElement("li", {
                            className: "dropdown__menu__item dropdown__menu__item--history",
                            eventkey: 4
                        }, s.a.createElement("i", {
                            className: "dropdown__menu__icon dropdown__menu__icon--history"
                        }), s.a.createElement(u.b, {
                            exact: !0,
                            to: "/deals",
                            className: "dropdown__menu__link"
                        }, s.a.createElement(d.b, h.header_corridors_menu_deals))), s.a.createElement("li", {
                            className: "dropdown__menu__item dropdown__menu__item--profile",
                            eventkey: 4
                        }, s.a.createElement("i", {
                            className: "dropdown__menu__icon dropdown__menu__icon--profile"
                        }), s.a.createElement(u.b, {
                            exact: !0,
                            to: "/profile",
                            className: "dropdown__menu__link"
                        }, s.a.createElement(d.b, h.header_corridors_menu_profile))), s.a.createElement("li", {
                            className: "dropdown__menu__item dropdown__menu__item--logoff",
                            eventkey: 4
                        }, s.a.createElement("i", {
                            className: "dropdown__menu__icon dropdown__menu__icon--logoff"
                        }), s.a.createElement("a", {
                            onClick: n,
                            className: "dropdown__menu__link"
                        }, s.a.createElement(d.b, h.header_corridors_menu_logout)))))
                    }
                }]),
                t
        }(i.Component);
    f.propTypes = {
        user: c.a.object.isRequired,
        intl: c.a.object.isRequired,
        loseAuthAction: c.a.func.isRequired
    },
        t.a = Object(d.f)(f)
}