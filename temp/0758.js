)            t(n "Series/Pie/PiePoint.js" [n["Core/Animation/AnimationUtilities.js"] n["Core/Series/Point.js"] n["Core/Utilities.js"]] function(e, t, n) {
                var r = this && this.__extends || function() {
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
                    o = e.setAnimation,
                    a = n.addEvent,
                    i = n.defined;
                e = n.extend;
                var s = n.isNumber,
                    l = n.pick,
                    c = n.relativeLength;
                return t = function(e) {
                        function t() {
                            var t = null !== e && e.apply(this, arguments) || this;
                            return t.labelDistance = void 0,
                                t.options = void 0,
                                t.series = void 0,
                                t
                        }
                        return r(t, e),
                            t.prototype.getConnectorPath = function() {
                                var e = this.labelPosition,
                                    t = this.series.options.dataLabels,
                                    n = this.connectorShapes,
                                    r = t.connectorShape;
                                return n[r] && (r = n[r]),
                                    r.call(this, {
                                        x: e.final.x,
                                        y: e.final.y,
                                        alignment: e.alignment
                                    }, e.connectorPosition, t)
                            },
                            t.prototype.getTranslate = function() {
                                return this.sliced ? this.slicedTranslation : {
                                    translateX: 0,
                                    translateY: 0
                                }
                            },
                            t.prototype.haloPath = function(e) {
                                var t = this.shapeArgs;
                                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(t.x, t.y, t.r + e, t.r + e, {
                                    innerR: t.r - 1,
                                    start: t.start,
                                    end: t.end
                                })
                            },
                            t.prototype.init = function() {
                                var t = this;
                                e.prototype.init.apply(this, arguments),
                                    this.name = l(this.name, "Slice");
                                var n = function(e) {
                                    t.slice("select" === e.type)
                                };
                                return a(this, "select", n),
                                    a(this, "unselect", n),
                                    this
                            },
                            t.prototype.isValid = function() {
                                return s(this.y) && 0 <= this.y
                            },
                            t.prototype.setVisible = function(e, t) {
                                var n = this,
                                    r = this.series,
                                    o = r.chart,
                                    a = r.options.ignoreHiddenPoint;
                                t = l(t, a),
                                    e !== this.visible && (this.visible = this.options.visible = e = "undefined" === typeof e ? !this.visible : e,
                                        r.options.data[r.data.indexOf(this)] = this.options, ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function(t) {
                                            n[t] && n[t][e ? "show" : "hide"](e)
                                        }),
                                        this.legendItem && o.legend.colorizeItem(this, e),
                                        e || "hover" !== this.state || this.setState(""),
                                        a && (r.isDirty = !0),
                                        t && o.redraw())
                            },
                            t.prototype.slice = function(e, t, n) {
                                var r = this.series;
                                o(n, r.chart),
                                    l(t, !0),
                                    this.sliced = this.options.sliced = i(e) ? e : !this.sliced,
                                    r.options.data[r.data.indexOf(this)] = this.options,
                                    this.graphic && this.graphic.animate(this.getTranslate()),
                                    this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
                            },
                            t
                    }(t),
                    e(t.prototype, {
                        connectorShapes: {
                            fixedOffset: function(e, t, n) {
                                var r = t.breakAt;
                                return t = t.touchingSliceAt, [
                                    ["M", e.x, e.y], n.softConnector ? ["C", e.x + ("left" === e.alignment ? -5 : 5), e.y, 2 * r.x - t.x, 2 * r.y - t.y, r.x, r.y] : ["L", r.x, r.y],
                                    ["L", t.x, t.y]
                                ]
                            },
                            straight: function(e, t) {
                                return t = t.touchingSliceAt, [
                                    ["M", e.x, e.y],
                                    ["L", t.x, t.y]
                                ]
                            },
                            crookedLine: function(e, t, n) {
                                t = t.touchingSliceAt;
                                var r = this.series,
                                    o = r.center[0],
                                    a = r.chart.plotWidth,
                                    i = r.chart.plotLeft;
                                r = e.alignment;
                                var s = this.shapeArgs.r;
                                return n = c(n.crookDistance, 1),
                                    a = "left" === r ? o + s + (a + i - o - s) * (1 - n) : i + (o - s) * n,
                                    n = ["L", a, e.y],
                                    o = !0,
                                    ("left" === r ? a > e.x || a < t.x : a < e.x || a > t.x) && (o = !1),
                                    e = [
                                        ["M", e.x, e.y]
                                    ],
                                    o && e.push(n),
                                    e.push(["L", t.x, t.y]),
                                    e
                            }
                        }
                    }),
                    t
            }