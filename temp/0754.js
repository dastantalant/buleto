)            t(n "Series/Column/ColumnDataLabel.js" [n["Core/Series/DataLabel.js"] n["Core/Series/SeriesRegistry.js"] n["Core/Utilities.js"]] function(e, t, n) {
                var r, o = t.series,
                    a = n.merge,
                    i = n.pick;
                return function(t) {
                        function n(e, t, n, r, s) {
                            var l = this.chart.inverted,
                                c = e.series,
                                u = e.dlBox || e.shapeArgs,
                                d = i(e.below, e.plotY > i(this.translatedThreshold, c.yAxis.len)),
                                p = i(n.inside, !!this.options.stacking);
                            u && (r = a(u),
                                    0 > r.y && (r.height += r.y,
                                        r.y = 0),
                                    u = r.y + r.height - c.yAxis.len,
                                    0 < u && u < r.height && (r.height -= u),
                                    l && (r = {
                                        x: c.yAxis.len - r.y - r.height,
                                        y: c.xAxis.len - r.x - r.width,
                                        width: r.height,
                                        height: r.width
                                    }),
                                    p || (l ? (r.x += d ? 0 : r.width,
                                        r.width = 0) : (r.y += d ? r.height : 0,
                                        r.height = 0))),
                                n.align = i(n.align, !l || p ? "center" : d ? "right" : "left"),
                                n.verticalAlign = i(n.verticalAlign, l || p ? "middle" : d ? "top" : "bottom"),
                                o.prototype.alignDataLabel.call(this, e, t, n, r, s),
                                n.inside && e.contrastColor && t.css({
                                    color: e.contrastColor
                                })
                        }
                        var r = [];
                        t.compose = function(t) {
                            e.compose(o), -1 === r.indexOf(t) && (r.push(t),
                                t.prototype.alignDataLabel = n)
                        }
                    }(r || (r = {})),
                    r
            }