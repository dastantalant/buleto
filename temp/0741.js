)            t(n "Core/Chart/Chart.js" [n["Core/Animation/AnimationUtilities.js"] n["Core/Axis/Axis.js"] n["Core/FormatUtilities.js"] n["Core/Foundation.js"] n["Core/Globals.js"] n["Core/Legend/Legend.js"] n["Core/MSPointer.js"] n["Core/DefaultOptions.js"] n["Core/Color/Palette.js"] n["Core/Pointer.js"] n["Core/Renderer/RendererRegistry.js"] n["Core/Series/SeriesRegistry.js"] n["Core/Renderer/SVG/SVGRenderer.js"] n["Core/Time.js"] n["Core/Utilities.js"] n["Core/Renderer/HTML/AST.js"]] function(e, t, n, r, o, a, i, s, l, c, u, d, p, h, f, m) {
                var g = e.animate,
                    y = e.animObject,
                    v = e.setAnimation,
                    b = n.numberFormat,
                    _ = r.registerEventOptions,
                    w = o.charts,
                    x = o.doc,
                    E = o.marginNames,
                    k = o.svg,
                    S = o.win,
                    O = s.defaultOptions,
                    C = s.defaultTime,
                    T = d.seriesTypes,
                    M = f.addEvent,
                    A = f.attr,
                    P = f.cleanRecursively,
                    N = f.createElement,
                    j = f.css,
                    D = f.defined,
                    R = f.discardElement,
                    I = f.erase,
                    L = f.error,
                    B = f.extend,
                    F = f.find,
                    q = f.fireEvent,
                    z = f.getStyle,
                    W = f.isArray,
                    U = f.isNumber,
                    H = f.isObject,
                    Y = f.isString,
                    G = f.merge,
                    K = f.objectEach,
                    V = f.pick,
                    X = f.pInt,
                    J = f.relativeLength,
                    Z = f.removeEvent,
                    Q = f.splat,
                    $ = f.syncTimeout,
                    ee = f.uniqueKey;
                return e = function() {
                        function e(e, t, n) {
                            this.series = this.renderTo = this.renderer = this.pointer = this.pointCount = this.plotWidth = this.plotTop = this.plotLeft = this.plotHeight = this.plotBox = this.options = this.numberFormatter = this.margin = this.legend = this.labelCollectors = this.isResizing = this.index = this.eventOptions = this.container = this.colorCounter = this.clipBox = this.chartWidth = this.chartHeight = this.bounds = this.axisOffset = this.axes = void 0,
                                this.sharedClips = {},
                                this.yAxis = this.xAxis = this.userOptions = this.titleOffset = this.time = this.symbolCounter = this.spacingBox = this.spacing = void 0,
                                this.getArgs(e, t, n)
                        }
                        return e.chart = function(t, n, r) {
                                return new e(t, n, r)
                            },
                            e.prototype.getArgs = function(e, t, n) {
                                Y(e) || e.nodeName ? (this.renderTo = e,
                                    this.init(t, n)) : this.init(e, t)
                            },
                            e.prototype.init = function(e, t) {
                                var n = e.plotOptions || {};
                                q(this, "init", {
                                    args: arguments
                                }, function() {
                                    var r = G(O, e),
                                        a = r.chart;
                                    K(r.plotOptions, function(e, t) {
                                            H(e) && (e.tooltip = n[t] && G(n[t].tooltip) || void 0)
                                        }),
                                        r.tooltip.userOptions = e.chart && e.chart.forExport && e.tooltip.userOptions || e.tooltip,
                                        this.userOptions = e,
                                        this.margin = [],
                                        this.spacing = [],
                                        this.bounds = {
                                            h: {},
                                            v: {}
                                        },
                                        this.labelCollectors = [],
                                        this.callback = t,
                                        this.isResizing = 0,
                                        this.options = r,
                                        this.axes = [],
                                        this.series = [],
                                        this.time = e.time && Object.keys(e.time).length ? new h(e.time) : o.time,
                                        this.numberFormatter = a.numberFormatter || b,
                                        this.styledMode = a.styledMode,
                                        this.hasCartesianSeries = a.showAxes,
                                        this.index = w.length,
                                        w.push(this),
                                        o.chartCount++,
                                        _(this, a),
                                        this.xAxis = [],
                                        this.yAxis = [],
                                        this.pointCount = this.colorCounter = this.symbolCounter = 0,
                                        q(this, "afterInit"),
                                        this.firstRender()
                                })
                            },
                            e.prototype.initSeries = function(e) {
                                var t = this.options.chart;
                                t = e.type || t.type || t.defaultSeriesType;
                                var n = T[t];
                                return n || L(17, !0, this, {
                                        missingModuleFor: t
                                    }),
                                    t = new n,
                                    "function" === typeof t.init && t.init(this, e),
                                    t
                            },
                            e.prototype.setSeriesData = function() {
                                this.getSeriesOrderByLinks().forEach(function(e) {
                                    e.points || e.data || !e.enabledDataSorting || e.setData(e.options.data, !1)
                                })
                            },
                            e.prototype.getSeriesOrderByLinks = function() {
                                return this.series.concat().sort(function(e, t) {
                                    return e.linkedSeries.length || t.linkedSeries.length ? t.linkedSeries.length - e.linkedSeries.length : 0
                                })
                            },
                            e.prototype.orderSeries = function(e) {
                                var t = this.series;
                                e = e || 0;
                                for (var n = t.length; e < n; ++e)
                                    t[e] && (t[e].index = e,
                                        t[e].name = t[e].getName())
                            },
                            e.prototype.isInsidePlot = function(e, t, n) {
                                void 0 === n && (n = {});
                                var r = this.inverted,
                                    o = this.plotBox,
                                    a = this.plotLeft,
                                    i = this.plotTop,
                                    s = this.scrollablePlotBox,
                                    l = 0,
                                    c = 0;
                                n.visiblePlotOnly && this.scrollingContainer && (c = this.scrollingContainer,
                                    l = c.scrollLeft,
                                    c = c.scrollTop);
                                var u = n.series;
                                if (o = n.visiblePlotOnly && s || o,
                                    s = n.inverted ? t : e,
                                    t = n.inverted ? e : t,
                                    e = {
                                        x: s,
                                        y: t,
                                        isInsidePlot: !0
                                    }, !n.ignoreX) {
                                    var d = u && (r ? u.yAxis : u.xAxis) || {
                                        pos: a,
                                        len: 1 / 0
                                    };
                                    s = n.paneCoordinates ? d.pos + s : a + s,
                                        s >= Math.max(l + a, d.pos) && s <= Math.min(l + a + o.width, d.pos + d.len) || (e.isInsidePlot = !1)
                                }
                                return !n.ignoreY && e.isInsidePlot && (r = u && (r ? u.xAxis : u.yAxis) || {
                                            pos: i,
                                            len: 1 / 0
                                        },
                                        (n = n.paneCoordinates ? r.pos + t : i + t) >= Math.max(c + i, r.pos) && n <= Math.min(c + i + o.height, r.pos + r.len) || (e.isInsidePlot = !1)),
                                    q(this, "afterIsInsidePlot", e),
                                    e.isInsidePlot
                            },
                            e.prototype.redraw = function(e) {
                                q(this, "beforeRedraw");
                                var t = this.hasCartesianSeries ? this.axes : this.colorAxis || [],
                                    n = this.series,
                                    r = this.pointer,
                                    o = this.legend,
                                    a = this.userOptions.legend,
                                    i = this.renderer,
                                    s = i.isHidden(),
                                    l = [],
                                    c = this.isDirtyBox,
                                    u = this.isDirtyLegend;
                                for (this.setResponsive && this.setResponsive(!1),
                                    v(!!this.hasRendered && e, this),
                                    s && this.temporaryDisplay(),
                                    this.layOutTitles(),
                                    e = n.length; e--;) {
                                    var d = n[e];
                                    if (d.options.stacking || d.options.centerInCategory) {
                                        var p = !0;
                                        if (d.isDirty) {
                                            var h = !0;
                                            break
                                        }
                                    }
                                }
                                if (h)
                                    for (e = n.length; e--;)
                                        d = n[e],
                                        d.options.stacking && (d.isDirty = !0);
                                n.forEach(function(e) {
                                        e.isDirty && ("point" === e.options.legendType ? ("function" === typeof e.updateTotals && e.updateTotals(),
                                                u = !0) : a && (a.labelFormatter || a.labelFormat) && (u = !0)),
                                            e.isDirtyData && q(e, "updatedData")
                                    }),
                                    u && o && o.options.enabled && (o.render(),
                                        this.isDirtyLegend = !1),
                                    p && this.getStacks(),
                                    t.forEach(function(e) {
                                        e.updateNames(),
                                            e.setScale()
                                    }),
                                    this.getMargins(),
                                    t.forEach(function(e) {
                                        e.isDirty && (c = !0)
                                    }),
                                    t.forEach(function(e) {
                                        var t = e.min + "," + e.max;
                                        e.extKey !== t && (e.extKey = t,
                                                l.push(function() {
                                                    q(e, "afterSetExtremes", B(e.eventArgs, e.getExtremes())),
                                                        delete e.eventArgs
                                                })),
                                            (c || p) && e.redraw()
                                    }),
                                    c && this.drawChartBox(),
                                    q(this, "predraw"),
                                    n.forEach(function(e) {
                                        (c || e.isDirty) && e.visible && e.redraw(),
                                            e.isDirtyData = !1
                                    }),
                                    r && r.reset(!0),
                                    i.draw(),
                                    q(this, "redraw"),
                                    q(this, "render"),
                                    s && this.temporaryDisplay(!0),
                                    l.forEach(function(e) {
                                        e.call()
                                    })
                            },
                            e.prototype.get = function(e) {
                                function t(t) {
                                    return t.id === e || t.options && t.options.id === e
                                }
                                for (var n = this.series, r = F(this.axes, t) || F(this.series, t), o = 0; !r && o < n.length; o++)
                                    r = F(n[o].points || [], t);
                                return r
                            },
                            e.prototype.getAxes = function() {
                                var e = this,
                                    n = this.options,
                                    r = n.xAxis = Q(n.xAxis || {});
                                n = n.yAxis = Q(n.yAxis || {}),
                                    q(this, "getAxes"),
                                    r.forEach(function(e, t) {
                                        e.index = t,
                                            e.isX = !0
                                    }),
                                    n.forEach(function(e, t) {
                                        e.index = t
                                    }),
                                    r.concat(n).forEach(function(n) {
                                        new t(e, n)
                                    }),
                                    q(this, "afterGetAxes")
                            },
                            e.prototype.getSelectedPoints = function() {
                                return this.series.reduce(function(e, t) {
                                    return t.getPointsCollection().forEach(function(t) {
                                            V(t.selectedStaging, t.selected) && e.push(t)
                                        }),
                                        e
                                }, [])
                            },
                            e.prototype.getSelectedSeries = function() {
                                return this.series.filter(function(e) {
                                    return e.selected
                                })
                            },
                            e.prototype.setTitle = function(e, t, n) {
                                this.applyDescription("title", e),
                                    this.applyDescription("subtitle", t),
                                    this.applyDescription("caption", void 0),
                                    this.layOutTitles(n)
                            },
                            e.prototype.applyDescription = function(e, t) {
                                var n = this,
                                    r = "title" === e ? {
                                        color: l.neutralColor80,
                                        fontSize: this.options.isStock ? "16px" : "18px"
                                    } : {
                                        color: l.neutralColor60
                                    };
                                r = this.options[e] = G(!this.styledMode && {
                                    style: r
                                }, this.options[e], t);
                                var o = this[e];
                                o && t && (this[e] = o = o.destroy()),
                                    r && !o && (o = this.renderer.text(r.text, 0, 0, r.useHTML).attr({
                                            align: r.align,
                                            class: "highcharts-" + e,
                                            zIndex: r.zIndex || 4
                                        }).add(),
                                        o.update = function(t) {
                                            n[{
                                                title: "setTitle",
                                                subtitle: "setSubtitle",
                                                caption: "setCaption"
                                            }[e]](t)
                                        },
                                        this.styledMode || o.css(r.style),
                                        this[e] = o)
                            },
                            e.prototype.layOutTitles = function(e) {
                                var t = [0, 0, 0],
                                    n = this.renderer,
                                    r = this.spacingBox;
                                ["title", "subtitle", "caption"].forEach(function(e) {
                                        var o = this[e],
                                            a = this.options[e],
                                            i = a.verticalAlign || "top";
                                        e = "title" === e ? "top" === i ? -3 : 0 : "top" === i ? t[0] + 2 : 0;
                                        var s;
                                        if (o) {
                                            this.styledMode || (s = a.style && a.style.fontSize),
                                                s = n.fontMetrics(s, o).b,
                                                o.css({
                                                    width: (a.width || r.width + (a.widthAdjust || 0)) + "px"
                                                });
                                            var l = Math.round(o.getBBox(a.useHTML).height);
                                            o.align(B({
                                                    y: "bottom" === i ? s : e + s,
                                                    height: l
                                                }, a), !1, "spacingBox"),
                                                a.floating || ("top" === i ? t[0] = Math.ceil(t[0] + l) : "bottom" === i && (t[2] = Math.ceil(t[2] + l)))
                                        }
                                    }, this),
                                    t[0] && "top" === (this.options.title.verticalAlign || "top") && (t[0] += this.options.title.margin),
                                    t[2] && "bottom" === this.options.caption.verticalAlign && (t[2] += this.options.caption.margin);
                                var o = !this.titleOffset || this.titleOffset.join(",") !== t.join(",");
                                this.titleOffset = t,
                                    q(this, "afterLayOutTitles"), !this.isDirtyBox && o && (this.isDirtyBox = this.isDirtyLegend = o,
                                        this.hasRendered && V(e, !0) && this.isDirtyBox && this.redraw())
                            },
                            e.prototype.getChartSize = function() {
                                var e = this.options.chart,
                                    t = e.width;
                                e = e.height;
                                var n = this.renderTo;
                                D(t) || (this.containerWidth = z(n, "width")),
                                    D(e) || (this.containerHeight = z(n, "height")),
                                    this.chartWidth = Math.max(0, t || this.containerWidth || 600),
                                    this.chartHeight = Math.max(0, J(e, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
                            },
                            e.prototype.temporaryDisplay = function(e) {
                                var t = this.renderTo;
                                if (e)
                                    for (; t && t.style;)
                                        t.hcOrigStyle && (j(t, t.hcOrigStyle),
                                            delete t.hcOrigStyle),
                                        t.hcOrigDetached && (x.body.removeChild(t),
                                            t.hcOrigDetached = !1),
                                        t = t.parentNode;
                                else
                                    for (; t && t.style && (x.body.contains(t) || t.parentNode || (t.hcOrigDetached = !0,
                                                x.body.appendChild(t)),
                                            ("none" === z(t, "display", !1) || t.hcOricDetached) && (t.hcOrigStyle = {
                                                    display: t.style.display,
                                                    height: t.style.height,
                                                    overflow: t.style.overflow
                                                },
                                                e = {
                                                    display: "block",
                                                    overflow: "hidden"
                                                },
                                                t !== this.renderTo && (e.height = 0),
                                                j(t, e),
                                                t.offsetWidth || t.style.setProperty("display", "block", "important")),
                                            (t = t.parentNode) !== x.body);)
                                ;
                            },
                            e.prototype.setClassName = function(e) {
                                this.container.className = "highcharts-container " + (e || "")
                            },
                            e.prototype.getContainer = function() {
                                var e, t = this.options,
                                    n = t.chart,
                                    r = ee(),
                                    o = this.renderTo;
                                o || (this.renderTo = o = n.renderTo),
                                    Y(o) && (this.renderTo = o = x.getElementById(o)),
                                    o || L(13, !0, this);
                                var a = X(A(o, "data-highcharts-chart"));
                                U(a) && w[a] && w[a].hasRendered && w[a].destroy(),
                                    A(o, "data-highcharts-chart", this.index),
                                    o.innerHTML = "",
                                    n.skipClone || o.offsetWidth || this.temporaryDisplay(),
                                    this.getChartSize(),
                                    a = this.chartWidth;
                                var i = this.chartHeight;
                                if (j(o, {
                                        overflow: "hidden"
                                    }),
                                    this.styledMode || (e = B({
                                        position: "relative",
                                        overflow: "hidden",
                                        width: a + "px",
                                        height: i + "px",
                                        textAlign: "left",
                                        lineHeight: "normal",
                                        zIndex: 0,
                                        "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                                        userSelect: "none",
                                        "touch-action": "manipulation",
                                        outline: "none"
                                    }, n.style || {})),
                                    this.container = r = N("div", {
                                        id: r
                                    }, e, o),
                                    this._cursor = r.style.cursor,
                                    this.renderer = new(n.renderer || !k ? u.getRendererType(n.renderer) : p)(r, a, i, void 0, n.forExport, t.exporting && t.exporting.allowHTML, this.styledMode),
                                    v(void 0, this),
                                    this.setClassName(n.className),
                                    this.styledMode)
                                    for (var s in t.defs)
                                        this.renderer.definition(t.defs[s]);
                                else
                                    this.renderer.setStyle(n.style);
                                this.renderer.chartIndex = this.index,
                                    q(this, "afterGetContainer")
                            },
                            e.prototype.getMargins = function(e) {
                                var t = this.spacing,
                                    n = this.margin,
                                    r = this.titleOffset;
                                this.resetMargins(),
                                    r[0] && !D(n[0]) && (this.plotTop = Math.max(this.plotTop, r[0] + t[0])),
                                    r[2] && !D(n[2]) && (this.marginBottom = Math.max(this.marginBottom, r[2] + t[2])),
                                    this.legend && this.legend.display && this.legend.adjustMargins(n, t),
                                    q(this, "getMargins"),
                                    e || this.getAxisMargins()
                            },
                            e.prototype.getAxisMargins = function() {
                                var e = this,
                                    t = e.axisOffset = [0, 0, 0, 0],
                                    n = e.colorAxis,
                                    r = e.margin,
                                    o = function(e) {
                                        e.forEach(function(e) {
                                            e.visible && e.getOffset()
                                        })
                                    };
                                e.hasCartesianSeries ? o(e.axes) : n && n.length && o(n),
                                    E.forEach(function(n, o) {
                                        D(r[o]) || (e[n] += t[o])
                                    }),
                                    e.setChartSize()
                            },
                            e.prototype.reflow = function(e) {
                                var t = this,
                                    n = t.options.chart,
                                    r = t.renderTo,
                                    o = D(n.width) && D(n.height),
                                    a = n.width || z(r, "width");
                                n = n.height || z(r, "height"),
                                    r = e ? e.target : S,
                                    delete t.pointer.chartPosition,
                                    o || t.isPrinting || !a || !n || r !== S && r !== x || (a === t.containerWidth && n === t.containerHeight || (f.clearTimeout(t.reflowTimeout),
                                            t.reflowTimeout = $(function() {
                                                t.container && t.setSize(void 0, void 0, !1)
                                            }, e ? 100 : 0)),
                                        t.containerWidth = a,
                                        t.containerHeight = n)
                            },
                            e.prototype.setReflow = function(e) {
                                var t = this;
                                !1 === e || this.unbindReflow ? !1 === e && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = M(S, "resize", function(e) {
                                        t.options && t.reflow(e)
                                    }),
                                    M(this, "destroy", this.unbindReflow))
                            },
                            e.prototype.setSize = function(e, t, n) {
                                var r = this,
                                    o = r.renderer;
                                r.isResizing += 1,
                                    v(n, r),
                                    n = o.globalAnimation,
                                    r.oldChartHeight = r.chartHeight,
                                    r.oldChartWidth = r.chartWidth,
                                    "undefined" !== typeof e && (r.options.chart.width = e),
                                    "undefined" !== typeof t && (r.options.chart.height = t),
                                    r.getChartSize(),
                                    r.styledMode || (n ? g : j)(r.container, {
                                        width: r.chartWidth + "px",
                                        height: r.chartHeight + "px"
                                    }, n),
                                    r.setChartSize(!0),
                                    o.setSize(r.chartWidth, r.chartHeight, n),
                                    r.axes.forEach(function(e) {
                                        e.isDirty = !0,
                                            e.setScale()
                                    }),
                                    r.isDirtyLegend = !0,
                                    r.isDirtyBox = !0,
                                    r.layOutTitles(),
                                    r.getMargins(),
                                    r.redraw(n),
                                    r.oldChartHeight = null,
                                    q(r, "resize"),
                                    $(function() {
                                        r && q(r, "endResize", null, function() {
                                            --r.isResizing
                                        })
                                    }, y(n).duration)
                            },
                            e.prototype.setChartSize = function(e) {
                                var t, n, r, o, a = this.inverted,
                                    i = this.renderer,
                                    s = this.chartWidth,
                                    l = this.chartHeight,
                                    c = this.options.chart,
                                    u = this.spacing,
                                    d = this.clipOffset;
                                this.plotLeft = t = Math.round(this.plotLeft),
                                    this.plotTop = n = Math.round(this.plotTop),
                                    this.plotWidth = r = Math.max(0, Math.round(s - t - this.marginRight)),
                                    this.plotHeight = o = Math.max(0, Math.round(l - n - this.marginBottom)),
                                    this.plotSizeX = a ? o : r,
                                    this.plotSizeY = a ? r : o,
                                    this.plotBorderWidth = c.plotBorderWidth || 0,
                                    this.spacingBox = i.spacingBox = {
                                        x: u[3],
                                        y: u[0],
                                        width: s - u[3] - u[1],
                                        height: l - u[0] - u[2]
                                    },
                                    this.plotBox = i.plotBox = {
                                        x: t,
                                        y: n,
                                        width: r,
                                        height: o
                                    },
                                    a = 2 * Math.floor(this.plotBorderWidth / 2),
                                    s = Math.ceil(Math.max(a, d[3]) / 2),
                                    l = Math.ceil(Math.max(a, d[0]) / 2),
                                    this.clipBox = {
                                        x: s,
                                        y: l,
                                        width: Math.floor(this.plotSizeX - Math.max(a, d[1]) / 2 - s),
                                        height: Math.max(0, Math.floor(this.plotSizeY - Math.max(a, d[2]) / 2 - l))
                                    },
                                    e || (this.axes.forEach(function(e) {
                                            e.setAxisSize(),
                                                e.setAxisTranslation()
                                        }),
                                        i.alignElements()),
                                    q(this, "afterSetChartSize", {
                                        skipAxes: e
                                    })
                            },
                            e.prototype.resetMargins = function() {
                                q(this, "resetMargins");
                                var e = this,
                                    t = e.options.chart;
                                ["margin", "spacing"].forEach(function(n) {
                                        var r = t[n],
                                            o = H(r) ? r : [r, r, r, r];
                                        ["Top", "Right", "Bottom", "Left"].forEach(function(r, a) {
                                            e[n][a] = V(t[n + r], o[a])
                                        })
                                    }),
                                    E.forEach(function(t, n) {
                                        e[t] = V(e.margin[n], e.spacing[n])
                                    }),
                                    e.axisOffset = [0, 0, 0, 0],
                                    e.clipOffset = [0, 0, 0, 0]
                            },
                            e.prototype.drawChartBox = function() {
                                var e, t = this.options.chart,
                                    n = this.renderer,
                                    r = this.chartWidth,
                                    o = this.chartHeight,
                                    a = this.styledMode,
                                    i = this.plotBGImage,
                                    s = t.backgroundColor,
                                    l = t.plotBackgroundColor,
                                    c = t.plotBackgroundImage,
                                    u = this.plotLeft,
                                    d = this.plotTop,
                                    p = this.plotWidth,
                                    h = this.plotHeight,
                                    f = this.plotBox,
                                    m = this.clipRect,
                                    g = this.clipBox,
                                    y = this.chartBackground,
                                    v = this.plotBackground,
                                    b = this.plotBorder,
                                    _ = "animate";
                                if (y || (this.chartBackground = y = n.rect().addClass("highcharts-background").add(),
                                        _ = "attr"),
                                    a)
                                    var w = e = y.strokeWidth();
                                else
                                    w = t.borderWidth || 0,
                                    e = w + (t.shadow ? 8 : 0),
                                    s = {
                                        fill: s || "none"
                                    },
                                    (w || y["stroke-width"]) && (s.stroke = t.borderColor,
                                        s["stroke-width"] = w),
                                    y.attr(s).shadow(t.shadow);
                                y[_]({
                                        x: e / 2,
                                        y: e / 2,
                                        width: r - e - w % 2,
                                        height: o - e - w % 2,
                                        r: t.borderRadius
                                    }),
                                    _ = "animate",
                                    v || (_ = "attr",
                                        this.plotBackground = v = n.rect().addClass("highcharts-plot-background").add()),
                                    v[_](f),
                                    a || (v.attr({
                                            fill: l || "none"
                                        }).shadow(t.plotShadow),
                                        c && (i ? (c !== i.attr("href") && i.attr("href", c),
                                            i.animate(f)) : this.plotBGImage = n.image(c, u, d, p, h).add())),
                                    m ? m.animate({
                                        width: g.width,
                                        height: g.height
                                    }) : this.clipRect = n.clipRect(g),
                                    _ = "animate",
                                    b || (_ = "attr",
                                        this.plotBorder = b = n.rect().addClass("highcharts-plot-border").attr({
                                            zIndex: 1
                                        }).add()),
                                    a || b.attr({
                                        stroke: t.plotBorderColor,
                                        "stroke-width": t.plotBorderWidth || 0,
                                        fill: "none"
                                    }),
                                    b[_](b.crisp({
                                        x: u,
                                        y: d,
                                        width: p,
                                        height: h
                                    }, -b.strokeWidth())),
                                    this.isDirtyBox = !1,
                                    q(this, "afterDrawChartBox")
                            },
                            e.prototype.propFromSeries = function() {
                                var e, t, n, r = this,
                                    o = r.options.chart,
                                    a = r.options.series;
                                ["inverted", "angular", "polar"].forEach(function(i) {
                                    for (t = T[o.type || o.defaultSeriesType],
                                        n = o[i] || t && t.prototype[i],
                                        e = a && a.length; !n && e--;)
                                        (t = T[a[e].type]) && t.prototype[i] && (n = !0);
                                    r[i] = n
                                })
                            },
                            e.prototype.linkSeries = function() {
                                var e = this,
                                    t = e.series;
                                t.forEach(function(e) {
                                        e.linkedSeries.length = 0
                                    }),
                                    t.forEach(function(t) {
                                        var n = t.options.linkedTo;
                                        Y(n) && (n = ":previous" === n ? e.series[t.index - 1] : e.get(n)) && n.linkedParent !== t && (n.linkedSeries.push(t),
                                            t.linkedParent = n,
                                            n.enabledDataSorting && t.setDataSortingOptions(),
                                            t.visible = V(t.options.visible, n.options.visible, t.visible))
                                    }),
                                    q(this, "afterLinkSeries")
                            },
                            e.prototype.renderSeries = function() {
                                this.series.forEach(function(e) {
                                    e.translate(),
                                        e.render()
                                })
                            },
                            e.prototype.renderLabels = function() {
                                var e = this,
                                    t = e.options.labels;
                                t.items && t.items.forEach(function(n) {
                                    var r = B(t.style, n.style),
                                        o = X(r.left) + e.plotLeft,
                                        a = X(r.top) + e.plotTop + 12;
                                    delete r.left,
                                        delete r.top,
                                        e.renderer.text(n.html, o, a).attr({
                                            zIndex: 2
                                        }).css(r).add()
                                })
                            },
                            e.prototype.render = function() {
                                var e = this.axes,
                                    t = this.colorAxis,
                                    n = this.renderer,
                                    r = this.options,
                                    o = function(e) {
                                        e.forEach(function(e) {
                                            e.visible && e.render()
                                        })
                                    },
                                    i = 0;
                                this.setTitle(),
                                    this.legend = new a(this, r.legend),
                                    this.getStacks && this.getStacks(),
                                    this.getMargins(!0),
                                    this.setChartSize(),
                                    r = this.plotWidth,
                                    e.some(function(e) {
                                        if (e.horiz && e.visible && e.options.labels.enabled && e.series.length)
                                            return i = 21, !0
                                    });
                                var s = this.plotHeight = Math.max(this.plotHeight - i, 0);
                                e.forEach(function(e) {
                                        e.setScale()
                                    }),
                                    this.getAxisMargins();
                                var l = 1.1 < r / this.plotWidth,
                                    c = 1.05 < s / this.plotHeight;
                                (l || c) && (e.forEach(function(e) {
                                        (e.horiz && l || !e.horiz && c) && e.setTickInterval(!0)
                                    }),
                                    this.getMargins()),
                                this.drawChartBox(),
                                    this.hasCartesianSeries ? o(e) : t && t.length && o(t),
                                    this.seriesGroup || (this.seriesGroup = n.g("series-group").attr({
                                        zIndex: 3
                                    }).add()),
                                    this.renderSeries(),
                                    this.renderLabels(),
                                    this.addCredits(),
                                    this.setResponsive && this.setResponsive(),
                                    this.hasRendered = !0
                            },
                            e.prototype.addCredits = function(e) {
                                var t = this,
                                    n = G(!0, this.options.credits, e);
                                n.enabled && !this.credits && (this.credits = this.renderer.text(n.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
                                        n.href && (S.location.href = n.href)
                                    }).attr({
                                        align: n.position.align,
                                        zIndex: 8
                                    }),
                                    t.styledMode || this.credits.css(n.style),
                                    this.credits.add().align(n.position),
                                    this.credits.update = function(e) {
                                        t.credits = t.credits.destroy(),
                                            t.addCredits(e)
                                    }
                                )
                            },
                            e.prototype.destroy = function() {
                                var e, t = this,
                                    n = t.axes,
                                    r = t.series,
                                    a = t.container,
                                    i = a && a.parentNode;
                                for (q(t, "destroy"),
                                    t.renderer.forExport ? I(w, t) : w[t.index] = void 0,
                                    o.chartCount--,
                                    t.renderTo.removeAttribute("data-highcharts-chart"),
                                    Z(t),
                                    e = n.length; e--;)
                                    n[e] = n[e].destroy();
                                for (this.scroller && this.scroller.destroy && this.scroller.destroy(),
                                    e = r.length; e--;)
                                    r[e] = r[e].destroy();
                                "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function(e) {
                                        var n = t[e];
                                        n && n.destroy && (t[e] = n.destroy())
                                    }),
                                    a && (a.innerHTML = "",
                                        Z(a),
                                        i && R(a)),
                                    K(t, function(e, n) {
                                        delete t[n]
                                    })
                            },
                            e.prototype.firstRender = function() {
                                var e = this,
                                    t = e.options;
                                e.isReadyToRender && !e.isReadyToRender() || (e.getContainer(),
                                    e.resetMargins(),
                                    e.setChartSize(),
                                    e.propFromSeries(),
                                    e.getAxes(),
                                    (W(t.series) ? t.series : []).forEach(function(t) {
                                        e.initSeries(t)
                                    }),
                                    e.linkSeries(),
                                    e.setSeriesData(),
                                    q(e, "beforeRender"),
                                    c && (i.isRequired() ? e.pointer = new i(e, t) : e.pointer = new c(e, t)),
                                    e.render(),
                                    e.pointer.getChartPosition(),
                                    e.renderer.imgCount || e.hasLoaded || e.onload(),
                                    e.temporaryDisplay(!0))
                            },
                            e.prototype.onload = function() {
                                this.callbacks.concat([this.callback]).forEach(function(e) {
                                        e && "undefined" !== typeof this.index && e.apply(this, [this])
                                    }, this),
                                    q(this, "load"),
                                    q(this, "render"),
                                    D(this.index) && this.setReflow(this.options.chart.reflow),
                                    this.hasLoaded = !0
                            },
                            e.prototype.addSeries = function(e, t, n) {
                                var r, o = this;
                                return e && (t = V(t, !0),
                                        q(o, "addSeries", {
                                            options: e
                                        }, function() {
                                            r = o.initSeries(e),
                                                o.isDirtyLegend = !0,
                                                o.linkSeries(),
                                                r.enabledDataSorting && r.setData(e.data, !1),
                                                q(o, "afterAddSeries", {
                                                    series: r
                                                }),
                                                t && o.redraw(n)
                                        })),
                                    r
                            },
                            e.prototype.addAxis = function(e, t, n, r) {
                                return this.createAxis(t ? "xAxis" : "yAxis", {
                                    axis: e,
                                    redraw: n,
                                    animation: r
                                })
                            },
                            e.prototype.addColorAxis = function(e, t, n) {
                                return this.createAxis("colorAxis", {
                                    axis: e,
                                    redraw: t,
                                    animation: n
                                })
                            },
                            e.prototype.createAxis = function(e, n) {
                                return e = new t(this, G(n.axis, {
                                        index: this[e].length,
                                        isX: "xAxis" === e
                                    })),
                                    V(n.redraw, !0) && this.redraw(n.animation),
                                    e
                            },
                            e.prototype.showLoading = function(e) {
                                var t = this,
                                    n = t.options,
                                    r = n.loading,
                                    o = function() {
                                        a && j(a, {
                                            left: t.plotLeft + "px",
                                            top: t.plotTop + "px",
                                            width: t.plotWidth + "px",
                                            height: t.plotHeight + "px"
                                        })
                                    },
                                    a = t.loadingDiv,
                                    i = t.loadingSpan;
                                a || (t.loadingDiv = a = N("div", {
                                        className: "highcharts-loading highcharts-loading-hidden"
                                    }, null, t.container)),
                                    i || (t.loadingSpan = i = N("span", {
                                            className: "highcharts-loading-inner"
                                        }, null, a),
                                        M(t, "redraw", o)),
                                    a.className = "highcharts-loading",
                                    m.setElementHTML(i, V(e, n.lang.loading, "")),
                                    t.styledMode || (j(a, B(r.style, {
                                            zIndex: 10
                                        })),
                                        j(i, r.labelStyle),
                                        t.loadingShown || (j(a, {
                                                opacity: 0,
                                                display: ""
                                            }),
                                            g(a, {
                                                opacity: r.style.opacity || .5
                                            }, {
                                                duration: r.showDuration || 0
                                            }))),
                                    t.loadingShown = !0,
                                    o()
                            },
                            e.prototype.hideLoading = function() {
                                var e = this.options,
                                    t = this.loadingDiv;
                                t && (t.className = "highcharts-loading highcharts-loading-hidden",
                                        this.styledMode || g(t, {
                                            opacity: 0
                                        }, {
                                            duration: e.loading.hideDuration || 100,
                                            complete: function() {
                                                j(t, {
                                                    display: "none"
                                                })
                                            }
                                        })),
                                    this.loadingShown = !1
                            },
                            e.prototype.update = function(e, t, n, r) {
                                var o, a, i = this,
                                    s = {
                                        credits: "addCredits",
                                        title: "setTitle",
                                        subtitle: "setSubtitle",
                                        caption: "setCaption"
                                    },
                                    l = e.isResponsiveOptions,
                                    c = [];
                                q(i, "update", {
                                        options: e
                                    }),
                                    l || i.setResponsive(!1, !0),
                                    e = P(e, i.options),
                                    i.userOptions = G(i.userOptions, e);
                                var u = e.chart;
                                if (u) {
                                    if (G(!0, i.options.chart, u),
                                        "className" in u && i.setClassName(u.className),
                                        "reflow" in u && i.setReflow(u.reflow),
                                        "inverted" in u || "polar" in u || "type" in u) {
                                        i.propFromSeries();
                                        var d = !0
                                    }
                                    "alignTicks" in u && (d = !0),
                                        "events" in u && _(this, u),
                                        K(u, function(e, t) {
                                            -1 !== i.propsRequireUpdateSeries.indexOf("chart." + t) && (o = !0), -1 !== i.propsRequireDirtyBox.indexOf(t) && (i.isDirtyBox = !0), -1 !== i.propsRequireReflow.indexOf(t) && (l ? i.isDirtyBox = !0 : a = !0)
                                        }), !i.styledMode && u.style && i.renderer.setStyle(i.options.chart.style || {})
                                }!i.styledMode && e.colors && (this.options.colors = e.colors),
                                    e.time && (this.time === C && (this.time = new h(e.time)),
                                        G(!0, i.options.time, e.time)),
                                    K(e, function(t, n) {
                                        i[n] && "function" === typeof i[n].update ? i[n].update(t, !1) : "function" === typeof i[s[n]] ? i[s[n]](t) : "colors" !== n && -1 === i.collectionsWithUpdate.indexOf(n) && G(!0, i.options[n], e[n]),
                                            "chart" !== n && -1 !== i.propsRequireUpdateSeries.indexOf(n) && (o = !0)
                                    }),
                                    this.collectionsWithUpdate.forEach(function(t) {
                                        if (e[t]) {
                                            var r = [];
                                            i[t].forEach(function(e, t) {
                                                    e.options.isInternal || r.push(V(e.options.index, t))
                                                }),
                                                Q(e[t]).forEach(function(e, o) {
                                                    var a, s = D(e.id);
                                                    s && (a = i.get(e.id)), !a && i[t] && (a = i[t][r ? r[o] : o]) && s && D(a.options.id) && (a = void 0),
                                                        a && a.coll === t && (a.update(e, !1),
                                                            n && (a.touched = !0)), !a && n && i.collectionsWithInit[t] && (i.collectionsWithInit[t][0].apply(i, [e].concat(i.collectionsWithInit[t][1] || []).concat([!1])).touched = !0)
                                                }),
                                                n && i[t].forEach(function(e) {
                                                    e.touched || e.options.isInternal ? delete e.touched : c.push(e)
                                                })
                                        }
                                    }),
                                    c.forEach(function(e) {
                                        e.chart && e.remove && e.remove(!1)
                                    }),
                                    d && i.axes.forEach(function(e) {
                                        e.update({}, !1)
                                    }),
                                    o && i.getSeriesOrderByLinks().forEach(function(e) {
                                        e.chart && e.update({}, !1)
                                    }, this),
                                    d = u && u.width,
                                    u = u && (Y(u.height) ? J(u.height, d || i.chartWidth) : u.height),
                                    a || U(d) && d !== i.chartWidth || U(u) && u !== i.chartHeight ? i.setSize(d, u, r) : V(t, !0) && i.redraw(r),
                                    q(i, "afterUpdate", {
                                        options: e,
                                        redraw: t,
                                        animation: r
                                    })
                            },
                            e.prototype.setSubtitle = function(e, t) {
                                this.applyDescription("subtitle", e),
                                    this.layOutTitles(t)
                            },
                            e.prototype.setCaption = function(e, t) {
                                this.applyDescription("caption", e),
                                    this.layOutTitles(t)
                            },
                            e.prototype.showResetZoom = function() {
                                function e() {
                                    t.zoomOut()
                                }
                                var t = this,
                                    n = O.lang,
                                    r = t.options.chart.resetZoomButton,
                                    o = r.theme,
                                    a = o.states,
                                    i = "chart" === r.relativeTo || "spacingBox" === r.relativeTo ? null : "scrollablePlotBox";
                                q(this, "beforeShowResetZoom", null, function() {
                                        t.resetZoomButton = t.renderer.button(n.resetZoom, null, null, e, o, a && a.hover).attr({
                                            align: r.position.align,
                                            title: n.resetZoomTitle
                                        }).addClass("highcharts-reset-zoom").add().align(r.position, !1, i)
                                    }),
                                    q(this, "afterShowResetZoom")
                            },
                            e.prototype.zoomOut = function() {
                                q(this, "selection", {
                                    resetSelection: !0
                                }, this.zoom)
                            },
                            e.prototype.zoom = function(e) {
                                var t, n = this,
                                    r = n.pointer,
                                    o = n.inverted ? r.mouseDownX : r.mouseDownY,
                                    a = !1;
                                !e || e.resetSelection ? (n.axes.forEach(function(e) {
                                        t = e.zoom()
                                    }),
                                    r.initiated = !1) : e.xAxis.concat(e.yAxis).forEach(function(e) {
                                    var i = e.axis,
                                        s = n.inverted ? i.left : i.top,
                                        l = n.inverted ? s + i.width : s + i.height,
                                        c = i.isXAxis,
                                        u = !1;
                                    (!c && o >= s && o <= l || c || !D(o)) && (u = !0),
                                    r[c ? "zoomX" : "zoomY"] && u && (t = i.zoom(e.min, e.max),
                                        i.displayBtn && (a = !0))
                                });
                                var i = n.resetZoomButton;
                                a && !i ? n.showResetZoom() : !a && H(i) && (n.resetZoomButton = i.destroy()),
                                    t && n.redraw(V(n.options.chart.animation, e && e.animation, 100 > n.pointCount))
                            },
                            e.prototype.pan = function(e, t) {
                                var n = this,
                                    r = n.hoverPoints;
                                t = "object" === typeof t ? t : {
                                    enabled: t,
                                    type: "x"
                                };
                                var o = n.options.chart,
                                    a = n.options.mapNavigation && n.options.mapNavigation.enabled;
                                o && o.panning && (o.panning = t);
                                var i, s = t.type;
                                q(this, "pan", {
                                    originalEvent: e
                                }, function() {
                                    r && r.forEach(function(e) {
                                        e.setState()
                                    });
                                    var t = n.xAxis;
                                    "xy" === s ? t = t.concat(n.yAxis) : "y" === s && (t = n.yAxis);
                                    var o = {};
                                    t.forEach(function(t) {
                                            if (t.options.panningEnabled && !t.options.isInternal) {
                                                var r = t.horiz,
                                                    l = e[r ? "chartX" : "chartY"];
                                                r = r ? "mouseDownX" : "mouseDownY";
                                                var c = n[r],
                                                    u = t.minPointOffset || 0,
                                                    d = t.reversed && !n.inverted || !t.reversed && n.inverted ? -1 : 1,
                                                    p = t.getExtremes(),
                                                    h = t.toValue(c - l, !0) + u * d,
                                                    f = t.toValue(c + t.len - l, !0) - (u * d || t.isXAxis && t.pointRangePadding || 0),
                                                    m = f < h;
                                                d = t.hasVerticalPanning(),
                                                    c = m ? f : h,
                                                    h = m ? h : f;
                                                var g = t.panningState;
                                                !d || t.isXAxis || g && !g.isDirty || t.series.forEach(function(e) {
                                                        var t = e.getProcessedData(!0);
                                                        t = e.getExtremes(t.yData, !0),
                                                            g || (g = {
                                                                startMin: Number.MAX_VALUE,
                                                                startMax: -Number.MAX_VALUE
                                                            }),
                                                            U(t.dataMin) && U(t.dataMax) && (g.startMin = Math.min(V(e.options.threshold, 1 / 0), t.dataMin, g.startMin),
                                                                g.startMax = Math.max(V(e.options.threshold, -1 / 0), t.dataMax, g.startMax))
                                                    }),
                                                    d = Math.min(V(g && g.startMin, p.dataMin), u ? p.min : t.toValue(t.toPixels(p.min) - t.minPixelPadding)),
                                                    f = Math.max(V(g && g.startMax, p.dataMax), u ? p.max : t.toValue(t.toPixels(p.max) + t.minPixelPadding)),
                                                    t.panningState = g,
                                                    t.isOrdinal || (u = d - c,
                                                        0 < u && (h += u,
                                                            c = d),
                                                        u = h - f,
                                                        0 < u && (h = f,
                                                            c -= u),
                                                        t.series.length && c !== p.min && h !== p.max && c >= d && h <= f && (t.setExtremes(c, h, !1, !1, {
                                                                trigger: "pan"
                                                            }),
                                                            n.resetZoomButton || a || c === d || h === f || !s.match("y") || (n.showResetZoom(),
                                                                t.displayBtn = !1),
                                                            i = !0),
                                                        o[r] = l)
                                            }
                                        }),
                                        K(o, function(e, t) {
                                            n[t] = e
                                        }),
                                        i && n.redraw(!1),
                                        j(n.container, {
                                            cursor: "move"
                                        })
                                })
                            },
                            e
                    }(),
                    B(e.prototype, {
                        callbacks: [],
                        collectionsWithInit: {
                            xAxis: [e.prototype.addAxis, [!0]],
                            yAxis: [e.prototype.addAxis, [!1]],
                            series: [e.prototype.addSeries]
                        },
                        collectionsWithUpdate: ["xAxis", "yAxis", "series"],
                        propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
                        propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),
                        propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" ")
                    }),
                    e
            }