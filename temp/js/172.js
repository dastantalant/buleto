 function (e, t, n) {
    "use strict";
    n.d(t, "a", function () {
        return p
    }),
        n.d(t, "b", function () {
            return h
        }),
        n.d(t, "c", function () {
            return f
        });
    var r = n(167),
        o = n.n(r),
        a = n(168),
        i = n.n(a),
        s = n(169),
        l = n.n(s),
        c = n(0),
        u = (n.n(c),
            n(778)),
        d = n.n(u),
        p = d()(),
        h = d()(),
        f = function (e) {
            function t() {
                for (var t, n = arguments.length, r = new Array(n), a = 0; a < n; a++)
                    r[a] = arguments[a];
                return t = e.call.apply(e, [this].concat(r)) || this,
                    l()(o()(t), "referenceNode", void 0),
                    l()(o()(t), "setReferenceNode", function (e) {
                        e && t.referenceNode !== e && (t.referenceNode = e,
                            t.forceUpdate())
                    }),
                    t
            }
            i()(t, e);
            var n = t.prototype;
            return n.componentWillUnmount = function () {
                this.referenceNode = null
            },
                n.render = function () {
                    return c.createElement(p.Provider, {
                        value: this.referenceNode
                    }, c.createElement(h.Provider, {
                        value: this.setReferenceNode
                    }, this.props.children))
                },
                t
        }(c.Component)
}