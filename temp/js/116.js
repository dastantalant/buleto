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
    var i = n(41),
        s = n.n(i),
        l = n(46),
        c = n.n(l),
        u = n(0),
        d = n.n(u),
        p = n(2),
        h = n.n(p),
        f = n(89),
        m = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        g = function (e) {
            return 0 === d.a.Children.count(e)
        },
        y = function (e) {
            function t() {
                var n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = a = o(this, e.call.apply(e, [this].concat(l))),
                    a.state = {
                        match: a.computeMatch(a.props, a.context.router)
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                t.prototype.getChildContext = function () {
                    return {
                        router: m({}, this.context.router, {
                            route: {
                                location: this.props.location || this.context.router.route.location,
                                match: this.state.match
                            }
                        })
                    }
                },
                t.prototype.computeMatch = function (e, t) {
                    var n = e.computedMatch,
                        r = e.location,
                        o = e.path,
                        a = e.strict,
                        i = e.exact,
                        s = e.sensitive;
                    if (n)
                        return n;
                    c()(t, "You should not use <Route> or withRouter() outside a <Router>");
                    var l = t.route,
                        u = (r || l.location).pathname;
                    return Object(f.a)(u, {
                        path: o,
                        strict: a,
                        exact: i,
                        sensitive: s
                    }, l.match)
                },
                t.prototype.componentWillMount = function () {
                    s()(!(this.props.component && this.props.render), "You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored"),
                        s()(!(this.props.component && this.props.children && !g(this.props.children)), "You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored"),
                        s()(!(this.props.render && this.props.children && !g(this.props.children)), "You should not use <Route render> and <Route children> in the same route; <Route children> will be ignored")
                },
                t.prototype.componentWillReceiveProps = function (e, t) {
                    s()(!(e.location && !this.props.location), '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'),
                        s()(!(!e.location && this.props.location), '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'),
                        this.setState({
                            match: this.computeMatch(e, t.router)
                        })
                },
                t.prototype.render = function () {
                    var e = this.state.match,
                        t = this.props,
                        n = t.children,
                        r = t.component,
                        o = t.render,
                        a = this.context.router,
                        i = a.history,
                        s = a.route,
                        l = a.staticContext,
                        c = this.props.location || s.location,
                        u = {
                            match: e,
                            location: c,
                            history: i,
                            staticContext: l
                        };
                    return r ? e ? d.a.createElement(r, u) : null : o ? e ? o(u) : null : "function" === typeof n ? n(u) : n && !g(n) ? d.a.Children.only(n) : null
                },
                t
        }(d.a.Component);
    y.propTypes = {
        computedMatch: h.a.object,
        path: h.a.string,
        exact: h.a.bool,
        strict: h.a.bool,
        sensitive: h.a.bool,
        component: h.a.func,
        render: h.a.func,
        children: h.a.oneOfType([h.a.func, h.a.node]),
        location: h.a.object
    },
        y.contextTypes = {
            router: h.a.shape({
                history: h.a.object.isRequired,
                route: h.a.object.isRequired,
                staticContext: h.a.object
            })
        },
        y.childContextTypes = {
            router: h.a.object.isRequired
        },
        t.a = y
}