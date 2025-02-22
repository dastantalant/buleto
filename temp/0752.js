)            t(n "Series/Column/ColumnSeries.js" [n["Core/Animation/AnimationUtilities.js"] n["Core/Color/Color.js"] n["Core/Globals.js"] n["Core/Legend/LegendSymbol.js"] n["Core/Color/Palette.js"] n["Core/Series/Series.js"] n["Core/Series/SeriesRegistry.js"] n["Core/Utilities.js"]] function(e, t, n, r, o, a, i, s) {
                var l = this && this.__extends || function() {
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
                    c = e.animObject,
                    u = t.parse,
                    d = n.hasTouch;
                e = n.noop;
                var p = s.clamp,
                    h = s.css,
                    f = s.defined,
                    m = s.extend,
                    g = s.fireEvent,
                    y = s.isArray,
                    v = s.isNumber,
                    b = s.merge,
                    _ = s.pick,
                    w = s.objectEach;
                return s = function(e) {
                        function t() {
                            var t = null !== e && e.apply(this, arguments) || this;
                            return t.borderWidth = void 0,
                                t.data = void 0,
                                t.group = void 0,
                                t.options = void 0,
                                t.points = void 0,
                                t
                        }
                        return l(t, e),
                            t.prototype.animate = function(e) {
                                var t = this,
                                    n = this.yAxis,
                                    r = t.options,
                                    o = this.chart.inverted,
                                    a = {},
                                    i = o ? "translateX" : "translateY";
                                if (e)
                                    a.scaleY = .001,
                                    e = p(n.toPixels(r.threshold), n.pos, n.pos + n.len),
                                    o ? a.translateX = e - n.len : a.translateY = e,
                                    t.clipBox && t.setClip(),
                                    t.group.attr(a);
                                else {
                                    var s = Number(t.group.attr(i));
                                    t.group.animate({
                                        scaleY: 1
                                    }, m(c(t.options.animation), {
                                        step: function(e, r) {
                                            t.group && (a[i] = s + r.pos * (n.pos - s),
                                                t.group.attr(a))
                                        }
                                    }))
                                }
                            },
                            t.prototype.init = function(t, n) {
                                e.prototype.init.apply(this, arguments);
                                var r = this;
                                t = r.chart,
                                    t.hasRendered && t.series.forEach(function(e) {
                                        e.type === r.type && (e.isDirty = !0)
                                    })
                            },
                            t.prototype.getColumnMetrics = function() {
                                var e = this,
                                    t = e.options,
                                    n = e.xAxis,
                                    r = e.yAxis,
                                    o = n.options.reversedStacks;
                                o = n.reversed && !o || !n.reversed && o;
                                var a, i = {},
                                    s = 0;
                                !1 === t.grouping ? s = 1 : e.chart.series.forEach(function(t) {
                                    var n = t.yAxis,
                                        o = t.options;
                                    if (t.type === e.type && (t.visible || !e.chart.options.chart.ignoreHiddenSeries) && r.len === n.len && r.pos === n.pos) {
                                        if (o.stacking && "group" !== o.stacking) {
                                            a = t.stackKey,
                                                "undefined" === typeof i[a] && (i[a] = s++);
                                            var l = i[a]
                                        } else
                                            !1 !== o.grouping && (l = s++);
                                        t.columnIndex = l
                                    }
                                });
                                var l = Math.min(Math.abs(n.transA) * (n.ordinal && n.ordinal.slope || t.pointRange || n.closestPointRange || n.tickInterval || 1), n.len),
                                    c = l * t.groupPadding,
                                    u = (l - 2 * c) / (s || 1);
                                return t = Math.min(t.maxPointWidth || n.len, _(t.pointWidth, u * (1 - 2 * t.pointPadding))),
                                    e.columnMetrics = {
                                        width: t,
                                        offset: (u - t) / 2 + (c + ((e.columnIndex || 0) + (o ? 1 : 0)) * u - l / 2) * (o ? -1 : 1),
                                        paddedWidth: u,
                                        columnCount: s
                                    },
                                    e.columnMetrics
                            },
                            t.prototype.crispCol = function(e, t, n, r) {
                                var o = this.chart,
                                    a = this.borderWidth,
                                    i = -(a % 2 ? .5 : 0);
                                return a = a % 2 ? .5 : 1,
                                    o.inverted && o.renderer.isVML && (a += 1),
                                    this.options.crisp && (n = Math.round(e + n) + i,
                                        e = Math.round(e) + i,
                                        n -= e),
                                    r = Math.round(t + r) + a,
                                    i = .5 >= Math.abs(t) && .5 < r,
                                    t = Math.round(t) + a,
                                    r -= t,
                                    i && r && (--t,
                                        r += 1), {
                                        x: e,
                                        y: t,
                                        width: n,
                                        height: r
                                    }
                            },
                            t.prototype.adjustForMissingColumns = function(e, t, n, r) {
                                var o = this,
                                    a = this.options.stacking;
                                if (!n.isNull && 1 < r.columnCount) {
                                    var i = 0,
                                        s = 0;
                                    w(this.yAxis.stacking && this.yAxis.stacking.stacks, function(e) {
                                            if ("number" === typeof n.x && (e = e[n.x.toString()])) {
                                                var t = e.points[o.index],
                                                    r = e.total;
                                                a ? (t && (i = s),
                                                    e.hasValidPoints && s++) : y(t) && (i = t[1],
                                                    s = r || 0)
                                            }
                                        }),
                                        e = (n.plotX || 0) + ((s - 1) * r.paddedWidth + t) / 2 - t - i * r.paddedWidth
                                }
                                return e
                            },
                            t.prototype.translate = function() {
                                var e = this,
                                    t = e.chart,
                                    n = e.options,
                                    r = e.dense = 2 > e.closestPointRange * e.xAxis.transA;
                                r = e.borderWidth = _(n.borderWidth, r ? 0 : 1);
                                var o = e.xAxis,
                                    i = e.yAxis,
                                    s = n.threshold,
                                    l = e.translatedThreshold = i.getThreshold(s),
                                    c = _(n.minPointLength, 5),
                                    u = e.getColumnMetrics(),
                                    d = u.width,
                                    h = e.pointXOffset = u.offset,
                                    m = e.dataMin,
                                    g = e.dataMax,
                                    y = e.barW = Math.max(d, 1 + 2 * r);
                                t.inverted && (l -= .5),
                                    n.pointPadding && (y = Math.ceil(y)),
                                    a.prototype.translate.apply(e),
                                    e.points.forEach(function(r) {
                                        var a = _(r.yBottom, l),
                                            b = 999 + Math.abs(a),
                                            w = r.plotX || 0;
                                        b = p(r.plotY, -b, i.len + b);
                                        var x = Math.min(b, a),
                                            E = Math.max(b, a) - x,
                                            k = d,
                                            S = w + h,
                                            O = y;
                                        c && Math.abs(E) < c && (E = c,
                                                w = !i.reversed && !r.negative || i.reversed && r.negative,
                                                v(s) && v(g) && r.y === s && g <= s && (i.min || 0) < s && (m !== g || (i.max || 0) <= s) && (w = !w),
                                                x = Math.abs(x - l) > c ? a - c : l - (w ? c : 0)),
                                            f(r.options.pointWidth) && (k = O = Math.ceil(r.options.pointWidth),
                                                S -= Math.round((k - d) / 2)),
                                            n.centerInCategory && (S = e.adjustForMissingColumns(S, k, r, u)),
                                            r.barX = S,
                                            r.pointWidth = k,
                                            r.tooltipPos = t.inverted ? [p(i.len + i.pos - t.plotLeft - b, i.pos - t.plotLeft, i.len + i.pos - t.plotLeft), o.len + o.pos - t.plotTop - S - O / 2, E] : [o.left - t.plotLeft + S + O / 2, p(b + i.pos - t.plotTop, i.pos - t.plotTop, i.len + i.pos - t.plotTop), E],
                                            r.shapeType = e.pointClass.prototype.shapeType || "rect",
                                            r.shapeArgs = e.crispCol.apply(e, r.isNull ? [S, l, O, 0] : [S, x, O, E])
                                    })
                            },
                            t.prototype.drawGraph = function() {
                                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
                            },
                            t.prototype.pointAttribs = function(e, t) {
                                var n = this.options,
                                    r = this.pointAttrToOptions || {},
                                    o = r.stroke || "borderColor",
                                    a = r["stroke-width"] || "borderWidth",
                                    i = e && e.color || this.color,
                                    s = e && e[o] || n[o] || i;
                                r = e && e.options.dashStyle || n.dashStyle;
                                var l = e && e[a] || n[a] || this[a] || 0,
                                    c = _(e && e.opacity, n.opacity, 1);
                                if (e && this.zones.length) {
                                    var d = e.getZone();
                                    i = e.options.color || d && (d.color || e.nonZonedColor) || this.color,
                                        d && (s = d.borderColor || s,
                                            r = d.dashStyle || r,
                                            l = d.borderWidth || l)
                                }
                                return t && e && (e = b(n.states[t], e.options.states && e.options.states[t] || {}),
                                        t = e.brightness,
                                        i = e.color || "undefined" !== typeof t && u(i).brighten(e.brightness).get() || i,
                                        s = e[o] || s,
                                        l = e[a] || l,
                                        r = e.dashStyle || r,
                                        c = _(e.opacity, c)),
                                    o = {
                                        fill: i,
                                        stroke: s,
                                        "stroke-width": l,
                                        opacity: c
                                    },
                                    r && (o.dashstyle = r),
                                    o
                            },
                            t.prototype.drawPoints = function() {
                                var e, t = this,
                                    n = this.chart,
                                    r = t.options,
                                    o = n.renderer,
                                    a = r.animationLimit || 250;
                                t.points.forEach(function(i) {
                                    var s = i.graphic,
                                        l = !!s,
                                        c = s && n.pointCount < a ? "animate" : "attr";
                                    v(i.plotY) && null !== i.y ? (e = i.shapeArgs,
                                        s && i.hasNewShapeType() && (s = s.destroy()),
                                        t.enabledDataSorting && (i.startXPos = t.xAxis.reversed ? -(e ? e.width || 0 : 0) : t.xAxis.width),
                                        s || (i.graphic = s = o[i.shapeType](e).add(i.group || t.group)) && t.enabledDataSorting && n.hasRendered && n.pointCount < a && (s.attr({
                                                x: i.startXPos
                                            }),
                                            l = !0,
                                            c = "animate"),
                                        s && l && s[c](b(e)),
                                        r.borderRadius && s[c]({
                                            r: r.borderRadius
                                        }),
                                        n.styledMode || s[c](t.pointAttribs(i, i.selected && "select")).shadow(!1 !== i.allowShadow && r.shadow, null, r.stacking && !r.borderRadius),
                                        s && (s.addClass(i.getClassName(), !0),
                                            s.attr({
                                                visibility: i.visible ? "inherit" : "hidden"
                                            }))) : s && (i.graphic = s.destroy())
                                })
                            },
                            t.prototype.drawTracker = function() {
                                var e, t = this,
                                    n = t.chart,
                                    r = n.pointer,
                                    o = function(e) {
                                        var t = r.getPointFromEvent(e);
                                        "undefined" !== typeof t && (r.isDirectTouch = !0,
                                            t.onMouseOver(e))
                                    };
                                t.points.forEach(function(t) {
                                        e = y(t.dataLabels) ? t.dataLabels : t.dataLabel ? [t.dataLabel] : [],
                                            t.graphic && (t.graphic.element.point = t),
                                            e.forEach(function(e) {
                                                e.div ? e.div.point = t : e.element.point = t
                                            })
                                    }),
                                    t._hasTracking || (t.trackerGroups.forEach(function(e) {
                                            t[e] && (t[e].addClass("highcharts-tracker").on("mouseover", o).on("mouseout", function(e) {
                                                    r.onTrackerMouseOut(e)
                                                }),
                                                d && t[e].on("touchstart", o), !n.styledMode && t.options.cursor && t[e].css(h).css({
                                                    cursor: t.options.cursor
                                                }))
                                        }),
                                        t._hasTracking = !0),
                                    g(this, "afterDrawTracker")
                            },
                            t.prototype.remove = function() {
                                var e = this,
                                    t = e.chart;
                                t.hasRendered && t.series.forEach(function(t) {
                                        t.type === e.type && (t.isDirty = !0)
                                    }),
                                    a.prototype.remove.apply(e, arguments)
                            },
                            t.defaultOptions = b(a.defaultOptions, {
                                borderRadius: 0,
                                centerInCategory: !1,
                                groupPadding: .2,
                                marker: null,
                                pointPadding: .1,
                                minPointLength: 0,
                                cropThreshold: 50,
                                pointRange: null,
                                states: {
                                    hover: {
                                        halo: !1,
                                        brightness: .1
                                    },
                                    select: {
                                        color: o.neutralColor20,
                                        borderColor: o.neutralColor100
                                    }
                                },
                                dataLabels: {
                                    align: void 0,
                                    verticalAlign: void 0,
                                    y: void 0
                                },
                                startFromThreshold: !0,
                                stickyTracking: !1,
                                tooltip: {
                                    distance: 6
                                },
                                threshold: 0,
                                borderColor: o.backgroundColor
                            }),
                            t
                    }(a),
                    m(s.prototype, {
                        cropShoulder: 0,
                        directTouch: !0,
                        drawLegendSymbol: r.drawRectangle,
                        getSymbol: e,
                        negStacks: !0,
                        trackerGroups: ["group", "dataLabelsGroup"]
                    }),
                    i.registerSeriesType("column", s),
                    s
            }