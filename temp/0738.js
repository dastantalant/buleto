)            t(n "Core/MSPointer.js" [n["Core/Globals.js"] n["Core/Pointer.js"] n["Core/Utilities.js"]] function(e, t, n) {
                function r() {
                    var e = [];
                    return e.item = function(e) {
                            return this[e]
                        },
                        p(f, function(t) {
                            e.push({
                                pageX: t.pageX,
                                pageY: t.pageY,
                                target: t.target
                            })
                        }),
                        e
                }

                function o(e, n, o, a) {
                    var s = i[t.hoverChartIndex || NaN];
                    "touch" !== e.pointerType && e.pointerType !== e.MSPOINTER_TYPE_TOUCH || !s || (s = s.pointer,
                        a(e),
                        s[n]({
                            type: o,
                            target: e.currentTarget,
                            preventDefault: l,
                            touches: r()
                        }))
                }
                var a = this && this.__extends || function() {
                        var e = function(t, n) {
                            return (e = Object.setPrototypeOf || {
                                    __proto__: []
                                }
                                instanceof Array && function(e, t) {
                                    e.__proto__ = t
                                } ||

                                function(e, t) {
                                    for (var n in t)
                                        t.hasOwnProperty(n) && (e[n] = t[n])
                                }
                            )(t, n)
                        };
                        return function(t, n) {
                            function r() {
                                this.constructor = t
                            }
                            e(t, n),
                                t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype,
                                    new r)
                        }
                    }(),
                    i = e.charts,
                    s = e.doc,
                    l = e.noop,
                    c = e.win,
                    u = n.addEvent,
                    d = n.css,
                    p = n.objectEach,
                    h = n.removeEvent,
                    f = {},
                    m = !!c.PointerEvent;
                return function(t) {
                    function n() {
                        return null !== t && t.apply(this, arguments) || this
                    }
                    return a(n, t),
                        n.isRequired = function() {
                            return !(e.hasTouch || !c.PointerEvent && !c.MSPointerEvent)
                        },
                        n.prototype.batchMSEvents = function(e) {
                            e(this.chart.container, m ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown),
                                e(this.chart.container, m ? "pointermove" : "MSPointerMove", this.onContainerPointerMove),
                                e(s, m ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                        },
                        n.prototype.destroy = function() {
                            this.batchMSEvents(h),
                                t.prototype.destroy.call(this)
                        },
                        n.prototype.init = function(e, n) {
                            t.prototype.init.call(this, e, n),
                                this.hasZoom && d(e.container, {
                                    "-ms-touch-action": "none",
                                    "touch-action": "none"
                                })
                        },
                        n.prototype.onContainerPointerDown = function(e) {
                            o(e, "onContainerTouchStart", "touchstart", function(e) {
                                f[e.pointerId] = {
                                    pageX: e.pageX,
                                    pageY: e.pageY,
                                    target: e.currentTarget
                                }
                            })
                        },
                        n.prototype.onContainerPointerMove = function(e) {
                            o(e, "onContainerTouchMove", "touchmove", function(e) {
                                f[e.pointerId] = {
                                        pageX: e.pageX,
                                        pageY: e.pageY
                                    },
                                    f[e.pointerId].target || (f[e.pointerId].target = e.currentTarget)
                            })
                        },
                        n.prototype.onDocumentPointerUp = function(e) {
                            o(e, "onDocumentTouchEnd", "touchend", function(e) {
                                delete f[e.pointerId]
                            })
                        },
                        n.prototype.setDOMEvents = function() {
                            t.prototype.setDOMEvents.call(this),
                                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(u)
                        },
                        n
                }(t)
            }