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
        d = n(197),
        p = (n.n(d),
            n(809)),
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
        f = function (e) {
            function t() {
                var e, n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = a = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))),
                    a.state = {
                        __html: ""
                    },
                    a.fetchContent = function (e, t) {
                        fetch("/template" + e + "?languageId=" + t).then(function (e) {
                            return e.text()
                        }).then(function (e) {
                            a.setState({
                                __html: e
                            })
                        }).catch(function (e) {
                            console.log(e)
                        })
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                h(t, [{
                    key: "componentWillMount",
                    value: function () {
                        this.fetchContent(this.props.match.path, this.props.languageId)
                    }
                }, {
                    key: "componentWillReceiveProps",
                    value: function (e) {
                        this.props.match.path === e.match.path && this.props.languageId === e.languageId || this.fetchContent(e.match.path, e.languageId)
                    }
                }, {
                    key: "render",
                    value: function () {
                        var e = this.state,
                            t = Object(p.a)(this.props.match.path);
                        return s.a.createElement(t, {
                            content: e
                        })
                    }
                }]),
                t
        }(i.Component);
    f.propTypes = {
        languageId: c.a.number.isRequired
    };
    var m = function (e) {
        return {
            languageId: e.application.get("languageId")
        }
    };
    t.a = Object(u.b)(m, null)(f)
}