 function (e, t, n) {
    "use strict";

    function r(e) {
        return e && "object" === typeof e && "default" in e ? e.default : e
    }

    function o(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n,
            e
    }

    function a(e, t) {
        e.prototype = Object.create(t.prototype),
            e.prototype.constructor = e,
            e.__proto__ = t
    }

    function i(e, t, n) {
        function r(e) {
            return e.displayName || e.name || "Component"
        }
        if ("function" !== typeof e)
            throw new Error("Expected reducePropsToState to be a function.");
        if ("function" !== typeof t)
            throw new Error("Expected handleStateChangeOnClient to be a function.");
        if ("undefined" !== typeof n && "function" !== typeof n)
            throw new Error("Expected mapStateOnServer to either be undefined or a function.");
        return function (i) {
            function d() {
                p = e(h.map(function (e) {
                    return e.props
                })),
                    f.canUseDOM ? t(p) : n && (p = n(p))
            }
            if ("function" !== typeof i)
                throw new Error("Expected WrappedComponent to be a React component.");
            var p, h = [],
                f = function (e) {
                    function t() {
                        return e.apply(this, arguments) || this
                    }
                    a(t, e),
                        t.peek = function () {
                            return p
                        },
                        t.rewind = function () {
                            if (t.canUseDOM)
                                throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");
                            var e = p;
                            return p = void 0,
                                h = [],
                                e
                        };
                    var n = t.prototype;
                    return n.shouldComponentUpdate = function (e) {
                        return !c(e, this.props)
                    },
                        n.componentWillMount = function () {
                            h.push(this),
                                d()
                        },
                        n.componentDidUpdate = function () {
                            d()
                        },
                        n.componentWillUnmount = function () {
                            var e = h.indexOf(this);
                            h.splice(e, 1),
                                d()
                        },
                        n.render = function () {
                            return l.createElement(i, this.props)
                        },
                        t
                }(s.Component);
            return o(f, "displayName", "SideEffect(" + r(i) + ")"),
                o(f, "canUseDOM", u),
                f
        }
    }
    var s = n(0),
        l = r(s),
        c = r(n(656)),
        u = !("undefined" === typeof window || !window.document || !window.document.createElement);
    e.exports = i
}