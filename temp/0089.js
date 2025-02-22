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
    var i = n(41),
        s = n.n(i),
        l = n(46),
        c = n.n(l),
        u = n(0),
        d = n.n(u),
        p = n(2),
        h = n.n(p),
        f = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        m = function(e) {
            function t() {
                var n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = a = o(this, e.call.apply(e, [this].concat(l))),
                    a.state = {
                        match: a.computeMatch(a.props.history.location.pathname)
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                t.prototype.getChildContext = function() {
                    return {
                        router: f({}, this.context.router, {
                            history: this.props.history,
                            route: {
                                location: this.props.history.location,
                                match: this.state.match
                            }
                        })
                    }
                },
                t.prototype.computeMatch = function(e) {
                    return {
                        path: "/",
                        url: "/",
                        params: {},
                        isExact: "/" === e
                    }
                },
                t.prototype.componentWillMount = function() {
                    var e = this,
                        t = this.props,
                        n = t.children,
                        r = t.history;
                    c()(null == n || 1 === d.a.Children.count(n), "A <Router> may have only one child element"),
                        this.unlisten = r.listen(function() {
                            e.setState({
                                match: e.computeMatch(r.location.pathname)
                            })
                        })
                },
                t.prototype.componentWillReceiveProps = function(e) {
                    s()(this.props.history === e.history, "You cannot change <Router history>")
                },
                t.prototype.componentWillUnmount = function() {
                    this.unlisten()
                },
                t.prototype.render = function() {
                    var e = this.props.children;
                    return e ? d.a.Children.only(e) : null
                },
                t
        }(d.a.Component);
    m.propTypes = {
            history: h.a.object.isRequired,
            children: h.a.node
        },
        m.contextTypes = {
            router: h.a.object
        },
        m.childContextTypes = {
            router: h.a.object.isRequired
        },
        t.a = m
}