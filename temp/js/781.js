 function (e, t, n) {
    "use strict";

    function r(e) {
        return p.createElement(m.b.Consumer, null, function (t) {
            return p.createElement(y, a()({
                setReferenceNode: t
            }, e))
        })
    }
    t.a = r;
    var o = n(285),
        a = n.n(o),
        i = n(167),
        s = n.n(i),
        l = n(168),
        c = n.n(l),
        u = n(169),
        d = n.n(u),
        p = n(0),
        h = (n.n(p),
            n(41)),
        f = n.n(h),
        m = n(172),
        g = n(290),
        y = function (e) {
            function t() {
                for (var t, n = arguments.length, r = new Array(n), o = 0; o < n; o++)
                    r[o] = arguments[o];
                return t = e.call.apply(e, [this].concat(r)) || this,
                    d()(s()(t), "refHandler", function (e) {
                        Object(g.b)(t.props.innerRef, e),
                            Object(g.a)(t.props.setReferenceNode, e)
                    }),
                    t
            }
            c()(t, e);
            var n = t.prototype;
            return n.componentWillUnmount = function () {
                Object(g.b)(this.props.innerRef, null)
            },
                n.render = function () {
                    return f()(Boolean(this.props.setReferenceNode), "`Reference` should not be used outside of a `Manager` component."),
                        Object(g.c)(this.props.children)({
                            ref: this.refHandler
                        })
                },
                t
        }(p.Component)
}