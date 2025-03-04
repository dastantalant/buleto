 function (e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
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

    function s(e, t) {
        return e === t ? 0 !== e || 1 / e === 1 / t : e !== e && t !== t
    }

    function l(e) {
        var t = [];
        return {
            on: function (e) {
                t.push(e)
            },
            off: function (e) {
                t = t.filter(function (t) {
                    return t !== e
                })
            },
            get: function () {
                return e
            },
            set: function (n, r) {
                e = n,
                    t.forEach(function (t) {
                        return t(e, r)
                    })
            }
        }
    }

    function c(e) {
        return Array.isArray(e) ? e[0] : e
    }

    function u(e, t) {
        var n, r, u = "__create-react-context-" + (0,
            m.default)() + "__",
            p = function (e) {
                function n() {
                    var t, r, i;
                    o(this, n);
                    for (var s = arguments.length, c = Array(s), u = 0; u < s; u++)
                        c[u] = arguments[u];
                    return t = r = a(this, e.call.apply(e, [this].concat(c))),
                        r.emitter = l(r.props.value),
                        i = t,
                        a(r, i)
                }
                return i(n, e),
                    n.prototype.getChildContext = function () {
                        var e;
                        return e = {},
                            e[u] = this.emitter,
                            e
                    },
                    n.prototype.componentWillReceiveProps = function (e) {
                        if (this.props.value !== e.value) {
                            var n = this.props.value,
                                r = e.value,
                                o = void 0;
                            s(n, r) ? o = 0 : (o = "function" === typeof t ? t(n, r) : y,
                                0 !== (o |= 0) && this.emitter.set(e.value, o))
                        }
                    },
                    n.prototype.render = function () {
                        return this.props.children
                    },
                    n
            }(d.Component);
        p.childContextTypes = (n = {},
            n[u] = h.default.object.isRequired,
            n);
        var f = function (t) {
            function n() {
                var e, r, i;
                o(this, n);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return e = r = a(this, t.call.apply(t, [this].concat(l))),
                    r.state = {
                        value: r.getValue()
                    },
                    r.onUpdate = function (e, t) {
                        0 !== ((0 | r.observedBits) & t) && r.setState({
                            value: r.getValue()
                        })
                    },
                    i = e,
                    a(r, i)
            }
            return i(n, t),
                n.prototype.componentWillReceiveProps = function (e) {
                    var t = e.observedBits;
                    this.observedBits = void 0 === t || null === t ? y : t
                },
                n.prototype.componentDidMount = function () {
                    this.context[u] && this.context[u].on(this.onUpdate);
                    var e = this.props.observedBits;
                    this.observedBits = void 0 === e || null === e ? y : e
                },
                n.prototype.componentWillUnmount = function () {
                    this.context[u] && this.context[u].off(this.onUpdate)
                },
                n.prototype.getValue = function () {
                    return this.context[u] ? this.context[u].get() : e
                },
                n.prototype.render = function () {
                    return c(this.props.children)(this.state.value)
                },
                n
        }(d.Component);
        return f.contextTypes = (r = {},
            r[u] = h.default.object,
            r), {
            Provider: p,
            Consumer: f
        }
    }
    t.__esModule = !0;
    var d = n(0),
        p = (r(d),
            n(2)),
        h = r(p),
        f = n(780),
        m = r(f),
        g = n(41),
        y = (r(g),
            1073741823);
    t.default = u,
        e.exports = t.default
}