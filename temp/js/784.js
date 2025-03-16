 function (e, t, n) {
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
            show_passwords: {
                id: "profile.show_passwords",
                defaultMessage: "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043f\u0430\u0440\u043e\u043b\u0438"
            },
            profile_change_password: {
                id: "profile.change_password",
                defaultMessage: "\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u043f\u0430\u0440\u043e\u043b\u044c"
            },
            profile_new_pass: {
                id: "profile.new_pass",
                defaultMessage: "\u041d\u043e\u0432\u044b\u0439 \u043f\u0430\u0440\u043e\u043b\u044c"
            },
            profile_confirm_pass: {
                id: "profile.confirm_pass",
                defaultMessage: "\u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c"
            },
            profile_pass_changed: {
                id: "profile.pass_changed",
                defaultMessage: "\u041f\u0430\u0440\u043e\u043b\u044c \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0438\u0437\u043c\u0435\u043d\u0435\u043d!"
            },
            profile_error: {
                id: "profile.error",
                defaultMessage: "\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430!"
            },
            profile_enter_current: {
                id: "profile.enter_current",
                defaultMessage: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043a\u0443\u0449\u0438\u0439 \u043f\u0430\u0440\u043e\u043b\u044c"
            },
            profile_enter_new: {
                id: "profile.enter_new",
                defaultMessage: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u043e\u0432\u044b\u0439 \u043f\u0430\u0440\u043e\u043b\u044c"
            },
            profile_min_6_req: {
                id: "profile.min_6_req",
                defaultMessage: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 6 \u0438\u043b\u0438 \u0431\u043e\u043b\u0435\u0435 \u0441\u0438\u043c\u0432\u043e\u043b\u043e"
            },
            profile_pass_incorrect: {
                id: "profile.pass_incorrect",
                defaultMessage: "\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0439 \u0442\u0435\u043a\u0443\u0449\u0438\u0439 \u043f\u0430\u0440\u043e\u043b\u044c"
            },
            profile_pass_not_match: {
                id: "profile.pass_not_match",
                defaultMessage: "\u041f\u0430\u0440\u043e\u043b\u0438 \u043d\u0435 \u0441\u043e\u0432\u043f\u0430\u0434\u0430\u044e\u0442"
            }
        }),
        f = function (e) {
            function t() {
                var e, n, i, s;
                o(this, t);
                for (var l = arguments.length, c = Array(l), u = 0; u < l; u++)
                    c[u] = arguments[u];
                return n = i = a(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(c))),
                    i.state = {
                        currentPassword: "",
                        currentPasswordError: "",
                        newPassword: "",
                        newPasswordError: "",
                        inputType: "text"
                    },
                    i.handleChange = function (e) {
                        i.setState(r({}, e.target.name, e.target.value))
                    },
                    i.handleChangeReplace = function (e) {
                        i.setState(r({}, e.target.name, e.target.value.replace(/[^A-Za-z0-9]+/g, "")))
                    },
                    i.submit = function () {
                        var e = i.state,
                            t = e.currentPassword,
                            n = e.newPassword,
                            r = t.length < 6,
                            o = n.length < 6;
                        i.setState({
                            currentPasswordError: r,
                            newPasswordError: o
                        }),
                            r || o || i.props.updatePasswordAction({
                                oldPassword: t.trim(),
                                newPassword: n.trim()
                            })
                    },
                    i.handleCheckboxChange = function () {
                        var e = i.state.inputType;
                        i.setState({
                            inputType: "password" === e ? "text" : "password"
                        })
                    },
                    s = n,
                    a(i, s)
            }
            return i(t, e),
                p(t, [{
                    key: "render",
                    value: function () {
                        var e = this.props,
                            t = e.passwordState,
                            n = e.intl,
                            r = this.state,
                            o = r.currentPasswordError,
                            a = r.newPasswordError,
                            i = r.currentPassword,
                            c = r.newPassword,
                            u = r.inputType,
                            p = "" === i || "" === c;
                        if (0 === t)
                            return l.a.createElement(s.Fragment, null, l.a.createElement("div", {
                                className: "recover-success__description text-center",
                                style: {
                                    color: "#253444"
                                }
                            }, l.a.createElement(d.b, h.profile_pass_changed)));
                        var f = o || -2 === t ? "form-control passchange form-control--error" : "form-control passchange",
                            m = a ? "form-control passchange form-control--error" : "form-control passchange";
                        return l.a.createElement(s.Fragment, null, -100 === t && l.a.createElement("div", {
                            className: "common-form__message text-center"
                        }, l.a.createElement(d.b, h.profile_error)), l.a.createElement("div", {
                            className: f
                        }, l.a.createElement("input", {
                            className: "form-control-input",
                            type: u,
                            name: "currentPassword",
                            placeholder: n.formatMessage(h.profile_enter_current),
                            onChange: this.handleChange
                        }), o && l.a.createElement("div", {
                            className: "form-control-error"
                        }, l.a.createElement(d.b, h.profile_min_6_req)), -2 === t && l.a.createElement("div", {
                            className: "form-control-error"
                        }, l.a.createElement(d.b, h.profile_pass_incorrect))), l.a.createElement("div", {
                            className: m
                        }, l.a.createElement("input", {
                            className: "form-control-input",
                            type: u,
                            name: "newPassword",
                            placeholder: n.formatMessage(h.profile_enter_new),
                            value: c,
                            onChange: this.handleChangeReplace
                        }), a && l.a.createElement("div", {
                            className: "form-control-error"
                        }, l.a.createElement(d.b, h.profile_min_6_req))), l.a.createElement("div", {
                            className: "common-form custom-checkbox",
                            style: {
                                display: "flex",
                                alignItems: "center"
                            }
                        }, l.a.createElement("div", {
                            className: "password" !== u ? "custom-checkbox-input active" : "custom-checkbox-input",
                            onClick: this.handleCheckboxChange
                        }), l.a.createElement("div", {
                            className: "custom-checkbox-text",
                            style: {
                                color: "#000"
                            },
                            onClick: this.handleCheckboxChange
                        }, l.a.createElement(d.b, h.show_passwords))), l.a.createElement("button", {
                            className: "form-control-submit passchangesubmit",
                            style: {
                                cursor: p ? "not-allowed" : "pointer",
                                marginTop: "30px"
                            },
                            disabled: p,
                            onClick: this.submit
                        }, l.a.createElement(d.b, h.profile_change_password)))
                    }
                }]),
                t
        }(s.Component);
    f.ProfileChangePasswordContainer = {
        updatePasswordAction: u.a.func.isRequired,
        passwordState: u.a.any
    },
        t.a = Object(d.f)(f)
}