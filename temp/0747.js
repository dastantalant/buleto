)            t(n "Extensions/Stacking.js" [n["Core/Axis/Axis.js"] n["Core/Chart/Chart.js"] n["Core/FormatUtilities.js"] n["Core/Globals.js"] n["Core/Series/Series.js"] n["Core/Axis/StackingAxis.js"] n["Core/Utilities.js"]] function(e, t, n, r, o, a, i) {
                var s = n.format,
                    l = i.correctFloat,
                    c = i.defined,
                    u = i.destroyObjectProperties,
                    d = i.isArray,
                    p = i.isNumber,
                    h = i.objectEach,
                    f = i.pick,
                    m = function() {
                        function e(e, t, n, r, o) {
                            var a = e.chart.inverted;
                            this.axis = e,
                                this.isNegative = n,
                                this.options = t = t || {},
                                this.x = r,
                                this.total = null,
                                this.points = {},
                                this.hasValidPoints = !1,
                                this.stack = o,
                                this.rightCliff = this.leftCliff = 0,
                                this.alignOptions = {
                                    align: t.align || (a ? n ? "left" : "right" : "center"),
                                    verticalAlign: t.verticalAlign || (a ? "middle" : n ? "bottom" : "top"),
                                    y: t.y,
                                    x: t.x
                                },
                                this.textAlign = t.textAlign || (a ? n ? "right" : "left" : "center")
                        }
                        return e.prototype.destroy = function() {
                                u(this, this.axis)
                            },
                            e.prototype.render = function(e) {
                                var t = this.axis.chart,
                                    n = this.options,
                                    r = n.format;
                                r = r ? s(r, this, t) : n.formatter.call(this),
                                    this.label ? this.label.attr({
                                        text: r,
                                        visibility: "hidden"
                                    }) : (this.label = t.renderer.label(r, null, null, n.shape, null, null, n.useHTML, !1, "stack-labels"),
                                        r = {
                                            r: n.borderRadius || 0,
                                            text: r,
                                            rotation: n.rotation,
                                            padding: f(n.padding, 5),
                                            visibility: "hidden"
                                        },
                                        t.styledMode || (r.fill = n.backgroundColor,
                                            r.stroke = n.borderColor,
                                            r["stroke-width"] = n.borderWidth,
                                            this.label.css(n.style)),
                                        this.label.attr(r),
                                        this.label.added || this.label.add(e)),
                                    this.label.labelrank = t.plotSizeY
                            },
                            e.prototype.setOffset = function(e, t, n, r, a) {
                                var i = this.axis,
                                    s = i.chart;
                                r = i.translate(i.stacking.usePercentage ? 100 : r || this.total, 0, 0, 0, 1),
                                    n = i.translate(n || 0),
                                    n = c(r) && Math.abs(r - n),
                                    e = f(a, s.xAxis[0].translate(this.x)) + e,
                                    i = c(r) && this.getStackBox(s, this, e, r, t, n, i),
                                    t = this.label,
                                    n = this.isNegative,
                                    e = "justify" === f(this.options.overflow, "justify");
                                var l = this.textAlign;
                                t && i && (a = t.getBBox(),
                                    r = t.padding,
                                    l = "left" === l ? s.inverted ? -r : r : "right" === l ? a.width : s.inverted && "center" === l ? a.width / 2 : s.inverted ? n ? a.width + r : -r : a.width / 2,
                                    n = s.inverted ? a.height / 2 : n ? -r : a.height,
                                    this.alignOptions.x = f(this.options.x, 0),
                                    this.alignOptions.y = f(this.options.y, 0),
                                    i.x -= l,
                                    i.y -= n,
                                    t.align(this.alignOptions, null, i),
                                    s.isInsidePlot(t.alignAttr.x + l - this.alignOptions.x, t.alignAttr.y + n - this.alignOptions.y) ? t.show() : (t.alignAttr.y = -9999,
                                        e = !1),
                                    e && o.prototype.justifyDataLabel.call(this.axis, t, this.alignOptions, t.alignAttr, a, i),
                                    t.attr({
                                        x: t.alignAttr.x,
                                        y: t.alignAttr.y
                                    }),
                                    f(!e && this.options.crop, !0) && ((s = p(t.x) && p(t.y) && s.isInsidePlot(t.x - r + t.width, t.y) && s.isInsidePlot(t.x + r, t.y)) || t.hide()))
                            },
                            e.prototype.getStackBox = function(e, t, n, r, o, a, i) {
                                var s = t.axis.reversed,
                                    l = e.inverted,
                                    c = i.height + i.pos - (l ? e.plotLeft : e.plotTop);
                                return t = t.isNegative && !s || !t.isNegative && s, {
                                    x: l ? t ? r - i.right : r - a + i.pos - e.plotLeft : n + e.xAxis[0].transB - e.plotLeft,
                                    y: l ? i.height - n - o : t ? c - r - a : c - r,
                                    width: l ? a : o,
                                    height: l ? o : a
                                }
                            },
                            e
                    }();
                return t.prototype.getStacks = function() {
                        var e = this,
                            t = e.inverted;
                        e.yAxis.forEach(function(e) {
                                e.stacking && e.stacking.stacks && e.hasVisibleSeries && (e.stacking.oldStacks = e.stacking.stacks)
                            }),
                            e.series.forEach(function(n) {
                                var r = n.xAxis && n.xAxis.options || {};
                                !n.options.stacking || !0 !== n.visible && !1 !== e.options.chart.ignoreHiddenSeries || (n.stackKey = [n.type, f(n.options.stack, ""), t ? r.top : r.left, t ? r.height : r.width].join())
                            })
                    },
                    a.compose(e),
                    o.prototype.setGroupedPoints = function() {
                        var e = this.yAxis.stacking;
                        this.options.centerInCategory && (this.is("column") || this.is("columnrange")) && !this.options.stacking && 1 < this.chart.series.length ? o.prototype.setStackedPoints.call(this, "group") : e && h(e.stacks, function(t, n) {
                            "group" === n.slice(-5) && (h(t, function(e) {
                                    return e.destroy()
                                }),
                                delete e.stacks[n])
                        })
                    },
                    o.prototype.setStackedPoints = function(e) {
                        var t = e || this.options.stacking;
                        if (t && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                            var n = this.processedXData,
                                r = this.processedYData,
                                o = [],
                                a = r.length,
                                i = this.options,
                                s = i.threshold,
                                u = f(i.startFromThreshold && s, 0);
                            i = i.stack,
                                e = e ? this.type + "," + t : this.stackKey;
                            var p, h, g = "-" + e,
                                y = this.negStacks,
                                v = this.yAxis,
                                b = v.stacking.stacks,
                                _ = v.stacking.oldStacks;
                            for (v.stacking.stacksTouched += 1,
                                h = 0; h < a; h++) {
                                var w = n[h],
                                    x = r[h],
                                    E = this.getStackIndicator(E, w, this.index),
                                    k = E.key,
                                    S = (p = y && x < (u ? 0 : s)) ? g : e;
                                b[S] || (b[S] = {}),
                                    b[S][w] || (_[S] && _[S][w] ? (b[S][w] = _[S][w],
                                        b[S][w].total = null) : b[S][w] = new m(v, v.options.stackLabels, p, w, i)),
                                    S = b[S][w],
                                    null !== x ? (S.points[k] = S.points[this.index] = [f(S.cumulative, u)],
                                        c(S.cumulative) || (S.base = k),
                                        S.touched = v.stacking.stacksTouched,
                                        0 < E.index && !1 === this.singleStacks && (S.points[k][0] = S.points[this.index + "," + w + ",0"][0])) : S.points[k] = S.points[this.index] = null,
                                    "percent" === t ? (p = p ? e : g,
                                        y && b[p] && b[p][w] ? (p = b[p][w],
                                            S.total = p.total = Math.max(p.total, S.total) + Math.abs(x) || 0) : S.total = l(S.total + (Math.abs(x) || 0))) : "group" === t ? (d(x) && (x = x[0]),
                                        null !== x && (S.total = (S.total || 0) + 1)) : S.total = l(S.total + (x || 0)),
                                    S.cumulative = "group" === t ? (S.total || 1) - 1 : f(S.cumulative, u) + (x || 0),
                                    null !== x && (S.points[k].push(S.cumulative),
                                        o[h] = S.cumulative,
                                        S.hasValidPoints = !0)
                            }
                            "percent" === t && (v.stacking.usePercentage = !0),
                                "group" !== t && (this.stackedYData = o),
                                v.stacking.oldStacks = {}
                        }
                    },
                    o.prototype.modifyStacks = function() {
                        var e, t = this,
                            n = t.stackKey,
                            r = t.yAxis.stacking.stacks,
                            o = t.processedXData,
                            a = t.options.stacking;
                        t[a + "Stacker"] && [n, "-" + n].forEach(function(n) {
                            for (var i, s, l = o.length; l--;)
                                i = o[l],
                                e = t.getStackIndicator(e, i, t.index, n),
                                (s = (i = r[n] && r[n][i]) && i.points[e.key]) && t[a + "Stacker"](s, i, l)
                        })
                    },
                    o.prototype.percentStacker = function(e, t, n) {
                        t = t.total ? 100 / t.total : 0,
                            e[0] = l(e[0] * t),
                            e[1] = l(e[1] * t),
                            this.stackedYData[n] = e[1]
                    },
                    o.prototype.getStackIndicator = function(e, t, n, r) {
                        return !c(e) || e.x !== t || r && e.key !== r ? e = {
                                x: t,
                                index: 0,
                                key: r
                            } : e.index++,
                            e.key = [n, t, e.index].join(),
                            e
                    },
                    r.StackItem = m,
                    r.StackItem
            }