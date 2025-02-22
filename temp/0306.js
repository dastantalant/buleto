function(e, t, n) {
    "use strict";
    var r = n(174),
        o = n(0),
        a = n.n(o),
        i = n(2),
        s = n.n(i),
        l = n(175);
    n(111),
        a.a.forwardRef;
    t.a = function(e) {
        var t;
        void 0 === e && (e = "store");
        var n = e + "Subscription",
            a = function(t) {
                function a(n, r) {
                    var o;
                    return o = t.call(this, n, r) || this,
                        o[e] = n.store,
                        o
                }
                Object(r.a)(a, t);
                var i = a.prototype;
                return i.getChildContext = function() {
                        var t;
                        return t = {},
                            t[e] = this[e],
                            t[n] = null,
                            t
                    },
                    i.render = function() {
                        return o.Children.only(this.props.children)
                    },
                    a
            }(o.Component);
        return a.propTypes = {
                store: l.a.isRequired,
                children: s.a.element.isRequired
            },
            a.childContextTypes = (t = {},
                t[e] = l.a.isRequired,
                t[n] = l.b,
                t),
            a
    }()
}