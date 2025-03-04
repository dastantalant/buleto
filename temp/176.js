 function (e, t, n) {
    "use strict";

    function r() { }

    function o(e, t) {
        var n = {
            run: function (r) {
                try {
                    var o = e(t.getState(), r);
                    (o !== n.props || n.error) && (n.shouldComponentUpdate = !0,
                        n.props = o,
                        n.error = null)
                } catch (e) {
                    n.shouldComponentUpdate = !0,
                        n.error = e
                }
            }
        };
        return n
    }

    function a(e, t) {
        var n, a;
        void 0 === t && (t = {});
        var u = t,
            p = u.getDisplayName,
            m = void 0 === p ? function (e) {
                return "ConnectAdvanced(" + e + ")"
            } :
                p,
            x = u.methodName,
            E = void 0 === x ? "connectAdvanced" : x,
            k = u.renderCountProp,
            S = void 0 === k ? void 0 : k,
            O = u.shouldHandleStateChanges,
            C = void 0 === O || O,
            T = u.storeKey,
            M = void 0 === T ? "store" : T,
            A = u.withRef,
            P = void 0 !== A && A,
            N = Object(c.a)(u, ["getDisplayName", "methodName", "renderCountProp", "shouldHandleStateChanges", "storeKey", "withRef"]),
            j = M + "Subscription",
            D = _++,
            R = (n = {},
                n[M] = v.a,
                n[j] = v.b,
                n),
            I = (a = {},
                a[j] = v.b,
                a);
        return function (t) {
            h()(Object(g.isValidElementType)(t), "You must pass a component to the function returned by " + E + ". Instead received " + JSON.stringify(t));
            var n = t.displayName || t.name || "Component",
                a = m(n),
                c = Object(l.a)({}, N, {
                    getDisplayName: m,
                    methodName: E,
                    renderCountProp: S,
                    shouldHandleStateChanges: C,
                    storeKey: M,
                    withRef: P,
                    displayName: a,
                    wrappedComponentName: n,
                    WrappedComponent: t
                }),
                u = function (n) {
                    function u(e, t) {
                        var r;
                        return r = n.call(this, e, t) || this,
                            r.version = D,
                            r.state = {},
                            r.renderCount = 0,
                            r.store = e[M] || t[M],
                            r.propsMode = Boolean(e[M]),
                            r.setWrappedInstance = r.setWrappedInstance.bind(Object(s.a)(Object(s.a)(r))),
                            h()(r.store, 'Could not find "' + M + '" in either the context or props of "' + a + '". Either wrap the root component in a <Provider>, or explicitly pass "' + M + '" as a prop to "' + a + '".'),
                            r.initSelector(),
                            r.initSubscription(),
                            r
                    }
                    Object(i.a)(u, n);
                    var d = u.prototype;
                    return d.getChildContext = function () {
                        var e, t = this.propsMode ? null : this.subscription;
                        return e = {},
                            e[j] = t || this.context[j],
                            e
                    },
                        d.componentDidMount = function () {
                            C && (this.subscription.trySubscribe(),
                                this.selector.run(this.props),
                                this.selector.shouldComponentUpdate && this.forceUpdate())
                        },
                        d.componentWillReceiveProps = function (e) {
                            this.selector.run(e)
                        },
                        d.shouldComponentUpdate = function () {
                            return this.selector.shouldComponentUpdate
                        },
                        d.componentWillUnmount = function () {
                            this.subscription && this.subscription.tryUnsubscribe(),
                                this.subscription = null,
                                this.notifyNestedSubs = r,
                                this.store = null,
                                this.selector.run = r,
                                this.selector.shouldComponentUpdate = !1
                        },
                        d.getWrappedInstance = function () {
                            return h()(P, "To access the wrapped instance, you need to specify { withRef: true } in the options argument of the " + E + "() call."),
                                this.wrappedInstance
                        },
                        d.setWrappedInstance = function (e) {
                            this.wrappedInstance = e
                        },
                        d.initSelector = function () {
                            var t = e(this.store.dispatch, c);
                            this.selector = o(t, this.store),
                                this.selector.run(this.props)
                        },
                        d.initSubscription = function () {
                            if (C) {
                                var e = (this.propsMode ? this.props : this.context)[j];
                                this.subscription = new y.a(this.store, e, this.onStateChange.bind(this)),
                                    this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription)
                            }
                        },
                        d.onStateChange = function () {
                            this.selector.run(this.props),
                                this.selector.shouldComponentUpdate ? (this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate,
                                    this.setState(w)) : this.notifyNestedSubs()
                        },
                        d.notifyNestedSubsOnComponentDidUpdate = function () {
                            this.componentDidUpdate = void 0,
                                this.notifyNestedSubs()
                        },
                        d.isSubscribed = function () {
                            return Boolean(this.subscription) && this.subscription.isSubscribed()
                        },
                        d.addExtraProps = function (e) {
                            if (!P && !S && (!this.propsMode || !this.subscription))
                                return e;
                            var t = Object(l.a)({}, e);
                            return P && (t.ref = this.setWrappedInstance),
                                S && (t[S] = this.renderCount++),
                                this.propsMode && this.subscription && (t[j] = this.subscription),
                                t
                        },
                        d.render = function () {
                            var e = this.selector;
                            if (e.shouldComponentUpdate = !1,
                                e.error)
                                throw e.error;
                            return Object(f.createElement)(t, this.addExtraProps(e.props))
                        },
                        u
                }(f.Component);
            b && (u.prototype.UNSAFE_componentWillReceiveProps = u.prototype.componentWillReceiveProps,
                delete u.prototype.componentWillReceiveProps),
                u.WrappedComponent = t,
                u.displayName = a,
                u.childContextTypes = I,
                u.contextTypes = R,
                u.propTypes = R;
            return d()(u, t)
        }
    }
    t.a = a;
    var i = n(174),
        s = n(308),
        l = n(84),
        c = n(112),
        u = n(177),
        d = n.n(u),
        p = n(46),
        h = n.n(p),
        f = n(0),
        m = n.n(f),
        g = n(178),
        y = (n.n(g),
            n(310)),
        v = n(175),
        b = "undefined" !== typeof m.a.forwardRef,
        _ = 0,
        w = {}
}