)            t(n "Core/Series/SeriesDefaults.js" [n["Core/Color/Palette.js"]] function(e) {
                return {
                    lineWidth: 2,
                    allowPointSelect: !1,
                    crisp: !0,
                    showCheckbox: !1,
                    animation: {
                        duration: 1e3
                    },
                    events: {},
                    marker: {
                        enabledThreshold: 2,
                        lineColor: e.backgroundColor,
                        lineWidth: 0,
                        radius: 4,
                        states: {
                            normal: {
                                animation: !0
                            },
                            hover: {
                                animation: {
                                    duration: 50
                                },
                                enabled: !0,
                                radiusPlus: 2,
                                lineWidthPlus: 1
                            },
                            select: {
                                fillColor: e.neutralColor20,
                                lineColor: e.neutralColor100,
                                lineWidth: 2
                            }
                        }
                    },
                    point: {
                        events: {}
                    },
                    dataLabels: {
                        animation: {},
                        align: "center",
                        defer: !0,
                        formatter: function() {
                            var e = this.series.chart.numberFormatter;
                            return "number" !== typeof this.y ? "" : e(this.y, -1)
                        },
                        padding: 5,
                        style: {
                            fontSize: "11px",
                            fontWeight: "bold",
                            color: "contrast",
                            textOutline: "1px contrast"
                        },
                        verticalAlign: "bottom",
                        x: 0,
                        y: 0
                    },
                    cropThreshold: 300,
                    opacity: 1,
                    pointRange: 0,
                    softThreshold: !0,
                    states: {
                        normal: {
                            animation: !0
                        },
                        hover: {
                            animation: {
                                duration: 50
                            },
                            lineWidthPlus: 1,
                            marker: {},
                            halo: {
                                size: 10,
                                opacity: .25
                            }
                        },
                        select: {
                            animation: {
                                duration: 0
                            }
                        },
                        inactive: {
                            animation: {
                                duration: 50
                            },
                            opacity: .2
                        }
                    },
                    stickyTracking: !0,
                    turboThreshold: 1e3,
                    findNearestPointBy: "x"
                }
            }