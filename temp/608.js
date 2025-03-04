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
        l = n(0),
        c = n.n(l),
        u = n(2),
        d = n.n(u),
        p = n(54),
        h = n(153),
        f = function (e) {
            function t() {
                var n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = a = o(this, e.call.apply(e, [this].concat(l))),
                    a.history = Object(p.a)(a.props),
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                t.prototype.componentWillMount = function () {
                    s()(!this.props.history, "<BrowserRouter> ignores the history prop. To use a custom history, use `import { Router }` instead of `import { BrowserRouter as Router }`.")
                },
                t.prototype.render = function () {
                    return c.a.createElement(h.a, {
                        history: this.history,
                        children: this.props.children
                    })
                },
                t
        }(c.a.Component);
    f.propTypes = {
        basename: d.a.string,
        forceRefresh: d.a.bool,
        getUserConfirmation: d.a.func,
        keyLength: d.a.number,
        children: d.a.node
    }
}