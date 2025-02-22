)            t(n "Core/Series/DataLabel.js" [n["Core/Animation/AnimationUtilities.js"] n["Core/FormatUtilities.js"] n["Core/Color/Palette.js"] n["Core/Utilities.js"]] function(e, t, n, r) {
                var o, a = e.getDeferredAnimation,
                    i = t.format,
                    s = r.defined,
                    l = r.extend,
                    c = r.fireEvent,
                    u = r.isArray,
                    d = r.merge,
                    p = r.objectEach,
                    h = r.pick,
                    f = r.splat;
                return function(e) {
                        function t(e, t, n, r, o) {
                            var a = this,
                                i = this.chart,
                                s = this.isCartesian && i.inverted,
                                c = this.enabledDataSorting,
                                u = h(e.dlBox && e.dlBox.centerX, e.plotX, -9999),
                                d = h(e.plotY, -9999),
                                p = t.getBBox(),
                                f = n.rotation,
                                m = n.align,
                                g = i.isInsidePlot(u, Math.round(d), {
                                    inverted: s,
                                    paneCoordinates: !0,
                                    series: a
                                }),
                                y = function(n) {
                                    c && a.xAxis && !v && a.setDataLabelStartPos(e, t, o, g, n)
                                },
                                v = "justify" === h(n.overflow, c ? "none" : "justify"),
                                b = this.visible && !1 !== e.visible && (e.series.forceDL || c && !v || g || h(n.inside, !!this.options.stacking) && r && i.isInsidePlot(u, s ? r.x + 1 : r.y + r.height - 1, {
                                    inverted: s,
                                    paneCoordinates: !0,
                                    series: a
                                }));
                            if (b) {
                                var _ = i.renderer.fontMetrics(i.styledMode ? void 0 : n.style.fontSize, t).b;
                                r = l({
                                        x: s ? this.yAxis.len - d : u,
                                        y: Math.round(s ? this.xAxis.len - u : d),
                                        width: 0,
                                        height: 0
                                    }, r),
                                    l(n, {
                                        width: p.width,
                                        height: p.height
                                    }),
                                    f ? (v = !1,
                                        u = i.renderer.rotCorr(_, f),
                                        u = {
                                            x: r.x + (n.x || 0) + r.width / 2 + u.x,
                                            y: r.y + (n.y || 0) + {
                                                top: 0,
                                                middle: .5,
                                                bottom: 1
                                            }[n.verticalAlign] * r.height
                                        },
                                        y(u),
                                        t[o ? "attr" : "animate"](u).attr({
                                            align: m
                                        }),
                                        y = (f + 720) % 360,
                                        y = 180 < y && 360 > y,
                                        "left" === m ? u.y -= y ? p.height : 0 : "center" === m ? (u.x -= p.width / 2,
                                            u.y -= p.height / 2) : "right" === m && (u.x -= p.width,
                                            u.y -= y ? 0 : p.height),
                                        t.placed = !0,
                                        t.alignAttr = u) : (y(r),
                                        t.align(n, void 0, r),
                                        u = t.alignAttr),
                                    v && 0 <= r.height ? this.justifyDataLabel(t, n, u, p, r, o) : h(n.crop, !0) && (b = i.isInsidePlot(u.x, u.y, {
                                        paneCoordinates: !0,
                                        series: a
                                    }) && i.isInsidePlot(u.x + p.width, u.y + p.height, {
                                        paneCoordinates: !0,
                                        series: a
                                    })),
                                    n.shape && !f && t[o ? "attr" : "animate"]({
                                        anchorX: s ? i.plotWidth - e.plotY : e.plotX,
                                        anchorY: s ? i.plotHeight - e.plotX : e.plotY
                                    })
                            }
                            o && c && (t.placed = !1),
                                b || c && !v || (t.hide(!0),
                                    t.placed = !1)
                        }

                        function r(e, t) {
                            var n = t.filter;
                            return !n || (t = n.operator,
                                e = e[n.property],
                                n = n.value,
                                ">" === t && e > n || "<" === t && e < n || ">=" === t && e >= n || "<=" === t && e <= n || "==" === t && e == n || "===" === t && e === n)
                        }

                        function o() {
                            var e, t = this,
                                o = t.chart,
                                l = t.options,
                                d = t.points,
                                m = t.hasRendered || 0,
                                y = o.renderer,
                                v = l.dataLabels,
                                b = v.animation;
                            if (b = v.defer ? a(o, b, t) : {
                                    defer: 0,
                                    duration: 0
                                },
                                v = g(g(o.options.plotOptions && o.options.plotOptions.series && o.options.plotOptions.series.dataLabels, o.options.plotOptions && o.options.plotOptions[t.type] && o.options.plotOptions[t.type].dataLabels), v),
                                c(this, "drawDataLabels"),
                                u(v) || v.enabled || t._hasPointLabels) {
                                var _ = t.plotGroup("dataLabelsGroup", "data-labels", m ? "inherit" : "hidden", v.zIndex || 6);
                                _.attr({
                                        opacity: +m
                                    }), !m && (m = t.dataLabelsGroup) && (t.visible && _.show(!0),
                                        m[l.animation ? "animate" : "attr"]({
                                            opacity: 1
                                        }, b)),
                                    d.forEach(function(a) {
                                        e = f(g(v, a.dlOptions || a.options && a.options.dataLabels)),
                                            e.forEach(function(e, c) {
                                                var u = e.enabled && (!a.isNull || a.dataLabelOnNull) && r(a, e),
                                                    d = a.connectors ? a.connectors[c] : a.connector,
                                                    f = a.dataLabels ? a.dataLabels[c] : a.dataLabel,
                                                    m = h(e.distance, a.labelDistance),
                                                    g = !f;
                                                if (u) {
                                                    var v = a.getLabelConfig(),
                                                        b = h(e[a.formatPrefix + "Format"], e.format);
                                                    v = s(b) ? i(b, v, o) : (e[a.formatPrefix + "Formatter"] || e.formatter).call(v, e),
                                                        b = e.style;
                                                    var w = e.rotation;
                                                    o.styledMode || (b.color = h(e.color, b.color, t.color, n.neutralColor100),
                                                        "contrast" === b.color ? (a.contrastColor = y.getContrast(a.color || t.color),
                                                            b.color = !s(m) && e.inside || 0 > m || l.stacking ? a.contrastColor : n.neutralColor100) : delete a.contrastColor,
                                                        l.cursor && (b.cursor = l.cursor));
                                                    var x = {
                                                        r: e.borderRadius || 0,
                                                        rotation: w,
                                                        padding: e.padding,
                                                        zIndex: 1
                                                    };
                                                    o.styledMode || (x.fill = e.backgroundColor,
                                                            x.stroke = e.borderColor,
                                                            x["stroke-width"] = e.borderWidth),
                                                        p(x, function(e, t) {
                                                            "undefined" === typeof e && delete x[t]
                                                        })
                                                }!f || u && s(v) ? u && s(v) && (f ? x.text = v : (a.dataLabels = a.dataLabels || [],
                                                        f = a.dataLabels[c] = w ? y.text(v, 0, -9999, e.useHTML).addClass("highcharts-data-label") : y.label(v, 0, -9999, e.shape, null, null, e.useHTML, null, "data-label"),
                                                        c || (a.dataLabel = f),
                                                        f.addClass(" highcharts-data-label-color-" + a.colorIndex + " " + (e.className || "") + (e.useHTML ? " highcharts-tracker" : ""))),
                                                    f.options = e,
                                                    f.attr(x),
                                                    o.styledMode || f.css(b).shadow(e.shadow),
                                                    f.added || f.add(_),
                                                    e.textPath && !e.useHTML && (f.setTextPath(a.getDataLabelPath && a.getDataLabelPath(f) || a.graphic, e.textPath),
                                                        a.dataLabelPath && !e.textPath.enabled && (a.dataLabelPath = a.dataLabelPath.destroy())),
                                                    t.alignDataLabel(a, f, e, null, g)) : (a.dataLabel = a.dataLabel && a.dataLabel.destroy(),
                                                    a.dataLabels && (1 === a.dataLabels.length ? delete a.dataLabels : delete a.dataLabels[c]),
                                                    c || delete a.dataLabel,
                                                    d && (a.connector = a.connector.destroy(),
                                                        a.connectors && (1 === a.connectors.length ? delete a.connectors : delete a.connectors[c])))
                                            })
                                    })
                            }
                            c(this, "afterDrawDataLabels")
                        }

                        function m(e, t, n, r, o, a) {
                            var i = this.chart,
                                s = t.align,
                                l = t.verticalAlign,
                                c = e.box ? 0 : e.padding || 0,
                                u = t.x;
                            u = void 0 === u ? 0 : u;
                            var d = t.y;
                            d = void 0 === d ? 0 : d;
                            var p = (n.x || 0) + c;
                            if (0 > p) {
                                "right" === s && 0 <= u ? (t.align = "left",
                                    t.inside = !0) : u -= p;
                                var h = !0
                            }
                            return p = (n.x || 0) + r.width - c,
                                p > i.plotWidth && ("left" === s && 0 >= u ? (t.align = "right",
                                        t.inside = !0) : u += i.plotWidth - p,
                                    h = !0),
                                p = n.y + c,
                                0 > p && ("bottom" === l && 0 <= d ? (t.verticalAlign = "top",
                                        t.inside = !0) : d -= p,
                                    h = !0),
                                p = (n.y || 0) + r.height - c,
                                p > i.plotHeight && ("top" === l && 0 >= d ? (t.verticalAlign = "bottom",
                                        t.inside = !0) : d += i.plotHeight - p,
                                    h = !0),
                                h && (t.x = u,
                                    t.y = d,
                                    e.placed = !a,
                                    e.align(t, void 0, o)),
                                h
                        }

                        function g(e, t) {
                            var n, r = [];
                            if (u(e) && !u(t))
                                r = e.map(function(e) {
                                    return d(e, t)
                                });
                            else if (u(t) && !u(e))
                                r = t.map(function(t) {
                                    return d(e, t)
                                });
                            else if (u(e) || u(t))
                                for (n = Math.max(e.length, t.length); n--;)
                                    r[n] = d(e[n], t[n]);
                            else
                                r = d(e, t);
                            return r
                        }

                        function y(e, t, n, r, o) {
                            var a = this.chart,
                                i = a.inverted,
                                s = this.xAxis,
                                l = s.reversed,
                                c = i ? t.height / 2 : t.width / 2;
                            e = (e = e.pointWidth) ? e / 2 : 0,
                                t.startXPos = i ? o.x : l ? -c - e : s.width - c + e,
                                t.startYPos = i ? l ? this.yAxis.height - c + e : -c - e : o.y,
                                r ? "hidden" === t.visibility && (t.show(),
                                    t.attr({
                                        opacity: 0
                                    }).animate({
                                        opacity: 1
                                    })) : t.attr({
                                    opacity: 1
                                }).animate({
                                    opacity: 0
                                }, void 0, t.hide),
                                a.hasRendered && (n && t.attr({
                                        x: t.startXPos,
                                        y: t.startYPos
                                    }),
                                    t.placed = !0)
                        }
                        var v = [];
                        e.compose = function(e) {
                            if (-1 === v.indexOf(e)) {
                                var n = e.prototype;
                                v.push(e),
                                    n.alignDataLabel = t,
                                    n.drawDataLabels = o,
                                    n.justifyDataLabel = m,
                                    n.setDataLabelStartPos = y
                            }
                        }
                    }(o || (o = {})),
                    o
            }