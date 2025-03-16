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
        u = n(6),
        d = n(15),
        p = n(758),
        h = n(74),
        f = n(283),
        m = n(19),
        g = n(39),
        y = function () {
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
        v = function (e) {
            function t() {
                return r(this, t),
                    o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return a(t, e),
                y(t, [{
                    key: "componentDidMount",
                    value: function () {
                        this.props.getUserProfileAction()
                    }
                }, {
                    key: "render",
                    value: function () {
                        var e = this.props,
                            t = e.profile,
                            n = e.updateUserProfileAction,
                            r = e.updatePasswordAction,
                            o = e.initUpdatePasswordAction;
                        if (0 === t.get("info").size)
                            return !1;
                        var a = t.get("info"),
                            i = t.get("updateState"),
                            l = t.get("passwordState"),
                            c = t.get("fetching"),
                            u = {
                                info: a,
                                updateState: i,
                                updateUserProfileAction: n,
                                updatePasswordAction: r,
                                initUpdatePasswordAction: o,
                                passwordState: l,
                                fetching: c
                            };
                        return s.a.createElement(g.a, {
                            pageName: "profile",
                            emptyDescr: !0
                        }, s.a.createElement("div", {
                            className: "profile-wrapper"
                        }, c && s.a.createElement(m.a, null), s.a.createElement(h.a, {
                            user: this.props.user
                        }), s.a.createElement(p.a, u)))
                    }
                }]),
                t
        }(s.a.Component);
    v.propTypes = {
        getUserProfileAction: c.a.func.isRequired,
        updateUserProfileAction: c.a.func.isRequired,
        updatePasswordAction: c.a.func.isRequired,
        initUpdatePasswordAction: c.a.func.isRequired,
        user: c.a.object.isRequired,
        profile: c.a.object.isRequired,
        fetching: c.a.bool
    };
    var b = function (e) {
        return {
            user: e.application.get("user"),
            profile: e.application.get("profile")
        }
    },
        _ = function (e) {
            return Object(d.bindActionCreators)({
                getUserProfileAction: f.a,
                updateUserProfileAction: f.d,
                updatePasswordAction: f.c,
                initUpdatePasswordAction: f.b
            }, e)
        };
    t.a = Object(u.b)(b, _)(v)
}