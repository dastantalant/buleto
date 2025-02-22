)            t(n "Core/Series/Series.js" [n["Core/Animation/AnimationUtilities.js"] n["Core/DefaultOptions.js"] n["Core/Foundation.js"] n["Core/Globals.js"] n["Core/Legend/LegendSymbol.js"] n["Core/Color/Palette.js"] n["Core/Series/Point.js"] n["Core/Series/SeriesDefaults.js"] n["Core/Series/SeriesRegistry.js"] n["Core/Renderer/SVG/SVGElement.js"] n["Core/Utilities.js"]] function(e, t, n, r, o, a, i, s, l, c, u) {
                var d = e.animObject,
                    p = e.setAnimation,
                    h = t.defaultOptions,
                    f = n.registerEventOptions,
                    m = r.hasTouch,
                    g = r.svg,
                    y = r.win,
                    v = l.seriesTypes,
                    b = u.addEvent,
                    _ = u.arrayMax,
                    w = u.arrayMin,
                    x = u.clamp,
                    E = u.cleanRecursively,
                    k = u.correctFloat,
                    S = u.defined,
                    O = u.erase,
                    C = u.error,
                    T = u.extend,
                    M = u.find,
                    A = u.fireEvent,
                    P = u.getNestedProperty,
                    N = u.isArray,
                    j = u.isNumber,
                    D = u.isString,
                    R = u.merge,
                    I = u.objectEach,
                    L = u.pick,
                    B = u.removeEvent,
                    F = u.splat,
                    q = u.syncTimeout;
                return e = function() {
                        function e() {
                            this.zones = this.yAxis = this.xAxis = this.userOptions = this.tooltipOptions = this.processedYData = this.processedXData = this.points = this.options = this.linkedSeries = this.index = this.eventsToUnbind = this.eventOptions = this.data = this.chart = this._i = void 0
                        }
                        return e.prototype.init = function(e, t) {
                                A(this, "init", {
                                    options: t
                                });
                                var n = this,
                                    r = e.series;
                                this.eventsToUnbind = [],
                                    n.chart = e,
                                    n.options = n.setOptions(t),
                                    t = n.options,
                                    n.linkedSeries = [],
                                    n.bindAxes(),
                                    T(n, {
                                        name: t.name,
                                        state: "",
                                        visible: !1 !== t.visible,
                                        selected: !0 === t.selected
                                    }),
                                    f(this, t);
                                var o = t.events;
                                (o && o.click || t.point && t.point.events && t.point.events.click || t.allowPointSelect) && (e.runTrackerClick = !0),
                                n.getColor(),
                                    n.getSymbol(),
                                    n.parallelArrays.forEach(function(e) {
                                        n[e + "Data"] || (n[e + "Data"] = [])
                                    }),
                                    n.isCartesian && (e.hasCartesianSeries = !0);
                                var a;
                                r.length && (a = r[r.length - 1]),
                                    n._i = L(a && a._i, -1) + 1,
                                    n.opacity = n.options.opacity,
                                    e.orderSeries(this.insert(r)),
                                    t.dataSorting && t.dataSorting.enabled ? n.setDataSortingOptions() : n.points || n.data || n.setData(t.data, !1),
                                    A(this, "afterInit")
                            },
                            e.prototype.is = function(e) {
                                return v[e] && this instanceof v[e]
                            },
                            e.prototype.insert = function(e) {
                                var t, n = this.options.index;
                                if (j(n)) {
                                    for (t = e.length; t--;)
                                        if (n >= L(e[t].options.index, e[t]._i)) {
                                            e.splice(t + 1, 0, this);
                                            break
                                        } -
                                    1 === t && e.unshift(this),
                                        t += 1
                                } else
                                    e.push(this);
                                return L(t, e.length - 1)
                            },
                            e.prototype.bindAxes = function() {
                                var e, t = this,
                                    n = t.options,
                                    r = t.chart;
                                A(this, "bindAxes", null, function() {
                                        (t.axisTypes || []).forEach(function(o) {
                                            var a = 0;
                                            r[o].forEach(function(r) {
                                                    e = r.options,
                                                        (n[o] === a && !e.isInternal || "undefined" !== typeof n[o] && n[o] === e.id || "undefined" === typeof n[o] && 0 === e.index) && (t.insert(r.series),
                                                            t[o] = r,
                                                            r.isDirty = !0),
                                                        e.isInternal || a++
                                                }),
                                                t[o] || t.optionalAxis === o || C(18, !0, r)
                                        })
                                    }),
                                    A(this, "afterBindAxes")
                            },
                            e.prototype.updateParallelArrays = function(e, t) {
                                var n = e.series,
                                    r = arguments,
                                    o = j(t) ? function(r) {
                                        var o = "y" === r && n.toYData ? n.toYData(e) : e[r];
                                        n[r + "Data"][t] = o
                                    } :
                                    function(e) {
                                        Array.prototype[t].apply(n[e + "Data"], Array.prototype.slice.call(r, 2))
                                    };
                                n.parallelArrays.forEach(o)
                            },
                            e.prototype.hasData = function() {
                                return this.visible && "undefined" !== typeof this.dataMax && "undefined" !== typeof this.dataMin || this.visible && this.yData && 0 < this.yData.length
                            },
                            e.prototype.autoIncrement = function(e) {
                                var t, n = this.options,
                                    r = n.pointIntervalUnit,
                                    o = n.relativeXValue,
                                    a = this.chart.time,
                                    i = this.xIncrement;
                                return i = L(i, n.pointStart, 0),
                                    this.pointInterval = t = L(this.pointInterval, n.pointInterval, 1),
                                    o && j(e) && (t *= e),
                                    r && (n = new a.Date(i),
                                        "day" === r ? a.set("Date", n, a.get("Date", n) + t) : "month" === r ? a.set("Month", n, a.get("Month", n) + t) : "year" === r && a.set("FullYear", n, a.get("FullYear", n) + t),
                                        t = n.getTime() - i),
                                    o && j(e) ? i + t : (this.xIncrement = i + t,
                                        i)
                            },
                            e.prototype.setDataSortingOptions = function() {
                                var e = this.options;
                                T(this, {
                                        requireSorting: !1,
                                        sorted: !1,
                                        enabledDataSorting: !0,
                                        allowDG: !1
                                    }),
                                    S(e.pointRange) || (e.pointRange = 1)
                            },
                            e.prototype.setOptions = function(e) {
                                var t = this.chart,
                                    n = t.options,
                                    r = n.plotOptions,
                                    o = t.userOptions || {};
                                e = R(e),
                                    t = t.styledMode;
                                var a = {
                                    plotOptions: r,
                                    userOptions: e
                                };
                                A(this, "setOptions", a);
                                var i = a.plotOptions[this.type],
                                    s = o.plotOptions || {};
                                return this.userOptions = a.userOptions,
                                    o = R(i, r.series, o.plotOptions && o.plotOptions[this.type], e),
                                    this.tooltipOptions = R(h.tooltip, h.plotOptions.series && h.plotOptions.series.tooltip, h.plotOptions[this.type].tooltip, n.tooltip.userOptions, r.series && r.series.tooltip, r[this.type].tooltip, e.tooltip),
                                    this.stickyTracking = L(e.stickyTracking, s[this.type] && s[this.type].stickyTracking, s.series && s.series.stickyTracking, !(!this.tooltipOptions.shared || this.noSharedTooltip) || o.stickyTracking),
                                    null === i.marker && delete o.marker,
                                    this.zoneAxis = o.zoneAxis,
                                    r = this.zones = (o.zones || []).slice(), !o.negativeColor && !o.negativeFillColor || o.zones || (n = {
                                            value: o[this.zoneAxis + "Threshold"] || o.threshold || 0,
                                            className: "highcharts-negative"
                                        },
                                        t || (n.color = o.negativeColor,
                                            n.fillColor = o.negativeFillColor),
                                        r.push(n)),
                                    r.length && S(r[r.length - 1].value) && r.push(t ? {} : {
                                        color: this.color,
                                        fillColor: this.fillColor
                                    }),
                                    A(this, "afterSetOptions", {
                                        options: o
                                    }),
                                    o
                            },
                            e.prototype.getName = function() {
                                return L(this.options.name, "Series " + (this.index + 1))
                            },
                            e.prototype.getCyclic = function(e, t, n) {
                                var r = this.chart,
                                    o = this.userOptions,
                                    a = e + "Index",
                                    i = e + "Counter",
                                    s = n ? n.length : L(r.options.chart[e + "Count"], r[e + "Count"]);
                                if (!t) {
                                    var l = L(o[a], o["_" + a]);
                                    S(l) || (r.series.length || (r[i] = 0),
                                            o["_" + a] = l = r[i] % s,
                                            r[i] += 1),
                                        n && (t = n[l])
                                }
                                "undefined" !== typeof l && (this[a] = l),
                                    this[e] = t
                            },
                            e.prototype.getColor = function() {
                                this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.color = a.neutralColor20 : this.getCyclic("color", this.options.color || h.plotOptions[this.type].color, this.chart.options.colors)
                            },
                            e.prototype.getPointsCollection = function() {
                                return (this.hasGroupedData ? this.points : this.data) || []
                            },
                            e.prototype.getSymbol = function() {
                                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
                            },
                            e.prototype.findPointIndex = function(e, t) {
                                var n, r, o = e.id,
                                    a = e.x,
                                    s = this.points,
                                    l = this.options.dataSorting;
                                if (o)
                                    (l = this.chart.get(o)) instanceof i && (n = l);
                                else if ((this.linkedParent || this.enabledDataSorting || this.options.relativeXValue) && (n = function(t) {
                                            return !t.touched && t.index === e.index
                                        },
                                        l && l.matchByName ? n = function(t) {
                                            return !t.touched && t.name === e.name
                                        } :
                                        this.options.relativeXValue && (n = function(t) {
                                            return !t.touched && t.options.x === e.x
                                        }), !(n = M(s, n))))
                                    return;
                                if (n) {
                                    var c = n && n.index;
                                    "undefined" !== typeof c && (r = !0)
                                }
                                return "undefined" === typeof c && j(a) && (c = this.xData.indexOf(a, t)), -1 !== c && "undefined" !== typeof c && this.cropped && (c = c >= this.cropStart ? c - this.cropStart : c), !r && j(c) && s[c] && s[c].touched && (c = void 0),
                                    c
                            },
                            e.prototype.updateData = function(e, t) {
                                var n, r, o, a = this.options,
                                    i = a.dataSorting,
                                    s = this.points,
                                    l = [],
                                    c = this.requireSorting,
                                    u = e.length === s.length,
                                    d = !0;
                                if (this.xIncrement = null,
                                    e.forEach(function(e, t) {
                                        var r = S(e) && this.pointClass.prototype.optionsToObject.call({
                                                series: this
                                            }, e) || {},
                                            d = r.x;
                                        r.id || j(d) ? (r = this.findPointIndex(r, o), -1 === r || "undefined" === typeof r ? l.push(e) : s[r] && e !== a.data[r] ? (s[r].update(e, !1, null, !1),
                                                s[r].touched = !0,
                                                c && (o = r + 1)) : s[r] && (s[r].touched = !0),
                                            (!u || t !== r || i && i.enabled || this.hasDerivedData) && (n = !0)) : l.push(e)
                                    }, this),
                                    n)
                                    for (e = s.length; e--;)
                                        (r = s[e]) && !r.touched && r.remove && r.remove(!1, t);
                                else
                                    !u || i && i.enabled ? d = !1 : (e.forEach(function(e, t) {
                                            e !== s[t].y && s[t].update && s[t].update(e, !1, null, !1)
                                        }),
                                        l.length = 0);
                                return s.forEach(function(e) {
                                    e && (e.touched = !1)
                                }), !!d && (l.forEach(function(e) {
                                        this.addPoint(e, !1, null, null, !1)
                                    }, this),
                                    null === this.xIncrement && this.xData && this.xData.length && (this.xIncrement = _(this.xData),
                                        this.autoIncrement()), !0)
                            },
                            e.prototype.setData = function(e, t, n, r) {
                                var o = this,
                                    a = o.points,
                                    i = a && a.length || 0,
                                    s = o.options,
                                    l = o.chart,
                                    c = s.dataSorting,
                                    u = o.xAxis,
                                    d = s.turboThreshold,
                                    p = this.xData,
                                    h = this.yData,
                                    f = o.pointArrayMap;
                                f = f && f.length;
                                var m, g = s.keys,
                                    y = 0,
                                    v = 1,
                                    b = null;
                                e = e || [];
                                var _ = e.length;
                                if (t = L(t, !0),
                                    c && c.enabled && (e = this.sortData(e)), !1 !== r && _ && i && !o.cropped && !o.hasGroupedData && o.visible && !o.isSeriesBoosting && (m = this.updateData(e, n)), !m) {
                                    if (o.xIncrement = null,
                                        o.colorCounter = 0,
                                        this.parallelArrays.forEach(function(e) {
                                            o[e + "Data"].length = 0
                                        }),
                                        d && _ > d)
                                        if (b = o.getFirstValidPoint(e),
                                            j(b))
                                            for (n = 0; n < _; n++)
                                                p[n] = this.autoIncrement(),
                                                h[n] = e[n];
                                        else if (N(b))
                                        if (f)
                                            for (n = 0; n < _; n++)
                                                r = e[n],
                                                p[n] = r[0],
                                                h[n] = r.slice(1, f + 1);
                                        else
                                            for (g && (y = g.indexOf("x"),
                                                    v = g.indexOf("y"),
                                                    y = 0 <= y ? y : 0,
                                                    v = 0 <= v ? v : 1),
                                                n = 0; n < _; n++)
                                                r = e[n],
                                                p[n] = r[y],
                                                h[n] = r[v];
                                    else
                                        C(12, !1, l);
                                    else
                                        for (n = 0; n < _; n++)
                                            "undefined" !== typeof e[n] && (r = {
                                                    series: o
                                                },
                                                o.pointClass.prototype.applyOptions.apply(r, [e[n]]),
                                                o.updateParallelArrays(r, n));
                                    for (h && D(h[0]) && C(14, !0, l),
                                        o.data = [],
                                        o.options.data = o.userOptions.data = e,
                                        n = i; n--;)
                                        a[n] && a[n].destroy && a[n].destroy();
                                    u && (u.minRange = u.userMinRange),
                                        o.isDirty = l.isDirtyBox = !0,
                                        o.isDirtyData = !!a,
                                        n = !1
                                }
                                "point" === s.legendType && (this.processData(),
                                        this.generatePoints()),
                                    t && l.redraw(n)
                            },
                            e.prototype.sortData = function(e) {
                                var t = this,
                                    n = t.options.dataSorting.sortKey || "y",
                                    r = function(e, t) {
                                        return S(t) && e.pointClass.prototype.optionsToObject.call({
                                            series: e
                                        }, t) || {}
                                    };
                                return e.forEach(function(n, o) {
                                        e[o] = r(t, n),
                                            e[o].index = o
                                    }, this),
                                    e.concat().sort(function(e, t) {
                                        return e = P(n, e),
                                            t = P(n, t),
                                            t < e ? -1 : t > e ? 1 : 0
                                    }).forEach(function(e, t) {
                                        e.x = t
                                    }, this),
                                    t.linkedSeries && t.linkedSeries.forEach(function(t) {
                                        var n = t.options,
                                            o = n.data;
                                        n.dataSorting && n.dataSorting.enabled || !o || (o.forEach(function(n, a) {
                                                o[a] = r(t, n),
                                                    e[a] && (o[a].x = e[a].x,
                                                        o[a].index = a)
                                            }),
                                            t.setData(o, !1))
                                    }),
                                    e
                            },
                            e.prototype.getProcessedData = function(e) {
                                var t = this.xAxis,
                                    n = this.options,
                                    r = n.cropThreshold,
                                    o = e || this.getExtremesFromAll || n.getExtremesFromAll,
                                    a = this.isCartesian;
                                e = t && t.val2lin,
                                    n = !(!t || !t.logarithmic);
                                var i = 0,
                                    s = this.xData,
                                    l = this.yData,
                                    c = this.requireSorting,
                                    u = !1,
                                    d = s.length;
                                if (t) {
                                    u = t.getExtremes();
                                    var p = u.min,
                                        h = u.max;
                                    u = t.categories && !t.names.length
                                }
                                if (a && this.sorted && !o && (!r || d > r || this.forceCrop))
                                    if (s[d - 1] < p || s[0] > h)
                                        s = [],
                                        l = [];
                                    else if (this.yData && (s[0] < p || s[d - 1] > h)) {
                                    var f = this.cropData(this.xData, this.yData, p, h);
                                    s = f.xData,
                                        l = f.yData,
                                        i = f.start,
                                        f = !0
                                }
                                for (r = s.length || 1; --r;)
                                    if (0 < (t = n ? e(s[r]) - e(s[r - 1]) : s[r] - s[r - 1]) && ("undefined" === typeof m || t < m))
                                        var m = t;
                                    else
                                        0 > t && c && !u && (C(15, !1, this.chart),
                                            c = !1);
                                return {
                                    xData: s,
                                    yData: l,
                                    cropped: f,
                                    cropStart: i,
                                    closestPointRange: m
                                }
                            },
                            e.prototype.processData = function(e) {
                                var t = this.xAxis;
                                if (this.isCartesian && !this.isDirty && !t.isDirty && !this.yAxis.isDirty && !e)
                                    return !1;
                                e = this.getProcessedData(),
                                    this.cropped = e.cropped,
                                    this.cropStart = e.cropStart,
                                    this.processedXData = e.xData,
                                    this.processedYData = e.yData,
                                    this.closestPointRange = this.basePointRange = e.closestPointRange
                            },
                            e.prototype.cropData = function(e, t, n, r, o) {
                                var a, i = e.length,
                                    s = 0,
                                    l = i;
                                for (o = L(o, this.cropShoulder),
                                    a = 0; a < i; a++)
                                    if (e[a] >= n) {
                                        s = Math.max(0, a - o);
                                        break
                                    }
                                for (n = a; n < i; n++)
                                    if (e[n] > r) {
                                        l = n + o;
                                        break
                                    }
                                return {
                                    xData: e.slice(s, l),
                                    yData: t.slice(s, l),
                                    start: s,
                                    end: l
                                }
                            },
                            e.prototype.generatePoints = function() {
                                var e = this.options,
                                    t = e.data,
                                    n = this.processedXData,
                                    r = this.processedYData,
                                    o = this.pointClass,
                                    a = n.length,
                                    i = this.cropStart || 0,
                                    s = this.hasGroupedData,
                                    l = e.keys,
                                    c = [];
                                e = e.dataGrouping && e.dataGrouping.groupAll ? i : 0;
                                var u, d, p = this.data;
                                if (!p && !s) {
                                    var h = [];
                                    h.length = t.length,
                                        p = this.data = h
                                }
                                for (l && s && (this.options.keys = !1),
                                    d = 0; d < a; d++) {
                                    if (h = i + d,
                                        s) {
                                        var f = (new o).init(this, [n[d]].concat(F(r[d])));
                                        f.dataGroup = this.groupMap[e + d],
                                            f.dataGroup.options && (f.options = f.dataGroup.options,
                                                T(f, f.dataGroup.options),
                                                delete f.dataLabels)
                                    } else
                                        (f = p[h]) || "undefined" === typeof t[h] || (p[h] = f = (new o).init(this, t[h], n[d]));
                                    f && (f.index = s ? e + d : h,
                                        c[d] = f)
                                }
                                if (this.options.keys = l,
                                    p && (a !== (u = p.length) || s))
                                    for (d = 0; d < u; d++)
                                        d !== i || s || (d += a),
                                        p[d] && (p[d].destroyElements(),
                                            p[d].plotX = void 0);
                                this.data = p,
                                    this.points = c,
                                    A(this, "afterGeneratePoints")
                            },
                            e.prototype.getXExtremes = function(e) {
                                return {
                                    min: w(e),
                                    max: _(e)
                                }
                            },
                            e.prototype.getExtremes = function(e, t) {
                                var n = this.xAxis,
                                    r = this.yAxis,
                                    o = this.processedXData || this.xData,
                                    a = [],
                                    i = this.requireSorting ? this.cropShoulder : 0;
                                r = !!r && r.positiveValuesOnly;
                                var s, l = 0,
                                    c = 0,
                                    u = 0;
                                e = e || this.stackedYData || this.processedYData || [];
                                var d = e.length;
                                if (n) {
                                    var p = n.getExtremes();
                                    l = p.min,
                                        c = p.max
                                }
                                for (s = 0; s < d; s++) {
                                    var h = o[s];
                                    p = e[s];
                                    var f = (j(p) || N(p)) && (p.length || 0 < p || !r);
                                    if (h = t || this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || !n || (o[s + i] || h) >= l && (o[s - i] || h) <= c,
                                        f && h)
                                        if (f = p.length)
                                            for (; f--;)
                                                j(p[f]) && (a[u++] = p[f]);
                                        else
                                            a[u++] = p
                                }
                                return e = {
                                        dataMin: w(a),
                                        dataMax: _(a)
                                    },
                                    A(this, "afterGetExtremes", {
                                        dataExtremes: e
                                    }),
                                    e
                            },
                            e.prototype.applyExtremes = function() {
                                var e = this.getExtremes();
                                return this.dataMin = e.dataMin,
                                    this.dataMax = e.dataMax,
                                    e
                            },
                            e.prototype.getFirstValidPoint = function(e) {
                                for (var t = e.length, n = 0, r = null; null === r && n < t;)
                                    r = e[n],
                                    n++;
                                return r
                            },
                            e.prototype.translate = function() {
                                this.processedXData || this.processData(),
                                    this.generatePoints();
                                var e, t, n = this.options,
                                    r = n.stacking,
                                    o = this.xAxis,
                                    a = o.categories,
                                    i = this.enabledDataSorting,
                                    s = this.yAxis,
                                    l = this.points,
                                    c = l.length,
                                    u = !!this.modifyValue,
                                    d = this.pointPlacementToXValue(),
                                    p = !!d,
                                    h = n.threshold,
                                    f = n.startFromThreshold ? h : 0,
                                    m = this.zoneAxis || "y",
                                    g = Number.MAX_VALUE;
                                for (e = 0; e < c; e++) {
                                    var y = l[e],
                                        v = y.x,
                                        b = void 0,
                                        _ = void 0,
                                        w = y.y,
                                        E = y.low,
                                        O = r && s.stacking && s.stacking.stacks[(this.negStacks && w < (f ? 0 : h) ? "-" : "") + this.stackKey];
                                    if ((s.positiveValuesOnly && !s.validatePositiveValue(w) || o.positiveValuesOnly && !o.validatePositiveValue(v)) && (y.isNull = !0),
                                        y.plotX = t = k(x(o.translate(v, 0, 0, 0, 1, d, "flags" === this.type), -1e5, 1e5)),
                                        r && this.visible && O && O[v]) {
                                        var C = this.getStackIndicator(C, v, this.index);
                                        y.isNull || (b = O[v],
                                            _ = b.points[C.key])
                                    }
                                    if (N(_) && (E = _[0],
                                            w = _[1],
                                            E === f && C.key === O[v].base && (E = L(j(h) && h, s.min)),
                                            s.positiveValuesOnly && 0 >= E && (E = null),
                                            y.total = y.stackTotal = b.total,
                                            y.percentage = b.total && y.y / b.total * 100,
                                            y.stackY = w,
                                            this.irregularWidths || b.setOffset(this.pointXOffset || 0, this.barW || 0)),
                                        y.yBottom = S(E) ? x(s.translate(E, 0, 1, 0, 1), -1e5, 1e5) : null,
                                        u && (w = this.modifyValue(w, y)),
                                        y.plotY = void 0,
                                        j(w) && "undefined" !== typeof(b = s.translate(w, !1, !0, !1, !0)) && (y.plotY = x(b, -1e5, 1e5)),
                                        y.isInside = this.isPointInside(y),
                                        y.clientX = p ? k(o.translate(v, 0, 0, 0, 1, d)) : t,
                                        y.negative = y[m] < (n[m + "Threshold"] || h || 0),
                                        y.category = a && "undefined" !== typeof a[y.x] ? a[y.x] : y.x, !y.isNull && !1 !== y.visible) {
                                        "undefined" !== typeof T && (g = Math.min(g, Math.abs(t - T)));
                                        var T = t
                                    }
                                    y.zone = this.zones.length && y.getZone(), !y.graphic && this.group && i && (y.isNew = !0)
                                }
                                this.closestPointRangePx = g,
                                    A(this, "afterTranslate")
                            },
                            e.prototype.getValidPoints = function(e, t, n) {
                                var r = this.chart;
                                return (e || this.points || []).filter(function(e) {
                                    return !(t && !r.isInsidePlot(e.plotX, e.plotY, {
                                        inverted: r.inverted
                                    })) && (!1 !== e.visible && (n || !e.isNull))
                                })
                            },
                            e.prototype.getClipBox = function(e, t) {
                                var n = this.options,
                                    r = this.chart,
                                    o = r.inverted,
                                    a = this.xAxis,
                                    i = a && this.yAxis,
                                    s = r.options.chart.scrollablePlotArea || {};
                                return e && !1 === n.clip && i ? e = o ? {
                                        y: -r.chartWidth + i.len + i.pos,
                                        height: r.chartWidth,
                                        width: r.chartHeight,
                                        x: -r.chartHeight + a.len + a.pos
                                    } : {
                                        y: -i.pos,
                                        height: r.chartHeight,
                                        width: r.chartWidth,
                                        x: -a.pos
                                    } : (e = this.clipBox || r.clipBox,
                                        t && (e.width = r.plotSizeX,
                                            e.x = (r.scrollablePixelsX || 0) * (s.scrollPositionX || 0))),
                                    t ? {
                                        width: e.width,
                                        x: e.x
                                    } : e
                            },
                            e.prototype.getSharedClipKey = function(e) {
                                if (this.sharedClipKey)
                                    return this.sharedClipKey;
                                var t = [e && e.duration, e && e.easing, e && e.defer, this.getClipBox(e).height, this.options.xAxis, this.options.yAxis].join();
                                return (!1 !== this.options.clip || e) && (this.sharedClipKey = t),
                                    t
                            },
                            e.prototype.setClip = function(e) {
                                var t = this.chart,
                                    n = this.options,
                                    r = t.renderer,
                                    o = t.inverted,
                                    a = this.clipBox,
                                    i = this.getClipBox(e),
                                    s = this.getSharedClipKey(e),
                                    l = t.sharedClips[s],
                                    c = t.sharedClips[s + "m"];
                                e && (i.width = 0,
                                        o && (i.x = t.plotHeight + (!1 !== n.clip ? 0 : t.plotTop))),
                                    l ? t.hasLoaded || l.attr(i) : (e && (t.sharedClips[s + "m"] = c = r.clipRect(o ? (t.plotSizeX || 0) + 99 : -99, o ? -t.plotLeft : -t.plotTop, 99, o ? t.chartWidth : t.chartHeight)),
                                        t.sharedClips[s] = l = r.clipRect(i),
                                        l.count = {
                                            length: 0
                                        }),
                                    e && !l.count[this.index] && (l.count[this.index] = !0,
                                        l.count.length += 1),
                                    (!1 !== n.clip || e) && (this.group.clip(e || a ? l : t.clipRect),
                                        this.markerGroup.clip(c)),
                                    e || (l.count[this.index] && (delete l.count[this.index],
                                            --l.count.length),
                                        0 === l.count.length && (a || (t.sharedClips[s] = l.destroy()),
                                            c && (t.sharedClips[s + "m"] = c.destroy())))
                            },
                            e.prototype.animate = function(e) {
                                var t = this.chart,
                                    n = d(this.options.animation),
                                    r = this.sharedClipKey;
                                if (e)
                                    this.setClip(n);
                                else if (r) {
                                    e = t.sharedClips[r],
                                        r = t.sharedClips[r + "m"];
                                    var o = this.getClipBox(n, !0);
                                    e && e.animate(o, n),
                                        r && r.animate({
                                            width: o.width + 99,
                                            x: o.x - (t.inverted ? 0 : 99)
                                        }, n)
                                }
                            },
                            e.prototype.afterAnimate = function() {
                                this.setClip(),
                                    A(this, "afterAnimate"),
                                    this.finishedAnimating = !0
                            },
                            e.prototype.drawPoints = function() {
                                var e, t, n = this.points,
                                    r = this.chart,
                                    o = this.options.marker,
                                    a = this[this.specialGroup] || this.markerGroup,
                                    i = this.xAxis,
                                    s = L(o.enabled, !(i && !i.isRadial) || null, this.closestPointRangePx >= o.enabledThreshold * o.radius);
                                if (!1 !== o.enabled || this._hasPointMarkers)
                                    for (e = 0; e < n.length; e++) {
                                        var l = n[e],
                                            c = (t = l.graphic) ? "animate" : "attr",
                                            u = l.marker || {},
                                            d = !!l.marker;
                                        if ((s && "undefined" === typeof u.enabled || u.enabled) && !l.isNull && !1 !== l.visible) {
                                            var p = L(u.symbol, this.symbol, "rect"),
                                                h = this.markerAttribs(l, l.selected && "select");
                                            this.enabledDataSorting && (l.startXPos = i.reversed ? -(h.width || 0) : i.width);
                                            var f = !1 !== l.isInside;
                                            t ? t[f ? "show" : "hide"](f).animate(h) : f && (0 < (h.width || 0) || l.hasImage) && (l.graphic = t = r.renderer.symbol(p, h.x, h.y, h.width, h.height, d ? u : o).add(a),
                                                    this.enabledDataSorting && r.hasRendered && (t.attr({
                                                            x: l.startXPos
                                                        }),
                                                        c = "animate")),
                                                t && "animate" === c && t[f ? "show" : "hide"](f).animate(h),
                                                t && !r.styledMode && t[c](this.pointAttribs(l, l.selected && "select")),
                                                t && t.addClass(l.getClassName(), !0)
                                        } else
                                            t && (l.graphic = t.destroy())
                                    }
                            },
                            e.prototype.markerAttribs = function(e, t) {
                                var n = this.options,
                                    r = n.marker,
                                    o = e.marker || {},
                                    a = o.symbol || r.symbol,
                                    i = L(o.radius, r.radius);
                                return t && (r = r.states[t],
                                        t = o.states && o.states[t],
                                        i = L(t && t.radius, r && r.radius, i + (r && r.radiusPlus || 0))),
                                    e.hasImage = a && 0 === a.indexOf("url"),
                                    e.hasImage && (i = 0),
                                    e = {
                                        x: n.crisp ? Math.floor(e.plotX - i) : e.plotX - i,
                                        y: e.plotY - i
                                    },
                                    i && (e.width = e.height = 2 * i),
                                    e
                            },
                            e.prototype.pointAttribs = function(e, t) {
                                var n = this.options.marker,
                                    r = e && e.options,
                                    o = r && r.marker || {},
                                    a = r && r.color,
                                    i = e && e.color,
                                    s = e && e.zone && e.zone.color,
                                    l = this.color;
                                return e = L(o.lineWidth, n.lineWidth),
                                    r = 1,
                                    l = a || s || i || l,
                                    a = o.fillColor || n.fillColor || l,
                                    i = o.lineColor || n.lineColor || l,
                                    t = t || "normal",
                                    n = n.states[t],
                                    t = o.states && o.states[t] || {},
                                    e = L(t.lineWidth, n.lineWidth, e + L(t.lineWidthPlus, n.lineWidthPlus, 0)),
                                    a = t.fillColor || n.fillColor || a,
                                    i = t.lineColor || n.lineColor || i,
                                    r = L(t.opacity, n.opacity, r), {
                                        stroke: i,
                                        "stroke-width": e,
                                        fill: a,
                                        opacity: r
                                    }
                            },
                            e.prototype.destroy = function(e) {
                                var t, n, r, o, a = this,
                                    i = a.chart,
                                    s = /AppleWebKit\/533/.test(y.navigator.userAgent),
                                    l = a.data || [];
                                for (A(a, "destroy"),
                                    this.removeEvents(e),
                                    (a.axisTypes || []).forEach(function(e) {
                                        (o = a[e]) && o.series && (O(o.series, a),
                                            o.isDirty = o.forceRedraw = !0)
                                    }),
                                    a.legendItem && a.chart.legend.destroyItem(a),
                                    n = l.length; n--;)
                                    (r = l[n]) && r.destroy && r.destroy();
                                a.clips && a.clips.forEach(function(e) {
                                        return e.destroy()
                                    }),
                                    u.clearTimeout(a.animationTimeout),
                                    I(a, function(e, n) {
                                        e instanceof c && !e.survive && (t = s && "group" === n ? "hide" : "destroy",
                                            e[t]())
                                    }),
                                    i.hoverSeries === a && (i.hoverSeries = void 0),
                                    O(i.series, a),
                                    i.orderSeries(),
                                    I(a, function(t, n) {
                                        e && "hcEvents" === n || delete a[n]
                                    })
                            },
                            e.prototype.applyZones = function() {
                                var e, t, n, r, o, a, i, s, l = this,
                                    c = this.chart,
                                    u = c.renderer,
                                    d = this.zones,
                                    p = this.clips || [],
                                    h = this.graph,
                                    f = this.area,
                                    m = Math.max(c.chartWidth, c.chartHeight),
                                    g = this[(this.zoneAxis || "y") + "Axis"],
                                    y = c.inverted,
                                    v = !1;
                                if (d.length && (h || f) && g && "undefined" !== typeof g.min) {
                                    var b = g.reversed,
                                        _ = g.horiz;
                                    h && !this.showLine && h.hide(),
                                        f && f.hide();
                                    var w = g.getExtremes();
                                    d.forEach(function(d, E) {
                                            e = b ? _ ? c.plotWidth : 0 : _ ? 0 : g.toPixels(w.min) || 0,
                                                e = x(L(t, e), 0, m),
                                                t = x(Math.round(g.toPixels(L(d.value, w.max), !0) || 0), 0, m),
                                                v && (e = t = g.toPixels(w.max)),
                                                r = Math.abs(e - t),
                                                o = Math.min(e, t),
                                                a = Math.max(e, t),
                                                g.isXAxis ? (n = {
                                                        x: y ? a : o,
                                                        y: 0,
                                                        width: r,
                                                        height: m
                                                    },
                                                    _ || (n.x = c.plotHeight - n.x)) : (n = {
                                                        x: 0,
                                                        y: y ? a : o,
                                                        width: m,
                                                        height: r
                                                    },
                                                    _ && (n.y = c.plotWidth - n.y)),
                                                y && u.isVML && (n = g.isXAxis ? {
                                                    x: 0,
                                                    y: b ? o : a,
                                                    height: n.width,
                                                    width: c.chartWidth
                                                } : {
                                                    x: n.y - c.plotLeft - c.spacingBox.x,
                                                    y: 0,
                                                    width: n.height,
                                                    height: c.chartHeight
                                                }),
                                                p[E] ? p[E].animate(n) : p[E] = u.clipRect(n),
                                                i = l["zone-area-" + E],
                                                s = l["zone-graph-" + E],
                                                h && s && s.clip(p[E]),
                                                f && i && i.clip(p[E]),
                                                v = d.value > w.max,
                                                l.resetZones && 0 === t && (t = void 0)
                                        }),
                                        this.clips = p
                                } else
                                    l.visible && (h && h.show(!0),
                                        f && f.show(!0))
                            },
                            e.prototype.invertGroups = function(e) {
                                function t() {
                                    ["group", "markerGroup"].forEach(function(t) {
                                        n[t] && (r.renderer.isVML && n[t].attr({
                                                width: n.yAxis.len,
                                                height: n.xAxis.len
                                            }),
                                            n[t].width = n.yAxis.len,
                                            n[t].height = n.xAxis.len,
                                            n[t].invert(!n.isRadialSeries && e))
                                    })
                                }
                                var n = this,
                                    r = n.chart;
                                n.xAxis && (n.eventsToUnbind.push(b(r, "resize", t)),
                                    t(),
                                    n.invertGroups = t)
                            },
                            e.prototype.plotGroup = function(e, t, n, r, o) {
                                var a = this[e],
                                    i = !a;
                                return n = {
                                        visibility: n,
                                        zIndex: r || .1
                                    },
                                    "undefined" === typeof this.opacity || this.chart.styledMode || "inactive" === this.state || (n.opacity = this.opacity),
                                    i && (this[e] = a = this.chart.renderer.g().add(o)),
                                    a.addClass("highcharts-" + t + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (S(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (a.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0),
                                    a.attr(n)[i ? "attr" : "animate"](this.getPlotBox()),
                                    a
                            },
                            e.prototype.getPlotBox = function() {
                                var e = this.chart,
                                    t = this.xAxis,
                                    n = this.yAxis;
                                return e.inverted && (t = n,
                                    n = this.xAxis), {
                                    translateX: t ? t.left : e.plotLeft,
                                    translateY: n ? n.top : e.plotTop,
                                    scaleX: 1,
                                    scaleY: 1
                                }
                            },
                            e.prototype.removeEvents = function(e) {
                                e || B(this),
                                    this.eventsToUnbind.length && (this.eventsToUnbind.forEach(function(e) {
                                            e()
                                        }),
                                        this.eventsToUnbind.length = 0)
                            },
                            e.prototype.render = function() {
                                var e = this,
                                    t = e.chart,
                                    n = e.options,
                                    r = d(n.animation),
                                    o = e.visible ? "inherit" : "hidden",
                                    a = n.zIndex,
                                    i = e.hasRendered,
                                    s = t.seriesGroup,
                                    l = t.inverted,
                                    c = !e.finishedAnimating && t.renderer.isSVG && r.duration;
                                A(this, "render");
                                var u = e.plotGroup("group", "series", o, a, s);
                                e.markerGroup = e.plotGroup("markerGroup", "markers", o, a, s),
                                    c && e.animate && e.animate(!0),
                                    u.inverted = !!L(e.invertible, e.isCartesian) && l,
                                    e.drawGraph && (e.drawGraph(),
                                        e.applyZones()),
                                    e.visible && e.drawPoints(),
                                    e.drawDataLabels && e.drawDataLabels(),
                                    e.redrawPoints && e.redrawPoints(),
                                    e.drawTracker && !1 !== e.options.enableMouseTracking && e.drawTracker(),
                                    e.invertGroups(l), !1 === n.clip || e.sharedClipKey || i || u.clip(t.clipRect),
                                    c && e.animate && e.animate(),
                                    i || (c && r.defer && (c += r.defer),
                                        e.animationTimeout = q(function() {
                                            e.afterAnimate()
                                        }, c || 0)),
                                    e.isDirty = !1,
                                    e.hasRendered = !0,
                                    A(e, "afterRender")
                            },
                            e.prototype.redraw = function() {
                                var e = this.chart,
                                    t = this.isDirty || this.isDirtyData,
                                    n = this.group,
                                    r = this.xAxis,
                                    o = this.yAxis;
                                n && (e.inverted && n.attr({
                                            width: e.plotWidth,
                                            height: e.plotHeight
                                        }),
                                        n.animate({
                                            translateX: L(r && r.left, e.plotLeft),
                                            translateY: L(o && o.top, e.plotTop)
                                        })),
                                    this.translate(),
                                    this.render(),
                                    t && delete this.kdTree
                            },
                            e.prototype.searchPoint = function(e, t) {
                                var n = this.xAxis,
                                    r = this.yAxis,
                                    o = this.chart.inverted;
                                return this.searchKDTree({
                                    clientX: o ? n.len - e.chartY + n.pos : e.chartX - n.pos,
                                    plotY: o ? r.len - e.chartX + r.pos : e.chartY - r.pos
                                }, t, e)
                            },
                            e.prototype.buildKDTree = function(e) {
                                function t(e, r, o) {
                                    var a = e && e.length;
                                    if (a) {
                                        var i = n.kdAxisArray[r % o];
                                        return e.sort(function(e, t) {
                                                return e[i] - t[i]
                                            }),
                                            a = Math.floor(a / 2), {
                                                point: e[a],
                                                left: t(e.slice(0, a), r + 1, o),
                                                right: t(e.slice(a + 1), r + 1, o)
                                            }
                                    }
                                }
                                this.buildingKdTree = !0;
                                var n = this,
                                    r = -1 < n.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                                delete n.kdTree,
                                    q(function() {
                                        n.kdTree = t(n.getValidPoints(null, !n.directTouch), r, r),
                                            n.buildingKdTree = !1
                                    }, n.options.kdNow || e && "touchstart" === e.type ? 0 : 1)
                            },
                            e.prototype.searchKDTree = function(e, t, n) {
                                function r(e, t, n, l) {
                                    var c = t.point,
                                        u = o.kdAxisArray[n % l],
                                        d = c,
                                        p = S(e[a]) && S(c[a]) ? Math.pow(e[a] - c[a], 2) : null,
                                        h = S(e[i]) && S(c[i]) ? Math.pow(e[i] - c[i], 2) : null;
                                    return h = (p || 0) + (h || 0),
                                        c.dist = S(h) ? Math.sqrt(h) : Number.MAX_VALUE,
                                        c.distX = S(p) ? Math.sqrt(p) : Number.MAX_VALUE,
                                        u = e[u] - c[u],
                                        h = 0 > u ? "left" : "right",
                                        p = 0 > u ? "right" : "left",
                                        t[h] && (h = r(e, t[h], n + 1, l),
                                            d = h[s] < d[s] ? h : c),
                                        t[p] && Math.sqrt(u * u) < d[s] && (e = r(e, t[p], n + 1, l),
                                            d = e[s] < d[s] ? e : d),
                                        d
                                }
                                var o = this,
                                    a = this.kdAxisArray[0],
                                    i = this.kdAxisArray[1],
                                    s = t ? "distX" : "dist";
                                if (t = -1 < o.options.findNearestPointBy.indexOf("y") ? 2 : 1,
                                    this.kdTree || this.buildingKdTree || this.buildKDTree(n),
                                    this.kdTree)
                                    return r(e, this.kdTree, t, t)
                            },
                            e.prototype.pointPlacementToXValue = function() {
                                var e = this.options,
                                    t = e.pointRange,
                                    n = this.xAxis;
                                return e = e.pointPlacement,
                                    "between" === e && (e = n.reversed ? -.5 : .5),
                                    j(e) ? e * (t || n.pointRange) : 0
                            },
                            e.prototype.isPointInside = function(e) {
                                return "undefined" !== typeof e.plotY && "undefined" !== typeof e.plotX && 0 <= e.plotY && e.plotY <= this.yAxis.len && 0 <= e.plotX && e.plotX <= this.xAxis.len
                            },
                            e.prototype.drawTracker = function() {
                                var e = this,
                                    t = e.options,
                                    n = t.trackByArea,
                                    r = [].concat(n ? e.areaPath : e.graphPath),
                                    o = e.chart,
                                    a = o.pointer,
                                    i = o.renderer,
                                    s = o.options.tooltip.snap,
                                    l = e.tracker,
                                    c = function(t) {
                                        o.hoverSeries !== e && e.onMouseOver()
                                    },
                                    u = "rgba(192,192,192," + (g ? 1e-4 : .002) + ")";
                                l ? l.attr({
                                        d: r
                                    }) : e.graph && (e.tracker = i.path(r).attr({
                                            visibility: e.visible ? "visible" : "hidden",
                                            zIndex: 2
                                        }).addClass(n ? "highcharts-tracker-area" : "highcharts-tracker-line").add(e.group),
                                        o.styledMode || e.tracker.attr({
                                            "stroke-linecap": "round",
                                            "stroke-linejoin": "round",
                                            stroke: u,
                                            fill: n ? u : "none",
                                            "stroke-width": e.graph.strokeWidth() + (n ? 0 : 2 * s)
                                        }), [e.tracker, e.markerGroup, e.dataLabelsGroup].forEach(function(e) {
                                            e && (e.addClass("highcharts-tracker").on("mouseover", c).on("mouseout", function(e) {
                                                    a.onTrackerMouseOut(e)
                                                }),
                                                t.cursor && !o.styledMode && e.css({
                                                    cursor: t.cursor
                                                }),
                                                m) && e.on("touchstart", c)
                                        })),
                                    A(this, "afterDrawTracker")
                            },
                            e.prototype.addPoint = function(e, t, n, r, o) {
                                var a = this.options,
                                    i = this.data,
                                    s = this.chart,
                                    l = this.xAxis;
                                l = l && l.hasNames && l.names;
                                var c, u = a.data,
                                    d = this.xData;
                                t = L(t, !0);
                                var p = {
                                    series: this
                                };
                                this.pointClass.prototype.applyOptions.apply(p, [e]);
                                var h = p.x,
                                    f = d.length;
                                if (this.requireSorting && h < d[f - 1])
                                    for (c = !0; f && d[f - 1] > h;)
                                        f--;
                                this.updateParallelArrays(p, "splice", f, 0, 0),
                                    this.updateParallelArrays(p, f),
                                    l && p.name && (l[h] = p.name),
                                    u.splice(f, 0, e),
                                    c && (this.data.splice(f, 0, null),
                                        this.processData()),
                                    "point" === a.legendType && this.generatePoints(),
                                    n && (i[0] && i[0].remove ? i[0].remove(!1) : (i.shift(),
                                        this.updateParallelArrays(p, "shift"),
                                        u.shift())), !1 !== o && A(this, "addPoint", {
                                        point: p
                                    }),
                                    this.isDirtyData = this.isDirty = !0,
                                    t && s.redraw(r)
                            },
                            e.prototype.removePoint = function(e, t, n) {
                                var r = this,
                                    o = r.data,
                                    a = o[e],
                                    i = r.points,
                                    s = r.chart,
                                    l = function() {
                                        i && i.length === o.length && i.splice(e, 1),
                                            o.splice(e, 1),
                                            r.options.data.splice(e, 1),
                                            r.updateParallelArrays(a || {
                                                series: r
                                            }, "splice", e, 1),
                                            a && a.destroy(),
                                            r.isDirty = !0,
                                            r.isDirtyData = !0,
                                            t && s.redraw()
                                    };
                                p(n, s),
                                    t = L(t, !0),
                                    a ? a.firePointEvent("remove", null, l) : l()
                            },
                            e.prototype.remove = function(e, t, n, r) {
                                function o() {
                                    a.destroy(r),
                                        i.isDirtyLegend = i.isDirtyBox = !0,
                                        i.linkSeries(),
                                        L(e, !0) && i.redraw(t)
                                }
                                var a = this,
                                    i = a.chart;
                                !1 !== n ? A(a, "remove", null, o) : o()
                            },
                            e.prototype.update = function(e, t) {
                                e = E(e, this.userOptions),
                                    A(this, "update", {
                                        options: e
                                    });
                                var n, r = this,
                                    o = r.chart,
                                    a = r.userOptions,
                                    i = r.initialType || r.type,
                                    s = o.options.plotOptions,
                                    l = v[i].prototype,
                                    c = r.finishedAnimating && {
                                        animation: !1
                                    },
                                    u = {},
                                    d = ["eventOptions", "navigatorSeries", "baseSeries"],
                                    p = e.type || a.type || o.options.chart.type,
                                    h = !(this.hasDerivedData || p && p !== this.type || "undefined" !== typeof e.pointStart || "undefined" !== typeof e.pointInterval || "undefined" !== typeof e.relativeXValue || r.hasOptionChanged("dataGrouping") || r.hasOptionChanged("pointStart") || r.hasOptionChanged("pointInterval") || r.hasOptionChanged("pointIntervalUnit") || r.hasOptionChanged("keys"));
                                if (p = p || i,
                                    h && (d.push("data", "isDirtyData", "points", "processedXData", "processedYData", "xIncrement", "cropped", "_hasPointMarkers", "_hasPointLabels", "clips", "nodes", "layout", "mapMap", "mapData", "minY", "maxY", "minX", "maxX"), !1 !== e.visible && d.push("area", "graph"),
                                        r.parallelArrays.forEach(function(e) {
                                            d.push(e + "Data")
                                        }),
                                        e.data && (e.dataSorting && T(r.options.dataSorting, e.dataSorting),
                                            this.setData(e.data, !1))),
                                    e = R(a, c, {
                                        index: "undefined" === typeof a.index ? r.index : a.index,
                                        pointStart: L(s && s.series && s.series.pointStart, a.pointStart, r.xData[0])
                                    }, !h && {
                                        data: r.options.data
                                    }, e),
                                    h && e.data && (e.data = r.options.data),
                                    d = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"].concat(d),
                                    d.forEach(function(e) {
                                        d[e] = r[e],
                                            delete r[e]
                                    }),
                                    s = !1,
                                    v[p]) {
                                    if (s = p !== r.type,
                                        r.remove(!1, !1, !1, !0),
                                        s)
                                        if (Object.setPrototypeOf)
                                            Object.setPrototypeOf(r, v[p].prototype);
                                        else {
                                            c = Object.hasOwnProperty.call(r, "hcEvents") && r.hcEvents;
                                            for (n in l)
                                                r[n] = void 0;
                                            T(r, v[p].prototype),
                                                c ? r.hcEvents = c : delete r.hcEvents
                                        }
                                } else
                                    C(17, !0, o, {
                                        missingModuleFor: p
                                    });
                                if (d.forEach(function(e) {
                                        r[e] = d[e]
                                    }),
                                    r.init(o, e),
                                    h && this.points) {
                                    var f = r.options;
                                    !1 === f.visible ? (u.graphic = 1,
                                            u.dataLabel = 1) : r._hasPointLabels || (e = f.marker,
                                            l = f.dataLabels, !e || !1 !== e.enabled && (a.marker && a.marker.symbol) === e.symbol || (u.graphic = 1),
                                            l && !1 === l.enabled && (u.dataLabel = 1)),
                                        this.points.forEach(function(e) {
                                            e && e.series && (e.resolveColor(),
                                                Object.keys(u).length && e.destroyElements(u), !1 === f.showInLegend && e.legendItem && o.legend.destroyItem(e))
                                        }, this)
                                }
                                r.initialType = i,
                                    o.linkSeries(),
                                    s && r.linkedSeries.length && (r.isDirtyData = !0),
                                    A(this, "afterUpdate"),
                                    L(t, !0) && o.redraw(!!h && void 0)
                            },
                            e.prototype.setName = function(e) {
                                this.name = this.options.name = this.userOptions.name = e,
                                    this.chart.isDirtyLegend = !0
                            },
                            e.prototype.hasOptionChanged = function(e) {
                                var t = this.options[e],
                                    n = this.chart.options.plotOptions,
                                    r = this.userOptions[e];
                                return r ? t !== r : t !== L(n && n[this.type] && n[this.type][e], n && n.series && n.series[e], t)
                            },
                            e.prototype.onMouseOver = function() {
                                var e = this.chart,
                                    t = e.hoverSeries;
                                e.pointer.setHoverChartIndex(),
                                    t && t !== this && t.onMouseOut(),
                                    this.options.events.mouseOver && A(this, "mouseOver"),
                                    this.setState("hover"),
                                    e.hoverSeries = this
                            },
                            e.prototype.onMouseOut = function() {
                                var e = this.options,
                                    t = this.chart,
                                    n = t.tooltip,
                                    r = t.hoverPoint;
                                t.hoverSeries = null,
                                    r && r.onMouseOut(),
                                    this && e.events.mouseOut && A(this, "mouseOut"), !n || this.stickyTracking || n.shared && !this.noSharedTooltip || n.hide(),
                                    t.series.forEach(function(e) {
                                        e.setState("", !0)
                                    })
                            },
                            e.prototype.setState = function(e, t) {
                                var n = this,
                                    r = n.options,
                                    o = n.graph,
                                    a = r.inactiveOtherPoints,
                                    i = r.states,
                                    s = L(i[e || "normal"] && i[e || "normal"].animation, n.chart.options.chart.animation),
                                    l = r.lineWidth,
                                    c = 0,
                                    u = r.opacity;
                                if (e = e || "",
                                    n.state !== e && ([n.group, n.markerGroup, n.dataLabelsGroup].forEach(function(t) {
                                            t && (n.state && t.removeClass("highcharts-series-" + n.state),
                                                e && t.addClass("highcharts-series-" + e))
                                        }),
                                        n.state = e, !n.chart.styledMode)) {
                                    if (i[e] && !1 === i[e].enabled)
                                        return;
                                    if (e && (l = i[e].lineWidth || l + (i[e].lineWidthPlus || 0),
                                            u = L(i[e].opacity, u)),
                                        o && !o.dashstyle)
                                        for (r = {
                                                "stroke-width": l
                                            },
                                            o.animate(r, s); n["zone-graph-" + c];)
                                            n["zone-graph-" + c].animate(r, s),
                                            c += 1;
                                    a || [n.group, n.markerGroup, n.dataLabelsGroup, n.labelBySeries].forEach(function(e) {
                                        e && e.animate({
                                            opacity: u
                                        }, s)
                                    })
                                }
                                t && a && n.points && n.setAllPointsToState(e || void 0)
                            },
                            e.prototype.setAllPointsToState = function(e) {
                                this.points.forEach(function(t) {
                                    t.setState && t.setState(e)
                                })
                            },
                            e.prototype.setVisible = function(e, t) {
                                var n = this,
                                    r = n.chart,
                                    o = n.legendItem,
                                    a = r.options.chart.ignoreHiddenSeries,
                                    i = n.visible,
                                    s = (n.visible = e = n.options.visible = n.userOptions.visible = "undefined" === typeof e ? !i : e) ? "show" : "hide";
                                ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function(e) {
                                        n[e] && n[e][s]()
                                    }),
                                    r.hoverSeries !== n && (r.hoverPoint && r.hoverPoint.series) !== n || n.onMouseOut(),
                                    o && r.legend.colorizeItem(n, e),
                                    n.isDirty = !0,
                                    n.options.stacking && r.series.forEach(function(e) {
                                        e.options.stacking && e.visible && (e.isDirty = !0)
                                    }),
                                    n.linkedSeries.forEach(function(t) {
                                        t.setVisible(e, !1)
                                    }),
                                    a && (r.isDirtyBox = !0),
                                    A(n, s), !1 !== t && r.redraw()
                            },
                            e.prototype.show = function() {
                                this.setVisible(!0)
                            },
                            e.prototype.hide = function() {
                                this.setVisible(!1)
                            },
                            e.prototype.select = function(e) {
                                this.selected = e = this.options.selected = "undefined" === typeof e ? !this.selected : e,
                                    this.checkbox && (this.checkbox.checked = e),
                                    A(this, e ? "select" : "unselect")
                            },
                            e.prototype.shouldShowTooltip = function(e, t, n) {
                                return void 0 === n && (n = {}),
                                    n.series = this,
                                    n.visiblePlotOnly = !0,
                                    this.chart.isInsidePlot(e, t, n)
                            },
                            e.defaultOptions = s,
                            e
                    }(),
                    T(e.prototype, {
                        axisTypes: ["xAxis", "yAxis"],
                        coll: "series",
                        colorCounter: 0,
                        cropShoulder: 1,
                        directTouch: !1,
                        drawLegendSymbol: o.drawLineMarker,
                        isCartesian: !0,
                        kdAxisArray: ["clientX", "plotY"],
                        parallelArrays: ["x", "y"],
                        pointClass: i,
                        requireSorting: !0,
                        sorted: !0
                    }),
                    l.series = e,
                    e
            }