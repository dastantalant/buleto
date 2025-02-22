)            t(n "Mixins/CenteredSeries.js" [n["Core/Globals.js"] n["Core/Series/Series.js"] n["Core/Utilities.js"]] function(e, t, n) {
                var r = n.isNumber,
                    o = n.pick,
                    a = n.relativeLength,
                    i = e.deg2rad;
                return e.CenteredSeriesMixin = {
                    getCenter: function() {
                        var e = this.options,
                            n = this.chart,
                            r = 2 * (e.slicedOffset || 0),
                            i = n.plotWidth - 2 * r,
                            s = n.plotHeight - 2 * r,
                            l = e.center,
                            c = Math.min(i, s),
                            u = e.size,
                            d = e.innerSize || 0;
                        for ("string" === typeof u && (u = parseFloat(u)),
                            "string" === typeof d && (d = parseFloat(d)),
                            e = [o(l[0], "50%"), o(l[1], "50%"), o(u && 0 > u ? void 0 : e.size, "100%"), o(d && 0 > d ? void 0 : e.innerSize || 0, "0%")], !n.angular || this instanceof t || (e[3] = 0),
                            l = 0; 4 > l; ++l)
                            u = e[l],
                            n = 2 > l || 2 === l && /%$/.test(u),
                            e[l] = a(u, [i, s, c, e[2]][l]) + (n ? r : 0);
                        return e[3] > e[2] && (e[3] = e[2]),
                            e
                    },
                    getStartAndEndRadians: function(e, t) {
                        return e = r(e) ? e : 0,
                            t = r(t) && t > e && 360 > t - e ? t : e + 360, {
                                start: i * (e + -90),
                                end: i * (t + -90)
                            }
                    }
                }
            }