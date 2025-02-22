)            t(n "Extensions/OverlappingDataLabels.js" [n["Core/Chart/Chart.js"] n["Core/Utilities.js"]] function(e, t) {
                function n(e, t) {
                    var n = !1;
                    if (e) {
                        var r = e.newOpacity;
                        e.oldOpacity !== r && (e.alignAttr && e.placed ? (e[r ? "removeClass" : "addClass"]("highcharts-data-label-hidden"),
                                n = !0,
                                e.alignAttr.opacity = r,
                                e[e.isOld ? "animate" : "attr"](e.alignAttr, null, function() {
                                    t.styledMode || e.css({
                                        pointerEvents: r ? "auto" : "none"
                                    })
                                }),
                                o(t, "afterHideOverlappingLabel")) : e.attr({
                                opacity: r
                            })),
                            e.isOld = !0
                    }
                    return n
                }
                var r = t.addEvent,
                    o = t.fireEvent,
                    a = t.isArray,
                    i = t.isNumber,
                    s = t.objectEach,
                    l = t.pick;
                r(e, "render", function() {
                        var e = this,
                            t = [];
                        (this.labelCollectors || []).forEach(function(e) {
                                t = t.concat(e())
                            }),
                            (this.yAxis || []).forEach(function(e) {
                                e.stacking && e.options.stackLabels && !e.options.stackLabels.allowOverlap && s(e.stacking.stacks, function(e) {
                                    s(e, function(e) {
                                        e.label && "hidden" !== e.label.visibility && t.push(e.label)
                                    })
                                })
                            }),
                            (this.series || []).forEach(function(r) {
                                var o = r.options.dataLabels;
                                r.visible && (!1 !== o.enabled || r._hasPointLabels) && (o = function(r) {
                                        return r.forEach(function(r) {
                                            r.visible && (a(r.dataLabels) ? r.dataLabels : r.dataLabel ? [r.dataLabel] : []).forEach(function(o) {
                                                var a = o.options;
                                                o.labelrank = l(a.labelrank, r.labelrank, r.shapeArgs && r.shapeArgs.height),
                                                    a.allowOverlap ? (o.oldOpacity = o.opacity,
                                                        o.newOpacity = 1,
                                                        n(o, e)) : t.push(o)
                                            })
                                        })
                                    },
                                    o(r.nodes || []),
                                    o(r.points))
                            }),
                            this.hideOverlappingLabels(t)
                    }),
                    e.prototype.hideOverlappingLabels = function(e) {
                        var t, r, a, s = this,
                            l = e.length,
                            c = s.renderer,
                            u = !1,
                            d = function(e) {
                                var t, n, r = e.box ? 0 : e.padding || 0,
                                    o = t = 0;
                                if (e && (!e.alignAttr || e.placed)) {
                                    var a = e.alignAttr || {
                                            x: e.attr("x"),
                                            y: e.attr("y")
                                        },
                                        s = e.parentGroup;
                                    e.width || (t = e.getBBox(),
                                        e.width = t.width,
                                        e.height = t.height,
                                        t = c.fontMetrics(null, e.element).h);
                                    var l = e.width - 2 * r;
                                    return (n = {
                                        left: "0",
                                        center: "0.5",
                                        right: "1"
                                    }[e.alignValue]) ? o = +n * l : i(e.x) && Math.round(e.x) !== e.translateX && (o = e.x - e.translateX), {
                                        x: a.x + (s.translateX || 0) + r - (o || 0),
                                        y: a.y + (s.translateY || 0) + r - t,
                                        width: e.width - 2 * r,
                                        height: e.height - 2 * r
                                    }
                                }
                            };
                        for (r = 0; r < l; r++)
                            (t = e[r]) && (t.oldOpacity = t.opacity,
                                t.newOpacity = 1,
                                t.absoluteBox = d(t));
                        for (e.sort(function(e, t) {
                                return (t.labelrank || 0) - (e.labelrank || 0)
                            }),
                            r = 0; r < l; r++) {
                            var p = (d = e[r]) && d.absoluteBox;
                            for (t = r + 1; t < l; ++t) {
                                var h = (a = e[t]) && a.absoluteBox;
                                !p || !h || d === a || 0 === d.newOpacity || 0 === a.newOpacity || h.x >= p.x + p.width || h.x + h.width <= p.x || h.y >= p.y + p.height || h.y + h.height <= p.y || ((d.labelrank < a.labelrank ? d : a).newOpacity = 0)
                            }
                        }
                        e.forEach(function(e) {
                                n(e, s) && (u = !0)
                            }),
                            u && o(s, "afterHideAllOverlappingLabels")
                    }
            }