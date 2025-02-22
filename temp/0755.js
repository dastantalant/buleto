)            t(n "Series/Bar/BarSeries.js" [n["Series/Column/ColumnSeries.js"] n["Core/Series/SeriesRegistry.js"] n["Core/Utilities.js"]] function(e, t, n) {
                var r = this && this.__extends || function() {
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
                    o = n.extend,
                    a = n.merge;
                return n = function(t) {
                        function n() {
                            var e = null !== t && t.apply(this, arguments) || this;
                            return e.data = void 0,
                                e.options = void 0,
                                e.points = void 0,
                                e
                        }
                        return r(n, t),
                            n.defaultOptions = a(e.defaultOptions, {}),
                            n
                    }(e),
                    o(n.prototype, {
                        inverted: !0
                    }),
                    t.registerSeriesType("bar", n),
                    n
            }