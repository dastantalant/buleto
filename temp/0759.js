)            t(n "Series/Pie/PieSeries.js" [n["Mixins/CenteredSeries.js"] n["Series/Column/ColumnSeries.js"] n["Core/Globals.js"] n["Core/Legend/LegendSymbol.js"] n["Core/Color/Palette.js"] n["Series/Pie/PiePoint.js"] n["Core/Series/Series.js"] n["Core/Series/SeriesRegistry.js"] n["Core/Renderer/SVG/Symbols.js"] n["Core/Utilities.js"]] function(e, t, n, r, o, a, i, s, l, c) {
                var u = this && this.__extends || function() {
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
                    d = e.getStartAndEndRadians;
                n = n.noop;
                var p = c.clamp,
                    h = c.extend,
                    f = c.fireEvent,
                    m = c.merge,
                    g = c.pick,
                    y = c.relativeLength;
                return c = function(e) {
                        function t() {
                            var t = null !== e && e.apply(this, arguments) || this;
                            return t.center = void 0,
                                t.data = void 0,
                                t.maxLabelDistance = void 0,
                                t.options = void 0,
                                t.points = void 0,
                                t
                        }
                        return u(t, e),
                            t.prototype.animate = function(e) {
                                var t = this,
                                    n = t.points,
                                    r = t.startAngleRad;
                                e || n.forEach(function(e) {
                                    var n = e.graphic,
                                        o = e.shapeArgs;
                                    n && o && (n.attr({
                                            r: g(e.startR, t.center && t.center[3] / 2),
                                            start: r,
                                            end: r
                                        }),
                                        n.animate({
                                            r: o.r,
                                            start: o.start,
                                            end: o.end
                                        }, t.options.animation))
                                })
                            },
                            t.prototype.drawEmpty = function() {
                                var e = this.startAngleRad,
                                    t = this.endAngleRad,
                                    n = this.options;
                                if (0 === this.total && this.center) {
                                    var r = this.center[0],
                                        a = this.center[1];
                                    this.graph || (this.graph = this.chart.renderer.arc(r, a, this.center[1] / 2, 0, e, t).addClass("highcharts-empty-series").add(this.group)),
                                        this.graph.attr({
                                            d: l.arc(r, a, this.center[2] / 2, 0, {
                                                start: e,
                                                end: t,
                                                innerR: this.center[3] / 2
                                            })
                                        }),
                                        this.chart.styledMode || this.graph.attr({
                                            "stroke-width": n.borderWidth,
                                            fill: n.fillColor || "none",
                                            stroke: n.color || o.neutralColor20
                                        })
                                } else
                                    this.graph && (this.graph = this.graph.destroy())
                            },
                            t.prototype.drawPoints = function() {
                                var e = this.chart.renderer;
                                this.points.forEach(function(t) {
                                    t.graphic && t.hasNewShapeType() && (t.graphic = t.graphic.destroy()),
                                        t.graphic || (t.graphic = e[t.shapeType](t.shapeArgs).add(t.series.group),
                                            t.delayedRendering = !0)
                                })
                            },
                            t.prototype.generatePoints = function() {
                                e.prototype.generatePoints.call(this),
                                    this.updateTotals()
                            },
                            t.prototype.getX = function(e, t, n) {
                                var r = this.center,
                                    o = this.radii ? this.radii[n.index] || 0 : r[2] / 2;
                                return e = Math.asin(p((e - r[1]) / (o + n.labelDistance), -1, 1)),
                                    r[0] + (t ? -1 : 1) * Math.cos(e) * (o + n.labelDistance) + (0 < n.labelDistance ? (t ? -1 : 1) * this.options.dataLabels.padding : 0)
                            },
                            t.prototype.hasData = function() {
                                return !!this.processedXData.length
                            },
                            t.prototype.redrawPoints = function() {
                                var e, t, n, r, o = this,
                                    a = o.chart,
                                    i = a.renderer,
                                    s = o.options.shadow;
                                this.drawEmpty(), !s || o.shadowGroup || a.styledMode || (o.shadowGroup = i.g("shadow").attr({
                                        zIndex: -1
                                    }).add(o.group)),
                                    o.points.forEach(function(l) {
                                        var c = {};
                                        if (t = l.graphic, !l.isNull && t) {
                                            var u = void 0;
                                            r = l.shapeArgs,
                                                e = l.getTranslate(),
                                                a.styledMode || (u = l.shadowGroup,
                                                    s && !u && (u = l.shadowGroup = i.g("shadow").add(o.shadowGroup)),
                                                    u && u.attr(e),
                                                    n = o.pointAttribs(l, l.selected && "select")),
                                                l.delayedRendering ? (t.setRadialReference(o.center).attr(r).attr(e),
                                                    a.styledMode || t.attr(n).attr({
                                                        "stroke-linejoin": "round"
                                                    }).shadow(s, u),
                                                    l.delayedRendering = !1) : (t.setRadialReference(o.center),
                                                    a.styledMode || m(!0, c, n),
                                                    m(!0, c, r, e),
                                                    t.animate(c)),
                                                t.attr({
                                                    visibility: l.visible ? "inherit" : "hidden"
                                                }),
                                                t.addClass(l.getClassName(), !0)
                                        } else
                                            t && (l.graphic = t.destroy())
                                    })
                            },
                            t.prototype.sortByAngle = function(e, t) {
                                e.sort(function(e, n) {
                                    return "undefined" !== typeof e.angle && (n.angle - e.angle) * t
                                })
                            },
                            t.prototype.translate = function(e) {
                                this.generatePoints();
                                var t = this.options,
                                    n = t.slicedOffset,
                                    r = n + (t.borderWidth || 0),
                                    o = d(t.startAngle, t.endAngle),
                                    a = this.startAngleRad = o.start;
                                o = (this.endAngleRad = o.end) - a;
                                var i = this.points,
                                    s = t.dataLabels.distance;
                                t = t.ignoreHiddenPoint;
                                var l, c = i.length,
                                    u = 0;
                                for (e || (this.center = e = this.getCenter()),
                                    l = 0; l < c; l++) {
                                    var p = i[l],
                                        h = a + u * o;
                                    !p.isValid() || t && !p.visible || (u += p.percentage / 100);
                                    var m = a + u * o,
                                        v = {
                                            x: e[0],
                                            y: e[1],
                                            r: e[2] / 2,
                                            innerR: e[3] / 2,
                                            start: Math.round(1e3 * h) / 1e3,
                                            end: Math.round(1e3 * m) / 1e3
                                        };
                                    p.shapeType = "arc",
                                        p.shapeArgs = v,
                                        p.labelDistance = g(p.options.dataLabels && p.options.dataLabels.distance, s),
                                        p.labelDistance = y(p.labelDistance, v.r),
                                        this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, p.labelDistance),
                                        m = (m + h) / 2,
                                        m > 1.5 * Math.PI ? m -= 2 * Math.PI : m < -Math.PI / 2 && (m += 2 * Math.PI),
                                        p.slicedTranslation = {
                                            translateX: Math.round(Math.cos(m) * n),
                                            translateY: Math.round(Math.sin(m) * n)
                                        },
                                        v = Math.cos(m) * e[2] / 2;
                                    var b = Math.sin(m) * e[2] / 2;
                                    p.tooltipPos = [e[0] + .7 * v, e[1] + .7 * b],
                                        p.half = m < -Math.PI / 2 || m > Math.PI / 2 ? 1 : 0,
                                        p.angle = m,
                                        h = Math.min(r, p.labelDistance / 5),
                                        p.labelPosition = {
                                            natural: {
                                                x: e[0] + v + Math.cos(m) * p.labelDistance,
                                                y: e[1] + b + Math.sin(m) * p.labelDistance
                                            },
                                            final: {},
                                            alignment: 0 > p.labelDistance ? "center" : p.half ? "right" : "left",
                                            connectorPosition: {
                                                breakAt: {
                                                    x: e[0] + v + Math.cos(m) * h,
                                                    y: e[1] + b + Math.sin(m) * h
                                                },
                                                touchingSliceAt: {
                                                    x: e[0] + v,
                                                    y: e[1] + b
                                                }
                                            }
                                        }
                                }
                                f(this, "afterTranslate")
                            },
                            t.prototype.updateTotals = function() {
                                var e, t = this.points,
                                    n = t.length,
                                    r = this.options.ignoreHiddenPoint,
                                    o = 0;
                                for (e = 0; e < n; e++) {
                                    var a = t[e];
                                    !a.isValid() || r && !a.visible || (o += a.y)
                                }
                                for (this.total = o,
                                    e = 0; e < n; e++)
                                    a = t[e],
                                    a.percentage = 0 < o && (a.visible || !r) ? a.y / o * 100 : 0,
                                    a.total = o
                            },
                            t.defaultOptions = m(i.defaultOptions, {
                                center: [null, null],
                                clip: !1,
                                colorByPoint: !0,
                                dataLabels: {
                                    allowOverlap: !0,
                                    connectorPadding: 5,
                                    connectorShape: "fixedOffset",
                                    crookDistance: "70%",
                                    distance: 30,
                                    enabled: !0,
                                    formatter: function() {
                                        return this.point.isNull ? void 0 : this.point.name
                                    },
                                    softConnector: !0,
                                    x: 0
                                },
                                fillColor: void 0,
                                ignoreHiddenPoint: !0,
                                inactiveOtherPoints: !0,
                                legendType: "point",
                                marker: null,
                                size: null,
                                showInLegend: !1,
                                slicedOffset: 10,
                                stickyTracking: !1,
                                tooltip: {
                                    followPointer: !0
                                },
                                borderColor: o.backgroundColor,
                                borderWidth: 1,
                                lineWidth: void 0,
                                states: {
                                    hover: {
                                        brightness: .1
                                    }
                                }
                            }),
                            t
                    }(i),
                    h(c.prototype, {
                        axisTypes: [],
                        directTouch: !0,
                        drawGraph: void 0,
                        drawLegendSymbol: r.drawRectangle,
                        drawTracker: t.prototype.drawTracker,
                        getCenter: e.getCenter,
                        getSymbol: n,
                        isCartesian: !1,
                        noSharedTooltip: !0,
                        pointAttribs: t.prototype.pointAttribs,
                        pointClass: a,
                        requireSorting: !1,
                        searchPoint: n,
                        trackerGroups: ["group", "dataLabelsGroup"]
                    }),
                    s.registerSeriesType("pie", c),
                    c
            }