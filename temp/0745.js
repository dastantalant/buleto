)            t(n "Extensions/ScrollablePlotArea.js" [n["Core/Animation/AnimationUtilities.js"] n["Core/Axis/Axis.js"] n["Core/Chart/Chart.js"] n["Core/Series/Series.js"] n["Core/Renderer/RendererRegistry.js"] n["Core/Utilities.js"]] function(e, t, n, r, o, a) {
                var i = e.stop,
                    s = a.addEvent,
                    l = a.createElement,
                    c = a.merge,
                    u = a.pick;
                s(n, "afterSetChartSize", function(e) {
                        var n = this.options.chart.scrollablePlotArea,
                            r = n && n.minWidth;
                        if (n = n && n.minHeight, !this.renderer.forExport) {
                            if (r) {
                                if (this.scrollablePixelsX = r = Math.max(0, r - this.chartWidth)) {
                                    this.scrollablePlotBox = this.renderer.scrollablePlotBox = c(this.plotBox),
                                        this.plotBox.width = this.plotWidth += r,
                                        this.inverted ? this.clipBox.height += r : this.clipBox.width += r;
                                    var o = {
                                        1: {
                                            name: "right",
                                            value: r
                                        }
                                    }
                                }
                            } else
                                n && (this.scrollablePixelsY = r = Math.max(0, n - this.chartHeight)) && (this.scrollablePlotBox = this.renderer.scrollablePlotBox = c(this.plotBox),
                                    this.plotBox.height = this.plotHeight += r,
                                    this.inverted ? this.clipBox.width += r : this.clipBox.height += r,
                                    o = {
                                        2: {
                                            name: "bottom",
                                            value: r
                                        }
                                    });
                            o && !e.skipAxes && this.axes.forEach(function(e) {
                                o[e.side] ? e.getPlotLinePath = function() {
                                        var n = o[e.side].name,
                                            r = this[n];
                                        this[n] = r - o[e.side].value;
                                        var a = t.prototype.getPlotLinePath.apply(this, arguments);
                                        return this[n] = r,
                                            a
                                    } :
                                    (e.setAxisSize(),
                                        e.setAxisTranslation())
                            })
                        }
                    }),
                    s(n, "render", function() {
                        this.scrollablePixelsX || this.scrollablePixelsY ? (this.setUpScrolling && this.setUpScrolling(),
                            this.applyFixed()) : this.fixedDiv && this.applyFixed()
                    }),
                    n.prototype.setUpScrolling = function() {
                        var e = this,
                            t = {
                                WebkitOverflowScrolling: "touch",
                                overflowX: "hidden",
                                overflowY: "hidden"
                            };
                        this.scrollablePixelsX && (t.overflowX = "auto"),
                            this.scrollablePixelsY && (t.overflowY = "auto"),
                            this.scrollingParent = l("div", {
                                className: "highcharts-scrolling-parent"
                            }, {
                                position: "relative"
                            }, this.renderTo),
                            this.scrollingContainer = l("div", {
                                className: "highcharts-scrolling"
                            }, t, this.scrollingParent),
                            s(this.scrollingContainer, "scroll", function() {
                                e.pointer && delete e.pointer.chartPosition
                            }),
                            this.innerContainer = l("div", {
                                className: "highcharts-inner-container"
                            }, null, this.scrollingContainer),
                            this.innerContainer.appendChild(this.container),
                            this.setUpScrolling = null
                    },
                    n.prototype.moveFixedElements = function() {
                        var e, t = this.container,
                            n = this.fixedRenderer,
                            r = ".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-drillup-button .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(" ");
                        this.scrollablePixelsX && !this.inverted ? e = ".highcharts-yaxis" : this.scrollablePixelsX && this.inverted ? e = ".highcharts-xaxis" : this.scrollablePixelsY && !this.inverted ? e = ".highcharts-xaxis" : this.scrollablePixelsY && this.inverted && (e = ".highcharts-yaxis"),
                            e && r.push(e + ":not(.highcharts-radial-axis)", e + "-labels:not(.highcharts-radial-axis-labels)"),
                            r.forEach(function(e) {
                                [].forEach.call(t.querySelectorAll(e), function(e) {
                                    (e.namespaceURI === n.SVG_NS ? n.box : n.box.parentNode).appendChild(e),
                                        e.style.pointerEvents = "auto"
                                })
                            })
                    },
                    n.prototype.applyFixed = function() {
                        var e = !this.fixedDiv,
                            t = this.options.chart,
                            n = t.scrollablePlotArea,
                            r = o.getRendererType();
                        e ? (this.fixedDiv = l("div", {
                                    className: "highcharts-fixed"
                                }, {
                                    position: "absolute",
                                    overflow: "hidden",
                                    pointerEvents: "none",
                                    zIndex: (t.style && t.style.zIndex || 0) + 2,
                                    top: 0
                                }, null, !0),
                                this.scrollingContainer && this.scrollingContainer.parentNode.insertBefore(this.fixedDiv, this.scrollingContainer),
                                this.renderTo.style.overflow = "visible",
                                this.fixedRenderer = t = new r(this.fixedDiv, this.chartWidth, this.chartHeight, this.options.chart.style),
                                this.scrollableMask = t.path().attr({
                                    fill: this.options.chart.backgroundColor || "#fff",
                                    "fill-opacity": u(n.opacity, .85),
                                    zIndex: -1
                                }).addClass("highcharts-scrollable-mask").add(),
                                s(this, "afterShowResetZoom", this.moveFixedElements),
                                s(this, "afterDrilldown", this.moveFixedElements),
                                s(this, "afterLayOutTitles", this.moveFixedElements)) : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight),
                            (this.scrollableDirty || e) && (this.scrollableDirty = !1,
                                this.moveFixedElements()),
                            t = this.chartWidth + (this.scrollablePixelsX || 0),
                            r = this.chartHeight + (this.scrollablePixelsY || 0),
                            i(this.container),
                            this.container.style.width = t + "px",
                            this.container.style.height = r + "px",
                            this.renderer.boxWrapper.attr({
                                width: t,
                                height: r,
                                viewBox: [0, 0, t, r].join(" ")
                            }),
                            this.chartBackground.attr({
                                width: t,
                                height: r
                            }),
                            this.scrollingContainer.style.height = this.chartHeight + "px",
                            e && (n.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * n.scrollPositionX),
                                n.scrollPositionY && (this.scrollingContainer.scrollTop = this.scrollablePixelsY * n.scrollPositionY)),
                            r = this.axisOffset,
                            e = this.plotTop - r[0] - 1,
                            n = this.plotLeft - r[3] - 1,
                            t = this.plotTop + this.plotHeight + r[2] + 1,
                            r = this.plotLeft + this.plotWidth + r[1] + 1;
                        var a = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
                            c = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
                        e = this.scrollablePixelsX ? [
                                ["M", 0, e],
                                ["L", this.plotLeft - 1, e],
                                ["L", this.plotLeft - 1, t],
                                ["L", 0, t],
                                ["Z"],
                                ["M", a, e],
                                ["L", this.chartWidth, e],
                                ["L", this.chartWidth, t],
                                ["L", a, t],
                                ["Z"]
                            ] : this.scrollablePixelsY ? [
                                ["M", n, 0],
                                ["L", n, this.plotTop - 1],
                                ["L", r, this.plotTop - 1],
                                ["L", r, 0],
                                ["Z"],
                                ["M", n, c],
                                ["L", n, this.chartHeight],
                                ["L", r, this.chartHeight],
                                ["L", r, c],
                                ["Z"]
                            ] : [
                                ["M", 0, 0]
                            ],
                            "adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({
                                d: e
                            })
                    },
                    s(t, "afterInit", function() {
                        this.chart.scrollableDirty = !0
                    }),
                    s(r, "show", function() {
                        this.chart.scrollableDirty = !0
                    })
            }