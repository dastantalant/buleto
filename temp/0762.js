)            t(n "Core/Responsive.js" [n["Core/Utilities.js"]] function(e) {
                var t, n = e.extend,
                    r = e.find,
                    o = e.isArray,
                    a = e.isObject,
                    i = e.merge,
                    s = e.objectEach,
                    l = e.pick,
                    c = e.splat,
                    u = e.uniqueKey;
                return function(e) {
                        var t = [];
                        e.compose = function(e) {
                            return -1 === t.indexOf(e) && (t.push(e),
                                    n(e.prototype, d.prototype)),
                                e
                        };
                        var d = function() {
                            function e() {}
                            return e.prototype.currentOptions = function(e) {
                                    function t(e, r, i, l) {
                                        var u;
                                        s(e, function(e, s) {
                                            if (!l && -1 < n.collectionsWithUpdate.indexOf(s) && r[s])
                                                for (e = c(e),
                                                    i[s] = [],
                                                    u = 0; u < Math.max(e.length, r[s].length); u++)
                                                    r[s][u] && (void 0 === e[u] ? i[s][u] = r[s][u] : (i[s][u] = {},
                                                        t(e[u], r[s][u], i[s][u], l + 1)));
                                            else
                                                a(e) ? (i[s] = o(e) ? [] : {},
                                                    t(e, r[s] || {}, i[s], l + 1)) : i[s] = "undefined" === typeof r[s] ? null : r[s]
                                        })
                                    }
                                    var n = this,
                                        r = {};
                                    return t(e, this.options, r, 0),
                                        r
                                },
                                e.prototype.matchResponsiveRule = function(e, t) {
                                    var n = e.condition;
                                    (n.callback || function() {
                                        return this.chartWidth <= l(n.maxWidth, Number.MAX_VALUE) && this.chartHeight <= l(n.maxHeight, Number.MAX_VALUE) && this.chartWidth >= l(n.minWidth, 0) && this.chartHeight >= l(n.minHeight, 0)
                                    }).call(this) && t.push(e._id)
                                },
                                e.prototype.setResponsive = function(e, t) {
                                    var n = this,
                                        o = this.options.responsive,
                                        a = this.currentResponsive,
                                        s = [];
                                    !t && o && o.rules && o.rules.forEach(function(e) {
                                            "undefined" === typeof e._id && (e._id = u()),
                                                n.matchResponsiveRule(e, s)
                                        }, this),
                                        t = i.apply(void 0, s.map(function(e) {
                                            return r((o || {}).rules || [], function(t) {
                                                return t._id === e
                                            })
                                        }).map(function(e) {
                                            return e && e.chartOptions
                                        })),
                                        t.isResponsiveOptions = !0,
                                        (s = s.toString() || void 0) !== (a && a.ruleIds) && (a && this.update(a.undoOptions, e, !0),
                                            s ? (a = this.currentOptions(t),
                                                a.isResponsiveOptions = !0,
                                                this.currentResponsive = {
                                                    ruleIds: s,
                                                    mergedOptions: t,
                                                    undoOptions: a
                                                },
                                                this.update(t, e, !0)) : this.currentResponsive = void 0)
                                },
                                e
                        }()
                    }(t || (t = {})),
                    t
            }