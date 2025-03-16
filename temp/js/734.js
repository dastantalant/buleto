 function (e, t, n) {
    "use strict";

    function r(e) {
        if (Array.isArray(e)) {
            for (var t = 0, n = Array(e.length); t < e.length; t++)
                n[t] = e[t];
            return n
        }
        return Array.from(e)
    }

    function o(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }

    function a(e, t) {
        if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" !== typeof t && "function" !== typeof t ? e : t
    }

    function i(e, t) {
        if ("function" !== typeof t && null !== t)
            throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }

    function s(e, t) {
        return e.map(function (e, n) {
            var r = 0 === n || 37 === n,
                o = t.v >= e.vf && t.v < e.vt ? "active" : "";
            return {
                to: e.vt,
                from: e.vf,
                color: "transparent",
                borderColor: r ? "transparent" : "#000",
                borderWidth: .4,
                id: n,
                label: {
                    text: r ? '<div style="color: ' + (0 === n ? y : b) + '; font-size: 1.2vh" class="magnitude-bar-item magnitude-bar-btn">' + (0 === n ? "&#9650;" : "&#9660;") + "</div>" : '<div class="plot-label ' + o + '"><span>' + e.vf.toFixed(5) + "</span><b>" + (e.c < 10 ? "&nbsp;&nbsp;" + e.c : e.c) + "</b></div>",
                    useHTML: !0,
                    align: "right",
                    x: -10,
                    verticalAlign: "middle"
                }
            }
        })
    }

    function l(e) {
        return e.map(function (e) {
            return [c(e.dt), e.v]
        })
    }

    function c(e) {
        return new Date(e).getTime()
    }
    var u = n(0),
        d = n.n(u),
        p = n(735),
        h = n.n(p),
        f = n(31),
        m = n(736),
        g = function () {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value" in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                }
            }
            return function (t, n, r) {
                return n && e(t.prototype, n),
                    r && e(t, r),
                    t
            }
        }(),
        y = "#52e72d",
        v = "#A08620",
        b = "red",
        _ = null,
        w = null,
        x = function (e) {
            function t() {
                var e, n, i, u;
                o(this, t);
                for (var d = arguments.length, p = Array(d), g = 0; g < d; g++)
                    p[g] = arguments[g];
                return n = i = a(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(p))),
                    i.state = {
                        lastFactor: i.props.factors[i.props.factors.length - 1],
                        options: {
                            time: {
                                useUTC: !1
                            },
                            title: {
                                text: ""
                            },
                            xAxis: {
                                type: "datetime",
                                labels: {
                                    format: "{value:%H:%M:%S}",
                                    step: 0
                                },
                                plotLines: [{
                                    value: 0,
                                    color: y,
                                    dashStyle: "shortdash",
                                    width: 1.5,
                                    zIndex: 10,
                                    label: {
                                        text: '<div><img width="20px" height="20px" src="/img/betting-start-line.png"/></div>',
                                        align: "center",
                                        verticalAlign: "bottom",
                                        useHTML: !0,
                                        rotation: 0,
                                        x: 0,
                                        y: -8
                                    }
                                }, {
                                    value: 0,
                                    color: v,
                                    dashStyle: "shortdash",
                                    width: 1.5,
                                    zIndex: 10,
                                    label: {
                                        text: '<div><img width="20px" height="20px" src="/img/betting-close-line.png"/></div>',
                                        align: "center",
                                        verticalAlign: "bottom",
                                        useHTML: !0,
                                        rotation: 0,
                                        x: 9,
                                        y: -8
                                    }
                                }, {
                                    value: 0,
                                    color: b,
                                    width: 1.5,
                                    zIndex: 10,
                                    label: {
                                        text: '<div><img width="20px" height="20px" src="/img/betting-end-date-line.png"/></div>',
                                        align: "center",
                                        verticalAlign: "bottom",
                                        useHTML: !0,
                                        rotation: 0,
                                        x: 9,
                                        y: -8
                                    }
                                }]
                            },
                            yAxis: {
                                opposite: !0,
                                title: {
                                    text: ""
                                },
                                labels: {
                                    enabled: !1
                                },
                                plotLines: [{
                                    value: 0,
                                    color: y,
                                    dashStyle: "shortdash",
                                    width: 0,
                                    zIndex: 11
                                }]
                            },
                            exporting: {
                                enabled: !1
                            },
                            legend: {
                                enabled: !1
                            },
                            plotOptions: {
                                series: {
                                    enableMouseTracking: !1
                                },
                                area: {
                                    color: "#fff",
                                    fillColor: {
                                        linearGradient: {
                                            x1: 0,
                                            y1: 0,
                                            x2: 0,
                                            y2: 1
                                        },
                                        stops: [
                                            [0, "rgba(255,255,255,1)"],
                                            [1, "rgba(0,0,0,0)"]
                                        ]
                                    },
                                    marker: {
                                        radius: 0
                                    },
                                    lineWidth: 2,
                                    threshold: null
                                }
                            },
                            series: [{
                                type: "area",
                                data: function () {
                                    return l(i.props.factors)
                                }(),
                                states: {
                                    hover: {
                                        enabled: !1
                                    }
                                }
                            }]
                        }
                    },
                    i.componentDidMount = function () {
                        i.createChart(),
                            i.timer = setInterval(i.updateGraph, 900),
                            window.addEventListener("orientationchange", i.orientationChange)
                    },
                    i.componentWillUnmount = function () {
                        clearInterval(i.timer),
                            window.removeEventListener("orientationchange", i.orientationChange)
                    },
                    i.afterChartCreated = function (e) {
                        i.chart = e,
                            i.updateGraph(),
                            i.updatePlotbands()
                    },
                    i.orientationChange = function () {
                        setTimeout(function () {
                            var e = (document.getElementById("graph-content") || {}).offsetWidth || 0,
                                t = (document.getElementById("graph-content") || {}).offsetHeight || 0;
                            i.chart.setSize(e, t, !0)
                        }, 1e3)
                    },
                    i.createChart = function () {
                        var e = i.state,
                            t = e.lastFactor,
                            n = void 0 === t ? {} : t,
                            r = e.options,
                            o = i.props.round,
                            a = (document.getElementById("graph-content") || {}).offsetHeight || 0,
                            l = s(o.get("factors"), n);
                        i.setState({
                            options: Object.assign({}, r, {
                                chart: Object.assign({}, r.chart, {
                                    height: a
                                }),
                                yAxis: Object.assign({}, r.yAxis, {
                                    plotBands: l
                                }, i.getTopBottom())
                            })
                        }, function () {
                            i.chart = h.a.chart("graph-content", i.state.options);
                            var e = document.createElement("DIV"),
                                t = document.createElement("SPAN"),
                                r = document.createElement("P");
                            t.innerText = n.v,
                                e.id = "bullet-wave",
                                e.appendChild(t),
                                e.appendChild(r),
                                document.getElementById("graph-content").appendChild(e)
                        })
                    },
                    i.updateGraph = function () {
                        var e = i.state.lastFactor,
                            t = void 0 === e ? {} : e,
                            n = i.props,
                            o = n.factors,
                            a = n.round,
                            s = n.prevCoupon,
                            u = i.chart,
                            d = a.toJS(),
                            p = d.startDate,
                            h = d.bettingCloseDate,
                            g = d.endDate,
                            y = d.status,
                            v = d.result,
                            b = (document.getElementById("graph-content") || {}).offsetWidth || 0,
                            _ = c(p),
                            w = c(h),
                            x = c(g),
                            E = o.findIndex(function (e) {
                                return e.v === t.v && c(t.dt) === c(e.dt)
                            }),
                            k = l(o.slice(Math.max(E + 1, 0)));
                        i.setState({
                            lastFactor: o[o.length - 1]
                        }, function () {
                            if (u) {
                                if (u.xAxis[0].options.plotLines[0].value = _,
                                    u.xAxis[0].options.plotLines[1].value = w,
                                    u.xAxis[0].options.plotLines[2].value = x,
                                    u.yAxis[0].setExtremes(i.getTopBottom().min, i.getTopBottom().max),
                                    u.xAxis[0].setExtremes(new Date((new Date).getTime() - 60 * (b < 600 ? 2 : 3) * 1e3).getTime(), new Date((new Date).getTime() + 1e3 * (b < 600 ? 80 : 30)).getTime()),
                                    y === f.c) {
                                    var e = [].concat(r(u.series[0].data)).reduce(function (e, t) {
                                        return Math.abs(t.x - x) < Math.abs(e.x - x) ? t : e
                                    });
                                    e && Object(m.a)({
                                        coupon: s,
                                        result: v,
                                        top: e.plotY.toFixed(1) - 70,
                                        left: e.plotX.toFixed(1) - 145
                                    })
                                } else {
                                    var t = document.getElementById("tooltip-graph-content");
                                    t && t.remove()
                                }
                                k.forEach(function (e) {
                                    u.series[0].addPoint(e, !0, !1)
                                })
                            }
                            i.updateBulletWave(),
                                setTimeout(function () {
                                    i.updatePlotbands()
                                }, 400)
                        })
                    },
                    i.updateBulletWave = function () {
                        try {
                            var e = i.state.lastFactor,
                                t = void 0 === e ? {} : e;
                            w || (w = document.getElementById("bullet-wave"));
                            var n = w,
                                r = w.getElementsByTagName("span")[0],
                                o = i.chart.series[0].points,
                                a = o[o.length - 1];
                            n.style.top = a.plotY - 40 + "px",
                                n.style.left = a.plotX - 40 + "px",
                                r.innerText = t.v
                        } catch (e) {
                            console.error(e.message)
                        }
                    },
                    i.updatePlotbands = function () {
                        var e = i.state.lastFactor,
                            t = void 0 === e ? {} : e,
                            n = i.chart,
                            r = i.props.round.toJS(),
                            o = r.factors,
                            a = s(o, t);
                        _ !== JSON.stringify(a) && (a.forEach(function (e) {
                            n.yAxis[0].removePlotBand(e.id),
                                n.yAxis[0].addPlotBand(e)
                        }),
                            _ = JSON.stringify(a))
                    },
                    i.getTopBottom = function () {
                        var e = i.props.round,
                            t = i.props.factors,
                            n = t[t.length - 1].v,
                            r = e.get("status"),
                            o = e.get("result"),
                            a = o ? o.v : void 0,
                            s = o ? o.c : void 0,
                            l = e.get("bottomValue");
                        n < l && (r === f.c || r > f.d) && (l = 0 === s ? a || n : n);
                        var c = e.get("topValue");
                        return n > c && (r === f.c || r > f.d) && (c = 37 === s ? a || n : n), {
                            min: l,
                            max: c
                        }
                    },
                    u = n,
                    a(i, u)
            }
            return i(t, e),
                g(t, [{
                    key: "render",
                    value: function () {
                        return d.a.createElement("div", {
                            className: "graph-content",
                            id: "graph-content"
                        })
                    }
                }]),
                t
        }(d.a.Component);
    t.a = x
}