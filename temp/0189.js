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
        u = n(46),
        d = n.n(u),
        p = function(e) {
            function t() {
                return r(this, t),
                    o(this, e.apply(this, arguments))
            }
            return a(t, e),
                t.prototype.enable = function(e) {
                    this.unblock && this.unblock(),
                        this.unblock = this.context.router.history.block(e)
                },
                t.prototype.disable = function() {
                    this.unblock && (this.unblock(),
                        this.unblock = null)
                },
                t.prototype.componentWillMount = function() {
                    d()(this.context.router, "You should not use <Prompt> outside a <Router>"),
                        this.props.when && this.enable(this.props.message)
                },
                t.prototype.componentWillReceiveProps = function(e) {
                    e.when ? this.props.when && this.props.message === e.message || this.enable(e.message) : this.disable()
                },
                t.prototype.componentWillUnmount = function() {
                    this.disable()
                },
                t.prototype.render = function() {
                    return null
                },
                t
        }(s.a.Component);
    p.propTypes = {
            when: c.a.bool,
            message: c.a.oneOfType([c.a.func, c.a.string]).isRequired
        },
        p.defaultProps = {
            when: !0
        },
        p.contextTypes = {
            router: c.a.shape({
                history: c.a.shape({
                    block: c.a.func.isRequired
                }).isRequired
            }).isRequired
        },
        t.a = p
}