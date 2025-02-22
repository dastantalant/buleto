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
        d = n(157),
        p = (n.n(d),
            n(72)),
        h = n(81),
        f = n(73),
        m = n(7),
        g = n(19),
        y = n(3),
        v = function() {
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
        b = Object(y.e)({
            registration_form_required: {
                id: "registration.form.required",
                defaultMessage: "\u041e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u0435 \u043f\u043e\u043b\u0435"
            },
            registration_form_email_error: {
                id: "registration.form.email_error",
                defaultMessage: "\u0423\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044c \u0447\u0442\u043e \u0412\u044b \u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e \u0443\u043a\u0430\u0437\u0430\u043b\u0438 E-mail \u0438 \u043d\u0430 \u043f\u043e\u0447\u0442\u043e\u0432\u043e\u043c \u044f\u0449\u0438\u043a\u0435 \u043d\u0435 \u0437\u0430\u0431\u043b\u043e\u043a\u0438\u0440\u043e\u0432\u0430\u043d \u043f\u0440\u0438\u0451\u043c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0439."
            },
            registration_form_phone_format: {
                id: "registration.form.phone_format",
                defaultMessage: "\u0424\u043e\u0440\u043c\u0430\u0442 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430"
            },
            registration_form_pass_requirement: {
                id: "registration.form.pass_requirement",
                defaultMessage: "\u041c\u0438\u043d\u0438\u043c\u0443\u043c 6 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"
            },
            registration_form_agreement: {
                id: "registration.form.agreement",
                defaultMessage: "\u042f \u043f\u0440\u0438\u043d\u0438\u043c\u0430\u044e \xab<NavLink to='agreement'>\u041a\u043b\u0438\u0435\u043d\u0442\u0441\u043a\u043e\u0435 \u0441\u043e\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435</NavLink>\xbb \u0438 \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u044e, \u0447\u0442\u043e \u043c\u043d\u0435 18 \u043b\u0435\u0442 \u0438\u043b\u0438 \u0431\u043e\u043b\u044c\u0448\u0435."
            },
            registration_form_register: {
                id: "registration.form.register",
                defaultMessage: "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f"
            },
            header_Registration: {
                id: "header.Registration",
                defaultMessage: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"
            },
            registration_form_warning: {
                id: "registration.form.warning",
                defaultMessage: "\u0411\u0443\u0434\u044c\u0442\u0435 \u0432\u043d\u0438\u043c\u0430\u0442\u0435\u043b\u044c\u043d\u044b \u043f\u0440\u0438 \u0437\u0430\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0438 \u0444\u043e\u0440\u043c\u044b, \u0442\u0430\u043a \u043a\u0430\u043a \u0434\u0430\u043d\u043d\u044b\u0435 \u043d\u0435 \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u0438\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u043f\u043e\u0441\u043b\u0435 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438!"
            },
            registration_form_timeout: {
                id: "registration.form.timeout",
                defaultMessage: "\u0412\u044b \u0441\u043c\u043e\u0436\u0435\u0442\u0435 \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u043f\u0438\u0441\u044c\u043c\u043e \u0447\u0435\u0440\u0435\u0437: "
            }
        }),
        _ = function(e) {
            function t() {
                var e, n, i, s;
                o(this, t);
                for (var l = arguments.length, c = Array(l), u = 0; u < l; u++)
                    c[u] = arguments[u];
                return n = i = a(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(c))),
                    i.state = {
                        firstName: "",
                        firstNameError: !1,
                        lastName: "",
                        lastNameError: !1,
                        email: "",
                        emailError: !1,
                        phone: "",
                        phoneError: !1,
                        password: "",
                        passwordError: !1,
                        agree: !1,
                        timeout: 0
                    },
                    i.handleChange = function(e) {
                        i.setState(r({}, e.target.name, e.target.value))
                    },
                    i.componentDidMount = function() {
                        var e = new Date,
                            t = localStorage.getItem("register-form");
                        t && e - new Date(t) < 3e5 && i.setState({
                                timeout: 3e5 - (e - new Date(t))
                            }),
                            setInterval(function() {
                                i.setState({
                                    timeout: i.state.timeout - 1e3
                                })
                            }, 1e3)
                    },
                    i.handlePhoneChange = function(e) {
                        var t = e.target.value.replace(/[-() ]/g, "");
                        i.setState(r({}, e.target.name, t.replace(/0/, "996")))
                    },
                    i.handleEmailChange = function(e) {
                        i.setState({
                            email: e.target.value.toLowerCase()
                        })
                    },
                    i.handleSubmit = function(e) {
                        e.preventDefault();
                        var t = i.state,
                            n = t.email,
                            r = t.firstName,
                            o = t.lastName,
                            a = t.phone,
                            s = t.password,
                            l = "" === r,
                            c = "" === o,
                            u = !Object(p.b)(n),
                            d = s.length < 6,
                            h = a.indexOf("_") > -1;
                        if (!Object(p.b)(n)) {
                            i.setState({
                                timeout: 3e5
                            });
                            var f = new Date;
                            localStorage.setItem("register-form", f.toString())
                        }
                        if (i.setState({
                                firstNameError: l,
                                lastNameError: c,
                                emailError: u,
                                passwordError: d,
                                phoneError: h
                            }), !l && !c && !u && !d && !h) {
                            var m = {
                                firstName: r.trim(),
                                lastName: o.trim(),
                                email: n.trim(),
                                phone: a,
                                password: s.trim(),
                                partner: 1
                            };
                            i.props.registrationAction(m)
                        }
                    },
                    i.handleCheckboxChange = function() {
                        i.setState({
                            agree: !i.state.agree
                        })
                    },
                    s = n,
                    a(i, s)
            }
            return i(t, e),
                v(t, [{
                    key: "render",
                    value: function() {
                        var e = this.props,
                            t = e.registration,
                            n = e.intl,
                            r = this.state,
                            o = r.emailError,
                            a = r.firstNameError,
                            i = r.lastNameError,
                            s = r.passwordError,
                            c = r.phoneError,
                            u = r.agree,
                            d = t.status,
                            p = t.fetching,
                            v = d === h.a || d === h.c,
                            _ = d === h.a ? n.formatMessage({
                                id: "registration.form.is_being_used"
                            }) : n.formatMessage({
                                id: "registration.form.error_400"
                            }),
                            w = !o && !a && !s && !i && !c && (!u || this.state.timeout > 0),
                            x = this.state.timeout / 1e3;
                        x %= 3600;
                        var E = parseInt(x / 60, 10);
                        x %= 60,
                            (x = Math.floor(x)) < 10 && (x = "0" + x);
                        var k = E + ":" + x;
                        return l.a.createElement("form", {
                            className: "common-form drop-shadow"
                        }, l.a.createElement("div", {
                            className: "common-form-head"
                        }, l.a.createElement(y.a, b.header_Registration), l.a.createElement(m.b, {
                            className: "common-form-head-close",
                            to: "/"
                        })), p && l.a.createElement(g.a, null), l.a.createElement("div", {
                            className: "common-form-body"
                        }, v && l.a.createElement("div", {
                            className: "common-form__message text-center"
                        }, _), l.a.createElement("div", {
                            className: "common-form__row" + (a ? " common-form__row--error" : "")
                        }, l.a.createElement("input", {
                            className: "common-form__input" + (a ? " common-form__input--error" : ""),
                            placeholder: n.formatMessage({
                                id: "registration.form.name"
                            }),
                            onChange: this.handleChange,
                            name: "firstName",
                            autoComplete: "firstName"
                        }), a && l.a.createElement("div", {
                            className: "common-form__row__message"
                        }, l.a.createElement(y.a, b.registration_form_required))), l.a.createElement("div", {
                            className: "common-form__row" + (i ? " common-form__row--error" : "")
                        }, l.a.createElement("input", {
                            className: "common-form__input" + (i ? " common-form__input--error" : ""),
                            placeholder: n.formatMessage({
                                id: "registration.form.surname"
                            }),
                            onChange: this.handleChange,
                            name: "lastName",
                            autoComplete: "lastName"
                        }), i && l.a.createElement("div", {
                            className: "common-form__row__message"
                        }, l.a.createElement(y.a, b.registration_form_required))), l.a.createElement("div", {
                            className: "common-form__row" + (o ? " common-form__row--error" : "")
                        }, l.a.createElement("input", {
                            className: "common-form__input" + (o ? " common-form__input--error" : ""),
                            placeholder: n.formatMessage({
                                id: "registration.form.email"
                            }),
                            type: "email",
                            onChange: this.handleEmailChange,
                            name: "email",
                            autoComplete: "email"
                        }), o && l.a.createElement("div", {
                            className: "common-form__row__message-timeout"
                        }, l.a.createElement(y.b, b.registration_form_email_error)), this.state.timeout > 0 && l.a.createElement("div", {
                            className: "common-form__row__message-timeout"
                        }, l.a.createElement(y.b, b.registration_form_timeout), " ", k)), l.a.createElement("div", {
                            className: "common-form__row" + (c ? " common-form__row--error" : "")
                        }, l.a.createElement(f.a, {
                            mask: "0 (999) 99-99-99",
                            className: "common-form__input" + (c ? " common-form__input--error" : ""),
                            placeholder: n.formatMessage({
                                id: "registration.form.phone"
                            }),
                            type: "tel",
                            onChange: this.handlePhoneChange,
                            name: "phone",
                            autoComplete: "phone"
                        }), c && l.a.createElement("div", {
                            className: "common-form__row__message"
                        }, l.a.createElement(y.b, b.registration_form_phone_format), ": 0 (555) 11-11-11")), l.a.createElement("div", {
                            className: "common-form__row" + (s ? " common-form__row--error" : "")
                        }, l.a.createElement("div", {
                            className: "common-form__label"
                        }, l.a.createElement("i", null, l.a.createElement(y.b, b.registration_form_pass_requirement))), l.a.createElement("input", {
                            className: "common-form__input" + (s ? " common-form__input--error" : ""),
                            type: "password",
                            placeholder: n.formatMessage({
                                id: "registration.form.password"
                            }),
                            onChange: this.handleChange,
                            name: "password",
                            autoComplete: "password"
                        }), s && l.a.createElement("div", {
                            className: "common-form__row__message"
                        }, l.a.createElement(y.b, b.registration_form_required))), l.a.createElement("div", {
                            className: "common-form__row"
                        }, l.a.createElement("div", {
                            className: "custom-checkbox"
                        }, l.a.createElement("div", {
                            className: u ? "custom-checkbox-input active" : "custom-checkbox-input",
                            onClick: this.handleCheckboxChange
                        }), l.a.createElement("div", {
                            className: "custom-checkbox-text",
                            onClick: this.handleCheckboxChange
                        }, l.a.createElement(y.a, b.registration_form_agreement))), u && l.a.createElement("div", {
                            className: "common-form__warning"
                        }, l.a.createElement(y.b, b.registration_form_warning))), l.a.createElement("div", {
                            className: "common-form__row"
                        }, l.a.createElement("button", {
                            disabled: w,
                            type: "submit",
                            className: "common-form__submit",
                            onClick: this.handleSubmit
                        }, l.a.createElement(y.b, b.registration_form_register)))))
                    }
                }]),
                t
        }(l.a.Component);
    _.propTypes = {
            registration: u.a.object.isRequired,
            intl: u.a.object.isRequired,
            registrationAction: u.a.func.isRequired,
            close: u.a.func
        },
        t.a = Object(y.f)(_)
}