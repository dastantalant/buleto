)            t(n "Series/AreaSpline/AreaSplineSeries.js" [n["Series/Area/AreaSeries.js"] n["Series/Spline/SplineSeries.js"] n["Core/Legend/LegendSymbol.js"] n["Core/Series/SeriesRegistry.js"] n["Core/Utilities.js"]] function(e, t, n, r, o) {
                var a = this && this.__extends || function() {
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
                    i = e.prototype,
                    s = o.extend,
                    l = o.merge;
                return o = function(n) {
                        function r() {
                            var e = null !== n && n.apply(this, arguments) || this;
                            return e.data = void 0,
                                e.points = void 0,
                                e.options = void 0,
                                e
                        }
                        return a(r, n),
                            r.defaultOptions = l(t.defaultOptions, e.defaultOptions),
                            r
                    }(t),
                    s(o.prototype, {
                        getGraphPath: i.getGraphPath,
                        getStackPoints: i.getStackPoints,
                        drawGraph: i.drawGraph,
                        drawLegendSymbol: n.drawRectangle
                    }),
                    r.registerSeriesType("areaspline", o),
                    o
            }