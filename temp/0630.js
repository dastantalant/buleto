function(e, t, n) {
    "use strict";

    function r(e) {
        return e
    }

    function o(e, t, n) {
        function o(e, t) {
            var n = v.hasOwnProperty(t) ? v[t] : null;
            E.hasOwnProperty(t) && s("OVERRIDE_BASE" === n, "ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.", t),
                e && s("DEFINE_MANY" === n || "DEFINE_MANY_MERGED" === n, "ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.", t)
        }

        function c(e, n) {
            if (n) {
                s("function" !== typeof n, "ReactClass: You're attempting to use a component class or function as a mixin. Instead, just use a regular object."),
                    s(!t(n), "ReactClass: You're attempting to use a component as a mixin. Instead, just use a regular object.");
                var r = e.prototype,
                    a = r.__reactAutoBindPairs;
                n.hasOwnProperty(l) && _.mixins(e, n.mixins);
                for (var i in n)
                    if (n.hasOwnProperty(i) && i !== l) {
                        var c = n[i],
                            u = r.hasOwnProperty(i);
                        if (o(u, i),
                            _.hasOwnProperty(i))
                            _[i](e, c);
                        else {
                            var d = v.hasOwnProperty(i),
                                f = "function" === typeof c,
                                m = f && !d && !u && !1 !== n.autobind;
                            if (m)
                                a.push(i, c),
                                r[i] = c;
                            else if (u) {
                                var g = v[i];
                                s(d && ("DEFINE_MANY_MERGED" === g || "DEFINE_MANY" === g), "ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.", g, i),
                                    "DEFINE_MANY_MERGED" === g ? r[i] = p(r[i], c) : "DEFINE_MANY" === g && (r[i] = h(r[i], c))
                            } else
                                r[i] = c
                        }
                    }
            } else
            ;
        }

        function u(e, t) {
            if (t)
                for (var n in t) {
                    var r = t[n];
                    if (t.hasOwnProperty(n)) {
                        var o = n in _;
                        s(!o, 'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.', n);
                        var a = n in e;
                        if (a) {
                            var i = b.hasOwnProperty(n) ? b[n] : null;
                            return s("DEFINE_MANY_MERGED" === i, "ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.", n),
                                void(e[n] = p(e[n], r))
                        }
                        e[n] = r
                    }
                }
        }

        function d(e, t) {
            s(e && t && "object" === typeof e && "object" === typeof t, "mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.");
            for (var n in t)
                t.hasOwnProperty(n) && (s(void 0 === e[n], "mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.", n),
                    e[n] = t[n]);
            return e
        }

        function p(e, t) {
            return function() {
                var n = e.apply(this, arguments),
                    r = t.apply(this, arguments);
                if (null == n)
                    return r;
                if (null == r)
                    return n;
                var o = {};
                return d(o, n),
                    d(o, r),
                    o
            }
        }

        function h(e, t) {
            return function() {
                e.apply(this, arguments),
                    t.apply(this, arguments)
            }
        }

        function f(e, t) {
            var n = t.bind(e);
            return n
        }

        function m(e) {
            for (var t = e.__reactAutoBindPairs, n = 0; n < t.length; n += 2) {
                var r = t[n],
                    o = t[n + 1];
                e[r] = f(e, o)
            }
        }

        function g(e) {
            var t = r(function(e, r, o) {
                this.__reactAutoBindPairs.length && m(this),
                    this.props = e,
                    this.context = r,
                    this.refs = i,
                    this.updater = o || n,
                    this.state = null;
                var a = this.getInitialState ? this.getInitialState() : null;
                s("object" === typeof a && !Array.isArray(a), "%s.getInitialState(): must return an object or null", t.displayName || "ReactCompositeComponent"),
                    this.state = a
            });
            t.prototype = new k,
                t.prototype.constructor = t,
                t.prototype.__reactAutoBindPairs = [],
                y.forEach(c.bind(null, t)),
                c(t, w),
                c(t, e),
                c(t, x),
                t.getDefaultProps && (t.defaultProps = t.getDefaultProps()),
                s(t.prototype.render, "createClass(...): Class specification must implement a `render` method.");
            for (var o in v)
                t.prototype[o] || (t.prototype[o] = null);
            return t
        }
        var y = [],
            v = {
                mixins: "DEFINE_MANY",
                statics: "DEFINE_MANY",
                propTypes: "DEFINE_MANY",
                contextTypes: "DEFINE_MANY",
                childContextTypes: "DEFINE_MANY",
                getDefaultProps: "DEFINE_MANY_MERGED",
                getInitialState: "DEFINE_MANY_MERGED",
                getChildContext: "DEFINE_MANY_MERGED",
                render: "DEFINE_ONCE",
                componentWillMount: "DEFINE_MANY",
                componentDidMount: "DEFINE_MANY",
                componentWillReceiveProps: "DEFINE_MANY",
                shouldComponentUpdate: "DEFINE_ONCE",
                componentWillUpdate: "DEFINE_MANY",
                componentDidUpdate: "DEFINE_MANY",
                componentWillUnmount: "DEFINE_MANY",
                UNSAFE_componentWillMount: "DEFINE_MANY",
                UNSAFE_componentWillReceiveProps: "DEFINE_MANY",
                UNSAFE_componentWillUpdate: "DEFINE_MANY",
                updateComponent: "OVERRIDE_BASE"
            },
            b = {
                getDerivedStateFromProps: "DEFINE_MANY_MERGED"
            },
            _ = {
                displayName: function(e, t) {
                    e.displayName = t
                },
                mixins: function(e, t) {
                    if (t)
                        for (var n = 0; n < t.length; n++)
                            c(e, t[n])
                },
                childContextTypes: function(e, t) {
                    e.childContextTypes = a({}, e.childContextTypes, t)
                },
                contextTypes: function(e, t) {
                    e.contextTypes = a({}, e.contextTypes, t)
                },
                getDefaultProps: function(e, t) {
                    e.getDefaultProps ? e.getDefaultProps = p(e.getDefaultProps, t) : e.getDefaultProps = t
                },
                propTypes: function(e, t) {
                    e.propTypes = a({}, e.propTypes, t)
                },
                statics: function(e, t) {
                    u(e, t)
                },
                autobind: function() {}
            },
            w = {
                componentDidMount: function() {
                    this.__isMounted = !0
                }
            },
            x = {
                componentWillUnmount: function() {
                    this.__isMounted = !1
                }
            },
            E = {
                replaceState: function(e, t) {
                    this.updater.enqueueReplaceState(this, e, t)
                },
                isMounted: function() {
                    return !!this.__isMounted
                }
            },
            k = function() {};
        return a(k.prototype, e.prototype, E),
            g
    }
    var a = n(32),
        i = n(630),
        s = n(631),
        l = "mixins";
    e.exports = o
}