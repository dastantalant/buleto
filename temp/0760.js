)            t(n "Series/Pie/PieDataLabel.js" [n["Core/Series/DataLabel.js"] n["Core/Globals.js"] n["Core/Color/Palette.js"] n["Core/Renderer/RendererUtilities.js"] n["Core/Series/SeriesRegistry.js"] n["Core/Utilities.js"]] function(e, t, n, r, o, a) {
                var i, s = t.noop,
                    l = r.distribute,
                    c = o.series,
                    u = a.arrayMax,
                    d = a.clamp,
                    p = a.defined,
                    h = a.merge,
                    f = a.pick,
                    m = a.relativeLength;
                return function(t) {
                        function r() {
                            var e, t, r, o, a, i, s, d, m, g, y, v, b = this,
                                _ = b.data,
                                w = b.chart,
                                x = b.options.dataLabels || {},
                                E = x.connectorPadding,
                                k = w.plotWidth,
                                S = w.plotHeight,
                                O = w.plotLeft,
                                C = Math.round(w.chartWidth / 3),
                                T = b.center,
                                M = T[2] / 2,
                                A = T[1],
                                P = [
                                    [],
                                    []
                                ],
                                N = [0, 0, 0, 0],
                                j = b.dataLabelPositioners;
                            b.visible && (x.enabled || b._hasPointLabels) && (_.forEach(function(e) {
                                    e.dataLabel && e.visible && e.dataLabel.shortened && (e.dataLabel.attr({
                                            width: "auto"
                                        }).css({
                                            width: "auto",
                                            textOverflow: "clip"
                                        }),
                                        e.dataLabel.shortened = !1)
                                }),
                                c.prototype.drawDataLabels.apply(b),
                                _.forEach(function(e) {
                                    e.dataLabel && (e.visible ? (P[e.half].push(e),
                                        e.dataLabel._pos = null, !p(x.style.width) && !p(e.options.dataLabels && e.options.dataLabels.style && e.options.dataLabels.style.width) && e.dataLabel.getBBox().width > C && (e.dataLabel.css({
                                                width: Math.round(.7 * C) + "px"
                                            }),
                                            e.dataLabel.shortened = !0)) : (e.dataLabel = e.dataLabel.destroy(),
                                        e.dataLabels && 1 === e.dataLabels.length && delete e.dataLabels))
                                }),
                                P.forEach(function(t, n) {
                                    var r, c = t.length,
                                        u = [];
                                    if (c) {
                                        if (b.sortByAngle(t, n - .5),
                                            0 < b.maxLabelDistance) {
                                            var h = Math.max(0, A - M - b.maxLabelDistance),
                                                _ = Math.min(A + M + b.maxLabelDistance, w.plotHeight);
                                            t.forEach(function(e) {
                                                    0 < e.labelDistance && e.dataLabel && (e.top = Math.max(0, A - M - e.labelDistance),
                                                        e.bottom = Math.min(A + M + e.labelDistance, w.plotHeight),
                                                        r = e.dataLabel.getBBox().height || 21,
                                                        e.distributeBox = {
                                                            target: e.labelPosition.natural.y - e.top + r / 2,
                                                            size: r,
                                                            rank: e.y
                                                        },
                                                        u.push(e.distributeBox))
                                                }),
                                                h = _ + r - h,
                                                l(u, h, h / 5)
                                        }
                                        for (y = 0; y < c; y++) {
                                            if (e = t[y],
                                                i = e.labelPosition,
                                                o = e.dataLabel,
                                                g = !1 === e.visible ? "hidden" : "inherit",
                                                m = h = i.natural.y,
                                                u && p(e.distributeBox) && ("undefined" === typeof e.distributeBox.pos ? g = "hidden" : (s = e.distributeBox.size,
                                                    m = j.radialDistributionY(e))),
                                                delete e.positionIndex,
                                                x.justify)
                                                d = j.justify(e, M, T);
                                            else
                                                switch (x.alignTo) {
                                                    case "connectors":
                                                        d = j.alignToConnectors(t, n, k, O);
                                                        break;
                                                    case "plotEdges":
                                                        d = j.alignToPlotEdges(o, n, k, O);
                                                        break;
                                                    default:
                                                        d = j.radialDistributionX(b, e, m, h)
                                                }
                                            o._attr = {
                                                    visibility: g,
                                                    align: i.alignment
                                                },
                                                v = e.options.dataLabels || {},
                                                o._pos = {
                                                    x: d + f(v.x, x.x) + ({
                                                        left: E,
                                                        right: -E
                                                    }[i.alignment] || 0),
                                                    y: m + f(v.y, x.y) - 10
                                                },
                                                i.final.x = d,
                                                i.final.y = m,
                                                f(x.crop, !0) && (a = o.getBBox().width,
                                                    h = null,
                                                    d - a < E && 1 === n ? (h = Math.round(a - d + E),
                                                        N[3] = Math.max(h, N[3])) : d + a > k - E && 0 === n && (h = Math.round(d + a - k + E),
                                                        N[1] = Math.max(h, N[1])),
                                                    0 > m - s / 2 ? N[0] = Math.max(Math.round(s / 2 - m), N[0]) : m + s / 2 > S && (N[2] = Math.max(Math.round(m + s / 2 - S), N[2])),
                                                    o.sideOverflow = h)
                                        }
                                    }
                                }),
                                0 === u(N) || this.verifyDataLabelOverflow(N)) && (this.placeDataLabels(),
                                this.points.forEach(function(e) {
                                    if (v = h(x, e.options.dataLabels),
                                        t = f(v.connectorWidth, 1)) {
                                        var a;
                                        r = e.connector,
                                            (o = e.dataLabel) && o._pos && e.visible && 0 < e.labelDistance ? (g = o._attr.visibility,
                                                (a = !r) && (e.connector = r = w.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + e.colorIndex + (e.className ? " " + e.className : "")).add(b.dataLabelsGroup),
                                                    w.styledMode || r.attr({
                                                        "stroke-width": t,
                                                        stroke: v.connectorColor || e.color || n.neutralColor60
                                                    })),
                                                r[a ? "attr" : "animate"]({
                                                    d: e.getConnectorPath()
                                                }),
                                                r.attr("visibility", g)) : r && (e.connector = r.destroy())
                                    }
                                }))
                        }

                        function o() {
                            this.points.forEach(function(e) {
                                var t, n = e.dataLabel;
                                n && e.visible && ((t = n._pos) ? (n.sideOverflow && (n._attr.width = Math.max(n.getBBox().width - n.sideOverflow, 0),
                                            n.css({
                                                width: n._attr.width + "px",
                                                textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis"
                                            }),
                                            n.shortened = !0),
                                        n.attr(n._attr),
                                        n[n.moved ? "animate" : "attr"](t),
                                        n.moved = !0) : n && n.attr({
                                        y: -9999
                                    })),
                                    delete e.distributeBox
                            }, this)
                        }

                        function a(e) {
                            var t = this.center,
                                n = this.options,
                                r = n.center,
                                o = n.minSize || 80,
                                a = null !== n.size;
                            if (!a) {
                                if (null !== r[0])
                                    var i = Math.max(t[2] - Math.max(e[1], e[3]), o);
                                else
                                    i = Math.max(t[2] - e[1] - e[3], o),
                                    t[0] += (e[3] - e[1]) / 2;
                                null !== r[1] ? i = d(i, o, t[2] - Math.max(e[0], e[2])) : (i = d(i, o, t[2] - e[0] - e[2]),
                                        t[1] += (e[0] - e[2]) / 2),
                                    i < t[2] ? (t[2] = i,
                                        t[3] = Math.min(m(n.innerSize || 0, i), i),
                                        this.translate(t),
                                        this.drawDataLabels && this.drawDataLabels()) : a = !0
                            }
                            return a
                        }
                        var i = [],
                            g = {
                                radialDistributionY: function(e) {
                                    return e.top + e.distributeBox.pos
                                },
                                radialDistributionX: function(e, t, n, r) {
                                    return e.getX(n < t.top + 2 || n > t.bottom - 2 ? r : n, t.half, t)
                                },
                                justify: function(e, t, n) {
                                    return n[0] + (e.half ? -1 : 1) * (t + e.labelDistance)
                                },
                                alignToPlotEdges: function(e, t, n, r) {
                                    return e = e.getBBox().width,
                                        t ? e + r : n - e - r
                                },
                                alignToConnectors: function(e, t, n, r) {
                                    var o, a = 0;
                                    return e.forEach(function(e) {
                                            (o = e.dataLabel.getBBox().width) > a && (a = o)
                                        }),
                                        t ? a + r : n - a - r
                                }
                            };
                        t.compose = function(t) {
                            e.compose(c), -1 === i.indexOf(t) && (i.push(t),
                                t = t.prototype,
                                t.dataLabelPositioners = g,
                                t.alignDataLabel = s,
                                t.drawDataLabels = r,
                                t.placeDataLabels = o,
                                t.verifyDataLabelOverflow = a)
                        }
                    }(i || (i = {})),
                    i
            }