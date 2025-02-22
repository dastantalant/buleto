)            t(n "Core/Legend/LegendSymbol.js" [n["Core/Utilities.js"]] function(e) {
                var t, n = e.merge,
                    r = e.pick;
                return function(e) {
                        e.drawLineMarker = function(e) {
                                var t = this.options,
                                    o = e.symbolWidth,
                                    a = e.symbolHeight,
                                    i = a / 2,
                                    s = this.chart.renderer,
                                    l = this.legendGroup;
                                e = e.baseline - Math.round(.3 * e.fontMetrics.b);
                                var c = {},
                                    u = t.marker;
                                this.chart.styledMode || (c = {
                                            "stroke-width": t.lineWidth || 0
                                        },
                                        t.dashStyle && (c.dashstyle = t.dashStyle)),
                                    this.legendLine = s.path([
                                        ["M", 0, e],
                                        ["L", o, e]
                                    ]).addClass("highcharts-graph").attr(c).add(l),
                                    u && !1 !== u.enabled && o && (t = Math.min(r(u.radius, i), i),
                                        0 === this.symbol.indexOf("url") && (u = n(u, {
                                                width: a,
                                                height: a
                                            }),
                                            t = 0),
                                        this.legendSymbol = o = s.symbol(this.symbol, o / 2 - t, e - t, 2 * t, 2 * t, u).addClass("highcharts-point").add(l),
                                        o.isMarker = !0)
                            },
                            e.drawRectangle = function(e, t) {
                                var n = e.symbolHeight,
                                    o = e.options.squareSymbol;
                                t.legendSymbol = this.chart.renderer.rect(o ? (e.symbolWidth - n) / 2 : 0, e.baseline - n + 1, o ? n : e.symbolWidth, n, r(e.options.symbolRadius, n / 2)).addClass("highcharts-point").attr({
                                    zIndex: 3
                                }).add(t.legendGroup)
                            }
                    }(t || (t = {})),
                    t
            }