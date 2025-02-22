)            t(n "Series/Line/LineSeries.js" [n["Core/Color/Palette.js"] n["Core/Series/Series.js"] n["Core/Series/SeriesRegistry.js"] n["Core/Utilities.js"]] function(e, t, n, r) {
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
                    a = r.defined,
                    i = r.merge;
                return r = function(n) {
                        function r() {
                            var e = null !== n && n.apply(this, arguments) || this;
                            return e.data = void 0,
                                e.options = void 0,
                                e.points = void 0,
                                e
                        }
                        return o(r, n),
                            r.prototype.drawGraph = function() {
                                var t = this,
                                    n = this.options,
                                    r = (this.gappedPath || this.getGraphPath).call(this),
                                    o = this.chart.styledMode,
                                    a = [
                                        ["graph", "highcharts-graph"]
                                    ];
                                o || a[0].push(n.lineColor || this.color || e.neutralColor20, n.dashStyle),
                                    a = t.getZonesGraphs(a),
                                    a.forEach(function(e, a) {
                                        var i = e[0],
                                            s = t[i],
                                            l = s ? "animate" : "attr";
                                        s ? (s.endX = t.preventGraphAnimation ? null : r.xMap,
                                                s.animate({
                                                    d: r
                                                })) : r.length && (t[i] = s = t.chart.renderer.path(r).addClass(e[1]).attr({
                                                zIndex: 1
                                            }).add(t.group)),
                                            s && !o && (i = {
                                                    stroke: e[2],
                                                    "stroke-width": n.lineWidth,
                                                    fill: t.fillGraph && t.color || "none"
                                                },
                                                e[3] ? i.dashstyle = e[3] : "square" !== n.linecap && (i["stroke-linecap"] = i["stroke-linejoin"] = "round"),
                                                s[l](i).shadow(2 > a && n.shadow)),
                                            s && (s.startX = r.xMap,
                                                s.isArea = r.isArea)
                                    })
                            },
                            r.prototype.getGraphPath = function(e, t, n) {
                                var r, o = this,
                                    i = o.options,
                                    s = [],
                                    l = [],
                                    c = i.step;
                                e = e || o.points;
                                var u = e.reversed;
                                return u && e.reverse(),
                                    (c = {
                                        right: 1,
                                        center: 2
                                    }[c] || c && 3) && u && (c = 4 - c),
                                    e = this.getValidPoints(e, !1, !(i.connectNulls && !t && !n)),
                                    e.forEach(function(u, d) {
                                        var p = u.plotX,
                                            h = u.plotY,
                                            f = e[d - 1];
                                        (u.leftCliff || f && f.rightCliff) && !n && (r = !0),
                                            u.isNull && !a(t) && 0 < d ? r = !i.connectNulls : u.isNull && !t ? r = !0 : (0 === d || r ? d = [
                                                    ["M", u.plotX, u.plotY]
                                                ] : o.getPointSpline ? d = [o.getPointSpline(e, u, d)] : c ? (d = 1 === c ? [
                                                        ["L", f.plotX, h]
                                                    ] : 2 === c ? [
                                                        ["L", (f.plotX + p) / 2, f.plotY],
                                                        ["L", (f.plotX + p) / 2, h]
                                                    ] : [
                                                        ["L", p, f.plotY]
                                                    ],
                                                    d.push(["L", p, h])) : d = [
                                                    ["L", p, h]
                                                ],
                                                l.push(u.x),
                                                c && (l.push(u.x),
                                                    2 === c && l.push(u.x)),
                                                s.push.apply(s, d),
                                                r = !1)
                                    }),
                                    s.xMap = l,
                                    o.graphPath = s
                            },
                            r.prototype.getZonesGraphs = function(e) {
                                return this.zones.forEach(function(t, n) {
                                        n = ["zone-graph-" + n, "highcharts-graph highcharts-zone-graph-" + n + " " + (t.className || "")],
                                            this.chart.styledMode || n.push(t.color || this.color, t.dashStyle || this.options.dashStyle),
                                            e.push(n)
                                    }, this),
                                    e
                            },
                            r.defaultOptions = i(t.defaultOptions, {}),
                            r
                    }(t),
                    n.registerSeriesType("line", r),
                    r
            }