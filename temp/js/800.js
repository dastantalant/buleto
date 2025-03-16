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
        u = n(801),
        d = n(6),
        p = n(15),
        h = n(802),
        f = function () {
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
        m = function (e) {
            function t() {
                var e, n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = a = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))),
                    a.onSubmit = function (e) {
                        a.props.sendContactMailAction(e)
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                f(t, [{
                    key: "componentWillUnmount",
                    value: function () {
                        this.props.initMailSenderAction()
                    }
                }, {
                    key: "render",
                    value: function () {
                        var e = this.props.mailer;
                        return s.a.createElement(u.a, {
                            submit: this.onSubmit,
                            mailer: e
                        })
                    }
                }]),
                t
        }(s.a.Component);
    m.propTypes = {
        sendContactMailAction: c.a.func.isRequired,
        initMailSenderAction: c.a.func.isRequired,
        mailer: c.a.object.isRequired
    };
    var g = function (e) {
        return {
            mailer: e.mailer
        }
    },
        y = function (e) {
            return Object(p.bindActionCreators)({
                sendContactMailAction: h.b,
                initMailSenderAction: h.a
            }, e)
        };
    t.a = Object(d.b)(g, y)(m)
}