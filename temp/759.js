 function (e, t, n) {
    "use strict";

    function r(e, t) {
        e.prototype = Object.create(t.prototype),
            e.prototype.constructor = e,
            e.__proto__ = t
    }

    function o(e, t) {
        if (null == e)
            return {};
        var n, r, o = {},
            a = Object.keys(e);
        for (r = 0; r < a.length; r++)
            n = a[r],
                t.indexOf(n) >= 0 || (o[n] = e[n]);
        if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            for (r = 0; r < i.length; r++)
                n = i[r],
                    t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
        }
        return o
    }

    function a(e, t, n) {
        return e === t || (e.correspondingElement ? e.correspondingElement.classList.contains(n) : e.classList.contains(n))
    }

    function i(e, t, n) {
        if (e === t)
            return !0;
        for (; e.parentNode;) {
            if (a(e, t, n))
                return !0;
            e = e.parentNode
        }
        return e
    }

    function s(e) {
        return document.documentElement.clientWidth <= e.clientX || document.documentElement.clientHeight <= e.clientY
    }

    function l(e, t) {
        var n = null;
        return -1 !== y.indexOf(t) && u && (n = {
            passive: !e.props.preventDefault
        }),
            n
    }

    function c(e, t) {
        var n, a, c = e.displayName || e.name || "Component";
        return a = n = function (n) {
            function a(e) {
                var r;
                return r = n.call(this, e) || this,
                    r.__outsideClickHandler = function (e) {
                        if ("function" === typeof r.__clickOutsideHandlerProp)
                            return void r.__clickOutsideHandlerProp(e);
                        var t = r.getInstance();
                        if ("function" === typeof t.props.handleClickOutside)
                            return void t.props.handleClickOutside(e);
                        if ("function" === typeof t.handleClickOutside)
                            return void t.handleClickOutside(e);
                        throw new Error("WrappedComponent: " + c + " lacks a handleClickOutside(event) function for processing outside click events.")
                    },
                    r.__getComponentNode = function () {
                        var e = r.getInstance();
                        return t && "function" === typeof t.setClickOutsideRef ? t.setClickOutsideRef()(e) : "function" === typeof e.setClickOutsideRef ? e.setClickOutsideRef() : Object(p.findDOMNode)(e)
                    },
                    r.enableOnClickOutside = function () {
                        if ("undefined" !== typeof document && !g[r._uid]) {
                            "undefined" === typeof u && (u = h()),
                                g[r._uid] = !0;
                            var e = r.props.eventTypes;
                            e.forEach || (e = [e]),
                                m[r._uid] = function (e) {
                                    if (null !== r.componentNode && (r.props.preventDefault && e.preventDefault(),
                                        r.props.stopPropagation && e.stopPropagation(), !r.props.excludeScrollbar || !s(e))) {
                                        i(e.target, r.componentNode, r.props.outsideClickIgnoreClass) === document && r.__outsideClickHandler(e)
                                    }
                                },
                                e.forEach(function (e) {
                                    document.addEventListener(e, m[r._uid], l(r, e))
                                })
                        }
                    },
                    r.disableOnClickOutside = function () {
                        delete g[r._uid];
                        var e = m[r._uid];
                        if (e && "undefined" !== typeof document) {
                            var t = r.props.eventTypes;
                            t.forEach || (t = [t]),
                                t.forEach(function (t) {
                                    return document.removeEventListener(t, e, l(r, t))
                                }),
                                delete m[r._uid]
                        }
                    },
                    r.getRef = function (e) {
                        return r.instanceRef = e
                    },
                    r._uid = f(),
                    r
            }
            r(a, n);
            var y = a.prototype;
            return y.getInstance = function () {
                if (!e.prototype.isReactComponent)
                    return this;
                var t = this.instanceRef;
                return t.getInstance ? t.getInstance() : t
            },
                y.componentDidMount = function () {
                    if ("undefined" !== typeof document && document.createElement) {
                        var e = this.getInstance();
                        if (t && "function" === typeof t.handleClickOutside && (this.__clickOutsideHandlerProp = t.handleClickOutside(e),
                            "function" !== typeof this.__clickOutsideHandlerProp))
                            throw new Error("WrappedComponent: " + c + " lacks a function for processing outside click events specified by the handleClickOutside config option.");
                        this.componentNode = this.__getComponentNode(),
                            this.props.disableOnClickOutside || this.enableOnClickOutside()
                    }
                },
                y.componentDidUpdate = function () {
                    this.componentNode = this.__getComponentNode()
                },
                y.componentWillUnmount = function () {
                    this.disableOnClickOutside()
                },
                y.render = function () {
                    var t = this.props,
                        n = (t.excludeScrollbar,
                            o(t, ["excludeScrollbar"]));
                    return e.prototype.isReactComponent ? n.ref = this.getRef : n.wrappedRef = this.getRef,
                        n.disableOnClickOutside = this.disableOnClickOutside,
                        n.enableOnClickOutside = this.enableOnClickOutside,
                        Object(d.createElement)(e, n)
                },
                a
        }(d.Component),
            n.displayName = "OnClickOutside(" + c + ")",
            n.defaultProps = {
                eventTypes: ["mousedown", "touchstart"],
                excludeScrollbar: t && t.excludeScrollbar || !1,
                outsideClickIgnoreClass: v,
                preventDefault: !1,
                stopPropagation: !1
            },
            n.getClass = function () {
                return e.getClass ? e.getClass() : e
            },
            a
    }
    var u, d = n(0),
        p = (n.n(d),
            n(53)),
        h = (n.n(p),
            function () {
                if ("undefined" !== typeof window && "function" === typeof window.addEventListener) {
                    var e = !1,
                        t = Object.defineProperty({}, "passive", {
                            get: function () {
                                e = !0
                            }
                        }),
                        n = function () { };
                    return window.addEventListener("testPassiveEventSupport", n, t),
                        window.removeEventListener("testPassiveEventSupport", n, t),
                        e
                }
            }
        ),
        f = function (e) {
            return void 0 === e && (e = 0),
                function () {
                    return ++e
                }
        }(),
        m = {},
        g = {},
        y = ["touchstart", "touchmove"],
        v = "ignore-react-onclickoutside";
    t.a = c
}