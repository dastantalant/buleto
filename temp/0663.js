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
        d = n(19),
        p = n(72),
        h = n(3),
        f = n(249),
        m = n(7),
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
        y = Object(h.e)({
            auth_recovery_title: {
                id: "auth.recovery.title",
                defaultMessage: "\u0412\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u0435 \u043f\u0430\u0440\u043e\u043b\u044f"
            },
            auth_recovery_email: {
                id: "auth.recovery.email",
                defaultMessage: "E-mail"
            },
            auth_recovery_account: {
                id: "auth.recovery.account",
                defaultMessage: "\u041d\u043e\u043c\u0435\u0440 \u0441\u0447\u0451\u0442\u0430"
            },
            auth_recovery_email_doesnt_exist: {
                id: "auth.recovery.email_doesnt_exist",
                defaultMessage: "E-mail \u0443\u043a\u0430\u0437\u0430\u043d \u043d\u0435\u0432\u0435\u0440\u043d\u043e"
            },
            auth_recovery_account_doesnt_exist: {
                id: "auth.recovery.account_doesnt_exist",
                defaultMessage: "\u041d\u043e\u043c\u0435\u0440 \u0441\u0447\u0451\u0442\u0430 \u0443\u043a\u0430\u0437\u0430\u043d \u043d\u0435\u0432\u0435\u0440\u043d\u043e"
            },
            auth_recovery_requirements: {
                id: "auth.recovery.requirements",
                defaultMessage: "\u0414\u043b\u044f \u0441\u043c\u0435\u043d\u044b \u043f\u0430\u0440\u043e\u043b\u044f \u0443\u043a\u0430\u0436\u0438\u0442\u0435 \u043b\u0438\u0431\u043e \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u0443\u044e \u043f\u043e\u0447\u0442\u0443, \u043a\u043e\u0442\u043e\u0440\u0443\u044e \u0432\u044b \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043b\u0438 \u043f\u0440\u0438 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430, \u043b\u0438\u0431\u043e \u043d\u043e\u043c\u0435\u0440 \u0441\u0447\u0435\u0442\u0430"
            },
            auth_recovery_restore: {
                id: "auth.recovery.restore",
                defaultMessage: "\u0412\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c"
            },
            user_deleted: {
                id: "auth.recovery.error.user_deleted",
                defaultMessage: "\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c \u0431\u044b\u043b \u0443\u0434\u0430\u043b\u0435\u043d"
            },
            user_not_found: {
                id: "auth.recovery.error.user_not_found",
                defaultMessage: "\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d"
            },
            user_internal_error: {
                id: "auth.recovery.error.user_internal_error",
                defaultMessage: "\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430! \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u043e\u0437\u0436\u0435"
            },
            registration_form_timeout: {
                id: "registration.form.warning",
                defaultMessage: "\u0412\u044b \u0441\u043c\u043e\u0436\u0435\u0442\u0435 \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u043f\u0438\u0441\u044c\u043c\u043e \u0447\u0435\u0440\u0435\u0437: "
            },
            forgot_email_link: {
                id: "forgot-password.forgot_email_link",
                defaultMessage: "\u0417\u0430\u0431\u044b\u043b\u0438 e-mail \u0438\u043b\u0438 \u043d\u043e\u043c\u0435\u0440 \u0441\u0447\u0435\u0442\u0430? \u0421\u0432\u044f\u0436\u0438\u0442\u0435\u0441\u044c \u0441 \u043d\u0430\u043c\u0438."
            }
        }),
        v = function(e) {
            function t() {
                var e, n, i, s;
                o(this, t);
                for (var l = arguments.length, c = Array(l), u = 0; u < l; u++)
                    c[u] = arguments[u];
                return n = i = a(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(c))),
                    i.state = {
                        recoverInputError: !1,
                        accountNumberError: !1,
                        requisite: "",
                        accountNumber: "",
                        type: "email",
                        recoveryState: i.props.recovery.status,
                        timeout: 0
                    },
                    i.componentDidMount = function() {
                        var e = new Date,
                            t = localStorage.getItem("recover-form");
                        t && e - new Date(t) < 3e5 && i.setState({
                                timeout: 3e5 - (e - new Date(t))
                            }),
                            setInterval(function() {
                                i.setState({
                                    timeout: i.state.timeout - 1e3
                                })
                            }, 1e3)
                    },
                    i.handleChange = function(e) {
                        i.setState(r({}, e.target.name, e.target.value.toLowerCase()))
                    },
                    i.handleRadio = function(e) {
                        i.setState({
                            type: e.target.id,
                            recoveryState: void 0,
                            requisite: "",
                            accountNumber: ""
                        })
                    },
                    i.handleSubmit = function(e) {
                        if (e.preventDefault(),
                            "email" === i.state.type) {
                            var t = i.state.requisite,
                                n = "" === t || !Object(p.b)(t);
                            if (i.setState({
                                    recoverInputError: n
                                }), !Object(p.b)(t)) {
                                i.setState({
                                    timeout: 3e5
                                });
                                var r = new Date;
                                localStorage.setItem("recover-form", r.toString())
                            }
                            n || i.props.recoverSubmit(t)
                        } else {
                            var o = i.state.accountNumber,
                                a = "" === o;
                            i.setState({
                                    accountNumberError: a
                                }),
                                a || i.props.recoverByAccountSubmit(o)
                        }
                    },
                    s = n,
                    a(i, s)
            }
            return i(t, e),
                g(t, [{
                    key: "componentWillReceiveProps",
                    value: function(e) {
                        e.recovery.status !== this.props.recovery.status && this.setState({
                            recoveryState: e.recovery.status
                        })
                    }
                }, {
                    key: "render",
                    value: function() {
                        var e = this.props,
                            n = e.recovery,
                            r = e.intl,
                            o = this.state,
                            a = o.recoverInputError,
                            i = o.requisite,
                            s = o.accountNumberError,
                            c = o.type,
                            u = o.recoveryState,
                            p = o.accountNumber,
                            g = n.fetching,
                            v = a || 0 !== u && void 0 !== u,
                            b = s || 0 !== u && void 0 !== u,
                            _ = !1;
                        "email" === c && (_ = "" === i),
                            "accountNumber" === c && (_ = "" === p),
                            this.state.timeout > 0 && (_ = !0);
                        var w = this.state.timeout / 1e3;
                        w %= 3600;
                        var x = parseInt(w / 60, 10);
                        w %= 60,
                            (w = Math.floor(w)) < 10 && (w = "0" + w);
                        var E = x + ":" + w;
                        return l.a.createElement("form", {
                            className: "common-form drop-shadow"
                        }, l.a.createElement("div", {
                            className: "common-form-head"
                        }, l.a.createElement(h.b, y.auth_recovery_title), l.a.createElement(f.a, {
                            className: "common-form-head-close",
                            to: "/"
                        })), g && l.a.createElement(d.a, null), l.a.createElement("div", {
                            className: "common-form-body"
                        }, l.a.createElement("div", {
                            className: "common-form__row"
                        }, l.a.createElement("div", {
                            className: "common-form__radio"
                        }, l.a.createElement("input", {
                            type: "radio",
                            id: "email",
                            name: "request",
                            defaultChecked: "email" === c,
                            onChange: this.handleRadio
                        }), l.a.createElement("label", {
                            htmlFor: "email"
                        }, l.a.createElement(h.b, y.auth_recovery_email))), l.a.createElement("div", {
                            className: "common-form__radio"
                        }, l.a.createElement("input", {
                            type: "radio",
                            id: "accountNumber",
                            name: "request",
                            defaultChecked: "accountNumber" === c,
                            onChange: this.handleRadio
                        }), l.a.createElement("label", {
                            htmlFor: "accountNumber"
                        }, l.a.createElement(h.b, y.auth_recovery_account)))), "email" === c && l.a.createElement("div", {
                            className: "common-form__row" + (v ? " common-form__row--error" : "")
                        }, l.a.createElement("input", {
                            className: "common-form__input" + (v ? " common-form__input--error" : ""),
                            placeholder: r.formatMessage(y.auth_recovery_email),
                            type: "email",
                            autoComplete: "email",
                            onChange: this.handleChange,
                            name: "requisite"
                        }), v && l.a.createElement("div", {
                            className: "common-form__row__message-timeout"
                        }, t.renderError(u, c, a, s, r)), this.state.timeout > 0 && l.a.createElement("div", {
                            className: "common-form__row__message-timeout"
                        }, l.a.createElement(h.b, y.registration_form_timeout), " ", E)), "accountNumber" === c && l.a.createElement("div", {
                            className: "common-form__row" + (b ? " common-form__row--error" : "")
                        }, l.a.createElement("input", {
                            className: "common-form__input" + (b ? " common-form__input--error" : ""),
                            placeholder: r.formatMessage(y.auth_recovery_account),
                            type: "tel",
                            onChange: this.handleChange,
                            name: "accountNumber"
                        }), b && l.a.createElement("div", {
                            className: "common-form__row__message"
                        }, t.renderError(u, c, a, s, r))), l.a.createElement("div", {
                            className: "common-form__row text-center recover-description"
                        }, r.formatMessage(y.auth_recovery_requirements)), l.a.createElement("div", {
                            className: "common-form__row"
                        }, l.a.createElement("button", {
                            type: "submit",
                            disabled: _,
                            className: "common-form__submit",
                            onClick: this.handleSubmit
                        }, r.formatMessage(y.auth_recovery_restore))), l.a.createElement("div", {
                            className: "common-form__row"
                        }, l.a.createElement(m.a, {
                            to: "/contact-us",
                            style: {
                                color: "#37acc7",
                                textAlign: "center",
                                textDecoration: "underline"
                            }
                        }, l.a.createElement("p", null, r.formatMessage(y.forgot_email_link))))))
                    }
                }], [{
                    key: "renderError",
                    value: function(e, t, n, r, o) {
                        var a = "";
                        return -1 === e ? a = o.formatMessage(y.user_deleted) : -2 === e ? a = o.formatMessage(y.user_not_found) : -100 === e ? a = o.formatMessage(y.user_internal_error) : (n || r) && (a = "email" === t ? o.formatMessage(y.auth_recovery_email_doesnt_exist) : o.formatMessage(y.auth_recovery_account_doesnt_exist)),
                            a
                    }
                }]),
                t
        }(l.a.Component);
    v.propTypes = {
            recoverSubmit: u.a.func.isRequired,
            recoverByAccountSubmit: u.a.func.isRequired,
            recovery: u.a.object.isRequired,
            close: u.a.func,
            intl: u.a.object.isRequired
        },
        t.a = Object(h.f)(v)
}