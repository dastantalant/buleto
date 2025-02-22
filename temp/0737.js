)            t(n "Core/Pointer.js" [n["Core/Color/Color.js"] n["Core/Globals.js"] n["Core/Color/Palette.js"] n["Core/Tooltip.js"] n["Core/Utilities.js"]] function(e, t, n, r, o) {
                var a = e.parse,
                    i = t.charts,
                    s = t.noop,
                    l = o.addEvent,
                    c = o.attr,
                    u = o.css,
                    d = o.defined,
                    p = o.extend,
                    h = o.find,
                    f = o.fireEvent,
                    m = o.isNumber,
                    g = o.isObject,
                    y = o.objectEach,
                    v = o.offset,
                    b = o.pick,
                    _ = o.splat;
                return e = function() {
                    function e(e, t) {
                        this.lastValidTouch = {},
                            this.pinchDown = [],
                            this.runChartClick = !1,
                            this.eventsToUnbind = [],
                            this.chart = e,
                            this.hasDragged = !1,
                            this.options = t,
                            this.init(e, t)
                    }
                    return e.prototype.applyInactiveState = function(e) {
                            var t, n = [];
                            (e || []).forEach(function(e) {
                                    t = e.series,
                                        n.push(t),
                                        t.linkedParent && n.push(t.linkedParent),
                                        t.linkedSeries && (n = n.concat(t.linkedSeries)),
                                        t.navigatorSeries && n.push(t.navigatorSeries)
                                }),
                                this.chart.series.forEach(function(e) {
                                    -1 === n.indexOf(e) ? e.setState("inactive", !0) : e.options.inactiveOtherPoints && e.setAllPointsToState("inactive")
                                })
                        },
                        e.prototype.destroy = function() {
                            var n = this;
                            this.eventsToUnbind.forEach(function(e) {
                                    return e()
                                }),
                                this.eventsToUnbind = [],
                                t.chartCount || (e.unbindDocumentMouseUp && (e.unbindDocumentMouseUp = e.unbindDocumentMouseUp()),
                                    e.unbindDocumentTouchEnd && (e.unbindDocumentTouchEnd = e.unbindDocumentTouchEnd())),
                                clearInterval(n.tooltipTimeout),
                                y(n, function(e, t) {
                                    n[t] = void 0
                                })
                        },
                        e.prototype.drag = function(e) {
                            var t = this.chart,
                                r = t.options.chart,
                                o = this.zoomHor,
                                i = this.zoomVert,
                                s = t.plotLeft,
                                l = t.plotTop,
                                c = t.plotWidth,
                                u = t.plotHeight,
                                d = this.mouseDownX || 0,
                                p = this.mouseDownY || 0,
                                h = g(r.panning) ? r.panning && r.panning.enabled : r.panning,
                                f = r.panKey && e[r.panKey + "Key"],
                                m = e.chartX,
                                y = e.chartY,
                                v = this.selectionMarker;
                            if ((!v || !v.touch) && (m < s ? m = s : m > s + c && (m = s + c),
                                    y < l ? y = l : y > l + u && (y = l + u),
                                    this.hasDragged = Math.sqrt(Math.pow(d - m, 2) + Math.pow(p - y, 2)),
                                    10 < this.hasDragged)) {
                                var b = t.isInsidePlot(d - s, p - l, {
                                    visiblePlotOnly: !0
                                });
                                t.hasCartesianSeries && (this.zoomX || this.zoomY) && b && !f && !v && (this.selectionMarker = v = t.renderer.rect(s, l, o ? 1 : c, i ? 1 : u, 0).attr({
                                            class: "highcharts-selection-marker",
                                            zIndex: 7
                                        }).add(),
                                        t.styledMode || v.attr({
                                            fill: r.selectionMarkerFill || a(n.highlightColor80).setOpacity(.25).get()
                                        })),
                                    v && o && (o = m - d,
                                        v.attr({
                                            width: Math.abs(o),
                                            x: (0 < o ? 0 : o) + d
                                        })),
                                    v && i && (o = y - p,
                                        v.attr({
                                            height: Math.abs(o),
                                            y: (0 < o ? 0 : o) + p
                                        })),
                                    b && !v && h && t.pan(e, r.panning)
                            }
                        },
                        e.prototype.dragStart = function(e) {
                            var t = this.chart;
                            t.mouseIsDown = e.type,
                                t.cancelClick = !1,
                                t.mouseDownX = this.mouseDownX = e.chartX,
                                t.mouseDownY = this.mouseDownY = e.chartY
                        },
                        e.prototype.drop = function(e) {
                            var t = this,
                                n = this.chart,
                                r = this.hasPinched;
                            if (this.selectionMarker) {
                                var o, a = {
                                        originalEvent: e,
                                        xAxis: [],
                                        yAxis: []
                                    },
                                    i = this.selectionMarker,
                                    s = i.attr ? i.attr("x") : i.x,
                                    l = i.attr ? i.attr("y") : i.y,
                                    c = i.attr ? i.attr("width") : i.width,
                                    h = i.attr ? i.attr("height") : i.height;
                                (this.hasDragged || r) && (n.axes.forEach(function(n) {
                                        if (n.zoomEnabled && d(n.min) && (r || t[{
                                                xAxis: "zoomX",
                                                yAxis: "zoomY"
                                            }[n.coll]]) && m(s) && m(l)) {
                                            var i = n.horiz,
                                                u = "touchend" === e.type ? n.minPixelPadding : 0,
                                                p = n.toValue((i ? s : l) + u);
                                            i = n.toValue((i ? s + c : l + h) - u),
                                                a[n.coll].push({
                                                    axis: n,
                                                    min: Math.min(p, i),
                                                    max: Math.max(p, i)
                                                }),
                                                o = !0
                                        }
                                    }),
                                    o && f(n, "selection", a, function(e) {
                                        n.zoom(p(e, r ? {
                                            animation: !1
                                        } : null))
                                    })),
                                m(n.index) && (this.selectionMarker = this.selectionMarker.destroy()),
                                    r && this.scaleGroups()
                            }
                            n && m(n.index) && (u(n.container, {
                                    cursor: n._cursor
                                }),
                                n.cancelClick = 10 < this.hasDragged,
                                n.mouseIsDown = this.hasDragged = this.hasPinched = !1,
                                this.pinchDown = [])
                        },
                        e.prototype.findNearestKDPoint = function(e, t, n) {
                            var r = this.chart,
                                o = r.hoverPoint;
                            if (r = r.tooltip,
                                o && r && r.isStickyOnContact())
                                return o;
                            var a;
                            return e.forEach(function(e) {
                                    var r = !(e.noSharedTooltip && t) && 0 > e.options.findNearestPointBy.indexOf("y");
                                    if (e = e.searchPoint(n, r),
                                        (r = g(e, !0) && e.series) && !(r = !g(a, !0))) {
                                        r = a.distX - e.distX;
                                        var o = a.dist - e.dist,
                                            i = (e.series.group && e.series.group.zIndex) - (a.series.group && a.series.group.zIndex);
                                        r = 0 < (0 !== r && t ? r : 0 !== o ? o : 0 !== i ? i : a.series.index > e.series.index ? -1 : 1)
                                    }
                                    r && (a = e)
                                }),
                                a
                        },
                        e.prototype.getChartCoordinatesFromPoint = function(e, t) {
                            var n = e.series,
                                r = n.xAxis;
                            n = n.yAxis;
                            var o = e.shapeArgs;
                            if (r && n) {
                                var a = b(e.clientX, e.plotX),
                                    i = e.plotY || 0;
                                return e.isNode && o && m(o.x) && m(o.y) && (a = o.x,
                                        i = o.y),
                                    t ? {
                                        chartX: n.len + n.pos - i,
                                        chartY: r.len + r.pos - a
                                    } : {
                                        chartX: a + r.pos,
                                        chartY: i + n.pos
                                    }
                            }
                            if (o && o.x && o.y)
                                return {
                                    chartX: o.x,
                                    chartY: o.y
                                }
                        },
                        e.prototype.getChartPosition = function() {
                            if (this.chartPosition)
                                return this.chartPosition;
                            var e = this.chart.container,
                                t = v(e);
                            this.chartPosition = {
                                left: t.left,
                                top: t.top,
                                scaleX: 1,
                                scaleY: 1
                            };
                            var n = e.offsetWidth;
                            return e = e.offsetHeight,
                                2 < n && 2 < e && (this.chartPosition.scaleX = t.width / n,
                                    this.chartPosition.scaleY = t.height / e),
                                this.chartPosition
                        },
                        e.prototype.getCoordinates = function(e) {
                            var t = {
                                xAxis: [],
                                yAxis: []
                            };
                            return this.chart.axes.forEach(function(n) {
                                    t[n.isXAxis ? "xAxis" : "yAxis"].push({
                                        axis: n,
                                        value: n.toValue(e[n.horiz ? "chartX" : "chartY"])
                                    })
                                }),
                                t
                        },
                        e.prototype.getHoverData = function(e, t, n, r, o, a) {
                            var i = [];
                            r = !(!r || !e);
                            var s = {
                                chartX: a ? a.chartX : void 0,
                                chartY: a ? a.chartY : void 0,
                                shared: o
                            };
                            f(this, "beforeGetHoverData", s);
                            var l = t && !t.stickyTracking ? [t] : n.filter(function(e) {
                                    return s.filter ? s.filter(e) : e.visible && !(!o && e.directTouch) && b(e.options.enableMouseTracking, !0) && e.stickyTracking
                                }),
                                c = r || !a ? e : this.findNearestKDPoint(l, o, a);
                            return t = c && c.series,
                                c && (o && !t.noSharedTooltip ? (l = n.filter(function(e) {
                                        return s.filter ? s.filter(e) : e.visible && !(!o && e.directTouch) && b(e.options.enableMouseTracking, !0) && !e.noSharedTooltip
                                    }),
                                    l.forEach(function(e) {
                                        var t = h(e.points, function(e) {
                                            return e.x === c.x && !e.isNull
                                        });
                                        g(t) && (e.chart.isBoosting && (t = e.getPoint(t)),
                                            i.push(t))
                                    })) : i.push(c)),
                                s = {
                                    hoverPoint: c
                                },
                                f(this, "afterGetHoverData", s), {
                                    hoverPoint: s.hoverPoint,
                                    hoverSeries: t,
                                    hoverPoints: i
                                }
                        },
                        e.prototype.getPointFromEvent = function(e) {
                            e = e.target;
                            for (var t; e && !t;)
                                t = e.point,
                                e = e.parentNode;
                            return t
                        },
                        e.prototype.onTrackerMouseOut = function(e) {
                            e = e.relatedTarget || e.toElement;
                            var t = this.chart.hoverSeries;
                            this.isDirectTouch = !1, !t || !e || t.stickyTracking || this.inClass(e, "highcharts-tooltip") || this.inClass(e, "highcharts-series-" + t.index) && this.inClass(e, "highcharts-tracker") || t.onMouseOut()
                        },
                        e.prototype.inClass = function(e, t) {
                            for (var n; e;) {
                                if (n = c(e, "class")) {
                                    if (-1 !== n.indexOf(t))
                                        return !0;
                                    if (-1 !== n.indexOf("highcharts-container"))
                                        return !1
                                }
                                e = e.parentNode
                            }
                        },
                        e.prototype.init = function(e, t) {
                            this.options = t,
                                this.chart = e,
                                this.runChartClick = !(!t.chart.events || !t.chart.events.click),
                                this.pinchDown = [],
                                this.lastValidTouch = {},
                                r && (e.tooltip = new r(e, t.tooltip),
                                    this.followTouchMove = b(t.tooltip.followTouchMove, !0)),
                                this.setDOMEvents()
                        },
                        e.prototype.normalize = function(e, t) {
                            var n = e.touches,
                                r = n ? n.length ? n.item(0) : b(n.changedTouches, e.changedTouches)[0] : e;
                            return t || (t = this.getChartPosition()),
                                n = r.pageX - t.left,
                                r = r.pageY - t.top,
                                n /= t.scaleX,
                                r /= t.scaleY,
                                p(e, {
                                    chartX: Math.round(n),
                                    chartY: Math.round(r)
                                })
                        },
                        e.prototype.onContainerClick = function(e) {
                            var t = this.chart,
                                n = t.hoverPoint;
                            e = this.normalize(e);
                            var r = t.plotLeft,
                                o = t.plotTop;
                            t.cancelClick || (n && this.inClass(e.target, "highcharts-tracker") ? (f(n.series, "click", p(e, {
                                    point: n
                                })),
                                t.hoverPoint && n.firePointEvent("click", e)) : (p(e, this.getCoordinates(e)),
                                t.isInsidePlot(e.chartX - r, e.chartY - o, {
                                    visiblePlotOnly: !0
                                }) && f(t, "click", e)))
                        },
                        e.prototype.onContainerMouseDown = function(e) {
                            var n = 1 === (1 & (e.buttons || e.button));
                            e = this.normalize(e),
                                t.isFirefox && 0 !== e.button && this.onContainerMouseMove(e),
                                ("undefined" === typeof e.button || n) && (this.zoomOption(e),
                                    n && e.preventDefault && e.preventDefault(),
                                    this.dragStart(e))
                        },
                        e.prototype.onContainerMouseLeave = function(t) {
                            var n = i[b(e.hoverChartIndex, -1)],
                                r = this.chart.tooltip;
                            r && r.shouldStickOnContact() && this.inClass(t.relatedTarget, "highcharts-tooltip-container") || (t = this.normalize(t),
                                n && (t.relatedTarget || t.toElement) && (n.pointer.reset(),
                                    n.pointer.chartPosition = void 0),
                                r && !r.isHidden && this.reset())
                        },
                        e.prototype.onContainerMouseEnter = function(e) {
                            delete this.chartPosition
                        },
                        e.prototype.onContainerMouseMove = function(e) {
                            var t = this.chart;
                            e = this.normalize(e),
                                this.setHoverChartIndex(),
                                e.preventDefault || (e.returnValue = !1),
                                ("mousedown" === t.mouseIsDown || this.touchSelect(e)) && this.drag(e),
                                t.openMenu || !this.inClass(e.target, "highcharts-tracker") && !t.isInsidePlot(e.chartX - t.plotLeft, e.chartY - t.plotTop, {
                                    visiblePlotOnly: !0
                                }) || (this.inClass(e.target, "highcharts-no-tooltip") ? this.reset(!1, 0) : this.runPointActions(e))
                        },
                        e.prototype.onDocumentTouchEnd = function(t) {
                            var n = i[b(e.hoverChartIndex, -1)];
                            n && n.pointer.drop(t)
                        },
                        e.prototype.onContainerTouchMove = function(e) {
                            this.touchSelect(e) ? this.onContainerMouseMove(e) : this.touch(e)
                        },
                        e.prototype.onContainerTouchStart = function(e) {
                            this.touchSelect(e) ? this.onContainerMouseDown(e) : (this.zoomOption(e),
                                this.touch(e, !0))
                        },
                        e.prototype.onDocumentMouseMove = function(e) {
                            var t = this.chart,
                                n = this.chartPosition;
                            e = this.normalize(e, n);
                            var r = t.tooltip;
                            !n || r && r.isStickyOnContact() || t.isInsidePlot(e.chartX - t.plotLeft, e.chartY - t.plotTop, {
                                visiblePlotOnly: !0
                            }) || this.inClass(e.target, "highcharts-tracker") || this.reset()
                        },
                        e.prototype.onDocumentMouseUp = function(t) {
                            var n = i[b(e.hoverChartIndex, -1)];
                            n && n.pointer.drop(t)
                        },
                        e.prototype.pinch = function(e) {
                            var t = this,
                                n = t.chart,
                                r = t.pinchDown,
                                o = e.touches || [],
                                a = o.length,
                                i = t.lastValidTouch,
                                l = t.hasZoom,
                                c = {},
                                u = 1 === a && (t.inClass(e.target, "highcharts-tracker") && n.runTrackerClick || t.runChartClick),
                                d = {},
                                h = t.selectionMarker;
                            1 < a ? t.initiated = !0 : 1 === a && this.followTouchMove && (t.initiated = !1),
                                l && t.initiated && !u && !1 !== e.cancelable && e.preventDefault(), [].map.call(o, function(e) {
                                    return t.normalize(e)
                                }),
                                "touchstart" === e.type ? ([].forEach.call(o, function(e, t) {
                                        r[t] = {
                                            chartX: e.chartX,
                                            chartY: e.chartY
                                        }
                                    }),
                                    i.x = [r[0].chartX, r[1] && r[1].chartX],
                                    i.y = [r[0].chartY, r[1] && r[1].chartY],
                                    n.axes.forEach(function(e) {
                                        if (e.zoomEnabled) {
                                            var t = n.bounds[e.horiz ? "h" : "v"],
                                                r = e.minPixelPadding,
                                                o = e.toPixels(Math.min(b(e.options.min, e.dataMin), e.dataMin)),
                                                a = e.toPixels(Math.max(b(e.options.max, e.dataMax), e.dataMax)),
                                                i = Math.max(o, a);
                                            t.min = Math.min(e.pos, Math.min(o, a) - r),
                                                t.max = Math.max(e.pos + e.len, i + r)
                                        }
                                    }),
                                    t.res = !0) : t.followTouchMove && 1 === a ? this.runPointActions(t.normalize(e)) : r.length && (h || (t.selectionMarker = h = p({
                                        destroy: s,
                                        touch: !0
                                    }, n.plotBox)),
                                    t.pinchTranslate(r, o, c, h, d, i),
                                    t.hasPinched = l,
                                    t.scaleGroups(c, d),
                                    t.res && (t.res = !1,
                                        this.reset(!1, 0)))
                        },
                        e.prototype.pinchTranslate = function(e, t, n, r, o, a) {
                            this.zoomHor && this.pinchTranslateDirection(!0, e, t, n, r, o, a),
                                this.zoomVert && this.pinchTranslateDirection(!1, e, t, n, r, o, a)
                        },
                        e.prototype.pinchTranslateDirection = function(e, t, n, r, o, a, i, s) {
                            var l = this.chart,
                                c = e ? "x" : "y",
                                u = e ? "X" : "Y",
                                d = "chart" + u,
                                p = e ? "width" : "height",
                                h = l["plot" + (e ? "Left" : "Top")],
                                f = l.inverted,
                                m = l.bounds[e ? "h" : "v"],
                                g = 1 === t.length,
                                y = t[0][d],
                                v = !g && t[1][d];
                            t = function() {
                                "number" === typeof E && 20 < Math.abs(y - v) && (w = s || Math.abs(x - E) / Math.abs(y - v)),
                                    _ = (h - x) / w + y,
                                    b = l["plot" + (e ? "Width" : "Height")] / w
                            };
                            var b, _, w = s || 1,
                                x = n[0][d],
                                E = !g && n[1][d];
                            if (t(),
                                (n = _) < m.min) {
                                n = m.min;
                                var k = !0
                            } else
                                n + b > m.max && (n = m.max - b,
                                    k = !0);
                            k ? (x -= .8 * (x - i[c][0]),
                                    "number" === typeof E && (E -= .8 * (E - i[c][1])),
                                    t()) : i[c] = [x, E],
                                f || (a[c] = _ - h,
                                    a[p] = b),
                                a = f ? 1 / w : w,
                                o[p] = b,
                                o[c] = n,
                                r[f ? e ? "scaleY" : "scaleX" : "scale" + u] = w,
                                r["translate" + u] = a * h + (x - a * y)
                        },
                        e.prototype.reset = function(e, t) {
                            var n = this.chart,
                                r = n.hoverSeries,
                                o = n.hoverPoint,
                                a = n.hoverPoints,
                                i = n.tooltip,
                                s = i && i.shared ? a : o;
                            e && s && _(s).forEach(function(t) {
                                    t.series.isCartesian && "undefined" === typeof t.plotX && (e = !1)
                                }),
                                e ? i && s && _(s).length && (i.refresh(s),
                                    i.shared && a ? a.forEach(function(e) {
                                        e.setState(e.state, !0),
                                            e.series.isCartesian && (e.series.xAxis.crosshair && e.series.xAxis.drawCrosshair(null, e),
                                                e.series.yAxis.crosshair && e.series.yAxis.drawCrosshair(null, e))
                                    }) : o && (o.setState(o.state, !0),
                                        n.axes.forEach(function(e) {
                                            e.crosshair && o.series[e.coll] === e && e.drawCrosshair(null, o)
                                        }))) : (o && o.onMouseOut(),
                                    a && a.forEach(function(e) {
                                        e.setState()
                                    }),
                                    r && r.onMouseOut(),
                                    i && i.hide(t),
                                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove()),
                                    n.axes.forEach(function(e) {
                                        e.hideCrosshair()
                                    }),
                                    this.hoverX = n.hoverPoints = n.hoverPoint = null)
                        },
                        e.prototype.runPointActions = function(t, n) {
                            var r = this.chart,
                                o = r.tooltip && r.tooltip.options.enabled ? r.tooltip : void 0,
                                a = !!o && o.shared,
                                s = n || r.hoverPoint,
                                c = s && s.series || r.hoverSeries;
                            n = this.getHoverData(s, c, r.series, (!t || "touchmove" !== t.type) && (!!n || c && c.directTouch && this.isDirectTouch), a, t),
                                s = n.hoverPoint,
                                c = n.hoverSeries;
                            var u = n.hoverPoints;
                            if (n = c && c.tooltipOptions.followPointer && !c.tooltipOptions.split,
                                a = a && c && !c.noSharedTooltip,
                                s && (s !== r.hoverPoint || o && o.isHidden)) {
                                if ((r.hoverPoints || []).forEach(function(e) {
                                        -1 === u.indexOf(e) && e.setState()
                                    }),
                                    r.hoverSeries !== c && c.onMouseOver(),
                                    this.applyInactiveState(u),
                                    (u || []).forEach(function(e) {
                                        e.setState("hover")
                                    }),
                                    r.hoverPoint && r.hoverPoint.firePointEvent("mouseOut"), !s.series)
                                    return;
                                r.hoverPoints = u,
                                    r.hoverPoint = s,
                                    s.firePointEvent("mouseOver"),
                                    o && o.refresh(a ? u : s, t)
                            } else
                                n && o && !o.isHidden && (s = o.getAnchor([{}], t),
                                    r.isInsidePlot(s[0], s[1], {
                                        visiblePlotOnly: !0
                                    }) && o.updatePosition({
                                        plotX: s[0],
                                        plotY: s[1]
                                    }));
                            this.unDocMouseMove || (this.unDocMouseMove = l(r.container.ownerDocument, "mousemove", function(t) {
                                        var n = i[e.hoverChartIndex];
                                        n && n.pointer.onDocumentMouseMove(t)
                                    }),
                                    this.eventsToUnbind.push(this.unDocMouseMove)),
                                r.axes.forEach(function(e) {
                                    var n, o = b((e.crosshair || {}).snap, !0);
                                    o && ((n = r.hoverPoint) && n.series[e.coll] === e || (n = h(u, function(t) {
                                            return t.series[e.coll] === e
                                        }))),
                                        n || !o ? e.drawCrosshair(t, n) : e.hideCrosshair()
                                })
                        },
                        e.prototype.scaleGroups = function(e, t) {
                            var n = this.chart;
                            n.series.forEach(function(r) {
                                    var o = e || r.getPlotBox();
                                    r.xAxis && r.xAxis.zoomEnabled && r.group && (r.group.attr(o),
                                        r.markerGroup && (r.markerGroup.attr(o),
                                            r.markerGroup.clip(t ? n.clipRect : null)),
                                        r.dataLabelsGroup && r.dataLabelsGroup.attr(o))
                                }),
                                n.clipRect.attr(t || n.clipBox)
                        },
                        e.prototype.setDOMEvents = function() {
                            var n = this,
                                r = this.chart.container,
                                o = r.ownerDocument;
                            r.onmousedown = this.onContainerMouseDown.bind(this),
                                r.onmousemove = this.onContainerMouseMove.bind(this),
                                r.onclick = this.onContainerClick.bind(this),
                                this.eventsToUnbind.push(l(r, "mouseenter", this.onContainerMouseEnter.bind(this))),
                                this.eventsToUnbind.push(l(r, "mouseleave", this.onContainerMouseLeave.bind(this))),
                                e.unbindDocumentMouseUp || (e.unbindDocumentMouseUp = l(o, "mouseup", this.onDocumentMouseUp.bind(this)));
                            for (var a = this.chart.renderTo.parentElement; a && "BODY" !== a.tagName;)
                                this.eventsToUnbind.push(l(a, "scroll", function() {
                                    delete n.chartPosition
                                })),
                                a = a.parentElement;
                            t.hasTouch && (this.eventsToUnbind.push(l(r, "touchstart", this.onContainerTouchStart.bind(this), {
                                    passive: !1
                                })),
                                this.eventsToUnbind.push(l(r, "touchmove", this.onContainerTouchMove.bind(this), {
                                    passive: !1
                                })),
                                e.unbindDocumentTouchEnd || (e.unbindDocumentTouchEnd = l(o, "touchend", this.onDocumentTouchEnd.bind(this), {
                                    passive: !1
                                })))
                        },
                        e.prototype.setHoverChartIndex = function() {
                            var n = this.chart,
                                r = t.charts[b(e.hoverChartIndex, -1)];
                            r && r !== n && r.pointer.onContainerMouseLeave({
                                    relatedTarget: !0
                                }),
                                r && r.mouseIsDown || (e.hoverChartIndex = n.index)
                        },
                        e.prototype.touch = function(e, t) {
                            var n = this.chart;
                            if (this.setHoverChartIndex(),
                                1 === e.touches.length)
                                if (e = this.normalize(e),
                                    n.isInsidePlot(e.chartX - n.plotLeft, e.chartY - n.plotTop, {
                                        visiblePlotOnly: !0
                                    }) && !n.openMenu) {
                                    if (t && this.runPointActions(e),
                                        "touchmove" === e.type) {
                                        t = this.pinchDown;
                                        var r = !!t[0] && 4 <= Math.sqrt(Math.pow(t[0].chartX - e.chartX, 2) + Math.pow(t[0].chartY - e.chartY, 2))
                                    }
                                    b(r, !0) && this.pinch(e)
                                } else
                                    t && this.reset();
                            else
                                2 === e.touches.length && this.pinch(e)
                        },
                        e.prototype.touchSelect = function(e) {
                            return !(!this.chart.options.chart.zoomBySingleTouch || !e.touches || 1 !== e.touches.length)
                        },
                        e.prototype.zoomOption = function(e) {
                            var t = this.chart,
                                n = t.options.chart;
                            t = t.inverted;
                            var r = n.zoomType || "";
                            /touch/.test(e.type) && (r = b(n.pinchType, r)),
                                this.zoomX = e = /x/.test(r),
                                this.zoomY = n = /y/.test(r),
                                this.zoomHor = e && !t || n && t,
                                this.zoomVert = n && !t || e && t,
                                this.hasZoom = e || n
                        },
                        e
                }()
            }