)            t(n "Series/Scatter/ScatterSeries.js" [n["Series/Column/ColumnSeries.js"] n["Series/Line/LineSeries.js"] n["Core/Series/SeriesRegistry.js"] n["Core/Utilities.js"]] function(e, t, n, r) {
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
                    a = r.addEvent,
                    i = r.extend,
                    s = r.merge;
                return r = function(e) {
                        function n() {
                            var t = null !== e && e.apply(this, arguments) || this;
                            return t.data = void 0,
                                t.options = void 0,
                                t.points = void 0,
                                t
                        }
                        return o(n, e),
                            n.prototype.applyJitter = function() {
                                var e = this,
                                    t = this.options.jitter,
                                    n = this.points.length;
                                t && this.points.forEach(function(r, o) {
                                    ["x", "y"].forEach(function(a, i) {
                                        var s = "plot" + a.toUpperCase();
                                        if (t[a] && !r.isNull) {
                                            var l = e[a + "Axis"],
                                                c = t[a] * l.transA;
                                            if (l && !l.isLog) {
                                                var u = Math.max(0, r[s] - c);
                                                l = Math.min(l.len, r[s] + c),
                                                    i = 1e4 * Math.sin(o + i * n),
                                                    r[s] = u + (l - u) * (i - Math.floor(i)),
                                                    "x" === a && (r.clientX = r.plotX)
                                            }
                                        }
                                    })
                                })
                            },
                            n.prototype.drawGraph = function() {
                                this.options.lineWidth ? e.prototype.drawGraph.call(this) : this.graph && (this.graph = this.graph.destroy())
                            },
                            n.defaultOptions = s(t.defaultOptions, {
                                lineWidth: 0,
                                findNearestPointBy: "xy",
                                jitter: {
                                    x: 0,
                                    y: 0
                                },
                                marker: {
                                    enabled: !0
                                },
                                tooltip: {
                                    headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
                                    pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
                                }
                            }),
                            n
                    }(t),
                    i(r.prototype, {
                        drawTracker: e.prototype.drawTracker,
                        sorted: !1,
                        requireSorting: !1,
                        noSharedTooltip: !0,
                        trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
                        takeOrdinalPosition: !1
                    }),
                    a(r, "afterTranslate", function() {
                        this.applyJitter()
                    }),
                    n.registerSeriesType("scatter", r),
                    r
            }