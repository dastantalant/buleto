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
        u = n(87),
        d = n(194),
        p = function(e) {
            function t() {
                var n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = a = o(this, e.call.apply(e, [this].concat(l))),
                    a.handleLocationChange = function(e) {
                        a.store.dispatch({
                            type: d.a,
                            payload: e
                        })
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                t.prototype.componentWillMount = function() {
                    var e = this.props,
                        t = e.store,
                        n = e.history;
                    this.store = t || this.context.store,
                        this.handleLocationChange(n.location)
                },
                t.prototype.componentDidMount = function() {
                    var e = this.props.history;
                    this.unsubscribeFromHistory = e.listen(this.handleLocationChange)
                },
                t.prototype.componentWillUnmount = function() {
                    this.unsubscribeFromHistory && this.unsubscribeFromHistory()
                },
                t.prototype.render = function() {
                    return s.a.createElement(u.c, this.props)
                },
                t
        }(i.Component);
    p.propTypes = {
            store: c.a.object,
            history: c.a.object,
            children: c.a.node
        },
        p.contextTypes = {
            store: c.a.object
        },
        t.a = p
}