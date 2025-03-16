 function (e, t, n) {
    "use strict";

    function r(e, t) {
        var n = {};
        for (var r in e)
            t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
        return n
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
    var s = n(41),
        l = n.n(s),
        c = n(46),
        u = n.n(c),
        d = n(0),
        p = n.n(d),
        h = n(2),
        f = n.n(h),
        m = n(54),
        g = n(88),
        y = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        v = function (e) {
            return "/" === e.charAt(0) ? e : "/" + e
        },
        b = function (e, t) {
            return e ? y({}, t, {
                pathname: v(e) + t.pathname
            }) : t
        },
        _ = function (e, t) {
            if (!e)
                return t;
            var n = v(e);
            return 0 !== t.pathname.indexOf(n) ? t : y({}, t, {
                pathname: t.pathname.substr(n.length)
            })
        },
        w = function (e) {
            return "string" === typeof e ? e : Object(m.e)(e)
        },
        x = function (e) {
            return function () {
                u()(!1, "You cannot %s with <StaticRouter>", e)
            }
        },
        E = function () { },
        k = function (e) {
            function t() {
                var n, r, i;
                o(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = r = a(this, e.call.apply(e, [this].concat(l))),
                    r.createHref = function (e) {
                        return v(r.props.basename + w(e))
                    },
                    r.handlePush = function (e) {
                        var t = r.props,
                            n = t.basename,
                            o = t.context;
                        o.action = "PUSH",
                            o.location = b(n, Object(m.c)(e)),
                            o.url = w(o.location)
                    },
                    r.handleReplace = function (e) {
                        var t = r.props,
                            n = t.basename,
                            o = t.context;
                        o.action = "REPLACE",
                            o.location = b(n, Object(m.c)(e)),
                            o.url = w(o.location)
                    },
                    r.handleListen = function () {
                        return E
                    },
                    r.handleBlock = function () {
                        return E
                    },
                    i = n,
                    a(r, i)
            }
            return i(t, e),
                t.prototype.getChildContext = function () {
                    return {
                        router: {
                            staticContext: this.props.context
                        }
                    }
                },
                t.prototype.componentWillMount = function () {
                    l()(!this.props.history, "<StaticRouter> ignores the history prop. To use a custom history, use `import { Router }` instead of `import { StaticRouter as Router }`.")
                },
                t.prototype.render = function () {
                    var e = this.props,
                        t = e.basename,
                        n = (e.context,
                            e.location),
                        o = r(e, ["basename", "context", "location"]),
                        a = {
                            createHref: this.createHref,
                            action: "POP",
                            location: _(t, Object(m.c)(n)),
                            push: this.handlePush,
                            replace: this.handleReplace,
                            go: x("go"),
                            goBack: x("goBack"),
                            goForward: x("goForward"),
                            listen: this.handleListen,
                            block: this.handleBlock
                        };
                    return p.a.createElement(g.a, y({}, o, {
                        history: a
                    }))
                },
                t
        }(p.a.Component);
    k.propTypes = {
        basename: f.a.string,
        context: f.a.object.isRequired,
        location: f.a.oneOfType([f.a.string, f.a.object])
    },
        k.defaultProps = {
            basename: "",
            location: "/"
        },
        k.childContextTypes = {
            router: f.a.object.isRequired
        },
        t.a = k
}