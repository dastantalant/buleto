function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
    }

    function o(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }

    function a(e, t) {
        if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" !== typeof t && "function" !== typeof t ? e : t
    }

    function i(e, t) {
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
    var s = n(0),
        l = n.n(s),
        c = n(2),
        u = n.n(c),
        d = n(72),
        p = n(104),
        h = n(19),
        f = n(7),
        m = n(3),
        g = function() {
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
        y = function(e) {
            function t() {
                var e, n, i, s;
                o(this, t);
                for (var l = arguments.length, c = Array(l), u = 0; u < l; u++)
                    c[u] = arguments[u];
                return n = i = a(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(c))),
                    i.state = {
                        login: "",
                        password: "",
                        loginError: !1,
                        passwordError: !1
                    },
                    i.handleChange = function(e) {
                        i.setState(r({}, e.target.name, e.target.value))
                    },
                    i.handleEmailChange = function(e) {
                        i.setState({
                            login: e.target.value.toLowerCase()
                        })
                    },
                    i.handleSubmit = function(e) {
                        e.preventDefault();
                        var t = i.state,
                            n = t.login,
                            r = t.password;
                        i.setState({
                                loginError: !Object(d.b)(n),
                                passwordError: "" === r
                            }),
                            Object(d.b)(n) && "" !== r && i.props.authAction({
                                login: n.trim(),
                                password: r.trim()
                            })
                    },
                    s = n,
                    a(i, s)
            }
            return i(t, e),
                g(t, [{
                    key: "render",
                    value: function() {
                        var e = this.props,
                            t = e.status,
                            n = e.intl,
                            r = e.fetching,
                            o = this.state,
                            a = o.login,
                            i = o.password,
                            s = o.loginError,
                            c = o.passwordError,
                            u = t === p.e || t === p.c,
                            d = t === p.e ? n.formatMessage({
                                id: "auth.form.incorrect"
                            }) : n.formatMessage({
                                id: "auth.form.try_again"
                            }),
                            g = t === p.a,
                            y = t === p.a && "\u0412\u0430\u0448 \u0441\u0447\u0451\u0442 \u0437\u0430\u0431\u043b\u043e\u043a\u0438\u0440\u043e\u0432\u0430\u043d",
                            v = "" === a || "" === i;
                        return l.a.createElement("form", {
                            className: "common-form drop-shadow"
                        }, l.a.createElement("div", {
                            className: "common-form-head"
                        }, l.a.createElement("div", null, l.a.createElement(m.a, {
                            id: "header.Sign_in"
                        }), l.a.createElement(f.b, {
                            className: "common-form-head-close",
                            to: "/"
                        }))), r && l.a.createElement(h.a, null), l.a.createElement("div", {
                            className: "common-form-body"
                        }, u && l.a.createElement("div", {
                            className: "common-form__message text-center"
                        }, d, " "), g && l.a.createElement("div", {
                            className: "common-form__message text-center"
                        }, y, " "), l.a.createElement("div", {
                            className: "common-form__row" + (s ? " common-form__row--error" : "")
                        }, l.a.createElement("input", {
                            className: "common-form__input" + (s ? " common-form__input--error" : ""),
                            placeholder: n.formatMessage({
                                id: "auth.form.email"
                            }),
                            type: "email",
                            autoComplete: "email",
                            onChange: this.handleEmailChange,
                            name: "login"
                        }), s && l.a.createElement("div", {
                            className: "common-form__row__message login-error"
                        }, n.formatMessage({
                            id: "auth.form.incorrect"
                        }))), l.a.createElement("div", {
                            className: "common-form__row" + (c ? " common-form__row--error" : "")
                        }, l.a.createElement("input", {
                            className: "common-form__input" + (c ? " common-form__input--error" : ""),
                            placeholder: n.formatMessage({
                                id: "auth.form.pass"
                            }),
                            autoComplete: "password",
                            onChange: this.handleChange,
                            name: "password",
                            type: "password"
                        }), c && l.a.createElement("div", {
                            className: "common-form__row__message"
                        }, n.formatMessage({
                            id: "auth.form.pass_incorrect"
                        }))), l.a.createElement("div", {
                            className: "common-form__row"
                        }, l.a.createElement("button", {
                            type: "submit",
                            disabled: v,
                            className: "common-form__submit",
                            onClick: this.handleSubmit
                        }, n.formatMessage({
                            id: "auth.form.sign_in"
                        }))), l.a.createElement("div", {
                            className: "common-form__row text-center"
                        }, l.a.createElement(f.b, {
                            type: "button",
                            className: "btn btn--strip common-form__recover",
                            to: "/forgot-password"
                        }, n.formatMessage({
                            id: "auth.form.change_pass"
                        })))))
                    }
                }]),
                t
        }(l.a.Component);
    y.propTypes = {
            authAction: u.a.func.isRequired,
            status: u.a.number.isRequired,
            intl: u.a.object.isRequired,
            fetching: u.a.bool.isRequired,
            close: u.a.func
        },
        t.a = Object(m.f)(y)
}