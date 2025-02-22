)            t(n "Core/Series/SeriesRegistry.js" [n["Core/Globals.js"] n["Core/DefaultOptions.js"] n["Core/Series/Point.js"] n["Core/Utilities.js"]] function(e, t, n, r) {
                var o, a = t.defaultOptions,
                    i = r.error,
                    s = r.extendClass,
                    l = r.merge;
                return function(t) {
                        function r(e, r) {
                            var o = a.plotOptions || {},
                                i = r.defaultOptions;
                            r.prototype.pointClass || (r.prototype.pointClass = n),
                                r.prototype.type = e,
                                i && (o[e] = i),
                                t.seriesTypes[e] = r
                        }
                        t.seriesTypes = e.seriesTypes,
                            t.getSeries = function(e, n) {
                                void 0 === n && (n = {});
                                var r = e.options.chart;
                                r = n.type || r.type || r.defaultSeriesType || "";
                                var o = t.seriesTypes[r];
                                return t || i(17, !0, e, {
                                        missingModuleFor: r
                                    }),
                                    r = new o,
                                    "function" === typeof r.init && r.init(e, n),
                                    r
                            },
                            t.registerSeriesType = r,
                            t.seriesType = function(e, o, i, c, u) {
                                var d = a.plotOptions || {};
                                return o = o || "",
                                    d[e] = l(d[o], i),
                                    r(e, s(t.seriesTypes[o] || function() {}, c)),
                                    t.seriesTypes[e].prototype.type = e,
                                    u && (t.seriesTypes[e].prototype.pointClass = s(n, u)),
                                    t.seriesTypes[e]
                            }
                    }(o || (o = {})),
                    o
            }