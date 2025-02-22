)            t(n "Core/Legend/Legend.js" [n["Core/Animation/AnimationUtilities.js"] n["Core/FormatUtilities.js"] n["Core/Globals.js"] n["Core/Series/Point.js"] n["Core/Renderer/RendererUtilities.js"] n["Core/Utilities.js"]] function(e, t, n, r, o, a) {
                var i = e.animObject,
                    s = e.setAnimation,
                    l = t.format;
                e = n.isFirefox;
                var c = n.marginNames;
                n = n.win;
                var u = o.distribute,
                    d = a.addEvent,
                    p = a.createElement,
                    h = a.css,
                    f = a.defined,
                    m = a.discardElement,
                    g = a.find,
                    y = a.fireEvent,
                    v = a.isNumber,
                    b = a.merge,
                    _ = a.pick,
                    w = a.relativeLength,
                    x = a.stableSort,
                    E = a.syncTimeout;
                return o = a.wrap,
                    a = function() {
                        function e(e, t) {
                            this.allItems = [],
                                this.contentGroup = this.box = void 0,
                                this.display = !1,
                                this.group = void 0,
                                this.offsetWidth = this.maxLegendWidth = this.maxItemWidth = this.legendWidth = this.legendHeight = this.lastLineHeight = this.lastItemY = this.itemY = this.itemX = this.itemMarginTop = this.itemMarginBottom = this.itemHeight = this.initialItemY = 0,
                                this.options = {},
                                this.padding = 0,
                                this.pages = [],
                                this.proximate = !1,
                                this.scrollGroup = void 0,
                                this.widthOption = this.totalItemWidth = this.titleHeight = this.symbolWidth = this.symbolHeight = 0,
                                this.chart = e,
                                this.init(e, t)
                        }
                        return e.prototype.init = function(e, t) {
                                this.chart = e,
                                    this.setOptions(t),
                                    t.enabled && (this.render(),
                                        d(this.chart, "endResize", function() {
                                            this.legend.positionCheckboxes()
                                        }),
                                        this.proximate ? this.unchartrender = d(this.chart, "render", function() {
                                            this.legend.proximatePositions(),
                                                this.legend.positionItems()
                                        }) : this.unchartrender && this.unchartrender())
                            },
                            e.prototype.setOptions = function(e) {
                                var t = _(e.padding, 8);
                                this.options = e,
                                    this.chart.styledMode || (this.itemStyle = e.itemStyle,
                                        this.itemHiddenStyle = b(this.itemStyle, e.itemHiddenStyle)),
                                    this.itemMarginTop = e.itemMarginTop || 0,
                                    this.itemMarginBottom = e.itemMarginBottom || 0,
                                    this.padding = t,
                                    this.initialItemY = t - 5,
                                    this.symbolWidth = _(e.symbolWidth, 16),
                                    this.pages = [],
                                    this.proximate = "proximate" === e.layout && !this.chart.inverted,
                                    this.baseline = void 0
                            },
                            e.prototype.update = function(e, t) {
                                var n = this.chart;
                                this.setOptions(b(!0, this.options, e)),
                                    this.destroy(),
                                    n.isDirtyLegend = n.isDirtyBox = !0,
                                    _(t, !0) && n.redraw(),
                                    y(this, "afterUpdate")
                            },
                            e.prototype.colorizeItem = function(e, t) {
                                if (e.legendGroup[t ? "removeClass" : "addClass"]("highcharts-legend-item-hidden"), !this.chart.styledMode) {
                                    var n = this.options,
                                        r = e.legendItem,
                                        o = e.legendLine,
                                        a = e.legendSymbol,
                                        i = this.itemHiddenStyle.color;
                                    n = t ? n.itemStyle.color : i;
                                    var s = t ? e.color || i : i,
                                        l = e.options && e.options.marker,
                                        c = {
                                            fill: s
                                        };
                                    r && r.css({
                                            fill: n,
                                            color: n
                                        }),
                                        o && o.attr({
                                            stroke: s
                                        }),
                                        a && (l && a.isMarker && (c = e.pointAttribs(),
                                                t || (c.stroke = c.fill = i)),
                                            a.attr(c))
                                }
                                y(this, "afterColorizeItem", {
                                    item: e,
                                    visible: t
                                })
                            },
                            e.prototype.positionItems = function() {
                                this.allItems.forEach(this.positionItem, this),
                                    this.chart.isResizing || this.positionCheckboxes()
                            },
                            e.prototype.positionItem = function(e) {
                                var t = this,
                                    n = this.options,
                                    r = n.symbolPadding,
                                    o = !n.rtl,
                                    a = e._legendItemPos;
                                n = a[0],
                                    a = a[1];
                                var i = e.checkbox,
                                    s = e.legendGroup;
                                s && s.element && (r = {
                                            translateX: o ? n : this.legendWidth - n - 2 * r - 4,
                                            translateY: a
                                        },
                                        o = function() {
                                            y(t, "afterPositionItem", {
                                                item: e
                                            })
                                        },
                                        f(s.translateY) ? s.animate(r, void 0, o) : (s.attr(r),
                                            o())),
                                    i && (i.x = n,
                                        i.y = a)
                            },
                            e.prototype.destroyItem = function(e) {
                                var t = e.checkbox;
                                ["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function(t) {
                                        e[t] && (e[t] = e[t].destroy())
                                    }),
                                    t && m(e.checkbox)
                            },
                            e.prototype.destroy = function() {
                                function e(e) {
                                    this[e] && (this[e] = this[e].destroy())
                                }
                                this.getAllItems().forEach(function(t) {
                                        ["legendItem", "legendGroup"].forEach(e, t)
                                    }),
                                    "clipRect up down pager nav box title group".split(" ").forEach(e, this),
                                    this.display = null
                            },
                            e.prototype.positionCheckboxes = function() {
                                var e = this.group && this.group.alignAttr,
                                    t = this.clipHeight || this.legendHeight,
                                    n = this.titleHeight;
                                if (e) {
                                    var r = e.translateY;
                                    this.allItems.forEach(function(o) {
                                        var a = o.checkbox;
                                        if (a) {
                                            var i = r + n + a.y + (this.scrollOffset || 0) + 3;
                                            h(a, {
                                                left: e.translateX + o.checkboxOffset + a.x - 20 + "px",
                                                top: i + "px",
                                                display: this.proximate || i > r - 6 && i < r + t - 6 ? "" : "none"
                                            })
                                        }
                                    }, this)
                                }
                            },
                            e.prototype.renderTitle = function() {
                                var e = this.options,
                                    t = this.padding,
                                    n = e.title,
                                    r = 0;
                                n.text && (this.title || (this.title = this.chart.renderer.label(n.text, t - 3, t - 4, null, null, null, e.useHTML, null, "legend-title").attr({
                                                zIndex: 1
                                            }),
                                            this.chart.styledMode || this.title.css(n.style),
                                            this.title.add(this.group)),
                                        n.width || this.title.css({
                                            width: this.maxLegendWidth + "px"
                                        }),
                                        e = this.title.getBBox(),
                                        r = e.height,
                                        this.offsetWidth = e.width,
                                        this.contentGroup.attr({
                                            translateY: r
                                        })),
                                    this.titleHeight = r
                            },
                            e.prototype.setText = function(e) {
                                var t = this.options;
                                e.legendItem.attr({
                                    text: t.labelFormat ? l(t.labelFormat, e, this.chart) : t.labelFormatter.call(e)
                                })
                            },
                            e.prototype.renderItem = function(e) {
                                var t = this.chart,
                                    n = t.renderer,
                                    r = this.options,
                                    o = this.symbolWidth,
                                    a = r.symbolPadding || 0,
                                    i = this.itemStyle,
                                    s = this.itemHiddenStyle,
                                    l = "horizontal" === r.layout ? _(r.itemDistance, 20) : 0,
                                    c = !r.rtl,
                                    u = !e.series,
                                    d = !u && e.series.drawLegendSymbol ? e.series : e,
                                    p = d.options,
                                    h = this.createCheckboxForItem && p && p.showCheckbox,
                                    f = r.useHTML,
                                    m = e.options.className,
                                    g = e.legendItem;
                                p = o + a + l + (h ? 20 : 0),
                                    g || (e.legendGroup = n.g("legend-item").addClass("highcharts-" + d.type + "-series highcharts-color-" + e.colorIndex + (m ? " " + m : "") + (u ? " highcharts-series-" + e.index : "")).attr({
                                            zIndex: 1
                                        }).add(this.scrollGroup),
                                        e.legendItem = g = n.text("", c ? o + a : -a, this.baseline || 0, f),
                                        t.styledMode || g.css(b(e.visible ? i : s)),
                                        g.attr({
                                            align: c ? "left" : "right",
                                            zIndex: 2
                                        }).add(e.legendGroup),
                                        this.baseline || (this.fontMetrics = n.fontMetrics(t.styledMode ? 12 : i.fontSize, g),
                                            this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop,
                                            g.attr("y", this.baseline),
                                            this.symbolHeight = r.symbolHeight || this.fontMetrics.f,
                                            r.squareSymbol && (this.symbolWidth = _(r.symbolWidth, Math.max(this.symbolHeight, 16)),
                                                p = this.symbolWidth + a + l + (h ? 20 : 0),
                                                c && g.attr("x", this.symbolWidth + a))),
                                        d.drawLegendSymbol(this, e),
                                        this.setItemEvents && this.setItemEvents(e, g, f)),
                                    h && !e.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(e),
                                    this.colorizeItem(e, e.visible), !t.styledMode && i.width || g.css({
                                        width: (r.itemWidth || this.widthOption || t.spacingBox.width) - p + "px"
                                    }),
                                    this.setText(e),
                                    t = g.getBBox(),
                                    e.itemWidth = e.checkboxOffset = r.itemWidth || e.legendItemWidth || t.width + p,
                                    this.maxItemWidth = Math.max(this.maxItemWidth, e.itemWidth),
                                    this.totalItemWidth += e.itemWidth,
                                    this.itemHeight = e.itemHeight = Math.round(e.legendItemHeight || t.height || this.symbolHeight)
                            },
                            e.prototype.layoutItem = function(e) {
                                var t = this.options,
                                    n = this.padding,
                                    r = "horizontal" === t.layout,
                                    o = e.itemHeight,
                                    a = this.itemMarginBottom,
                                    i = this.itemMarginTop,
                                    s = r ? _(t.itemDistance, 20) : 0,
                                    l = this.maxLegendWidth;
                                t = t.alignColumns && this.totalItemWidth > l ? this.maxItemWidth : e.itemWidth,
                                    r && this.itemX - n + t > l && (this.itemX = n,
                                        this.lastLineHeight && (this.itemY += i + this.lastLineHeight + a),
                                        this.lastLineHeight = 0),
                                    this.lastItemY = i + this.itemY + a,
                                    this.lastLineHeight = Math.max(o, this.lastLineHeight),
                                    e._legendItemPos = [this.itemX, this.itemY],
                                    r ? this.itemX += t : (this.itemY += i + o + a,
                                        this.lastLineHeight = o),
                                    this.offsetWidth = this.widthOption || Math.max((r ? this.itemX - n - (e.checkbox ? 0 : s) : t) + n, this.offsetWidth)
                            },
                            e.prototype.getAllItems = function() {
                                var e = [];
                                return this.chart.series.forEach(function(t) {
                                        var n = t && t.options;
                                        t && _(n.showInLegend, !f(n.linkedTo) && void 0, !0) && (e = e.concat(t.legendItems || ("point" === n.legendType ? t.data : t)))
                                    }),
                                    y(this, "afterGetAllItems", {
                                        allItems: e
                                    }),
                                    e
                            },
                            e.prototype.getAlignment = function() {
                                var e = this.options;
                                return this.proximate ? e.align.charAt(0) + "tv" : e.floating ? "" : e.align.charAt(0) + e.verticalAlign.charAt(0) + e.layout.charAt(0)
                            },
                            e.prototype.adjustMargins = function(e, t) {
                                var n = this.chart,
                                    r = this.options,
                                    o = this.getAlignment();
                                o && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function(a, i) {
                                    a.test(o) && !f(e[i]) && (n[c[i]] = Math.max(n[c[i]], n.legend[(i + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][i] * r[i % 2 ? "x" : "y"] + _(r.margin, 12) + t[i] + (n.titleOffset[i] || 0)))
                                })
                            },
                            e.prototype.proximatePositions = function() {
                                var e = this.chart,
                                    t = [],
                                    n = "left" === this.options.align;
                                this.allItems.forEach(function(r) {
                                        var o, a = n;
                                        if (r.yAxis) {
                                            r.xAxis.options.reversed && (a = !a),
                                                r.points && (o = g(a ? r.points : r.points.slice(0).reverse(), function(e) {
                                                    return v(e.plotY)
                                                })),
                                                a = this.itemMarginTop + r.legendItem.getBBox().height + this.itemMarginBottom;
                                            var i = r.yAxis.top - e.plotTop;
                                            r.visible ? (o = o ? o.plotY : r.yAxis.height,
                                                    o += i - .3 * a) : o = i + r.yAxis.height,
                                                t.push({
                                                    target: o,
                                                    size: a,
                                                    item: r
                                                })
                                        }
                                    }, this),
                                    u(t, e.plotHeight).forEach(function(t) {
                                        t.item._legendItemPos && (t.item._legendItemPos[1] = e.plotTop - e.spacing[0] + t.pos)
                                    })
                            },
                            e.prototype.render = function() {
                                var e = this.chart,
                                    t = e.renderer,
                                    n = this.options,
                                    r = this.padding,
                                    o = this.getAllItems(),
                                    a = this.group,
                                    i = this.box;
                                this.itemX = r,
                                    this.itemY = this.initialItemY,
                                    this.lastItemY = this.offsetWidth = 0,
                                    this.widthOption = w(n.width, e.spacingBox.width - r);
                                var s = e.spacingBox.width - 2 * r - n.x; -
                                1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (s /= 2),
                                    this.maxLegendWidth = this.widthOption || s,
                                    a || (this.group = a = t.g("legend").addClass(n.className || "").attr({
                                            zIndex: 7
                                        }).add(),
                                        this.contentGroup = t.g().attr({
                                            zIndex: 1
                                        }).add(a),
                                        this.scrollGroup = t.g().add(this.contentGroup)),
                                    this.renderTitle(),
                                    x(o, function(e, t) {
                                        return (e.options && e.options.legendIndex || 0) - (t.options && t.options.legendIndex || 0)
                                    }),
                                    n.reversed && o.reverse(),
                                    this.allItems = o,
                                    this.display = s = !!o.length,
                                    this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0,
                                    o.forEach(this.renderItem, this),
                                    o.forEach(this.layoutItem, this),
                                    o = (this.widthOption || this.offsetWidth) + r;
                                var l = this.lastItemY + this.lastLineHeight + this.titleHeight;
                                l = this.handleOverflow(l),
                                    l += r,
                                    i || (this.box = i = t.rect().addClass("highcharts-legend-box").attr({
                                            r: n.borderRadius
                                        }).add(a),
                                        i.isNew = !0),
                                    e.styledMode || i.attr({
                                        stroke: n.borderColor,
                                        "stroke-width": n.borderWidth || 0,
                                        fill: n.backgroundColor || "none"
                                    }).shadow(n.shadow),
                                    0 < o && 0 < l && (i[i.isNew ? "attr" : "animate"](i.crisp.call({}, {
                                            x: 0,
                                            y: 0,
                                            width: o,
                                            height: l
                                        }, i.strokeWidth())),
                                        i.isNew = !1),
                                    i[s ? "show" : "hide"](),
                                    e.styledMode && "none" === a.getStyle("display") && (o = l = 0),
                                    this.legendWidth = o,
                                    this.legendHeight = l,
                                    s && this.align(),
                                    this.proximate || this.positionItems(),
                                    y(this, "afterRender")
                            },
                            e.prototype.align = function(e) {
                                void 0 === e && (e = this.chart.spacingBox);
                                var t = this.chart,
                                    n = this.options,
                                    r = e.y;
                                /(lth|ct|rth)/.test(this.getAlignment()) && 0 < t.titleOffset[0] ? r += t.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) && 0 < t.titleOffset[2] && (r -= t.titleOffset[2]),
                                    r !== e.y && (e = b(e, {
                                        y: r
                                    })),
                                    this.group.align(b(n, {
                                        width: this.legendWidth,
                                        height: this.legendHeight,
                                        verticalAlign: this.proximate ? "top" : n.verticalAlign
                                    }), !0, e)
                            },
                            e.prototype.handleOverflow = function(e) {
                                var t, n, r = this,
                                    o = this.chart,
                                    a = o.renderer,
                                    i = this.options,
                                    s = i.y,
                                    l = "top" === i.verticalAlign,
                                    c = this.padding,
                                    u = i.maxHeight,
                                    d = i.navigation,
                                    p = _(d.animation, !0),
                                    h = d.arrowSize || 12,
                                    f = this.pages,
                                    m = this.allItems,
                                    g = function(e) {
                                        "number" === typeof e ? b.attr({
                                                height: e
                                            }) : b && (r.clipRect = b.destroy(),
                                                r.contentGroup.clip()),
                                            r.contentGroup.div && (r.contentGroup.div.style.clip = e ? "rect(" + c + "px,9999px," + (c + e) + "px,0)" : "auto")
                                    },
                                    y = function(e) {
                                        return r[e] = a.circle(0, 0, 1.3 * h).translate(h / 2, h / 2).add(v),
                                            o.styledMode || r[e].attr("fill", "rgba(0,0,0,0.0001)"),
                                            r[e]
                                    };
                                s = o.spacingBox.height + (l ? -s : s) - c;
                                var v = this.nav,
                                    b = this.clipRect;
                                return "horizontal" !== i.layout || "middle" === i.verticalAlign || i.floating || (s /= 2),
                                    u && (s = Math.min(s, u)),
                                    f.length = 0,
                                    e && 0 < s && e > s && !1 !== d.enabled ? (this.clipHeight = t = Math.max(s - 20 - this.titleHeight - c, 0),
                                        this.currentPage = _(this.currentPage, 1),
                                        this.fullHeight = e,
                                        m.forEach(function(e, r) {
                                            var o = e._legendItemPos[1],
                                                a = Math.round(e.legendItem.getBBox().height),
                                                i = f.length;
                                            (!i || o - f[i - 1] > t && (n || o) !== f[i - 1]) && (f.push(n || o),
                                                i++),
                                            e.pageIx = i - 1,
                                                n && (m[r - 1].pageIx = i - 1),
                                                r === m.length - 1 && o + a - f[i - 1] > t && o !== n && (f.push(o),
                                                    e.pageIx = i),
                                                o !== n && (n = o)
                                        }),
                                        b || (b = r.clipRect = a.clipRect(0, c, 9999, 0),
                                            r.contentGroup.clip(b)),
                                        g(t),
                                        v || (this.nav = v = a.g().attr({
                                                zIndex: 1
                                            }).add(this.group),
                                            this.up = a.symbol("triangle", 0, 0, h, h).add(v),
                                            y("upTracker").on("click", function() {
                                                r.scroll(-1, p)
                                            }),
                                            this.pager = a.text("", 15, 10).addClass("highcharts-legend-navigation"),
                                            o.styledMode || this.pager.css(d.style),
                                            this.pager.add(v),
                                            this.down = a.symbol("triangle-down", 0, 0, h, h).add(v),
                                            y("downTracker").on("click", function() {
                                                r.scroll(1, p)
                                            })),
                                        r.scroll(0),
                                        e = s) : v && (g(),
                                        this.nav = v.destroy(),
                                        this.scrollGroup.attr({
                                            translateY: 1
                                        }),
                                        this.clipHeight = 0),
                                    e
                            },
                            e.prototype.scroll = function(e, t) {
                                var n = this,
                                    r = this.chart,
                                    o = this.pages,
                                    a = o.length,
                                    l = this.clipHeight,
                                    c = this.options.navigation,
                                    u = this.pager,
                                    d = this.padding,
                                    p = this.currentPage + e;
                                p > a && (p = a),
                                    0 < p && ("undefined" !== typeof t && s(t, r),
                                        this.nav.attr({
                                            translateX: d,
                                            translateY: l + this.padding + 7 + this.titleHeight,
                                            visibility: "visible"
                                        }), [this.up, this.upTracker].forEach(function(e) {
                                            e.attr({
                                                class: 1 === p ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                                            })
                                        }),
                                        u.attr({
                                            text: p + "/" + a
                                        }), [this.down, this.downTracker].forEach(function(e) {
                                            e.attr({
                                                x: 18 + this.pager.getBBox().width,
                                                class: p === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                                            })
                                        }, this),
                                        r.styledMode || (this.up.attr({
                                                fill: 1 === p ? c.inactiveColor : c.activeColor
                                            }),
                                            this.upTracker.css({
                                                cursor: 1 === p ? "default" : "pointer"
                                            }),
                                            this.down.attr({
                                                fill: p === a ? c.inactiveColor : c.activeColor
                                            }),
                                            this.downTracker.css({
                                                cursor: p === a ? "default" : "pointer"
                                            })),
                                        this.scrollOffset = -o[p - 1] + this.initialItemY,
                                        this.scrollGroup.animate({
                                            translateY: this.scrollOffset
                                        }),
                                        this.currentPage = p,
                                        this.positionCheckboxes(),
                                        e = i(_(t, r.renderer.globalAnimation, !0)),
                                        E(function() {
                                            y(n, "afterScroll", {
                                                currentPage: p
                                            })
                                        }, e.duration))
                            },
                            e.prototype.setItemEvents = function(e, t, n) {
                                var o = this,
                                    a = o.chart.renderer.boxWrapper,
                                    i = e instanceof r,
                                    s = "highcharts-legend-" + (i ? "point" : "series") + "-active",
                                    l = o.chart.styledMode,
                                    c = function(t) {
                                        o.allItems.forEach(function(n) {
                                            e !== n && [n].concat(n.linkedSeries || []).forEach(function(e) {
                                                e.setState(t, !i)
                                            })
                                        })
                                    };
                                (n ? [t, e.legendSymbol] : [e.legendGroup]).forEach(function(n) {
                                    n && n.on("mouseover", function() {
                                        e.visible && c("inactive"),
                                            e.setState("hover"),
                                            e.visible && a.addClass(s),
                                            l || t.css(o.options.itemHoverStyle)
                                    }).on("mouseout", function() {
                                        o.chart.styledMode || t.css(b(e.visible ? o.itemStyle : o.itemHiddenStyle)),
                                            c(""),
                                            a.removeClass(s),
                                            e.setState()
                                    }).on("click", function(t) {
                                        var n = function() {
                                            e.setVisible && e.setVisible(),
                                                c(e.visible ? "inactive" : "")
                                        };
                                        a.removeClass(s),
                                            t = {
                                                browserEvent: t
                                            },
                                            e.firePointEvent ? e.firePointEvent("legendItemClick", t, n) : y(e, "legendItemClick", t, n)
                                    })
                                })
                            },
                            e.prototype.createCheckboxForItem = function(e) {
                                e.checkbox = p("input", {
                                        type: "checkbox",
                                        className: "highcharts-legend-checkbox",
                                        checked: e.selected,
                                        defaultChecked: e.selected
                                    }, this.options.itemCheckboxStyle, this.chart.container),
                                    d(e.checkbox, "click", function(t) {
                                        y(e.series || e, "checkboxClick", {
                                            checked: t.target.checked,
                                            item: e
                                        }, function() {
                                            e.select()
                                        })
                                    })
                            },
                            e
                    }(),
                    (/Trident\/7\.0/.test(n.navigator && n.navigator.userAgent) || e) && o(a.prototype, "positionItem", function(e, t) {
                        var n = this,
                            r = function() {
                                t._legendItemPos && e.call(n, t)
                            };
                        r(),
                            n.bubbleLegend || setTimeout(r)
                    }),
                    a
            }