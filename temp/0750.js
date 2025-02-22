)            t(n "Series/Spline/SplineSeries.js" [n["Core/Series/SeriesRegistry.js"] n["Core/Utilities.js"]] function(e, t) {
                var n = this && this.__extends || function() {
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
                    r = e.seriesTypes.line,
                    o = t.merge,
                    a = t.pick;
                return t = function(e) {
                        function t() {
                            var t = null !== e && e.apply(this, arguments) || this;
                            return t.data = void 0,
                                t.options = void 0,
                                t.points = void 0,
                                t
                        }
                        return n(t, e),
                            t.prototype.getPointSpline = function(e, t, n) {
                                var r = t.plotX || 0,
                                    o = t.plotY || 0,
                                    i = e[n - 1];
                                if (n = e[n + 1],
                                    i && !i.isNull && !1 !== i.doCurve && !t.isCliff && n && !n.isNull && !1 !== n.doCurve && !t.isCliff) {
                                    e = i.plotY || 0;
                                    var s = n.plotX || 0;
                                    n = n.plotY || 0;
                                    var l = 0,
                                        c = (1.5 * r + (i.plotX || 0)) / 2.5,
                                        u = (1.5 * o + e) / 2.5;
                                    s = (1.5 * r + s) / 2.5;
                                    var d = (1.5 * o + n) / 2.5;
                                    s !== c && (l = (d - u) * (s - r) / (s - c) + o - d),
                                        u += l,
                                        d += l,
                                        u > e && u > o ? (u = Math.max(e, o),
                                            d = 2 * o - u) : u < e && u < o && (u = Math.min(e, o),
                                            d = 2 * o - u),
                                        d > n && d > o ? (d = Math.max(n, o),
                                            u = 2 * o - d) : d < n && d < o && (d = Math.min(n, o),
                                            u = 2 * o - d),
                                        t.rightContX = s,
                                        t.rightContY = d
                                }
                                return t = ["C", a(i.rightContX, i.plotX, 0), a(i.rightContY, i.plotY, 0), a(c, r, 0), a(u, o, 0), r, o],
                                    i.rightContX = i.rightContY = void 0,
                                    t
                            },
                            t.defaultOptions = o(r.defaultOptions),
                            t
                    }(r),
                    e.registerSeriesType("spline", t),
                    t
            }