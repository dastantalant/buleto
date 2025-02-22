function(e, t, n) {
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
    var s = n(0),
        l = n.n(s),
        c = n(2),
        u = n.n(c),
        d = n(46),
        p = n.n(d),
        h = n(54),
        f = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        m = function(e) {
            return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
        },
        g = function(e) {
            function t() {
                var n, r, i;
                o(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = r = a(this, e.call.apply(e, [this].concat(l))),
                    r.handleClick = function(e) {
                        if (r.props.onClick && r.props.onClick(e), !e.defaultPrevented && 0 === e.button && !r.props.target && !m(e)) {
                            e.preventDefault();
                            var t = r.context.router.history,
                                n = r.props,
                                o = n.replace,
                                a = n.to;
                            o ? t.replace(a) : t.push(a)
                        }
                    },
                    i = n,
                    a(r, i)
            }
            return i(t, e),
                t.prototype.render = function() {
                    var e = this.props,
                        t = (e.replace,
                            e.to),
                        n = e.innerRef,
                        o = r(e, ["replace", "to", "innerRef"]);
                    p()(this.context.router, "You should not use <Link> outside a <Router>"),
                        p()(void 0 !== t, 'You must specify the "to" property');
                    var a = this.context.router.history,
                        i = "string" === typeof t ? Object(h.c)(t, null, null, a.location) : t,
                        s = a.createHref(i);
                    return l.a.createElement("a", f({}, o, {
                        onClick: this.handleClick,
                        href: s,
                        ref: n
                    }))
                },
                t
        }(l.a.Component);
    g.propTypes = {
            onClick: u.a.func,
            target: u.a.string,
            replace: u.a.bool,
            to: u.a.oneOfType([u.a.string, u.a.object]).isRequired,
            innerRef: u.a.oneOfType([u.a.string, u.a.func])
        },
        g.defaultProps = {
            replace: !1
        },
        g.contextTypes = {
            router: u.a.shape({
                history: u.a.shape({
                    push: u.a.func.isRequired,
                    replace: u.a.func.isRequired,
                    createHref: u.a.func.isRequired
                }).isRequired
            }).isRequired
        },
        t.a = g
}