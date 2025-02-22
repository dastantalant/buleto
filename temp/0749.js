)            t(n "Series/Area/AreaSeries.js" [n["Core/Color/Color.js"] n["Core/Legend/LegendSymbol.js"] n["Core/Series/SeriesRegistry.js"] n["Core/Utilities.js"]] function(e, t, n, r) {
                var o = this && this.__extends || function() {
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
                    a = e.parse,
                    i = n.seriesTypes.line;
                e = r.extend;
                var s = r.merge,
                    l = r.objectEach,
                    c = r.pick;
                return r = function(e) {
                        function t() {
                            var t = null !== e && e.apply(this, arguments) || this;
                            return t.data = void 0,
                                t.options = void 0,
                                t.points = void 0,
                                t
                        }
                        return o(t, e),
                            t.prototype.drawGraph = function() {
                                this.areaPath = [],
                                    e.prototype.drawGraph.apply(this);
                                var t = this,
                                    n = this.areaPath,
                                    r = this.options,
                                    o = [
                                        ["area", "highcharts-area", this.color, r.fillColor]
                                    ];
                                this.zones.forEach(function(e, n) {
                                        o.push(["zone-area-" + n, "highcharts-area highcharts-zone-area-" + n + " " + e.className, e.color || t.color, e.fillColor || r.fillColor])
                                    }),
                                    o.forEach(function(e) {
                                        var o = e[0],
                                            i = t[o],
                                            s = i ? "animate" : "attr",
                                            l = {};
                                        i ? (i.endX = t.preventGraphAnimation ? null : n.xMap,
                                                i.animate({
                                                    d: n
                                                })) : (l.zIndex = 0,
                                                i = t[o] = t.chart.renderer.path(n).addClass(e[1]).add(t.group),
                                                i.isArea = !0),
                                            t.chart.styledMode || (l.fill = c(e[3], a(e[2]).setOpacity(c(r.fillOpacity, .75)).get())),
                                            i[s](l),
                                            i.startX = n.xMap,
                                            i.shiftUnit = r.step ? 2 : 1
                                    })
                            },
                            t.prototype.getGraphPath = function(e) {
                                var t, n = i.prototype.getGraphPath,
                                    r = this.options,
                                    o = r.stacking,
                                    a = this.yAxis,
                                    s = [],
                                    l = [],
                                    u = this.index,
                                    d = a.stacking.stacks[this.stackKey],
                                    p = r.threshold,
                                    h = Math.round(a.getThreshold(r.threshold));
                                r = c(r.connectNulls, "percent" === o);
                                var f = function(t, n, r) {
                                    var i = e[t];
                                    t = o && d[i.x].points[u];
                                    var c = i[r + "Null"] || 0;
                                    if (r = i[r + "Cliff"] || 0,
                                        i = !0,
                                        r || c) {
                                        var f = (c ? t[0] : t[1]) + r,
                                            m = t[0] + r;
                                        i = !!c
                                    } else
                                        !o && e[n] && e[n].isNull && (f = m = p);
                                    "undefined" !== typeof f && (l.push({
                                            plotX: g,
                                            plotY: null === f ? h : a.getThreshold(f),
                                            isNull: i,
                                            isCliff: !0
                                        }),
                                        s.push({
                                            plotX: g,
                                            plotY: null === m ? h : a.getThreshold(m),
                                            doCurve: !1
                                        }))
                                };
                                for (e = e || this.points,
                                    o && (e = this.getStackPoints(e)),
                                    t = 0; t < e.length; t++) {
                                    o || (e[t].leftCliff = e[t].rightCliff = e[t].leftNull = e[t].rightNull = void 0);
                                    var m = e[t].isNull,
                                        g = c(e[t].rectPlotX, e[t].plotX),
                                        y = o ? c(e[t].yBottom, h) : h;
                                    m && !r || (r || f(t, t - 1, "left"),
                                        m && !o && r || (l.push(e[t]),
                                            s.push({
                                                x: t,
                                                plotX: g,
                                                plotY: y
                                            })),
                                        r || f(t, t + 1, "right"))
                                }
                                return t = n.call(this, l, !0, !0),
                                    s.reversed = !0,
                                    m = n.call(this, s, !0, !0),
                                    (y = m[0]) && "M" === y[0] && (m[0] = ["L", y[1], y[2]]),
                                    m = t.concat(m),
                                    m.length && m.push(["Z"]),
                                    n = n.call(this, l, !1, r),
                                    m.xMap = t.xMap,
                                    this.areaPath = m,
                                    n
                            },
                            t.prototype.getStackPoints = function(e) {
                                var t = this,
                                    n = [],
                                    r = [],
                                    o = this.xAxis,
                                    a = this.yAxis,
                                    i = a.stacking.stacks[this.stackKey],
                                    s = {},
                                    u = a.series,
                                    d = u.length,
                                    p = a.options.reversedStacks ? 1 : -1,
                                    h = u.indexOf(t);
                                if (e = e || this.points,
                                    this.options.stacking) {
                                    for (var f = 0; f < e.length; f++)
                                        e[f].leftNull = e[f].rightNull = void 0,
                                        s[e[f].x] = e[f];
                                    l(i, function(e, t) {
                                            null !== e.total && r.push(t)
                                        }),
                                        r.sort(function(e, t) {
                                            return e - t
                                        });
                                    var m = u.map(function(e) {
                                        return e.visible
                                    });
                                    r.forEach(function(e, l) {
                                        var f, g, y = 0;
                                        if (s[e] && !s[e].isNull)
                                            n.push(s[e]), [-1, 1].forEach(function(n) {
                                                var o = 1 === n ? "rightNull" : "leftNull",
                                                    a = 0,
                                                    c = i[r[l + n]];
                                                if (c)
                                                    for (var y = h; 0 <= y && y < d;) {
                                                        var v = u[y].index;
                                                        f = c.points[v],
                                                            f || (v === t.index ? s[e][o] = !0 : m[y] && (g = i[e].points[v]) && (a -= g[1] - g[0])),
                                                            y += p
                                                    }
                                                s[e][1 === n ? "rightCliff" : "leftCliff"] = a
                                            });
                                        else {
                                            for (var v = h; 0 <= v && v < d;) {
                                                if (f = i[e].points[u[v].index]) {
                                                    y = f[1];
                                                    break
                                                }
                                                v += p
                                            }
                                            y = c(y, 0),
                                                y = a.translate(y, 0, 1, 0, 1),
                                                n.push({
                                                    isNull: !0,
                                                    plotX: o.translate(e, 0, 0, 0, 1),
                                                    x: e,
                                                    plotY: y,
                                                    yBottom: y
                                                })
                                        }
                                    })
                                }
                                return n
                            },
                            t.defaultOptions = s(i.defaultOptions, {
                                threshold: 0
                            }),
                            t
                    }(i),
                    e(r.prototype, {
                        singleStacks: !1,
                        drawLegendSymbol: t.drawRectangle
                    }),
                    n.registerSeriesType("area", r),
                    r
            }