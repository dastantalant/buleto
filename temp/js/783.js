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
        u = n(784),
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
            profile_new_pass: {
                id: "profile.new_pass",
                defaultMessage: "\u041d\u043e\u0432\u044b\u0439 \u043f\u0430\u0440\u043e\u043b\u044c"
            }
        }),
        f = function (e) {
            function t() {
                return r(this, t),
                    o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return a(t, e),
                p(t, [{
                    key: "render",
                    value: function () {
                        return s.a.createElement("div", {
                            className: "modal"
                        }, s.a.createElement("div", {
                            className: "modal-overlay",
                            onClick: this.props.handleClose
                        }), s.a.createElement("div", {
                            className: "profile-modal"
                        }, s.a.createElement("div", {
                            className: "profile-modal-header"
                        }, s.a.createElement("span", {
                            className: "profile-modal-header-title"
                        }, s.a.createElement(d.b, h.profile_new_pass)), s.a.createElement("span", {
                            className: "profile-modal-header-close",
                            onClick: this.props.handleClose
                        })), s.a.createElement("div", {
                            className: "profile-modal-content"
                        }, s.a.createElement(u.a, {
                            updatePasswordAction: this.props.updatePasswordAction,
                            passwordState: this.props.passwordState
                        }))))
                    }
                }]),
                t
        }(s.a.Component);
    f.ProfileChangePasswordContainer = {
        handleClose: c.a.func.isRequired,
        updatePasswordAction: c.a.func.isRequired,
        intl: c.a.object.isRequired,
        passwordState: c.a.any
    },
        t.a = Object(d.f)(f)
}