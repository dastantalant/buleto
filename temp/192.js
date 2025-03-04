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
        u = n(41),
        d = n.n(u),
        p = n(46),
        h = n.n(p),
        f = n(89),
        m = function (e) {
            function t() {
                return r(this, t),
                    o(this, e.apply(this, arguments))
            }
            return a(t, e),
                t.prototype.componentWillMount = function () {
                    h()(this.context.router, "You should not use <Switch> outside a <Router>")
                },
                t.prototype.componentWillReceiveProps = function (e) {
                    d()(!(e.location && !this.props.location), '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'),
                        d()(!(!e.location && this.props.location), '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.')
                },
                t.prototype.render = function () {
                    var e = this.context.router.route,
                        t = this.props.children,
                        n = this.props.location || e.location,
                        r = void 0,
                        o = void 0;
                    return s.a.Children.forEach(t, function (t) {
                        if (null == r && s.a.isValidElement(t)) {
                            var a = t.props,
                                i = a.path,
                                l = a.exact,
                                c = a.strict,
                                u = a.sensitive,
                                d = a.from,
                                p = i || d;
                            o = t,
                                r = Object(f.a)(n.pathname, {
                                    path: p,
                                    exact: l,
                                    strict: c,
                                    sensitive: u
                                }, e.match)
                        }
                    }),
                        r ? s.a.cloneElement(o, {
                            location: n,
                            computedMatch: r
                        }) : null
                },
                t
        }(s.a.Component);
    m.contextTypes = {
        router: c.a.shape({
            route: c.a.object.isRequired
        }).isRequired
    },
        m.propTypes = {
            children: c.a.node,
            location: c.a.object
        },
        t.a = m
}