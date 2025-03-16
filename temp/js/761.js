 function (e, t, n) {
    "use strict";

    function r(e) {
        var t = e.referenceElement,
            n = a()(e, ["referenceElement"]);
        return g.createElement(v.a.Consumer, null, function (e) {
            return g.createElement(x, s()({
                referenceElement: void 0 !== t ? t : e
            }, n))
        })
    }
    t.a = r;
    var o = n(762),
        a = n.n(o),
        i = n(285),
        s = n.n(i),
        l = n(167),
        c = n.n(l),
        u = n(168),
        d = n.n(u),
        p = n(169),
        h = n.n(p),
        f = n(763),
        m = n.n(f),
        g = n(0),
        y = (n.n(g),
            n(777)),
        v = n(172),
        b = n(290),
        _ = {
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            pointerEvents: "none"
        },
        w = {},
        x = function (e) {
            function t() {
                for (var t, n = arguments.length, r = new Array(n), o = 0; o < n; o++)
                    r[o] = arguments[o];
                return t = e.call.apply(e, [this].concat(r)) || this,
                    h()(c()(t), "state", {
                        data: void 0,
                        placement: void 0
                    }),
                    h()(c()(t), "popperInstance", void 0),
                    h()(c()(t), "popperNode", null),
                    h()(c()(t), "arrowNode", null),
                    h()(c()(t), "setPopperNode", function (e) {
                        e && t.popperNode !== e && (Object(b.b)(t.props.innerRef, e),
                            t.popperNode = e,
                            t.updatePopperInstance())
                    }),
                    h()(c()(t), "setArrowNode", function (e) {
                        t.arrowNode = e
                    }),
                    h()(c()(t), "updateStateModifier", {
                        enabled: !0,
                        order: 900,
                        fn: function (e) {
                            var n = e.placement;
                            return t.setState({
                                data: e,
                                placement: n
                            }),
                                e
                        }
                    }),
                    h()(c()(t), "getOptions", function () {
                        return {
                            placement: t.props.placement,
                            eventsEnabled: t.props.eventsEnabled,
                            positionFixed: t.props.positionFixed,
                            modifiers: s()({}, t.props.modifiers, {
                                arrow: s()({}, t.props.modifiers && t.props.modifiers.arrow, {
                                    enabled: !!t.arrowNode,
                                    element: t.arrowNode
                                }),
                                applyStyle: {
                                    enabled: !1
                                },
                                updateStateModifier: t.updateStateModifier
                            })
                        }
                    }),
                    h()(c()(t), "getPopperStyle", function () {
                        return t.popperNode && t.state.data ? s()({
                            position: t.state.data.offsets.popper.position
                        }, t.state.data.styles) : _
                    }),
                    h()(c()(t), "getPopperPlacement", function () {
                        return t.state.data ? t.state.placement : void 0
                    }),
                    h()(c()(t), "getArrowStyle", function () {
                        return t.arrowNode && t.state.data ? t.state.data.arrowStyles : w
                    }),
                    h()(c()(t), "getOutOfBoundariesState", function () {
                        return t.state.data ? t.state.data.hide : void 0
                    }),
                    h()(c()(t), "destroyPopperInstance", function () {
                        t.popperInstance && (t.popperInstance.destroy(),
                            t.popperInstance = null)
                    }),
                    h()(c()(t), "updatePopperInstance", function () {
                        t.destroyPopperInstance();
                        var e = c()(t),
                            n = e.popperNode,
                            r = t.props.referenceElement;
                        r && n && (t.popperInstance = new y.a(r, n, t.getOptions()))
                    }),
                    h()(c()(t), "scheduleUpdate", function () {
                        t.popperInstance && t.popperInstance.scheduleUpdate()
                    }),
                    t
            }
            d()(t, e);
            var n = t.prototype;
            return n.componentDidUpdate = function (e, t) {
                this.props.placement === e.placement && this.props.referenceElement === e.referenceElement && this.props.positionFixed === e.positionFixed && m()(this.props.modifiers, e.modifiers, {
                    strict: !0
                }) ? this.props.eventsEnabled !== e.eventsEnabled && this.popperInstance && (this.props.eventsEnabled ? this.popperInstance.enableEventListeners() : this.popperInstance.disableEventListeners()) : this.updatePopperInstance(),
                    t.placement !== this.state.placement && this.scheduleUpdate()
            },
                n.componentWillUnmount = function () {
                    Object(b.b)(this.props.innerRef, null),
                        this.destroyPopperInstance()
                },
                n.render = function () {
                    return Object(b.c)(this.props.children)({
                        ref: this.setPopperNode,
                        style: this.getPopperStyle(),
                        placement: this.getPopperPlacement(),
                        outOfBoundaries: this.getOutOfBoundariesState(),
                        scheduleUpdate: this.scheduleUpdate,
                        arrowProps: {
                            ref: this.setArrowNode,
                            style: this.getArrowStyle()
                        }
                    })
                },
                t
        }(g.Component);
    h()(x, "defaultProps", {
        placement: "bottom",
        eventsEnabled: !0,
        referenceElement: void 0,
        positionFixed: !1
    });
    y.a.placements
}