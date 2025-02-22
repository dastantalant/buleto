function(e, t, n) {
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
        f = n(54),
        m = n(115),
        g = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        y = function(e) {
            function t() {
                return r(this, t),
                    o(this, e.apply(this, arguments))
            }
            return a(t, e),
                t.prototype.isStatic = function() {
                    return this.context.router && this.context.router.staticContext
                },
                t.prototype.componentWillMount = function() {
                    h()(this.context.router, "You should not use <Redirect> outside a <Router>"),
                        this.isStatic() && this.perform()
                },
                t.prototype.componentDidMount = function() {
                    this.isStatic() || this.perform()
                },
                t.prototype.componentDidUpdate = function(e) {
                    var t = Object(f.c)(e.to),
                        n = Object(f.c)(this.props.to);
                    if (Object(f.f)(t, n))
                        return void d()(!1, "You tried to redirect to the same route you're currently on: \"" + n.pathname + n.search + '"');
                    this.perform()
                },
                t.prototype.computeTo = function(e) {
                    var t = e.computedMatch,
                        n = e.to;
                    return t ? "string" === typeof n ? Object(m.a)(n, t.params) : g({}, n, {
                        pathname: Object(m.a)(n.pathname, t.params)
                    }) : n
                },
                t.prototype.perform = function() {
                    var e = this.context.router.history,
                        t = this.props.push,
                        n = this.computeTo(this.props);
                    t ? e.push(n) : e.replace(n)
                },
                t.prototype.render = function() {
                    return null
                },
                t
        }(s.a.Component);
    y.propTypes = {
            computedMatch: c.a.object,
            push: c.a.bool,
            from: c.a.string,
            to: c.a.oneOfType([c.a.string, c.a.object]).isRequired
        },
        y.defaultProps = {
            push: !1
        },
        y.contextTypes = {
            router: c.a.shape({
                history: c.a.shape({
                    push: c.a.func.isRequired,
                    replace: c.a.func.isRequired
                }).isRequired,
                staticContext: c.a.object
            }).isRequired
        },
        t.a = y
}