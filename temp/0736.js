function(e, t, n) {
    "use strict";
    var r;
    ! function(o, a) {
        "object" === typeof e && e.exports ? (a.default = a,
            e.exports = o.document ? a(o) : a) : void 0 !== (r = function() {
                return a(o)
            }
            .call(t, n, t, e)) && (e.exports = r)
    }("undefined" !== typeof window ? window : this, function(e) {
        function t(e, t, n, r) {
            e.hasOwnProperty(t) || (e[t] = r.apply(null, n))
        }
        var n = {};
        return t(n, "Core/Globals.js", [], function() {
                var t, n = "undefined" !== typeof e ? e : "undefined" !== typeof window ? window : {};
                return function(e) {
                        e.SVG_NS = "http://www.w3.org/2000/svg",
                            e.product = "Highcharts",
                            e.version = "9.2.2",
                            e.win = n,
                            e.doc = e.win.document,
                            e.svg = e.doc && e.doc.createElementNS && !!e.doc.createElementNS(e.SVG_NS, "svg").createSVGRect,
                            e.userAgent = e.win.navigator && e.win.navigator.userAgent || "",
                            e.isChrome = -1 !== e.userAgent.indexOf("Chrome"),
                            e.isFirefox = -1 !== e.userAgent.indexOf("Firefox"),
                            e.isMS = /(edge|msie|trident)/i.test(e.userAgent) && !e.win.opera,
                            e.isSafari = !e.isChrome && -1 !== e.userAgent.indexOf("Safari"),
                            e.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(e.userAgent),
                            e.isWebKit = -1 !== e.userAgent.indexOf("AppleWebKit"),
                            e.deg2rad = 2 * Math.PI / 360,
                            e.hasBidiBug = e.isFirefox && 4 > parseInt(e.userAgent.split("Firefox/")[1], 10),
                            e.hasTouch = !!e.win.TouchEvent,
                            e.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"],
                            e.noop = function() {},
                            e.supportsPassiveEvents = function() {
                                var t = !1;
                                if (!e.isMS) {
                                    var n = Object.defineProperty({}, "passive", {
                                        get: function() {
                                            t = !0
                                        }
                                    });
                                    e.win.addEventListener && e.win.removeEventListener && (e.win.addEventListener("testPassive", e.noop, n),
                                        e.win.removeEventListener("testPassive", e.noop, n))
                                }
                                return t
                            }(),
                            e.charts = [],
                            e.dateFormats = {},
                            e.seriesTypes = {},
                            e.symbolSizes = {},
                            e.chartCount = 0
                    }(t || (t = {})),
                    t
            }),
            t(n, "Core/Utilities.js", [n["Core/Globals.js"]], function(e) {
                function t(n, r, o, a) {
                    var i = r ? "Highcharts error" : "Highcharts warning";
                    32 === n && (n = i + ": Deprecated member");
                    var s = c(n),
                        l = s ? i + " #" + n + ": www.highcharts.com/errors/" + n + "/" : n.toString();
                    if ("undefined" !== typeof a) {
                        var u = "";
                        s && (l += "?"),
                            v(a, function(e, t) {
                                u += "\n - " + t + ": " + e,
                                    s && (l += encodeURI(t) + "=" + encodeURI(e))
                            }),
                            l += u
                    }
                    _(e, "displayError", {
                            chart: o,
                            code: n,
                            message: l,
                            params: a
                        }, function() {
                            if (r)
                                throw Error(l);
                            E.console && -1 === t.messages.indexOf(l) && console.warn(l)
                        }),
                        t.messages.push(l)
                }

                function n(e, t) {
                    var r = {};
                    return v(e, function(o, a) {
                            i(e[a], !0) && !e.nodeType && t[a] ? (o = n(e[a], t[a]),
                                Object.keys(o).length && (r[a] = o)) : (i(e[a]) || e[a] !== t[a]) && (r[a] = e[a])
                        }),
                        r
                }

                function r(e, t) {
                    return parseInt(e, t || 10)
                }

                function o(e) {
                    return "string" === typeof e
                }

                function a(e) {
                    return "[object Array]" === (e = Object.prototype.toString.call(e)) || "[object Array Iterator]" === e
                }

                function i(e, t) {
                    return !!e && "object" === typeof e && (!t || !a(e))
                }

                function s(e) {
                    return i(e) && "number" === typeof e.nodeType
                }

                function l(e) {
                    var t = e && e.constructor;
                    return !(!i(e, !0) || s(e) || !t || !t.name || "Object" === t.name)
                }

                function c(e) {
                    return "number" === typeof e && !isNaN(e) && 1 / 0 > e && -1 / 0 < e
                }

                function u(e) {
                    return "undefined" !== typeof e && null !== e
                }

                function d(e, t, n) {
                    var r;
                    return o(t) ? u(n) ? e.setAttribute(t, n) : e && e.getAttribute && ((r = e.getAttribute(t)) || "class" !== t || (r = e.getAttribute(t + "Name"))) : v(t, function(t, n) {
                            e.setAttribute(n, t)
                        }),
                        r
                }

                function p(e, t) {
                    var n;
                    e || (e = {});
                    for (n in t)
                        e[n] = t[n];
                    return e
                }

                function h() {
                    for (var e = arguments, t = e.length, n = 0; n < t; n++) {
                        var r = e[n];
                        if ("undefined" !== typeof r && null !== r)
                            return r
                    }
                }

                function f(t, n) {
                    e.isMS && !e.svg && n && "undefined" !== typeof n.opacity && (n.filter = "alpha(opacity=" + 100 * n.opacity + ")"),
                        p(t.style, n)
                }

                function m(e, t, n, r, o) {
                    return e = x.createElement(e),
                        t && p(e, t),
                        o && f(e, {
                            padding: "0",
                            border: "none",
                            margin: "0"
                        }),
                        n && f(e, n),
                        r && r.appendChild(e),
                        e
                }

                function g(e, t) {
                    return parseFloat(e.toPrecision(t || 14))
                }

                function y(n, o, a) {
                    var i = e.getStyle || y;
                    if ("width" === o)
                        return o = Math.min(n.offsetWidth, n.scrollWidth),
                            a = n.getBoundingClientRect && n.getBoundingClientRect().width,
                            a < o && a >= o - 1 && (o = Math.floor(a)),
                            Math.max(0, o - (i(n, "padding-left", !0) || 0) - (i(n, "padding-right", !0) || 0));
                    if ("height" === o)
                        return Math.max(0, Math.min(n.offsetHeight, n.scrollHeight) - (i(n, "padding-top", !0) || 0) - (i(n, "padding-bottom", !0) || 0));
                    if (E.getComputedStyle || t(27, !0),
                        n = E.getComputedStyle(n, void 0)) {
                        var s = n.getPropertyValue(o);
                        h(a, "opacity" !== o) && (s = r(s))
                    }
                    return s
                }

                function v(e, t, n) {
                    for (var r in e)
                        Object.hasOwnProperty.call(e, r) && t.call(n || e[r], e[r], r, e)
                }

                function b(t, n, r) {
                    function o(n, r) {
                        var o = t.removeEventListener || e.removeEventListenerPolyfill;
                        o && o.call(t, n, r, !1)
                    }

                    function a(e) {
                        var r;
                        if (t.nodeName) {
                            if (n) {
                                var a = {};
                                a[n] = !0
                            } else
                                a = e;
                            v(a, function(t, n) {
                                if (e[n])
                                    for (r = e[n].length; r--;)
                                        o(n, e[n][r].fn)
                            })
                        }
                    }
                    var i = "function" === typeof t && t.prototype || t;
                    if (Object.hasOwnProperty.call(i, "hcEvents")) {
                        var s = i.hcEvents;
                        n ? (i = s[n] || [],
                            r ? (s[n] = i.filter(function(e) {
                                    return r !== e.fn
                                }),
                                o(n, r)) : (a(s),
                                s[n] = [])) : (a(s),
                            delete i.hcEvents)
                    }
                }

                function _(t, n, r, o) {
                    if (r = r || {},
                        x.createEvent && (t.dispatchEvent || t.fireEvent && t !== e)) {
                        var a = x.createEvent("Events");
                        a.initEvent(n, !0, !0),
                            r = p(a, r),
                            t.dispatchEvent ? t.dispatchEvent(r) : t.fireEvent(n, r)
                    } else if (t.hcEvents) {
                        r.target || p(r, {
                                preventDefault: function() {
                                    r.defaultPrevented = !0
                                },
                                target: t,
                                type: n
                            }),
                            a = [];
                        for (var i = t, s = !1; i.hcEvents;)
                            Object.hasOwnProperty.call(i, "hcEvents") && i.hcEvents[n] && (a.length && (s = !0),
                                a.unshift.apply(a, i.hcEvents[n])),
                            i = Object.getPrototypeOf(i);
                        s && a.sort(function(e, t) {
                                return e.order - t.order
                            }),
                            a.forEach(function(e) {
                                !1 === e.fn.call(t, r) && r.preventDefault()
                            })
                    }
                    o && !r.defaultPrevented && o.call(t, r)
                }
                var w = e.charts,
                    x = e.doc,
                    E = e.win;
                (t || (t = {})).messages = [];
                var k;
                Math.easeInOutSine = function(e) {
                    return -.5 * (Math.cos(Math.PI * e) - 1)
                };
                var S = Array.prototype.find ? function(e, t) {
                        return e.find(t)
                    } :
                    function(e, t) {
                        var n, r = e.length;
                        for (n = 0; n < r; n++)
                            if (t(e[n], n))
                                return e[n]
                    };
                v({
                    map: "map",
                    each: "forEach",
                    grep: "filter",
                    reduce: "reduce",
                    some: "some"
                }, function(n, r) {
                    e[r] = function(e) {
                        var o;
                        return t(32, !1, void 0, (o = {},
                                o["Highcharts." + r] = "use Array." + n,
                                o)),
                            Array.prototype[n].apply(e, [].slice.call(arguments, 1))
                    }
                });
                var O, C = function() {
                    var e = Math.random().toString(36).substring(2, 9) + "-",
                        t = 0;
                    return function() {
                        return "highcharts-" + (O ? "" : e) + t++
                    }
                }();
                return E.jQuery && (E.jQuery.fn.highcharts = function() {
                        var t = [].slice.call(arguments);
                        if (this[0])
                            return t[0] ? (new(e[o(t[0]) ? t.shift() : "Chart"])(this[0], t[0], t[1]),
                                this) : w[d(this[0], "data-highcharts-chart")]
                    }),
                    S = {
                        addEvent: function(t, n, r, o) {
                            void 0 === o && (o = {});
                            var a = "function" === typeof t && t.prototype || t;
                            Object.hasOwnProperty.call(a, "hcEvents") || (a.hcEvents = {}),
                                a = a.hcEvents,
                                e.Point && t instanceof e.Point && t.series && t.series.chart && (t.series.chart.runTrackerClick = !0);
                            var i = t.addEventListener || e.addEventListenerPolyfill;
                            return i && i.call(t, n, r, !!e.supportsPassiveEvents && {
                                    passive: void 0 === o.passive ? -1 !== n.indexOf("touch") : o.passive,
                                    capture: !1
                                }),
                                a[n] || (a[n] = []),
                                a[n].push({
                                    fn: r,
                                    order: "number" === typeof o.order ? o.order : 1 / 0
                                }),
                                a[n].sort(function(e, t) {
                                    return e.order - t.order
                                }),
                                function() {
                                    b(t, n, r)
                                }
                        },
                        arrayMax: function(e) {
                            for (var t = e.length, n = e[0]; t--;)
                                e[t] > n && (n = e[t]);
                            return n
                        },
                        arrayMin: function(e) {
                            for (var t = e.length, n = e[0]; t--;)
                                e[t] < n && (n = e[t]);
                            return n
                        },
                        attr: d,
                        clamp: function(e, t, n) {
                            return e > t ? e < n ? e : n : t
                        },
                        cleanRecursively: n,
                        clearTimeout: function(e) {
                            u(e) && clearTimeout(e)
                        },
                        correctFloat: g,
                        createElement: m,
                        css: f,
                        defined: u,
                        destroyObjectProperties: function(e, t) {
                            v(e, function(n, r) {
                                n && n !== t && n.destroy && n.destroy(),
                                    delete e[r]
                            })
                        },
                        discardElement: function(e) {
                            k || (k = m("div")),
                                e && k.appendChild(e),
                                k.innerHTML = ""
                        },
                        erase: function(e, t) {
                            for (var n = e.length; n--;)
                                if (e[n] === t) {
                                    e.splice(n, 1);
                                    break
                                }
                        },
                        error: t,
                        extend: p,
                        extendClass: function(e, t) {
                            var n = function() {};
                            return n.prototype = new e,
                                p(n.prototype, t),
                                n
                        },
                        find: S,
                        fireEvent: _,
                        getMagnitude: function(e) {
                            return Math.pow(10, Math.floor(Math.log(e) / Math.LN10))
                        },
                        getNestedProperty: function(e, t) {
                            for (e = e.split("."); e.length && u(t);) {
                                var n = e.shift();
                                if ("undefined" === typeof n || "__proto__" === n)
                                    return;
                                if (t = t[n], !u(t) || "function" === typeof t || "number" === typeof t.nodeType || t === E)
                                    return
                            }
                            return t
                        },
                        getStyle: y,
                        inArray: function(e, n, r) {
                            return t(32, !1, void 0, {
                                    "Highcharts.inArray": "use Array.indexOf"
                                }),
                                n.indexOf(e, r)
                        },
                        isArray: a,
                        isClass: l,
                        isDOMElement: s,
                        isFunction: function(e) {
                            return "function" === typeof e
                        },
                        isNumber: c,
                        isObject: i,
                        isString: o,
                        keys: function(e) {
                            return t(32, !1, void 0, {
                                    "Highcharts.keys": "use Object.keys"
                                }),
                                Object.keys(e)
                        },
                        merge: function() {
                            var e, t = arguments,
                                n = {},
                                r = function(e, t) {
                                    return "object" !== typeof e && (e = {}),
                                        v(t, function(n, o) {
                                            "__proto__" !== o && "constructor" !== o && (!i(n, !0) || l(n) || s(n) ? e[o] = t[o] : e[o] = r(e[o] || {}, n))
                                        }),
                                        e
                                };
                            !0 === t[0] && (n = t[1],
                                t = Array.prototype.slice.call(t, 2));
                            var o = t.length;
                            for (e = 0; e < o; e++)
                                n = r(n, t[e]);
                            return n
                        },
                        normalizeTickInterval: function(e, t, n, r, o) {
                            var a = e;
                            n = h(n, 1);
                            var i = e / n;
                            for (t || (t = o ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === r && (1 === n ? t = t.filter(function(e) {
                                    return 0 === e % 1
                                }) : .1 >= n && (t = [1 / n]))),
                                r = 0; r < t.length && (a = t[r], !(o && a * n >= e || !o && i <= (t[r] + (t[r + 1] || t[r])) / 2)); r++)
                            ;
                            return a = g(a * n, -Math.round(Math.log(.001) / Math.LN10))
                        },
                        objectEach: v,
                        offset: function(e) {
                            var t = x.documentElement;
                            return e = e.parentElement || e.parentNode ? e.getBoundingClientRect() : {
                                top: 0,
                                left: 0,
                                width: 0,
                                height: 0
                            }, {
                                top: e.top + (E.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                                left: e.left + (E.pageXOffset || t.scrollLeft) - (t.clientLeft || 0),
                                width: e.width,
                                height: e.height
                            }
                        },
                        pad: function(e, t, n) {
                            return Array((t || 2) + 1 - String(e).replace("-", "").length).join(n || "0") + e
                        },
                        pick: h,
                        pInt: r,
                        relativeLength: function(e, t, n) {
                            return /%$/.test(e) ? t * parseFloat(e) / 100 + (n || 0) : parseFloat(e)
                        },
                        removeEvent: b,
                        splat: function(e) {
                            return a(e) ? e : [e]
                        },
                        stableSort: function(e, t) {
                            var n, r, o = e.length;
                            for (r = 0; r < o; r++)
                                e[r].safeI = r;
                            for (e.sort(function(e, r) {
                                    return n = t(e, r),
                                        0 === n ? e.safeI - r.safeI : n
                                }),
                                r = 0; r < o; r++)
                                delete e[r].safeI
                        },
                        syncTimeout: function(e, t, n) {
                            return 0 < t ? setTimeout(e, t, n) : (e.call(0, n), -1)
                        },
                        timeUnits: {
                            millisecond: 1,
                            second: 1e3,
                            minute: 6e4,
                            hour: 36e5,
                            day: 864e5,
                            week: 6048e5,
                            month: 24192e5,
                            year: 314496e5
                        },
                        uniqueKey: C,
                        useSerialIds: function(e) {
                            return O = h(e, O)
                        },
                        wrap: function(e, t, n) {
                            var r = e[t];
                            e[t] = function() {
                                var e = Array.prototype.slice.call(arguments),
                                    t = arguments,
                                    o = this;
                                return o.proceed = function() {
                                        r.apply(o, arguments.length ? arguments : t)
                                    },
                                    e.unshift(r),
                                    e = n.apply(this, e),
                                    o.proceed = null,
                                    e
                            }
                        }
                    }
            }),
            t(n, "Core/Color/Palette.js", [], function() {
                return {
                    colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
                    backgroundColor: "#ffffff",
                    neutralColor100: "#000000",
                    neutralColor80: "#333333",
                    neutralColor60: "#666666",
                    neutralColor40: "#999999",
                    neutralColor20: "#cccccc",
                    neutralColor10: "#e6e6e6",
                    neutralColor5: "#f2f2f2",
                    neutralColor3: "#f7f7f7",
                    highlightColor100: "#003399",
                    highlightColor80: "#335cad",
                    highlightColor60: "#6685c2",
                    highlightColor20: "#ccd6eb",
                    highlightColor10: "#e6ebf5",
                    positiveColor: "#06b535",
                    negativeColor: "#f21313"
                }
            }),
            t(n, "Core/Chart/ChartDefaults.js", [n["Core/Color/Palette.js"]], function(e) {
                return {
                    panning: {
                        enabled: !1,
                        type: "x"
                    },
                    styledMode: !1,
                    borderRadius: 0,
                    colorCount: 10,
                    defaultSeriesType: "line",
                    ignoreHiddenSeries: !0,
                    spacing: [10, 10, 15, 10],
                    resetZoomButton: {
                        theme: {
                            zIndex: 6
                        },
                        position: {
                            align: "right",
                            x: -10,
                            y: 10
                        }
                    },
                    zoomBySingleTouch: !1,
                    width: null,
                    height: null,
                    borderColor: e.highlightColor80,
                    backgroundColor: e.backgroundColor,
                    plotBorderColor: e.neutralColor20
                }
            }),
            t(n, "Core/Color/Color.js", [n["Core/Globals.js"], n["Core/Utilities.js"]], function(e, t) {
                var n = t.isNumber,
                    r = t.merge,
                    o = t.pInt;
                return t = function() {
                    function t(n) {
                        this.rgba = [NaN, NaN, NaN, NaN],
                            this.input = n;
                        var r = e.Color;
                        return r && r !== t ? new r(n) : this instanceof t ? void this.init(n) : new t(n)
                    }
                    return t.parse = function(e) {
                            return e ? new t(e) : t.None
                        },
                        t.prototype.init = function(e) {
                            var n;
                            if ("object" === typeof e && "undefined" !== typeof e.stops)
                                this.stops = e.stops.map(function(e) {
                                    return new t(e[1])
                                });
                            else if ("string" === typeof e) {
                                if (this.input = e = t.names[e.toLowerCase()] || e,
                                    "#" === e.charAt(0)) {
                                    var r = e.length,
                                        o = parseInt(e.substr(1), 16);
                                    7 === r ? n = [(16711680 & o) >> 16, (65280 & o) >> 8, 255 & o, 1] : 4 === r && (n = [(3840 & o) >> 4 | (3840 & o) >> 8, (240 & o) >> 4 | 240 & o, (15 & o) << 4 | 15 & o, 1])
                                }
                                if (!n)
                                    for (o = t.parsers.length; o-- && !n;) {
                                        var a = t.parsers[o];
                                        (r = a.regex.exec(e)) && (n = a.parse(r))
                                    }
                            }
                            n && (this.rgba = n)
                        },
                        t.prototype.get = function(e) {
                            var t = this.input,
                                o = this.rgba;
                            if ("object" === typeof t && "undefined" !== typeof this.stops) {
                                var a = r(t);
                                return a.stops = [].slice.call(a.stops),
                                    this.stops.forEach(function(t, n) {
                                        a.stops[n] = [a.stops[n][0], t.get(e)]
                                    }),
                                    a
                            }
                            return o && n(o[0]) ? "rgb" === e || !e && 1 === o[3] ? "rgb(" + o[0] + "," + o[1] + "," + o[2] + ")" : "a" === e ? "" + o[3] : "rgba(" + o.join(",") + ")" : t
                        },
                        t.prototype.brighten = function(e) {
                            var t = this.rgba;
                            if (this.stops)
                                this.stops.forEach(function(t) {
                                    t.brighten(e)
                                });
                            else if (n(e) && 0 !== e)
                                for (var r = 0; 3 > r; r++)
                                    t[r] += o(255 * e),
                                    0 > t[r] && (t[r] = 0),
                                    255 < t[r] && (t[r] = 255);
                            return this
                        },
                        t.prototype.setOpacity = function(e) {
                            return this.rgba[3] = e,
                                this
                        },
                        t.prototype.tweenTo = function(e, t) {
                            var r = this.rgba,
                                o = e.rgba;
                            return n(r[0]) && n(o[0]) ? (e = 1 !== o[3] || 1 !== r[3],
                                (e ? "rgba(" : "rgb(") + Math.round(o[0] + (r[0] - o[0]) * (1 - t)) + "," + Math.round(o[1] + (r[1] - o[1]) * (1 - t)) + "," + Math.round(o[2] + (r[2] - o[2]) * (1 - t)) + (e ? "," + (o[3] + (r[3] - o[3]) * (1 - t)) : "") + ")") : e.input || "none"
                        },
                        t.names = {
                            white: "#ffffff",
                            black: "#000000"
                        },
                        t.parsers = [{
                            regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                            parse: function(e) {
                                return [o(e[1]), o(e[2]), o(e[3]), parseFloat(e[4], 10)]
                            }
                        }, {
                            regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                            parse: function(e) {
                                return [o(e[1]), o(e[2]), o(e[3]), 1]
                            }
                        }],
                        t.None = new t(""),
                        t
                }()
            }),
            t(n, "Core/Time.js", [n["Core/Globals.js"], n["Core/Utilities.js"]], function(e, t) {
                var n = e.win,
                    r = t.defined,
                    o = t.error,
                    a = t.extend,
                    i = t.isObject,
                    s = t.merge,
                    l = t.objectEach,
                    c = t.pad,
                    u = t.pick,
                    d = t.splat,
                    p = t.timeUnits,
                    h = e.isSafari && n.Intl && n.Intl.DateTimeFormat.prototype.formatRange,
                    f = e.isSafari && n.Intl && !n.Intl.DateTimeFormat.prototype.formatRange;
                return t = function() {
                    function t(e) {
                        this.options = {},
                            this.variableTimezone = this.useUTC = !1,
                            this.Date = n.Date,
                            this.getTimezoneOffset = this.timezoneOffsetFunction(),
                            this.update(e)
                    }
                    return t.prototype.get = function(e, t) {
                            if (this.variableTimezone || this.timezoneOffset) {
                                var n = t.getTime(),
                                    r = n - this.getTimezoneOffset(t);
                                return t.setTime(r),
                                    e = t["getUTC" + e](),
                                    t.setTime(n),
                                    e
                            }
                            return this.useUTC ? t["getUTC" + e]() : t["get" + e]()
                        },
                        t.prototype.set = function(e, t, n) {
                            if (this.variableTimezone || this.timezoneOffset) {
                                if ("Milliseconds" === e || "Seconds" === e || "Minutes" === e && 0 === this.getTimezoneOffset(t) % 36e5)
                                    return t["setUTC" + e](n);
                                var r = this.getTimezoneOffset(t);
                                return r = t.getTime() - r,
                                    t.setTime(r),
                                    t["setUTC" + e](n),
                                    e = this.getTimezoneOffset(t),
                                    r = t.getTime() + e,
                                    t.setTime(r)
                            }
                            return this.useUTC || h && "FullYear" === e ? t["setUTC" + e](n) : t["set" + e](n)
                        },
                        t.prototype.update = function(e) {
                            var t = u(e && e.useUTC, !0);
                            this.options = e = s(!0, this.options || {}, e),
                                this.Date = e.Date || n.Date || Date,
                                this.timezoneOffset = (this.useUTC = t) && e.timezoneOffset,
                                this.getTimezoneOffset = this.timezoneOffsetFunction(),
                                this.variableTimezone = t && !(!e.getTimezoneOffset && !e.timezone)
                        },
                        t.prototype.makeTime = function(e, t, n, r, o, a) {
                            if (this.useUTC) {
                                var i = this.Date.UTC.apply(0, arguments),
                                    s = this.getTimezoneOffset(i);
                                i += s;
                                var l = this.getTimezoneOffset(i);
                                s !== l ? i += l - s : s - 36e5 !== this.getTimezoneOffset(i - 36e5) || f || (i -= 36e5)
                            } else
                                i = new this.Date(e, t, u(n, 1), u(r, 0), u(o, 0), u(a, 0)).getTime();
                            return i
                        },
                        t.prototype.timezoneOffsetFunction = function() {
                            var e = this,
                                t = this.options,
                                r = t.moment || n.moment;
                            if (!this.useUTC)
                                return function(e) {
                                    return 6e4 * new Date(e.toString()).getTimezoneOffset()
                                };
                            if (t.timezone) {
                                if (r)
                                    return function(e) {
                                        return 6e4 * -r.tz(e, t.timezone).utcOffset()
                                    };
                                o(25)
                            }
                            return this.useUTC && t.getTimezoneOffset ? function(e) {
                                    return 6e4 * t.getTimezoneOffset(e.valueOf())
                                } :
                                function() {
                                    return 6e4 * (e.timezoneOffset || 0)
                                }
                        },
                        t.prototype.dateFormat = function(t, n, o) {
                            if (!r(n) || isNaN(n))
                                return e.defaultOptions.lang && e.defaultOptions.lang.invalidDate || "";
                            t = u(t, "%Y-%m-%d %H:%M:%S");
                            var i = this,
                                s = new this.Date(n),
                                d = this.get("Hours", s),
                                p = this.get("Day", s),
                                h = this.get("Date", s),
                                f = this.get("Month", s),
                                m = this.get("FullYear", s),
                                g = e.defaultOptions.lang,
                                y = g && g.weekdays,
                                v = g && g.shortWeekdays;
                            return s = a({
                                    a: v ? v[p] : y[p].substr(0, 3),
                                    A: y[p],
                                    d: c(h),
                                    e: c(h, 2, " "),
                                    w: p,
                                    b: g.shortMonths[f],
                                    B: g.months[f],
                                    m: c(f + 1),
                                    o: f + 1,
                                    y: m.toString().substr(2, 2),
                                    Y: m,
                                    H: c(d),
                                    k: d,
                                    I: c(d % 12 || 12),
                                    l: d % 12 || 12,
                                    M: c(this.get("Minutes", s)),
                                    p: 12 > d ? "AM" : "PM",
                                    P: 12 > d ? "am" : "pm",
                                    S: c(s.getSeconds()),
                                    L: c(Math.floor(n % 1e3), 3)
                                }, e.dateFormats),
                                l(s, function(e, r) {
                                    for (; - 1 !== t.indexOf("%" + r);)
                                        t = t.replace("%" + r, "function" === typeof e ? e.call(i, n) : e)
                                }),
                                o ? t.substr(0, 1).toUpperCase() + t.substr(1) : t
                        },
                        t.prototype.resolveDTLFormat = function(e) {
                            return i(e, !0) ? e : (e = d(e), {
                                main: e[0],
                                from: e[1],
                                to: e[2]
                            })
                        },
                        t.prototype.getTimeTicks = function(e, t, n, o) {
                            var i, s = this,
                                l = [],
                                c = {},
                                d = new s.Date(t),
                                h = e.unitRange,
                                f = e.count || 1;
                            if (o = u(o, 1),
                                r(t)) {
                                if (s.set("Milliseconds", d, h >= p.second ? 0 : f * Math.floor(s.get("Milliseconds", d) / f)),
                                    h >= p.second && s.set("Seconds", d, h >= p.minute ? 0 : f * Math.floor(s.get("Seconds", d) / f)),
                                    h >= p.minute && s.set("Minutes", d, h >= p.hour ? 0 : f * Math.floor(s.get("Minutes", d) / f)),
                                    h >= p.hour && s.set("Hours", d, h >= p.day ? 0 : f * Math.floor(s.get("Hours", d) / f)),
                                    h >= p.day && s.set("Date", d, h >= p.month ? 1 : Math.max(1, f * Math.floor(s.get("Date", d) / f))),
                                    h >= p.month) {
                                    s.set("Month", d, h >= p.year ? 0 : f * Math.floor(s.get("Month", d) / f));
                                    var m = s.get("FullYear", d)
                                }
                                h >= p.year && s.set("FullYear", d, m - m % f),
                                    h === p.week && (m = s.get("Day", d),
                                        s.set("Date", d, s.get("Date", d) - m + o + (m < o ? -7 : 0))),
                                    m = s.get("FullYear", d),
                                    o = s.get("Month", d);
                                var g = s.get("Date", d),
                                    y = s.get("Hours", d);
                                for (t = d.getTime(), !s.variableTimezone && s.useUTC || !r(n) || (i = n - t > 4 * p.month || s.getTimezoneOffset(t) !== s.getTimezoneOffset(n)),
                                    t = d.getTime(),
                                    d = 1; t < n;)
                                    l.push(t),
                                    t = h === p.year ? s.makeTime(m + d * f, 0) : h === p.month ? s.makeTime(m, o + d * f) : !i || h !== p.day && h !== p.week ? i && h === p.hour && 1 < f ? s.makeTime(m, o, g, y + d * f) : t + h * f : s.makeTime(m, o, g + d * f * (h === p.day ? 1 : 7)),
                                    d++;
                                l.push(t),
                                    h <= p.hour && 1e4 > l.length && l.forEach(function(e) {
                                        0 === e % 18e5 && "000000000" === s.dateFormat("%H%M%S%L", e) && (c[e] = "day")
                                    })
                            }
                            return l.info = a(e, {
                                    higherRanks: c,
                                    totalRange: h * f
                                }),
                                l
                        },
                        t.prototype.getDateFormat = function(e, t, n, r) {
                            var o = this.dateFormat("%m-%d %H:%M:%S.%L", t),
                                a = {
                                    millisecond: 15,
                                    second: 12,
                                    minute: 9,
                                    hour: 6,
                                    day: 3
                                },
                                i = "millisecond";
                            for (s in p) {
                                if (e === p.week && +this.dateFormat("%w", t) === n && "00:00:00.000" === o.substr(6)) {
                                    var s = "week";
                                    break
                                }
                                if (p[s] > e) {
                                    s = i;
                                    break
                                }
                                if (a[s] && o.substr(a[s]) !== "01-01 00:00:00.000".substr(a[s]))
                                    break;
                                "week" !== s && (i = s)
                            }
                            if (s)
                                var l = this.resolveDTLFormat(r[s]).main;
                            return l
                        },
                        t
                }()
            }),
            t(n, "Core/DefaultOptions.js", [n["Core/Chart/ChartDefaults.js"], n["Core/Color/Color.js"], n["Core/Globals.js"], n["Core/Color/Palette.js"], n["Core/Time.js"], n["Core/Utilities.js"]], function(e, t, n, r, o, a) {
                t = t.parse;
                var i = a.merge,
                    s = {
                        colors: r.colors,
                        symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
                        lang: {
                            loading: "Loading...",
                            months: "January February March April May June July August September October November December".split(" "),
                            shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                            weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                            decimalPoint: ".",
                            numericSymbols: "kMGTPE".split(""),
                            resetZoom: "Reset zoom",
                            resetZoomTitle: "Reset zoom level 1:1",
                            thousandsSep: " "
                        },
                        global: {},
                        time: {
                            Date: void 0,
                            getTimezoneOffset: void 0,
                            timezone: void 0,
                            timezoneOffset: 0,
                            useUTC: !0
                        },
                        chart: e,
                        title: {
                            text: "Chart title",
                            align: "center",
                            margin: 15,
                            widthAdjust: -44
                        },
                        subtitle: {
                            text: "",
                            align: "center",
                            widthAdjust: -44
                        },
                        caption: {
                            margin: 15,
                            text: "",
                            align: "left",
                            verticalAlign: "bottom"
                        },
                        plotOptions: {},
                        labels: {
                            style: {
                                position: "absolute",
                                color: r.neutralColor80
                            }
                        },
                        legend: {
                            enabled: !0,
                            align: "center",
                            alignColumns: !0,
                            className: "highcharts-no-tooltip",
                            layout: "horizontal",
                            labelFormatter: function() {
                                return this.name
                            },
                            borderColor: r.neutralColor40,
                            borderRadius: 0,
                            navigation: {
                                activeColor: r.highlightColor100,
                                inactiveColor: r.neutralColor20
                            },
                            itemStyle: {
                                color: r.neutralColor80,
                                cursor: "pointer",
                                fontSize: "12px",
                                fontWeight: "bold",
                                textOverflow: "ellipsis"
                            },
                            itemHoverStyle: {
                                color: r.neutralColor100
                            },
                            itemHiddenStyle: {
                                color: r.neutralColor20
                            },
                            shadow: !1,
                            itemCheckboxStyle: {
                                position: "absolute",
                                width: "13px",
                                height: "13px"
                            },
                            squareSymbol: !0,
                            symbolPadding: 5,
                            verticalAlign: "bottom",
                            x: 0,
                            y: 0,
                            title: {
                                style: {
                                    fontWeight: "bold"
                                }
                            }
                        },
                        loading: {
                            labelStyle: {
                                fontWeight: "bold",
                                position: "relative",
                                top: "45%"
                            },
                            style: {
                                position: "absolute",
                                backgroundColor: r.backgroundColor,
                                opacity: .5,
                                textAlign: "center"
                            }
                        },
                        tooltip: {
                            enabled: !0,
                            animation: n.svg,
                            borderRadius: 3,
                            dateTimeLabelFormats: {
                                millisecond: "%A, %b %e, %H:%M:%S.%L",
                                second: "%A, %b %e, %H:%M:%S",
                                minute: "%A, %b %e, %H:%M",
                                hour: "%A, %b %e, %H:%M",
                                day: "%A, %b %e, %Y",
                                week: "Week from %A, %b %e, %Y",
                                month: "%B %Y",
                                year: "%Y"
                            },
                            footerFormat: "",
                            headerShape: "callout",
                            hideDelay: 500,
                            padding: 8,
                            shape: "callout",
                            shared: !1,
                            snap: n.isTouchDevice ? 25 : 10,
                            headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                            pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
                            backgroundColor: t(r.neutralColor3).setOpacity(.85).get(),
                            borderWidth: 1,
                            shadow: !0,
                            stickOnContact: !1,
                            style: {
                                color: r.neutralColor80,
                                cursor: "default",
                                fontSize: "12px",
                                whiteSpace: "nowrap"
                            },
                            useHTML: !1
                        },
                        credits: {
                            enabled: !0,
                            href: "https://www.highcharts.com?credits",
                            position: {
                                align: "right",
                                x: -10,
                                verticalAlign: "bottom",
                                y: -5
                            },
                            style: {
                                cursor: "pointer",
                                color: r.neutralColor40,
                                fontSize: "9px"
                            },
                            text: "Highcharts.com"
                        }
                    };
                s.chart.styledMode = !1;
                var l = new o(i(s.global, s.time));
                return e = {
                    defaultOptions: s,
                    defaultTime: l,
                    getOptions: function() {
                        return s
                    },
                    setOptions: function(e) {
                        return i(!0, s, e),
                            (e.time || e.global) && (n.time ? n.time.update(i(s.global, s.time, e.global, e.time)) : n.time = l),
                            s
                    }
                }
            }),
            t(n, "Core/Animation/Fx.js", [n["Core/Color/Color.js"], n["Core/Globals.js"], n["Core/Utilities.js"]], function(e, t, n) {
                var r = e.parse,
                    o = t.win,
                    a = n.isNumber,
                    i = n.objectEach;
                return function() {
                    function e(e, t, n) {
                        this.pos = NaN,
                            this.options = t,
                            this.elem = e,
                            this.prop = n
                    }
                    return e.prototype.dSetter = function() {
                            var e = this.paths,
                                t = e && e[0];
                            e = e && e[1];
                            var n = this.now || 0,
                                r = [];
                            if (1 !== n && t && e)
                                if (t.length === e.length && 1 > n)
                                    for (var o = 0; o < e.length; o++) {
                                        for (var i = t[o], s = e[o], l = [], c = 0; c < s.length; c++) {
                                            var u = i[c],
                                                d = s[c];
                                            a(u) && a(d) && ("A" !== s[0] || 4 !== c && 5 !== c) ? l[c] = u + n * (d - u) : l[c] = d
                                        }
                                        r.push(l)
                                    }
                                else
                                    r = e;
                            else
                                r = this.toD || [];
                            this.elem.attr("d", r, void 0, !0)
                        },
                        e.prototype.update = function() {
                            var e = this.elem,
                                t = this.prop,
                                n = this.now,
                                r = this.options.step;
                            this[t + "Setter"] ? this[t + "Setter"]() : e.attr ? e.element && e.attr(t, n, null, !0) : e.style[t] = n + this.unit,
                                r && r.call(e, n, this)
                        },
                        e.prototype.run = function(t, n, r) {
                            var a = this,
                                i = a.options,
                                s = function(e) {
                                    return !s.stopped && a.step(e)
                                },
                                l = o.requestAnimationFrame || function(e) {
                                    setTimeout(e, 13)
                                },
                                c = function() {
                                    for (var t = 0; t < e.timers.length; t++)
                                        e.timers[t]() || e.timers.splice(t--, 1);
                                    e.timers.length && l(c)
                                };
                            t !== n || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date,
                                this.start = t,
                                this.end = n,
                                this.unit = r,
                                this.now = this.start,
                                this.pos = 0,
                                s.elem = this.elem,
                                s.prop = this.prop,
                                s() && 1 === e.timers.push(s) && l(c)) : (delete i.curAnim[this.prop],
                                i.complete && 0 === Object.keys(i.curAnim).length && i.complete.call(this.elem))
                        },
                        e.prototype.step = function(e) {
                            var t = +new Date,
                                n = this.options,
                                r = this.elem,
                                o = n.complete,
                                a = n.duration,
                                s = n.curAnim;
                            if (r.attr && !r.element)
                                e = !1;
                            else if (e || t >= a + this.startTime) {
                                this.now = this.end,
                                    this.pos = 1,
                                    this.update();
                                var l = s[this.prop] = !0;
                                i(s, function(e) {
                                        !0 !== e && (l = !1)
                                    }),
                                    l && o && o.call(r),
                                    e = !1
                            } else
                                this.pos = n.easing((t - this.startTime) / a),
                                this.now = this.start + (this.end - this.start) * this.pos,
                                this.update(),
                                e = !0;
                            return e
                        },
                        e.prototype.initPath = function(e, t, n) {
                            function r(e, t) {
                                for (; e.length < p;) {
                                    var n = e[0],
                                        r = t[p - e.length];
                                    r && "M" === n[0] && (e[0] = "C" === r[0] ? ["C", n[1], n[2], n[1], n[2], n[1], n[2]] : ["L", n[1], n[2]]),
                                        e.unshift(n),
                                        l && (n = e.pop(),
                                            e.push(e[e.length - 1], n))
                                }
                            }

                            function o(e, t) {
                                for (; e.length < p;)
                                    if (t = e[Math.floor(e.length / c) - 1].slice(),
                                        "C" === t[0] && (t[1] = t[5],
                                            t[2] = t[6]),
                                        l) {
                                        var n = e[Math.floor(e.length / c)].slice();
                                        e.splice(e.length / 2, 0, t, n)
                                    } else
                                        e.push(t)
                            }
                            var i = e.startX,
                                s = e.endX;
                            n = n.slice();
                            var l = e.isArea,
                                c = l ? 2 : 1;
                            if (!(t = t && t.slice()))
                                return [n, n];
                            if (i && s && s.length) {
                                for (e = 0; e < i.length; e++) {
                                    if (i[e] === s[0]) {
                                        var u = e;
                                        break
                                    }
                                    if (i[0] === s[s.length - i.length + e]) {
                                        u = e;
                                        var d = !0;
                                        break
                                    }
                                    if (i[i.length - 1] === s[s.length - i.length + e]) {
                                        u = i.length - e;
                                        break
                                    }
                                }
                                "undefined" === typeof u && (t = [])
                            }
                            if (t.length && a(u)) {
                                var p = n.length + u * c;
                                d ? (r(t, n),
                                    o(n, t)) : (r(n, t),
                                    o(t, n))
                            }
                            return [t, n]
                        },
                        e.prototype.fillSetter = function() {
                            e.prototype.strokeSetter.apply(this, arguments)
                        },
                        e.prototype.strokeSetter = function() {
                            this.elem.attr(this.prop, r(this.start).tweenTo(r(this.end), this.pos), null, !0)
                        },
                        e.timers = [],
                        e
                }()
            }),
            t(n, "Core/Animation/AnimationUtilities.js", [n["Core/Animation/Fx.js"], n["Core/Utilities.js"]], function(e, t) {
                function n(e) {
                    return l(e) ? c({
                        duration: 500,
                        defer: 0
                    }, e) : {
                        duration: e ? 500 : 0,
                        defer: 0
                    }
                }

                function r(t, n) {
                    for (var r = e.timers.length; r--;)
                        e.timers[r].elem !== t || n && n !== e.timers[r].prop || (e.timers[r].stopped = !0)
                }
                var o = t.defined,
                    a = t.getStyle,
                    i = t.isArray,
                    s = t.isNumber,
                    l = t.isObject,
                    c = t.merge,
                    u = t.objectEach,
                    d = t.pick;
                return {
                    animate: function(t, n, o) {
                        var d, p, h, f = "";
                        if (!l(o)) {
                            var m = arguments;
                            o = {
                                duration: m[2],
                                easing: m[3],
                                complete: m[4]
                            }
                        }
                        s(o.duration) || (o.duration = 400),
                            o.easing = "function" === typeof o.easing ? o.easing : Math[o.easing] || Math.easeInOutSine,
                            o.curAnim = c(n),
                            u(n, function(s, l) {
                                r(t, l),
                                    h = new e(t, o, l),
                                    p = void 0,
                                    "d" === l && i(n.d) ? (h.paths = h.initPath(t, t.pathArray, n.d),
                                        h.toD = n.d,
                                        d = 0,
                                        p = 1) : t.attr ? d = t.attr(l) : (d = parseFloat(a(t, l)) || 0,
                                        "opacity" !== l && (f = "px")),
                                    p || (p = s),
                                    "string" === typeof p && p.match("px") && (p = p.replace(/px/g, "")),
                                    h.run(d, p, f)
                            })
                    },
                    animObject: n,
                    getDeferredAnimation: function(e, t, r) {
                        var a = n(t),
                            i = 0,
                            s = 0;
                        return (r ? [r] : e.series).forEach(function(e) {
                                e = n(e.options.animation),
                                    i = t && o(t.defer) ? a.defer : Math.max(i, e.duration + e.defer),
                                    s = Math.min(a.duration, e.duration)
                            }),
                            e.renderer.forExport && (i = 0), {
                                defer: Math.max(0, i - s),
                                duration: Math.min(i, s)
                            }
                    },
                    setAnimation: function(e, t) {
                        t.renderer.globalAnimation = d(e, t.options.chart.animation, !0)
                    },
                    stop: r
                }
            }),
            t(n, "Core/Renderer/HTML/AST.js", [n["Core/Globals.js"], n["Core/Utilities.js"]], function(e, t) {
                var n = e.SVG_NS,
                    r = t.attr,
                    o = t.createElement,
                    a = t.discardElement,
                    i = t.error,
                    s = t.isString,
                    l = t.objectEach,
                    c = t.splat;
                try {
                    var u = !!(new DOMParser).parseFromString("", "text/html")
                } catch (e) {
                    u = !1
                }
                return t = function() {
                    function t(e) {
                        this.nodes = "string" === typeof e ? this.parseMarkup(e) : e
                    }
                    return t.filterUserAttributes = function(e) {
                            return l(e, function(n, r) {
                                    var o = !0; -
                                    1 === t.allowedAttributes.indexOf(r) && (o = !1), -1 !== ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(r) && (o = s(n) && t.allowedReferences.some(function(e) {
                                            return 0 === n.indexOf(e)
                                        })),
                                        o || (i("Highcharts warning: Invalid attribute '" + r + "' in config"),
                                            delete e[r])
                                }),
                                e
                        },
                        t.setElementHTML = function(e, n) {
                            e.innerHTML = "",
                                n && new t(n).addToDOM(e)
                        },
                        t.prototype.addToDOM = function(o) {
                            function a(o, s) {
                                var u;
                                return c(o).forEach(function(o) {
                                        var c = o.tagName,
                                            d = o.textContent ? e.doc.createTextNode(o.textContent) : void 0;
                                        if (c)
                                            if ("#text" === c)
                                                var p = d;
                                            else if (-1 !== t.allowedTags.indexOf(c)) {
                                            c = e.doc.createElementNS("svg" === c ? n : s.namespaceURI || n, c);
                                            var h = o.attributes || {};
                                            l(o, function(e, t) {
                                                    "tagName" !== t && "attributes" !== t && "children" !== t && "textContent" !== t && (h[t] = e)
                                                }),
                                                r(c, t.filterUserAttributes(h)),
                                                d && c.appendChild(d),
                                                a(o.children || [], c),
                                                p = c
                                        } else
                                            i("Highcharts warning: Invalid tagName '" + c + "' in config");
                                        p && s.appendChild(p),
                                            u = p
                                    }),
                                    u
                            }
                            return a(this.nodes, o)
                        },
                        t.prototype.parseMarkup = function(e) {
                            var t = [];
                            if (e = e.trim(),
                                u)
                                e = (new DOMParser).parseFromString(e, "text/html");
                            else {
                                var n = o("div");
                                n.innerHTML = e,
                                    e = {
                                        body: n
                                    }
                            }
                            var r = function(e, t) {
                                var n = e.nodeName.toLowerCase(),
                                    o = {
                                        tagName: n
                                    };
                                if ("#text" === n && (o.textContent = e.textContent || ""),
                                    n = e.attributes) {
                                    var a = {};
                                    [].forEach.call(n, function(e) {
                                            a[e.name] = e.value
                                        }),
                                        o.attributes = a
                                }
                                if (e.childNodes.length) {
                                    var i = [];
                                    [].forEach.call(e.childNodes, function(e) {
                                            r(e, i)
                                        }),
                                        i.length && (o.children = i)
                                }
                                t.push(o)
                            };
                            return [].forEach.call(e.body.childNodes, function(e) {
                                    return r(e, t)
                                }),
                                n && a(n),
                                t
                        },
                        t.allowedAttributes = "aria-controls aria-describedby aria-expanded aria-haspopup aria-hidden aria-label aria-labelledby aria-live aria-pressed aria-readonly aria-roledescription aria-selected class clip-path color colspan cx cy d dx dy disabled fill height href id in markerHeight markerWidth offset opacity orient padding paddingLeft paddingRight patternUnits r refX refY role scope slope src startOffset stdDeviation stroke stroke-linecap stroke-width style tableValues result rowspan summary target tabindex text-align textAnchor textLength type valign width x x1 x2 y y1 y2 zIndex".split(" "),
                        t.allowedReferences = "https:// http:// mailto: / ../ ./ #".split(" "),
                        t.allowedTags = "a b br button caption circle clipPath code dd defs div dl dt em feComponentTransfer feFuncA feFuncB feFuncG feFuncR feGaussianBlur feOffset feMerge feMergeNode filter h1 h2 h3 h4 h5 h6 hr i img li linearGradient marker ol p path pattern pre rect small span stop strong style sub sup svg table text thead tbody tspan td th tr u ul #text".split(" "),
                        t
                }()
            }),
            t(n, "Core/FormatUtilities.js", [n["Core/DefaultOptions.js"], n["Core/Utilities.js"]], function(e, t) {
                function n(e, t, n, o) {
                    e = +e || 0,
                        t = +t;
                    var a = r.lang,
                        c = (e.toString().split(".")[1] || "").split("e")[0].length,
                        u = e.toString().split("e"),
                        d = t;
                    if (-1 === t)
                        t = Math.min(c, 20);
                    else if (i(t)) {
                        if (t && u[1] && 0 > u[1]) {
                            var p = t + +u[1];
                            0 <= p ? (u[0] = (+u[0]).toExponential(p).split("e")[0],
                                t = p) : (u[0] = u[0].split(".")[0] || 0,
                                e = 20 > t ? (u[0] * Math.pow(10, u[1])).toFixed(t) : 0,
                                u[1] = 0)
                        }
                    } else
                        t = 2;
                    p = (Math.abs(u[1] ? u[0] : e) + Math.pow(10, -Math.max(t, c) - 1)).toFixed(t),
                        c = String(l(p));
                    var h = 3 < c.length ? c.length % 3 : 0;
                    return n = s(n, a.decimalPoint),
                        o = s(o, a.thousandsSep),
                        e = (0 > e ? "-" : "") + (h ? c.substr(0, h) + o : ""),
                        e = 0 > +u[1] && !d ? "0" : e + c.substr(h).replace(/(\d{3})(?=\d)/g, "$1" + o),
                        t && (e += n + p.slice(-t)),
                        u[1] && 0 !== +e && (e += "e" + u[1]),
                        e
                }
                var r = e.defaultOptions,
                    o = e.defaultTime,
                    a = t.getNestedProperty,
                    i = t.isNumber,
                    s = t.pick,
                    l = t.pInt;
                return {
                    dateFormat: function(e, t, n) {
                        return o.dateFormat(e, t, n)
                    },
                    format: function(e, t, i) {
                        var s = "{",
                            l = !1,
                            c = /f$/,
                            u = /\.([0-9])/,
                            d = r.lang,
                            p = i && i.time || o;
                        i = i && i.numberFormatter || n;
                        for (var h = []; e;) {
                            var f = e.indexOf(s);
                            if (-1 === f)
                                break;
                            var m = e.slice(0, f);
                            if (l) {
                                if (m = m.split(":"),
                                    s = a(m.shift() || "", t),
                                    m.length && "number" === typeof s)
                                    if (m = m.join(":"),
                                        c.test(m)) {
                                        var g = parseInt((m.match(u) || ["", "-1"])[1], 10);
                                        null !== s && (s = i(s, g, d.decimalPoint, -1 < m.indexOf(",") ? d.thousandsSep : ""))
                                    } else
                                        s = p.dateFormat(m, s);
                                h.push(s)
                            } else
                                h.push(m);
                            e = e.slice(f + 1),
                                s = (l = !l) ? "}" : "{"
                        }
                        return h.push(e),
                            h.join("")
                    },
                    numberFormat: n
                }
            }),
            t(n, "Core/Renderer/RendererUtilities.js", [n["Core/Utilities.js"]], function(e) {
                var t, n = e.clamp,
                    r = e.pick,
                    o = e.stableSort;
                return function(e) {
                        function t(e, a, i) {
                            var s, l = e,
                                c = l.reducedLen || a,
                                u = function(e, t) {
                                    return (t.rank || 0) - (e.rank || 0)
                                },
                                d = function(e, t) {
                                    return e.target - t.target
                                },
                                p = !0,
                                h = [],
                                f = 0;
                            for (s = e.length; s--;)
                                f += e[s].size;
                            if (f > c) {
                                for (o(e, u),
                                    f = s = 0; f <= c;)
                                    f += e[s].size,
                                    s++;
                                h = e.splice(s - 1, e.length)
                            }
                            for (o(e, d),
                                e = e.map(function(e) {
                                    return {
                                        size: e.size,
                                        targets: [e.target],
                                        align: r(e.align, .5)
                                    }
                                }); p;) {
                                for (s = e.length; s--;)
                                    c = e[s],
                                    u = (Math.min.apply(0, c.targets) + Math.max.apply(0, c.targets)) / 2,
                                    c.pos = n(u - c.size * c.align, 0, a - c.size);
                                for (s = e.length,
                                    p = !1; s--;)
                                    0 < s && e[s - 1].pos + e[s - 1].size > e[s].pos && (e[s - 1].size += e[s].size,
                                        e[s - 1].targets = e[s - 1].targets.concat(e[s].targets),
                                        e[s - 1].align = .5,
                                        e[s - 1].pos + e[s - 1].size > a && (e[s - 1].pos = a - e[s - 1].size),
                                        e.splice(s, 1),
                                        p = !0)
                            }
                            return l.push.apply(l, h),
                                s = 0,
                                e.some(function(e) {
                                    var n = 0;
                                    return (e.targets || []).some(function() {
                                        return l[s].pos = e.pos + n,
                                            "undefined" !== typeof i && Math.abs(l[s].pos - l[s].target) > i ? (l.slice(0, s + 1).forEach(function(e) {
                                                    return delete e.pos
                                                }),
                                                l.reducedLen = (l.reducedLen || a) - .1 * a,
                                                l.reducedLen > .1 * a && t(l, a, i), !0) : (n += l[s].size,
                                                s++, !1)
                                    })
                                }),
                                o(l, d),
                                l
                        }
                        e.distribute = t
                    }(t || (t = {})),
                    t
            }),
            t(n, "Core/Renderer/SVG/SVGElement.js", [n["Core/Animation/AnimationUtilities.js"], n["Core/Renderer/HTML/AST.js"], n["Core/Color/Color.js"], n["Core/Globals.js"], n["Core/Color/Palette.js"], n["Core/Utilities.js"]], function(e, t, n, r, o, a) {
                var i = e.animate,
                    s = e.animObject,
                    l = e.stop,
                    c = r.deg2rad,
                    u = r.doc,
                    d = r.noop,
                    p = r.svg,
                    h = r.SVG_NS,
                    f = r.win,
                    m = a.addEvent,
                    g = a.attr,
                    y = a.createElement,
                    v = a.css,
                    b = a.defined,
                    _ = a.erase,
                    w = a.extend,
                    x = a.fireEvent,
                    E = a.isArray,
                    k = a.isFunction,
                    S = a.isNumber,
                    O = a.isString,
                    C = a.merge,
                    T = a.objectEach,
                    M = a.pick,
                    A = a.pInt,
                    P = a.syncTimeout,
                    N = a.uniqueKey;
                return e = function() {
                        function e() {
                            this.element = void 0,
                                this.onEvents = {},
                                this.opacity = 1,
                                this.renderer = void 0,
                                this.SVG_NS = h,
                                this.symbolCustomAttribs = "x y width height r start end innerR anchorX anchorY rounded".split(" ")
                        }
                        return e.prototype._defaultGetter = function(e) {
                                return e = M(this[e + "Value"], this[e], this.element ? this.element.getAttribute(e) : null, 0),
                                    /^[\-0-9\.]+$/.test(e) && (e = parseFloat(e)),
                                    e
                            },
                            e.prototype._defaultSetter = function(e, t, n) {
                                n.setAttribute(t, e)
                            },
                            e.prototype.add = function(e) {
                                var t = this.renderer,
                                    n = this.element;
                                if (e && (this.parentGroup = e),
                                    this.parentInverted = e && e.inverted,
                                    "undefined" !== typeof this.textStr && "text" === this.element.nodeName && t.buildText(this),
                                    this.added = !0, !e || e.handleZ || this.zIndex)
                                    var r = this.zIndexSetter();
                                return r || (e ? e.element : t.box).appendChild(n),
                                    this.onAdd && this.onAdd(),
                                    this
                            },
                            e.prototype.addClass = function(e, t) {
                                var n = t ? "" : this.attr("class") || "";
                                return e = (e || "").split(/ /g).reduce(function(e, t) {
                                        return -1 === n.indexOf(t) && e.push(t),
                                            e
                                    }, n ? [n] : []).join(" "),
                                    e !== n && this.attr("class", e),
                                    this
                            },
                            e.prototype.afterSetters = function() {
                                this.doTransform && (this.updateTransform(),
                                    this.doTransform = !1)
                            },
                            e.prototype.align = function(e, t, n) {
                                var r, o, a, i = {},
                                    s = this.renderer,
                                    l = s.alignedObjects;
                                e ? (this.alignOptions = e,
                                        this.alignByTranslate = t,
                                        (!n || O(n)) && (this.alignTo = r = n || "renderer",
                                            _(l, this),
                                            l.push(this),
                                            n = void 0)) : (e = this.alignOptions,
                                        t = this.alignByTranslate,
                                        r = this.alignTo),
                                    n = M(n, s[r], "scrollablePlotBox" === r ? s.plotBox : void 0, s),
                                    r = e.align;
                                var c = e.verticalAlign;
                                return s = (n.x || 0) + (e.x || 0),
                                    l = (n.y || 0) + (e.y || 0),
                                    "right" === r ? o = 1 : "center" === r && (o = 2),
                                    o && (s += (n.width - (e.width || 0)) / o),
                                    i[t ? "translateX" : "x"] = Math.round(s),
                                    "bottom" === c ? a = 1 : "middle" === c && (a = 2),
                                    a && (l += (n.height - (e.height || 0)) / a),
                                    i[t ? "translateY" : "y"] = Math.round(l),
                                    this[this.placed ? "animate" : "attr"](i),
                                    this.placed = !0,
                                    this.alignAttr = i,
                                    this
                            },
                            e.prototype.alignSetter = function(e) {
                                var t = {
                                    left: "start",
                                    center: "middle",
                                    right: "end"
                                };
                                t[e] && (this.alignValue = e,
                                    this.element.setAttribute("text-anchor", t[e]))
                            },
                            e.prototype.animate = function(e, t, n) {
                                var r = this,
                                    o = s(M(t, this.renderer.globalAnimation, !0));
                                return t = o.defer,
                                    M(u.hidden, u.msHidden, u.webkitHidden, !1) && (o.duration = 0),
                                    0 !== o.duration ? (n && (o.complete = n),
                                        P(function() {
                                            r.element && i(r, e, o)
                                        }, t)) : (this.attr(e, void 0, n),
                                        T(e, function(e, t) {
                                            o.step && o.step.call(this, e, {
                                                prop: t,
                                                pos: 1,
                                                elem: this
                                            })
                                        }, this)),
                                    this
                            },
                            e.prototype.applyTextOutline = function(e) {
                                var t = this.element; -
                                1 !== e.indexOf("contrast") && (e = e.replace(/contrast/g, this.renderer.getContrast(t.style.fill)));
                                var n = e.split(" ");
                                if (e = n[n.length - 1],
                                    (n = n[0]) && "none" !== n && r.svg) {
                                    this.fakeTS = !0,
                                        this.ySetter = this.xSetter,
                                        n = n.replace(/(^[\d\.]+)(.*?)$/g, function(e, t, n) {
                                            return 2 * Number(t) + n
                                        }),
                                        this.removeTextOutline();
                                    var o = u.createElementNS(h, "tspan");
                                    g(o, {
                                        class: "highcharts-text-outline",
                                        fill: e,
                                        stroke: e,
                                        "stroke-width": n,
                                        "stroke-linejoin": "round"
                                    }), [].forEach.call(t.childNodes, function(e) {
                                        var t = e.cloneNode(!0);
                                        t.removeAttribute && ["fill", "stroke", "stroke-width", "stroke"].forEach(function(e) {
                                                return t.removeAttribute(e)
                                            }),
                                            o.appendChild(t)
                                    });
                                    var a = u.createElementNS(h, "tspan");
                                    a.textContent = "\u200b", ["x", "y"].forEach(function(e) {
                                            var n = t.getAttribute(e);
                                            n && a.setAttribute(e, n)
                                        }),
                                        o.appendChild(a),
                                        t.insertBefore(o, t.firstChild)
                                }
                            },
                            e.prototype.attr = function(e, t, n, r) {
                                var o, a, i, s = this.element,
                                    c = this.symbolCustomAttribs,
                                    u = this;
                                if ("string" === typeof e && "undefined" !== typeof t) {
                                    var d = e;
                                    e = {},
                                        e[d] = t
                                }
                                return "string" === typeof e ? u = (this[e + "Getter"] || this._defaultGetter).call(this, e, s) : (T(e, function(t, n) {
                                            a = !1,
                                                r || l(this, n),
                                                this.symbolName && -1 !== c.indexOf(n) && (o || (this.symbolAttr(e),
                                                        o = !0),
                                                    a = !0), !this.rotation || "x" !== n && "y" !== n || (this.doTransform = !0),
                                                a || (i = this[n + "Setter"] || this._defaultSetter,
                                                    i.call(this, t, n, s), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(n) && this.updateShadows(n, t, i))
                                        }, this),
                                        this.afterSetters()),
                                    n && n.call(this),
                                    u
                            },
                            e.prototype.clip = function(e) {
                                return this.attr("clip-path", e ? "url(" + this.renderer.url + "#" + e.id + ")" : "none")
                            },
                            e.prototype.crisp = function(e, t) {
                                t = t || e.strokeWidth || 0;
                                var n = Math.round(t) % 2 / 2;
                                return e.x = Math.floor(e.x || this.x || 0) + n,
                                    e.y = Math.floor(e.y || this.y || 0) + n,
                                    e.width = Math.floor((e.width || this.width || 0) - 2 * n),
                                    e.height = Math.floor((e.height || this.height || 0) - 2 * n),
                                    b(e.strokeWidth) && (e.strokeWidth = t),
                                    e
                            },
                            e.prototype.complexColor = function(e, t, r) {
                                var o, a, i, s, l, c, u, d, p, h, f, m = this.renderer,
                                    g = [];
                                x(this.renderer, "complexColor", {
                                    args: arguments
                                }, function() {
                                    if (e.radialGradient ? a = "radialGradient" : e.linearGradient && (a = "linearGradient"),
                                        a) {
                                        if (i = e[a],
                                            l = m.gradients,
                                            c = e.stops,
                                            p = r.radialReference,
                                            E(i) && (e[a] = i = {
                                                x1: i[0],
                                                y1: i[1],
                                                x2: i[2],
                                                y2: i[3],
                                                gradientUnits: "userSpaceOnUse"
                                            }),
                                            "radialGradient" === a && p && !b(i.gradientUnits) && (s = i,
                                                i = C(i, m.getRadialAttr(p, s), {
                                                    gradientUnits: "userSpaceOnUse"
                                                })),
                                            T(i, function(e, t) {
                                                "id" !== t && g.push(t, e)
                                            }),
                                            T(c, function(e) {
                                                g.push(e)
                                            }),
                                            g = g.join(","),
                                            l[g])
                                            h = l[g].attr("id");
                                        else {
                                            i.id = h = N();
                                            var y = l[g] = m.createElement(a).attr(i).add(m.defs);
                                            y.radAttr = s,
                                                y.stops = [],
                                                c.forEach(function(e) {
                                                    0 === e[1].indexOf("rgba") ? (o = n.parse(e[1]),
                                                            u = o.get("rgb"),
                                                            d = o.get("a")) : (u = e[1],
                                                            d = 1),
                                                        e = m.createElement("stop").attr({
                                                            offset: e[0],
                                                            "stop-color": u,
                                                            "stop-opacity": d
                                                        }).add(y),
                                                        y.stops.push(e)
                                                })
                                        }
                                        f = "url(" + m.url + "#" + h + ")",
                                            r.setAttribute(t, f),
                                            r.gradient = g,
                                            e.toString = function() {
                                                return f
                                            }
                                    }
                                })
                            },
                            e.prototype.css = function(e) {
                                var t = this.styles,
                                    n = {},
                                    r = this.element,
                                    o = ["textOutline", "textOverflow", "width"],
                                    a = "",
                                    i = !t;
                                if (e && e.color && (e.fill = e.color),
                                    t && T(e, function(e, r) {
                                        t && t[r] !== e && (n[r] = e,
                                            i = !0)
                                    }),
                                    i) {
                                    if (t && (e = w(t, n)),
                                        e)
                                        if (null === e.width || "auto" === e.width)
                                            delete this.textWidth;
                                        else if ("text" === r.nodeName.toLowerCase() && e.width)
                                        var s = this.textWidth = A(e.width);
                                    if (this.styles = e,
                                        s && !p && this.renderer.forExport && delete e.width,
                                        r.namespaceURI === this.SVG_NS) {
                                        var l = function(e, t) {
                                            return "-" + t.toLowerCase()
                                        };
                                        T(e, function(e, t) {
                                                -1 === o.indexOf(t) && (a += t.replace(/([A-Z])/g, l) + ":" + e + ";")
                                            }),
                                            a && g(r, "style", a)
                                    } else
                                        v(r, e);
                                    this.added && ("text" === this.element.nodeName && this.renderer.buildText(this),
                                        e && e.textOutline && this.applyTextOutline(e.textOutline))
                                }
                                return this
                            },
                            e.prototype.dashstyleSetter = function(e) {
                                var t = this["stroke-width"];
                                if ("inherit" === t && (t = 1),
                                    e = e && e.toLowerCase()) {
                                    var n = e.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                                    for (e = n.length; e--;)
                                        n[e] = "" + A(n[e]) * M(t, NaN);
                                    e = n.join(",").replace(/NaN/g, "none"),
                                        this.element.setAttribute("stroke-dasharray", e)
                                }
                            },
                            e.prototype.destroy = function() {
                                var e = this,
                                    t = e.element || {},
                                    n = e.renderer,
                                    r = t.ownerSVGElement,
                                    o = n.isSVG && "SPAN" === t.nodeName && e.parentGroup || void 0;
                                if (t.onclick = t.onmouseout = t.onmouseover = t.onmousemove = t.point = null,
                                    l(e),
                                    e.clipPath && r) {
                                    var a = e.clipPath;
                                    [].forEach.call(r.querySelectorAll("[clip-path],[CLIP-PATH]"), function(e) {
                                            -1 < e.getAttribute("clip-path").indexOf(a.element.id) && e.removeAttribute("clip-path")
                                        }),
                                        e.clipPath = a.destroy()
                                }
                                if (e.stops) {
                                    for (r = 0; r < e.stops.length; r++)
                                        e.stops[r].destroy();
                                    e.stops.length = 0,
                                        e.stops = void 0
                                }
                                for (e.safeRemoveChild(t),
                                    n.styledMode || e.destroyShadows(); o && o.div && 0 === o.div.childNodes.length;)
                                    t = o.parentGroup,
                                    e.safeRemoveChild(o.div),
                                    delete o.div,
                                    o = t;
                                e.alignTo && _(n.alignedObjects, e),
                                    T(e, function(t, n) {
                                        e[n] && e[n].parentGroup === e && e[n].destroy && e[n].destroy(),
                                            delete e[n]
                                    })
                            },
                            e.prototype.destroyShadows = function() {
                                (this.shadows || []).forEach(function(e) {
                                        this.safeRemoveChild(e)
                                    }, this),
                                    this.shadows = void 0
                            },
                            e.prototype.destroyTextPath = function(e, t) {
                                var n = e.getElementsByTagName("text")[0];
                                if (n) {
                                    if (n.removeAttribute("dx"),
                                        n.removeAttribute("dy"),
                                        t.element.setAttribute("id", ""),
                                        this.textPathWrapper && n.getElementsByTagName("textPath").length) {
                                        for (e = this.textPathWrapper.element.childNodes; e.length;)
                                            n.appendChild(e[0]);
                                        n.removeChild(this.textPathWrapper.element)
                                    }
                                } else
                                    (e.getAttribute("dx") || e.getAttribute("dy")) && (e.removeAttribute("dx"),
                                        e.removeAttribute("dy"));
                                this.textPathWrapper && (this.textPathWrapper = this.textPathWrapper.destroy())
                            },
                            e.prototype.dSetter = function(e, t, n) {
                                E(e) && ("string" === typeof e[0] && (e = this.renderer.pathToSegments(e)),
                                        this.pathArray = e,
                                        e = e.reduce(function(e, t, n) {
                                            return t && t.join ? (n ? e + " " : "") + t.join(" ") : (t || "").toString()
                                        }, "")),
                                    /(NaN| {2}|^$)/.test(e) && (e = "M 0 0"),
                                    this[t] !== e && (n.setAttribute(t, e),
                                        this[t] = e)
                            },
                            e.prototype.fadeOut = function(e) {
                                var t = this;
                                t.animate({
                                    opacity: 0
                                }, {
                                    duration: M(e, 150),
                                    complete: function() {
                                        t.attr({
                                            y: -9999
                                        }).hide()
                                    }
                                })
                            },
                            e.prototype.fillSetter = function(e, t, n) {
                                "string" === typeof e ? n.setAttribute(t, e) : e && this.complexColor(e, t, n)
                            },
                            e.prototype.getBBox = function(t, n) {
                                var r = this.renderer,
                                    o = this.element,
                                    a = this.styles,
                                    i = this.textStr,
                                    s = r.cache,
                                    l = r.cacheKeys,
                                    u = o.namespaceURI === this.SVG_NS;
                                n = M(n, this.rotation, 0);
                                var d, p = r.styledMode ? o && e.prototype.getStyle.call(o, "font-size") : a && a.fontSize;
                                if (b(i)) {
                                    var h = i.toString(); -
                                    1 === h.indexOf("<") && (h = h.replace(/[0-9]/g, "0")),
                                        h += ["", n, p, this.textWidth, a && a.textOverflow, a && a.fontWeight].join()
                                }
                                if (h && !t && (d = s[h]), !d) {
                                    if (u || r.forExport) {
                                        try {
                                            var f = this.fakeTS && function(e) {
                                                var t = o.querySelector(".highcharts-text-outline");
                                                t && v(t, {
                                                    display: e
                                                })
                                            };
                                            k(f) && f("none"),
                                                d = o.getBBox ? w({}, o.getBBox()) : {
                                                    width: o.offsetWidth,
                                                    height: o.offsetHeight
                                                },
                                                k(f) && f("")
                                        } catch (e) {}
                                        (!d || 0 > d.width) && (d = {
                                            width: 0,
                                            height: 0
                                        })
                                    } else
                                        d = this.htmlGetBBox();
                                    if (r.isSVG && (t = d.width,
                                            r = d.height,
                                            u && (d.height = r = {
                                                "11px,17": 14,
                                                "13px,20": 16
                                            }[a && a.fontSize + "," + Math.round(r)] || r),
                                            n && (a = n * c,
                                                d.width = Math.abs(r * Math.sin(a)) + Math.abs(t * Math.cos(a)),
                                                d.height = Math.abs(r * Math.cos(a)) + Math.abs(t * Math.sin(a)))),
                                        h && ("" === i || 0 < d.height)) {
                                        for (; 250 < l.length;)
                                            delete s[l.shift()];
                                        s[h] || l.push(h),
                                            s[h] = d
                                    }
                                }
                                return d
                            },
                            e.prototype.getStyle = function(e) {
                                return f.getComputedStyle(this.element || this, "").getPropertyValue(e)
                            },
                            e.prototype.hasClass = function(e) {
                                return -1 !== ("" + this.attr("class")).split(" ").indexOf(e)
                            },
                            e.prototype.hide = function(e) {
                                return e ? this.attr({
                                        y: -9999
                                    }) : this.attr({
                                        visibility: "hidden"
                                    }),
                                    this
                            },
                            e.prototype.htmlGetBBox = function() {
                                return {
                                    height: 0,
                                    width: 0,
                                    x: 0,
                                    y: 0
                                }
                            },
                            e.prototype.init = function(e, t) {
                                this.element = "span" === t ? y(t) : u.createElementNS(this.SVG_NS, t),
                                    this.renderer = e,
                                    x(this, "afterInit")
                            },
                            e.prototype.invert = function(e) {
                                return this.inverted = e,
                                    this.updateTransform(),
                                    this
                            },
                            e.prototype.on = function(e, t) {
                                var n = this.onEvents;
                                return n[e] && n[e](),
                                    n[e] = m(this.element, e, t),
                                    this
                            },
                            e.prototype.opacitySetter = function(e, t, n) {
                                this.opacity = e = Number(Number(e).toFixed(3)),
                                    n.setAttribute(t, e)
                            },
                            e.prototype.removeClass = function(e) {
                                return this.attr("class", ("" + this.attr("class")).replace(O(e) ? new RegExp("(^| )" + e + "( |$)") : e, " ").replace(/ +/g, " ").trim())
                            },
                            e.prototype.removeTextOutline = function() {
                                var e = this.element.querySelector("tspan.highcharts-text-outline");
                                e && this.safeRemoveChild(e)
                            },
                            e.prototype.safeRemoveChild = function(e) {
                                var t = e.parentNode;
                                t && t.removeChild(e)
                            },
                            e.prototype.setRadialReference = function(e) {
                                var t = this.element.gradient && this.renderer.gradients[this.element.gradient];
                                return this.element.radialReference = e,
                                    t && t.radAttr && t.animate(this.renderer.getRadialAttr(e, t.radAttr)),
                                    this
                            },
                            e.prototype.setTextPath = function(e, n) {
                                var r = this.element,
                                    o = this.text ? this.text.element : r,
                                    a = {
                                        textAnchor: "text-anchor"
                                    },
                                    i = !1,
                                    s = this.textPathWrapper,
                                    l = !s;
                                n = C(!0, {
                                    enabled: !0,
                                    attributes: {
                                        dy: -5,
                                        startOffset: "50%",
                                        textAnchor: "middle"
                                    }
                                }, n);
                                var c = t.filterUserAttributes(n.attributes);
                                if (e && n && n.enabled) {
                                    s && null === s.element.parentNode ? (l = !0,
                                            s = s.destroy()) : s && this.removeTextOutline.call(s.parentGroup),
                                        this.options && this.options.padding && (c.dx = -this.options.padding),
                                        s || (this.textPathWrapper = s = this.renderer.createElement("textPath"),
                                            i = !0);
                                    var u = s.element;
                                    if ((n = e.element.getAttribute("id")) || e.element.setAttribute("id", n = N()),
                                        l)
                                        for (o.setAttribute("y", 0),
                                            S(c.dx) && o.setAttribute("x", -c.dx),
                                            e = [].slice.call(o.childNodes),
                                            l = 0; l < e.length; l++) {
                                            var p = e[l];
                                            p.nodeType !== Node.TEXT_NODE && "tspan" !== p.nodeName || u.appendChild(p)
                                        }
                                    i && s && s.add({
                                            element: o
                                        }),
                                        u.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.renderer.url + "#" + n),
                                        b(c.dy) && (u.parentNode.setAttribute("dy", c.dy),
                                            delete c.dy),
                                        b(c.dx) && (u.parentNode.setAttribute("dx", c.dx),
                                            delete c.dx),
                                        T(c, function(e, t) {
                                            u.setAttribute(a[t] || t, e)
                                        }),
                                        r.removeAttribute("transform"),
                                        this.removeTextOutline.call(s),
                                        this.text && !this.renderer.styledMode && this.attr({
                                            fill: "none",
                                            "stroke-width": 0
                                        }),
                                        this.applyTextOutline = this.updateTransform = d
                                } else
                                    s && (delete this.updateTransform,
                                        delete this.applyTextOutline,
                                        this.destroyTextPath(r, e),
                                        this.updateTransform(),
                                        this.options && this.options.rotation && this.applyTextOutline(this.options.style.textOutline));
                                return this
                            },
                            e.prototype.shadow = function(e, t, n) {
                                var r, a = [],
                                    i = this.element,
                                    s = this.oldShadowOptions,
                                    l = {
                                        color: o.neutralColor100,
                                        offsetX: this.parentInverted ? -1 : 1,
                                        offsetY: this.parentInverted ? -1 : 1,
                                        opacity: .15,
                                        width: 3
                                    },
                                    c = !1;
                                if (!0 === e ? r = l : "object" === typeof e && (r = w(l, e)),
                                    r && (r && s && T(r, function(e, t) {
                                            e !== s[t] && (c = !0)
                                        }),
                                        c && this.destroyShadows(),
                                        this.oldShadowOptions = r),
                                    r) {
                                    if (!this.shadows) {
                                        var u = r.opacity / r.width,
                                            d = this.parentInverted ? "translate(" + r.offsetY + ", " + r.offsetX + ")" : "translate(" + r.offsetX + ", " + r.offsetY + ")";
                                        for (l = 1; l <= r.width; l++) {
                                            var p = i.cloneNode(!1),
                                                h = 2 * r.width + 1 - 2 * l;
                                            g(p, {
                                                    stroke: e.color || o.neutralColor100,
                                                    "stroke-opacity": u * l,
                                                    "stroke-width": h,
                                                    transform: d,
                                                    fill: "none"
                                                }),
                                                p.setAttribute("class", (p.getAttribute("class") || "") + " highcharts-shadow"),
                                                n && (g(p, "height", Math.max(g(p, "height") - h, 0)),
                                                    p.cutHeight = h),
                                                t ? t.element.appendChild(p) : i.parentNode && i.parentNode.insertBefore(p, i),
                                                a.push(p)
                                        }
                                        this.shadows = a
                                    }
                                } else
                                    this.destroyShadows();
                                return this
                            },
                            e.prototype.show = function(e) {
                                return this.attr({
                                    visibility: e ? "inherit" : "visible"
                                })
                            },
                            e.prototype.strokeSetter = function(t, n, r) {
                                this[n] = t,
                                    this.stroke && this["stroke-width"] ? (e.prototype.fillSetter.call(this, this.stroke, "stroke", r),
                                        r.setAttribute("stroke-width", this["stroke-width"]),
                                        this.hasStroke = !0) : "stroke-width" === n && 0 === t && this.hasStroke ? (r.removeAttribute("stroke"),
                                        this.hasStroke = !1) : this.renderer.styledMode && this["stroke-width"] && (r.setAttribute("stroke-width", this["stroke-width"]),
                                        this.hasStroke = !0)
                            },
                            e.prototype.strokeWidth = function() {
                                if (!this.renderer.styledMode)
                                    return this["stroke-width"] || 0;
                                var e = this.getStyle("stroke-width"),
                                    t = 0;
                                if (e.indexOf("px") === e.length - 2)
                                    t = A(e);
                                else if ("" !== e) {
                                    var n = u.createElementNS(h, "rect");
                                    g(n, {
                                            width: e,
                                            "stroke-width": 0
                                        }),
                                        this.element.parentNode.appendChild(n),
                                        t = n.getBBox().width,
                                        n.parentNode.removeChild(n)
                                }
                                return t
                            },
                            e.prototype.symbolAttr = function(e) {
                                var t = this;
                                "x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function(n) {
                                        t[n] = M(e[n], t[n])
                                    }),
                                    t.attr({
                                        d: t.renderer.symbols[t.symbolName](t.x, t.y, t.width, t.height, t)
                                    })
                            },
                            e.prototype.textSetter = function(e) {
                                e !== this.textStr && (delete this.textPxLength,
                                    this.textStr = e,
                                    this.added && this.renderer.buildText(this))
                            },
                            e.prototype.titleSetter = function(e) {
                                var t = this.element,
                                    n = t.getElementsByTagName("title")[0] || u.createElementNS(this.SVG_NS, "title");
                                t.insertBefore ? t.insertBefore(n, t.firstChild) : t.appendChild(n),
                                    n.textContent = String(M(e, "")).replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
                            },
                            e.prototype.toFront = function() {
                                var e = this.element;
                                return e.parentNode.appendChild(e),
                                    this
                            },
                            e.prototype.translate = function(e, t) {
                                return this.attr({
                                    translateX: e,
                                    translateY: t
                                })
                            },
                            e.prototype.updateShadows = function(e, t, n) {
                                var r = this.shadows;
                                if (r)
                                    for (var o = r.length; o--;)
                                        n.call(r[o], "height" === e ? Math.max(t - (r[o].cutHeight || 0), 0) : "d" === e ? this.d : t, e, r[o])
                            },
                            e.prototype.updateTransform = function() {
                                var e = this.scaleX,
                                    t = this.scaleY,
                                    n = this.inverted,
                                    r = this.rotation,
                                    o = this.matrix,
                                    a = this.element,
                                    i = this.translateX || 0,
                                    s = this.translateY || 0;
                                n && (i += this.width,
                                        s += this.height),
                                    i = ["translate(" + i + "," + s + ")"],
                                    b(o) && i.push("matrix(" + o.join(",") + ")"),
                                    n ? i.push("rotate(90) scale(-1,1)") : r && i.push("rotate(" + r + " " + M(this.rotationOriginX, a.getAttribute("x"), 0) + " " + M(this.rotationOriginY, a.getAttribute("y") || 0) + ")"),
                                    (b(e) || b(t)) && i.push("scale(" + M(e, 1) + " " + M(t, 1) + ")"),
                                    i.length && a.setAttribute("transform", i.join(" "))
                            },
                            e.prototype.visibilitySetter = function(e, t, n) {
                                "inherit" === e ? n.removeAttribute(t) : this[t] !== e && n.setAttribute(t, e),
                                    this[t] = e
                            },
                            e.prototype.xGetter = function(e) {
                                return "circle" === this.element.nodeName && ("x" === e ? e = "cx" : "y" === e && (e = "cy")),
                                    this._defaultGetter(e)
                            },
                            e.prototype.zIndexSetter = function(e, t) {
                                var n = this.renderer,
                                    r = this.parentGroup,
                                    o = (r || n).element || n.box,
                                    a = this.element;
                                n = o === n.box;
                                var i, s = !1,
                                    l = this.added;
                                if (b(e) ? (a.setAttribute("data-z-index", e),
                                        e = +e,
                                        this[t] === e && (l = !1)) : b(this[t]) && a.removeAttribute("data-z-index"),
                                    this[t] = e,
                                    l) {
                                    for ((e = this.zIndex) && r && (r.handleZ = !0),
                                        t = o.childNodes,
                                        i = t.length - 1; 0 <= i && !s; i--) {
                                        r = t[i],
                                            l = r.getAttribute("data-z-index");
                                        var c = !b(l);
                                        r !== a && (0 > e && c && !n && !i ? (o.insertBefore(a, t[i]),
                                            s = !0) : (A(l) <= e || c && (!b(e) || 0 <= e)) && (o.insertBefore(a, t[i + 1] || null),
                                            s = !0))
                                    }
                                    s || (o.insertBefore(a, t[n ? 3 : 0] || null),
                                        s = !0)
                                }
                                return s
                            },
                            e
                    }(),
                    e.prototype["stroke-widthSetter"] = e.prototype.strokeSetter,
                    e.prototype.yGetter = e.prototype.xGetter,
                    e.prototype.matrixSetter = e.prototype.rotationOriginXSetter = e.prototype.rotationOriginYSetter = e.prototype.rotationSetter = e.prototype.scaleXSetter = e.prototype.scaleYSetter = e.prototype.translateXSetter = e.prototype.translateYSetter = e.prototype.verticalAlignSetter = function(e, t) {
                        this[t] = e,
                            this.doTransform = !0
                    },
                    e
            }),
            t(n, "Core/Renderer/RendererRegistry.js", [n["Core/Globals.js"]], function(e) {
                var t;
                return function(t) {
                        t.rendererTypes = {};
                        var n;
                        t.getRendererType = function(e) {
                                return void 0 === e && (e = n),
                                    t.rendererTypes[e] || t.rendererTypes[n]
                            },
                            t.registerRendererType = function(r, o, a) {
                                t.rendererTypes[r] = o,
                                    n && !a || (n = r,
                                        e.Renderer = o)
                            }
                    }(t || (t = {})),
                    t
            }),
            t(n, "Core/Renderer/SVG/SVGLabel.js", [n["Core/Renderer/SVG/SVGElement.js"], n["Core/Utilities.js"]], function(e, t) {
                var n = this && this.__extends || function() {
                        var e = function(t, n) {
                            return (e = Object.setPrototypeOf || {
                                    __proto__: []
                                }
                                instanceof Array && function(e, t) {
                                    e.__proto__ = t
                                } ||

                                function(e, t) {
                                    for (var n in t)
                                        t.hasOwnProperty(n) && (e[n] = t[n])
                                }
                            )(t, n)
                        };
                        return function(t, n) {
                            function r() {
                                this.constructor = t
                            }
                            e(t, n),
                                t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype,
                                    new r)
                        }
                    }(),
                    r = t.defined,
                    o = t.extend,
                    a = t.isNumber,
                    i = t.merge,
                    s = t.pick,
                    l = t.removeEvent;
                return function(t) {
                    function c(e, n, r, o, a, i, s, l, u, d) {
                        var p = t.call(this) || this;
                        p.paddingLeftSetter = p.paddingSetter,
                            p.paddingRightSetter = p.paddingSetter,
                            p.init(e, "g"),
                            p.textStr = n,
                            p.x = r,
                            p.y = o,
                            p.anchorX = i,
                            p.anchorY = s,
                            p.baseline = u,
                            p.className = d,
                            p.addClass("button" === d ? "highcharts-no-tooltip" : "highcharts-label"),
                            d && p.addClass("highcharts-" + d),
                            p.text = e.text(void 0, 0, 0, l).attr({
                                zIndex: 1
                            });
                        var h;
                        return "string" === typeof a && ((h = /^url\((.*?)\)$/.test(a)) || p.renderer.symbols[a]) && (p.symbolKey = a),
                            p.bBox = c.emptyBBox,
                            p.padding = 3,
                            p.baselineOffset = 0,
                            p.needsBox = e.styledMode || h,
                            p.deferredAttr = {},
                            p.alignFactor = 0,
                            p
                    }
                    return n(c, t),
                        c.prototype.alignSetter = function(e) {
                            (e = {
                                left: 0,
                                center: .5,
                                right: 1
                            }[e]) !== this.alignFactor && (this.alignFactor = e,
                                this.bBox && a(this.xSetting) && this.attr({
                                    x: this.xSetting
                                }))
                        },
                        c.prototype.anchorXSetter = function(e, t) {
                            this.anchorX = e,
                                this.boxAttr(t, Math.round(e) - this.getCrispAdjust() - this.xSetting)
                        },
                        c.prototype.anchorYSetter = function(e, t) {
                            this.anchorY = e,
                                this.boxAttr(t, e - this.ySetting)
                        },
                        c.prototype.boxAttr = function(e, t) {
                            this.box ? this.box.attr(e, t) : this.deferredAttr[e] = t
                        },
                        c.prototype.css = function(t) {
                            if (t) {
                                var n = {};
                                t = i(t),
                                    c.textProps.forEach(function(e) {
                                        "undefined" !== typeof t[e] && (n[e] = t[e],
                                            delete t[e])
                                    }),
                                    this.text.css(n);
                                var r = "width" in n;
                                "fontSize" in n || "fontWeight" in n ? this.updateTextPadding() : r && this.updateBoxSize()
                            }
                            return e.prototype.css.call(this, t)
                        },
                        c.prototype.destroy = function() {
                            l(this.element, "mouseenter"),
                                l(this.element, "mouseleave"),
                                this.text && this.text.destroy(),
                                this.box && (this.box = this.box.destroy()),
                                e.prototype.destroy.call(this)
                        },
                        c.prototype.fillSetter = function(e, t) {
                            e && (this.needsBox = !0),
                                this.fill = e,
                                this.boxAttr(t, e)
                        },
                        c.prototype.getBBox = function() {
                            this.textStr && 0 === this.bBox.width && 0 === this.bBox.height && this.updateBoxSize();
                            var e = this.padding,
                                t = s(this.paddingLeft, e);
                            return {
                                width: this.width,
                                height: this.height,
                                x: this.bBox.x - t,
                                y: this.bBox.y - e
                            }
                        },
                        c.prototype.getCrispAdjust = function() {
                            return this.renderer.styledMode && this.box ? this.box.strokeWidth() % 2 / 2 : (this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) % 2 / 2
                        },
                        c.prototype.heightSetter = function(e) {
                            this.heightSetting = e
                        },
                        c.prototype.onAdd = function() {
                            var e = this.textStr;
                            this.text.add(this),
                                this.attr({
                                    text: r(e) ? e : "",
                                    x: this.x,
                                    y: this.y
                                }),
                                this.box && r(this.anchorX) && this.attr({
                                    anchorX: this.anchorX,
                                    anchorY: this.anchorY
                                })
                        },
                        c.prototype.paddingSetter = function(e, t) {
                            a(e) ? e !== this[t] && (this[t] = e,
                                this.updateTextPadding()) : this[t] = void 0
                        },
                        c.prototype.rSetter = function(e, t) {
                            this.boxAttr(t, e)
                        },
                        c.prototype.shadow = function(e) {
                            return e && !this.renderer.styledMode && (this.updateBoxSize(),
                                    this.box && this.box.shadow(e)),
                                this
                        },
                        c.prototype.strokeSetter = function(e, t) {
                            this.stroke = e,
                                this.boxAttr(t, e)
                        },
                        c.prototype["stroke-widthSetter"] = function(e, t) {
                            e && (this.needsBox = !0),
                                this["stroke-width"] = e,
                                this.boxAttr(t, e)
                        },
                        c.prototype["text-alignSetter"] = function(e) {
                            this.textAlign = e
                        },
                        c.prototype.textSetter = function(e) {
                            "undefined" !== typeof e && this.text.attr({
                                    text: e
                                }),
                                this.updateTextPadding()
                        },
                        c.prototype.updateBoxSize = function() {
                            var e = this.text.element.style,
                                t = {},
                                n = this.padding,
                                i = this.bBox = a(this.widthSetting) && a(this.heightSetting) && !this.textAlign || !r(this.text.textStr) ? c.emptyBBox : this.text.getBBox();
                            this.width = this.getPaddedWidth(),
                                this.height = (this.heightSetting || i.height || 0) + 2 * n,
                                e = this.renderer.fontMetrics(e && e.fontSize, this.text),
                                this.baselineOffset = n + Math.min((this.text.firstLineMetrics || e).b, i.height || 1 / 0),
                                this.heightSetting && (this.baselineOffset += (this.heightSetting - e.h) / 2),
                                this.needsBox && (this.box || (n = this.box = this.symbolKey ? this.renderer.symbol(this.symbolKey) : this.renderer.rect(),
                                        n.addClass(("button" === this.className ? "" : "highcharts-label-box") + (this.className ? " highcharts-" + this.className + "-box" : "")),
                                        n.add(this)),
                                    n = this.getCrispAdjust(),
                                    t.x = n,
                                    t.y = (this.baseline ? -this.baselineOffset : 0) + n,
                                    t.width = Math.round(this.width),
                                    t.height = Math.round(this.height),
                                    this.box.attr(o(t, this.deferredAttr)),
                                    this.deferredAttr = {})
                        },
                        c.prototype.updateTextPadding = function() {
                            var e = this.text;
                            this.updateBoxSize();
                            var t = this.baseline ? 0 : this.baselineOffset,
                                n = s(this.paddingLeft, this.padding);
                            r(this.widthSetting) && this.bBox && ("center" === this.textAlign || "right" === this.textAlign) && (n += {
                                    center: .5,
                                    right: 1
                                }[this.textAlign] * (this.widthSetting - this.bBox.width)),
                                n === e.x && t === e.y || (e.attr("x", n),
                                    e.hasBoxWidthChanged && (this.bBox = e.getBBox(!0)),
                                    "undefined" !== typeof t && e.attr("y", t)),
                                e.x = n,
                                e.y = t
                        },
                        c.prototype.widthSetter = function(e) {
                            this.widthSetting = a(e) ? e : void 0
                        },
                        c.prototype.getPaddedWidth = function() {
                            var e = this.padding,
                                t = s(this.paddingLeft, e);
                            return e = s(this.paddingRight, e),
                                (this.widthSetting || this.bBox.width || 0) + t + e
                        },
                        c.prototype.xSetter = function(e) {
                            this.x = e,
                                this.alignFactor && (e -= this.alignFactor * this.getPaddedWidth(),
                                    this["forceAnimate:x"] = !0),
                                this.xSetting = Math.round(e),
                                this.attr("translateX", this.xSetting)
                        },
                        c.prototype.ySetter = function(e) {
                            this.ySetting = this.y = Math.round(e),
                                this.attr("translateY", this.ySetting)
                        },
                        c.emptyBBox = {
                            width: 0,
                            height: 0,
                            x: 0,
                            y: 0
                        },
                        c.textProps = "color direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width".split(" "),
                        c
                }(e)
            }),
            t(n, "Core/Renderer/SVG/Symbols.js", [n["Core/Utilities.js"]], function(e) {
                function t(e, t, n, r, a) {
                    var s = [];
                    if (a) {
                        var l = a.start || 0,
                            c = i(a.r, n);
                        n = i(a.r, r || n);
                        var u = (a.end || 0) - .001;
                        r = a.innerR;
                        var d = i(a.open, .001 > Math.abs((a.end || 0) - l - 2 * Math.PI)),
                            p = Math.cos(l),
                            h = Math.sin(l),
                            f = Math.cos(u),
                            m = Math.sin(u);
                        l = i(a.longArc, .001 > u - l - Math.PI ? 0 : 1),
                            s.push(["M", e + c * p, t + n * h], ["A", c, n, 0, l, i(a.clockwise, 1), e + c * f, t + n * m]),
                            o(r) && s.push(d ? ["M", e + r * f, t + r * m] : ["L", e + r * f, t + r * m], ["A", r, r, 0, l, o(a.clockwise) ? 1 - a.clockwise : 0, e + r * p, t + r * h]),
                            d || s.push(["Z"])
                    }
                    return s
                }

                function n(e, t, n, o, a) {
                    return a && a.r ? r(e, t, n, o, a) : [
                        ["M", e, t],
                        ["L", e + n, t],
                        ["L", e + n, t + o],
                        ["L", e, t + o],
                        ["Z"]
                    ]
                }

                function r(e, t, n, r, o) {
                    return o = o && o.r || 0, [
                        ["M", e + o, t],
                        ["L", e + n - o, t],
                        ["C", e + n, t, e + n, t, e + n, t + o],
                        ["L", e + n, t + r - o],
                        ["C", e + n, t + r, e + n, t + r, e + n - o, t + r],
                        ["L", e + o, t + r],
                        ["C", e, t + r, e, t + r, e, t + r - o],
                        ["L", e, t + o],
                        ["C", e, t, e, t, e + o, t]
                    ]
                }
                var o = e.defined,
                    a = e.isNumber,
                    i = e.pick;
                return {
                    arc: t,
                    callout: function(e, t, n, o, i) {
                        var s = Math.min(i && i.r || 0, n, o),
                            l = s + 6,
                            c = i && i.anchorX;
                        i = i && i.anchorY || 0;
                        var u = r(e, t, n, o, {
                            r: s
                        });
                        return a(c) ? (e + c >= n ? i > t + l && i < t + o - l ? u.splice(3, 1, ["L", e + n, i - 6], ["L", e + n + 6, i], ["L", e + n, i + 6], ["L", e + n, t + o - s]) : u.splice(3, 1, ["L", e + n, o / 2], ["L", c, i], ["L", e + n, o / 2], ["L", e + n, t + o - s]) : 0 >= e + c ? i > t + l && i < t + o - l ? u.splice(7, 1, ["L", e, i + 6], ["L", e - 6, i], ["L", e, i - 6], ["L", e, t + s]) : u.splice(7, 1, ["L", e, o / 2], ["L", c, i], ["L", e, o / 2], ["L", e, t + s]) : i && i > o && c > e + l && c < e + n - l ? u.splice(5, 1, ["L", c + 6, t + o], ["L", c, t + o + 6], ["L", c - 6, t + o], ["L", e + s, t + o]) : i && 0 > i && c > e + l && c < e + n - l && u.splice(1, 1, ["L", c - 6, t], ["L", c, t - 6], ["L", c + 6, t], ["L", n - s, t]),
                            u) : u
                    },
                    circle: function(e, n, r, o) {
                        return t(e + r / 2, n + o / 2, r / 2, o / 2, {
                            start: .5 * Math.PI,
                            end: 2.5 * Math.PI,
                            open: !1
                        })
                    },
                    diamond: function(e, t, n, r) {
                        return [
                            ["M", e + n / 2, t],
                            ["L", e + n, t + r / 2],
                            ["L", e + n / 2, t + r],
                            ["L", e, t + r / 2],
                            ["Z"]
                        ]
                    },
                    rect: n,
                    roundedRect: r,
                    square: n,
                    triangle: function(e, t, n, r) {
                        return [
                            ["M", e + n / 2, t],
                            ["L", e + n, t + r],
                            ["L", e, t + r],
                            ["Z"]
                        ]
                    },
                    "triangle-down": function(e, t, n, r) {
                        return [
                            ["M", e, t],
                            ["L", e + n, t],
                            ["L", e + n / 2, t + r],
                            ["Z"]
                        ]
                    }
                }
            }),
            t(n, "Core/Renderer/SVG/TextBuilder.js", [n["Core/Renderer/HTML/AST.js"], n["Core/Globals.js"], n["Core/Utilities.js"]], function(e, t, n) {
                var r = t.doc,
                    o = t.SVG_NS,
                    a = n.attr,
                    i = n.isString,
                    s = n.objectEach,
                    l = n.pick;
                return function() {
                    function t(e) {
                        var t = e.styles;
                        this.renderer = e.renderer,
                            this.svgElement = e,
                            this.width = e.textWidth,
                            this.textLineHeight = t && t.lineHeight,
                            this.textOutline = t && t.textOutline,
                            this.ellipsis = !(!t || "ellipsis" !== t.textOverflow),
                            this.noWrap = !(!t || "nowrap" !== t.whiteSpace),
                            this.fontSize = t && t.fontSize
                    }
                    return t.prototype.buildSVG = function() {
                            var t = this.svgElement,
                                n = t.element,
                                o = t.renderer,
                                a = l(t.textStr, "").toString(),
                                s = -1 !== a.indexOf("<"),
                                c = n.childNodes;
                            o = this.width && !t.added && o.box;
                            var u = /<br.*?>/g,
                                d = [a, this.ellipsis, this.noWrap, this.textLineHeight, this.textOutline, this.fontSize, this.width].join();
                            if (d !== t.textCache) {
                                for (t.textCache = d,
                                    delete t.actualWidth,
                                    d = c.length; d--;)
                                    n.removeChild(c[d]);
                                s || this.ellipsis || this.width || -1 !== a.indexOf(" ") && (!this.noWrap || u.test(a)) ? "" !== a && (o && o.appendChild(n),
                                        a = new e(a),
                                        this.modifyTree(a.nodes),
                                        a.addToDOM(t.element),
                                        this.modifyDOM(),
                                        this.ellipsis && -1 !== (n.textContent || "").indexOf("\u2026") && t.attr("title", this.unescapeEntities(t.textStr || "", ["&lt;", "&gt;"])),
                                        o && o.removeChild(n)) : n.appendChild(r.createTextNode(this.unescapeEntities(a))),
                                    i(this.textOutline) && t.applyTextOutline && t.applyTextOutline(this.textOutline)
                            }
                        },
                        t.prototype.modifyDOM = function() {
                            var e = this,
                                t = this.svgElement,
                                n = a(t.element, "x");
                            t.firstLineMetrics = void 0;
                            for (var i;
                                (i = t.element.firstChild) && /^[\s\u200B]*$/.test(i.textContent || " ");)
                                t.element.removeChild(i);
                            [].forEach.call(t.element.querySelectorAll("tspan.highcharts-br"), function(r, o) {
                                r.nextSibling && r.previousSibling && (0 === o && 1 === r.previousSibling.nodeType && (t.firstLineMetrics = t.renderer.fontMetrics(void 0, r.previousSibling)),
                                    a(r, {
                                        dy: e.getLineHeight(r.nextSibling),
                                        x: n
                                    }))
                            });
                            var s = this.width || 0;
                            if (s) {
                                var l = function(i, l) {
                                        var c = i.textContent || "",
                                            u = c.replace(/([^\^])-/g, "$1- ").split(" "),
                                            d = !e.noWrap && (1 < u.length || 1 < t.element.childNodes.length),
                                            p = e.getLineHeight(l),
                                            h = 0,
                                            f = t.actualWidth;
                                        if (e.ellipsis)
                                            c && e.truncate(i, c, void 0, 0, Math.max(0, s - parseInt(e.fontSize || 12, 10)), function(e, t) {
                                                return e.substring(0, t) + "\u2026"
                                            });
                                        else if (d) {
                                            for (c = [],
                                                d = []; l.firstChild && l.firstChild !== i;)
                                                d.push(l.firstChild),
                                                l.removeChild(l.firstChild);
                                            for (; u.length;)
                                                u.length && !e.noWrap && 0 < h && (c.push(i.textContent || ""),
                                                    i.textContent = u.join(" ").replace(/- /g, "-")),
                                                e.truncate(i, void 0, u, 0 === h ? f || 0 : 0, s, function(e, t) {
                                                    return u.slice(0, t).join(" ").replace(/- /g, "-")
                                                }),
                                                f = t.actualWidth,
                                                h++;
                                            d.forEach(function(e) {
                                                    l.insertBefore(e, i)
                                                }),
                                                c.forEach(function(e) {
                                                    l.insertBefore(r.createTextNode(e), i),
                                                        e = r.createElementNS(o, "tspan"),
                                                        e.textContent = "\u200b",
                                                        a(e, {
                                                            dy: p,
                                                            x: n
                                                        }),
                                                        l.insertBefore(e, i)
                                                })
                                        }
                                    },
                                    c = function(e) {
                                        [].slice.call(e.childNodes).forEach(function(n) {
                                            n.nodeType === Node.TEXT_NODE ? l(n, e) : (-1 !== n.className.baseVal.indexOf("highcharts-br") && (t.actualWidth = 0),
                                                c(n))
                                        })
                                    };
                                c(t.element)
                            }
                        },
                        t.prototype.getLineHeight = function(e) {
                            var t;
                            return e = e.nodeType === Node.TEXT_NODE ? e.parentElement : e,
                                this.renderer.styledMode || (t = e && /(px|em)$/.test(e.style.fontSize) ? e.style.fontSize : this.fontSize || this.renderer.style.fontSize || 12),
                                this.textLineHeight ? parseInt(this.textLineHeight.toString(), 10) : this.renderer.fontMetrics(t, e || this.svgElement.element).h
                        },
                        t.prototype.modifyTree = function(e) {
                            var t = this,
                                n = function(r, o) {
                                    var a = r.tagName,
                                        s = t.renderer.styledMode,
                                        l = r.attributes || {};
                                    "b" === a || "strong" === a ? s ? l.class = "highcharts-strong" : l.style = "font-weight:bold;" + (l.style || "") : "i" !== a && "em" !== a || (s ? l.class = "highcharts-emphasized" : l.style = "font-style:italic;" + (l.style || "")),
                                        i(l.style) && (l.style = l.style.replace(/(;| |^)color([ :])/, "$1fill$2")),
                                        "br" === a && (l.class = "highcharts-br",
                                            r.textContent = "\u200b",
                                            (o = e[o + 1]) && o.textContent && (o.textContent = o.textContent.replace(/^ +/gm, ""))),
                                        "#text" !== a && "a" !== a && (r.tagName = "tspan"),
                                        r.attributes = l,
                                        r.children && r.children.filter(function(e) {
                                            return "#text" !== e.tagName
                                        }).forEach(n)
                                };
                            e.forEach(n)
                        },
                        t.prototype.truncate = function(e, t, n, r, o, a) {
                            var i, s = this.svgElement,
                                l = s.renderer,
                                c = s.rotation,
                                u = [],
                                d = n ? 1 : 0,
                                p = (t || n || "").length,
                                h = p,
                                f = function(o, i) {
                                    i = i || o;
                                    var c = e.parentNode;
                                    if (c && "undefined" === typeof u[i])
                                        if (c.getSubStringLength)
                                            try {
                                                u[i] = r + c.getSubStringLength(0, n ? i + 1 : i)
                                            } catch (e) {}
                                        else
                                            l.getSpanWidth && (e.textContent = a(t || n, o),
                                                u[i] = r + l.getSpanWidth(s, e));
                                    return u[i]
                                };
                            s.rotation = 0;
                            var m = f(e.textContent.length);
                            if (r + m > o) {
                                for (; d <= p;)
                                    h = Math.ceil((d + p) / 2),
                                    n && (i = a(n, h)),
                                    m = f(h, i && i.length - 1),
                                    d === p ? d = p + 1 : m > o ? p = h - 1 : d = h;
                                0 === p ? e.textContent = "" : t && p === t.length - 1 || (e.textContent = i || a(t || n, h))
                            }
                            n && n.splice(0, h),
                                s.actualWidth = m,
                                s.rotation = c
                        },
                        t.prototype.unescapeEntities = function(e, t) {
                            return s(this.renderer.escapes, function(n, r) {
                                    t && -1 !== t.indexOf(n) || (e = e.toString().replace(new RegExp(n, "g"), r))
                                }),
                                e
                        },
                        t
                }()
            }),
            t(n, "Core/Renderer/SVG/SVGRenderer.js", [n["Core/Renderer/HTML/AST.js"], n["Core/Color/Color.js"], n["Core/Globals.js"], n["Core/Color/Palette.js"], n["Core/Renderer/RendererRegistry.js"], n["Core/Renderer/SVG/SVGElement.js"], n["Core/Renderer/SVG/SVGLabel.js"], n["Core/Renderer/SVG/Symbols.js"], n["Core/Renderer/SVG/TextBuilder.js"], n["Core/Utilities.js"]], function(e, t, n, r, o, a, i, s, l, c) {
                var u, d = n.charts,
                    p = n.deg2rad,
                    h = n.doc,
                    f = n.isFirefox,
                    m = n.isMS,
                    g = n.isWebKit,
                    y = n.noop,
                    v = n.SVG_NS,
                    b = n.symbolSizes,
                    _ = n.win,
                    w = c.addEvent,
                    x = c.attr,
                    E = c.createElement,
                    k = c.css,
                    S = c.defined,
                    O = c.destroyObjectProperties,
                    C = c.extend,
                    T = c.isArray,
                    M = c.isNumber,
                    A = c.isObject,
                    P = c.isString,
                    N = c.merge,
                    j = c.pick,
                    D = c.pInt,
                    R = c.uniqueKey;
                return n = function() {
                        function n(e, t, n, r, o, a, i) {
                            this.width = this.url = this.style = this.isSVG = this.imgCount = this.height = this.gradients = this.globalAnimation = this.defs = this.chartIndex = this.cacheKeys = this.cache = this.boxWrapper = this.box = this.alignedObjects = void 0,
                                this.init(e, t, n, r, o, a, i)
                        }
                        return n.prototype.init = function(e, t, n, r, o, a, i) {
                                var s = this.createElement("svg").attr({
                                        version: "1.1",
                                        class: "highcharts-root"
                                    }),
                                    l = s.element;
                                i || s.css(this.getStyle(r)),
                                    e.appendChild(l),
                                    x(e, "dir", "ltr"), -1 === e.innerHTML.indexOf("xmlns") && x(l, "xmlns", this.SVG_NS),
                                    this.isSVG = !0,
                                    this.box = l,
                                    this.boxWrapper = s,
                                    this.alignedObjects = [],
                                    this.url = this.getReferenceURL(),
                                    this.createElement("desc").add().element.appendChild(h.createTextNode("Created with Highcharts 9.2.2")),
                                    this.defs = this.createElement("defs").add(),
                                    this.allowHTML = a,
                                    this.forExport = o,
                                    this.styledMode = i,
                                    this.gradients = {},
                                    this.cache = {},
                                    this.cacheKeys = [],
                                    this.imgCount = 0,
                                    this.setSize(t, n, !1);
                                var c;
                                f && e.getBoundingClientRect && (t = function() {
                                        k(e, {
                                                left: 0,
                                                top: 0
                                            }),
                                            c = e.getBoundingClientRect(),
                                            k(e, {
                                                left: Math.ceil(c.left) - c.left + "px",
                                                top: Math.ceil(c.top) - c.top + "px"
                                            })
                                    },
                                    t(),
                                    this.unSubPixelFix = w(_, "resize", t))
                            },
                            n.prototype.definition = function(t) {
                                return new e([t]).addToDOM(this.defs.element)
                            },
                            n.prototype.getReferenceURL = function() {
                                if ((f || g) && h.getElementsByTagName("base").length) {
                                    if (!S(u)) {
                                        var t = R();
                                        t = new e([{
                                                tagName: "svg",
                                                attributes: {
                                                    width: 8,
                                                    height: 8
                                                },
                                                children: [{
                                                    tagName: "defs",
                                                    children: [{
                                                        tagName: "clipPath",
                                                        attributes: {
                                                            id: t
                                                        },
                                                        children: [{
                                                            tagName: "rect",
                                                            attributes: {
                                                                width: 4,
                                                                height: 4
                                                            }
                                                        }]
                                                    }]
                                                }, {
                                                    tagName: "rect",
                                                    attributes: {
                                                        id: "hitme",
                                                        width: 8,
                                                        height: 8,
                                                        "clip-path": "url(#" + t + ")",
                                                        fill: "rgba(0,0,0,0.001)"
                                                    }
                                                }]
                                            }]).addToDOM(h.body),
                                            k(t, {
                                                position: "fixed",
                                                top: 0,
                                                left: 0,
                                                zIndex: 9e5
                                            });
                                        var n = h.elementFromPoint(6, 6);
                                        u = "hitme" === (n && n.id),
                                            h.body.removeChild(t)
                                    }
                                    if (u)
                                        return _.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20")
                                }
                                return ""
                            },
                            n.prototype.getStyle = function(e) {
                                return this.style = C({
                                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                                    fontSize: "12px"
                                }, e)
                            },
                            n.prototype.setStyle = function(e) {
                                this.boxWrapper.css(this.getStyle(e))
                            },
                            n.prototype.isHidden = function() {
                                return !this.boxWrapper.getBBox().width
                            },
                            n.prototype.destroy = function() {
                                var e = this.defs;
                                return this.box = null,
                                    this.boxWrapper = this.boxWrapper.destroy(),
                                    O(this.gradients || {}),
                                    this.gradients = null,
                                    e && (this.defs = e.destroy()),
                                    this.unSubPixelFix && this.unSubPixelFix(),
                                    this.alignedObjects = null
                            },
                            n.prototype.createElement = function(e) {
                                var t = new this.Element;
                                return t.init(this, e),
                                    t
                            },
                            n.prototype.getRadialAttr = function(e, t) {
                                return {
                                    cx: e[0] - e[2] / 2 + (t.cx || 0) * e[2],
                                    cy: e[1] - e[2] / 2 + (t.cy || 0) * e[2],
                                    r: (t.r || 0) * e[2]
                                }
                            },
                            n.prototype.buildText = function(e) {
                                new l(e).buildSVG()
                            },
                            n.prototype.getContrast = function(e) {
                                return e = t.parse(e).rgba,
                                    e[0] *= 1,
                                    e[1] *= 1.2,
                                    e[2] *= .5,
                                    459 < e[0] + e[1] + e[2] ? "#000000" : "#FFFFFF"
                            },
                            n.prototype.button = function(t, n, o, a, i, s, l, c, u, d) {
                                var p = this.label(t, n, o, u, void 0, void 0, d, void 0, "button"),
                                    h = this.styledMode,
                                    f = 0,
                                    g = i ? N(i) : {};
                                if (t = g && g.style || {},
                                    g = e.filterUserAttributes(g),
                                    p.attr(N({
                                        padding: 8,
                                        r: 2
                                    }, g)), !h) {
                                    g = N({
                                        fill: r.neutralColor3,
                                        stroke: r.neutralColor20,
                                        "stroke-width": 1,
                                        style: {
                                            color: r.neutralColor80,
                                            cursor: "pointer",
                                            fontWeight: "normal"
                                        }
                                    }, {
                                        style: t
                                    }, g);
                                    var y = g.style;
                                    delete g.style,
                                        s = N(g, {
                                            fill: r.neutralColor10
                                        }, e.filterUserAttributes(s || {}));
                                    var v = s.style;
                                    delete s.style,
                                        l = N(g, {
                                            fill: r.highlightColor10,
                                            style: {
                                                color: r.neutralColor100,
                                                fontWeight: "bold"
                                            }
                                        }, e.filterUserAttributes(l || {}));
                                    var b = l.style;
                                    delete l.style,
                                        c = N(g, {
                                            style: {
                                                color: r.neutralColor20
                                            }
                                        }, e.filterUserAttributes(c || {}));
                                    var _ = c.style;
                                    delete c.style
                                }
                                return w(p.element, m ? "mouseover" : "mouseenter", function() {
                                        3 !== f && p.setState(1)
                                    }),
                                    w(p.element, m ? "mouseout" : "mouseleave", function() {
                                        3 !== f && p.setState(f)
                                    }),
                                    p.setState = function(e) {
                                        1 !== e && (p.state = f = e),
                                            p.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][e || 0]),
                                            h || p.attr([g, s, l, c][e || 0]).css([y, v, b, _][e || 0])
                                    },
                                    h || p.attr(g).css(C({
                                        cursor: "default"
                                    }, y)),
                                    p.on("touchstart", function(e) {
                                        return e.stopPropagation()
                                    }).on("click", function(e) {
                                        3 !== f && a.call(p, e)
                                    })
                            },
                            n.prototype.crispLine = function(e, t, n) {
                                void 0 === n && (n = "round");
                                var r = e[0],
                                    o = e[1];
                                return S(r[1]) && r[1] === o[1] && (r[1] = o[1] = Math[n](r[1]) - t % 2 / 2),
                                    S(r[2]) && r[2] === o[2] && (r[2] = o[2] = Math[n](r[2]) + t % 2 / 2),
                                    e
                            },
                            n.prototype.path = function(e) {
                                var t = this.styledMode ? {} : {
                                    fill: "none"
                                };
                                return T(e) ? t.d = e : A(e) && C(t, e),
                                    this.createElement("path").attr(t)
                            },
                            n.prototype.circle = function(e, t, n) {
                                return e = A(e) ? e : "undefined" === typeof e ? {} : {
                                        x: e,
                                        y: t,
                                        r: n
                                    },
                                    t = this.createElement("circle"),
                                    t.xSetter = t.ySetter = function(e, t, n) {
                                        n.setAttribute("c" + t, e)
                                    },
                                    t.attr(e)
                            },
                            n.prototype.arc = function(e, t, n, r, o, a) {
                                return A(e) ? (r = e,
                                        t = r.y,
                                        n = r.r,
                                        e = r.x) : r = {
                                        innerR: r,
                                        start: o,
                                        end: a
                                    },
                                    e = this.symbol("arc", e, t, n, n, r),
                                    e.r = n,
                                    e
                            },
                            n.prototype.rect = function(e, t, n, r, o, a) {
                                o = A(e) ? e.r : o;
                                var i = this.createElement("rect");
                                return e = A(e) ? e : "undefined" === typeof e ? {} : {
                                        x: e,
                                        y: t,
                                        width: Math.max(n, 0),
                                        height: Math.max(r, 0)
                                    },
                                    this.styledMode || ("undefined" !== typeof a && (e["stroke-width"] = a,
                                            e = i.crisp(e)),
                                        e.fill = "none"),
                                    o && (e.r = o),
                                    i.rSetter = function(e, t, n) {
                                        i.r = e,
                                            x(n, {
                                                rx: e,
                                                ry: e
                                            })
                                    },
                                    i.rGetter = function() {
                                        return i.r || 0
                                    },
                                    i.attr(e)
                            },
                            n.prototype.setSize = function(e, t, n) {
                                this.width = e,
                                    this.height = t,
                                    this.boxWrapper.animate({
                                        width: e,
                                        height: t
                                    }, {
                                        step: function() {
                                            this.attr({
                                                viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                                            })
                                        },
                                        duration: j(n, !0) ? void 0 : 0
                                    }),
                                    this.alignElements()
                            },
                            n.prototype.g = function(e) {
                                var t = this.createElement("g");
                                return e ? t.attr({
                                    class: "highcharts-" + e
                                }) : t
                            },
                            n.prototype.image = function(e, t, n, r, o, a) {
                                var i = {
                                        preserveAspectRatio: "none"
                                    },
                                    s = function(e, t) {
                                        e.setAttributeNS ? e.setAttributeNS("http://www.w3.org/1999/xlink", "href", t) : e.setAttribute("hc-svg-href", t)
                                    };
                                1 < arguments.length && C(i, {
                                    x: t,
                                    y: n,
                                    width: r,
                                    height: o
                                });
                                var l = this.createElement("image").attr(i);
                                if (i = function(t) {
                                        s(l.element, e),
                                            a.call(l, t)
                                    },
                                    a) {
                                    s(l.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==");
                                    var c = new _.Image;
                                    w(c, "load", i),
                                        c.src = e,
                                        c.complete && i({})
                                } else
                                    s(l.element, e);
                                return l
                            },
                            n.prototype.symbol = function(e, t, n, r, o, a) {
                                var i, s = this,
                                    l = /^url\((.*?)\)$/,
                                    c = l.test(e),
                                    u = !c && (this.symbols[e] ? e : "circle"),
                                    p = u && this.symbols[u];
                                if (p) {
                                    "number" === typeof t && (i = p.call(this.symbols, Math.round(t || 0), Math.round(n || 0), r || 0, o || 0, a));
                                    var f = this.path(i);
                                    s.styledMode || f.attr("fill", "none"),
                                        C(f, {
                                            symbolName: u || void 0,
                                            x: t,
                                            y: n,
                                            width: r,
                                            height: o
                                        }),
                                        a && C(f, a)
                                } else if (c) {
                                    var m = e.match(l)[1],
                                        g = f = this.image(m);
                                    g.imgwidth = j(b[m] && b[m].width, a && a.width),
                                        g.imgheight = j(b[m] && b[m].height, a && a.height);
                                    var y = function(e) {
                                        return e.attr({
                                            width: e.width,
                                            height: e.height
                                        })
                                    };
                                    ["width", "height"].forEach(function(e) {
                                            g[e + "Setter"] = function(e, t) {
                                                var n = this["img" + t];
                                                this[t] = e,
                                                    S(n) && (a && "within" === a.backgroundSize && this.width && this.height && (n = Math.round(n * Math.min(this.width / this.imgwidth, this.height / this.imgheight))),
                                                        this.element && this.element.setAttribute(t, n),
                                                        this.alignByTranslate || (e = ((this[t] || 0) - n) / 2,
                                                            this.attr("width" === t ? {
                                                                translateX: e
                                                            } : {
                                                                translateY: e
                                                            })))
                                            }
                                        }),
                                        S(t) && g.attr({
                                            x: t,
                                            y: n
                                        }),
                                        g.isImg = !0,
                                        S(g.imgwidth) && S(g.imgheight) ? y(g) : (g.attr({
                                                width: 0,
                                                height: 0
                                            }),
                                            E("img", {
                                                onload: function() {
                                                    var e = d[s.chartIndex];
                                                    0 === this.width && (k(this, {
                                                                position: "absolute",
                                                                top: "-999em"
                                                            }),
                                                            h.body.appendChild(this)),
                                                        b[m] = {
                                                            width: this.width,
                                                            height: this.height
                                                        },
                                                        g.imgwidth = this.width,
                                                        g.imgheight = this.height,
                                                        g.element && y(g),
                                                        this.parentNode && this.parentNode.removeChild(this),
                                                        --s.imgCount || !e || e.hasLoaded || e.onload()
                                                },
                                                src: m
                                            }),
                                            this.imgCount++)
                                }
                                return f
                            },
                            n.prototype.clipRect = function(e, t, n, r) {
                                var o = R() + "-",
                                    a = this.createElement("clipPath").attr({
                                        id: o
                                    }).add(this.defs);
                                return e = this.rect(e, t, n, r, 0).add(a),
                                    e.id = o,
                                    e.clipPath = a,
                                    e.count = 0,
                                    e
                            },
                            n.prototype.text = function(e, t, n, r) {
                                var o = {};
                                return !r || !this.allowHTML && this.forExport ? (o.x = Math.round(t || 0),
                                    n && (o.y = Math.round(n)),
                                    S(e) && (o.text = e),
                                    e = this.createElement("text").attr(o),
                                    (!r || this.forExport && !this.allowHTML) && (e.xSetter = function(e, t, n) {
                                        for (var r, o = n.getElementsByTagName("tspan"), a = n.getAttribute(t), i = 0; i < o.length; i++)
                                            r = o[i],
                                            r.getAttribute(t) === a && r.setAttribute(t, e);
                                        n.setAttribute(t, e)
                                    }),
                                    e) : this.html(e, t, n)
                            },
                            n.prototype.fontMetrics = function(e, t) {
                                return e = !this.styledMode && /px/.test(e) || !_.getComputedStyle ? e || t && t.style && t.style.fontSize || this.style && this.style.fontSize : t && a.prototype.getStyle.call(t, "font-size"),
                                    e = /px/.test(e) ? D(e) : 12,
                                    t = 24 > e ? e + 3 : Math.round(1.2 * e), {
                                        h: t,
                                        b: Math.round(.8 * t),
                                        f: e
                                    }
                            },
                            n.prototype.rotCorr = function(e, t, n) {
                                var r = e;
                                return t && n && (r = Math.max(r * Math.cos(t * p), 4)), {
                                    x: -e / 3 * Math.sin(t * p),
                                    y: r
                                }
                            },
                            n.prototype.pathToSegments = function(e) {
                                for (var t = [], n = [], r = {
                                        A: 8,
                                        C: 7,
                                        H: 2,
                                        L: 3,
                                        M: 3,
                                        Q: 5,
                                        S: 5,
                                        T: 3,
                                        V: 2
                                    }, o = 0; o < e.length; o++)
                                    P(n[0]) && M(e[o]) && n.length === r[n[0].toUpperCase()] && e.splice(o, 0, n[0].replace("M", "L").replace("m", "l")),
                                    "string" === typeof e[o] && (n.length && t.push(n.slice(0)),
                                        n.length = 0),
                                    n.push(e[o]);
                                return t.push(n.slice(0)),
                                    t
                            },
                            n.prototype.label = function(e, t, n, r, o, a, s, l, c) {
                                return new i(this, e, t, n, r, o, a, s, l, c)
                            },
                            n.prototype.alignElements = function() {
                                this.alignedObjects.forEach(function(e) {
                                    return e.align()
                                })
                            },
                            n
                    }(),
                    C(n.prototype, {
                        Element: a,
                        SVG_NS: v,
                        escapes: {
                            "&": "&amp;",
                            "<": "&lt;",
                            ">": "&gt;",
                            "'": "&#39;",
                            '"': "&quot;"
                        },
                        symbols: s,
                        draw: y
                    }),
                    o.registerRendererType("svg", n, !0),
                    n
            }),
            t(n, "Core/Renderer/HTML/HTMLElement.js", [n["Core/Globals.js"], n["Core/Renderer/SVG/SVGElement.js"], n["Core/Utilities.js"]], function(e, t, n) {
                var r = this && this.__extends || function() {
                        var e = function(t, n) {
                            return (e = Object.setPrototypeOf || {
                                    __proto__: []
                                }
                                instanceof Array && function(e, t) {
                                    e.__proto__ = t
                                } ||

                                function(e, t) {
                                    for (var n in t)
                                        t.hasOwnProperty(n) && (e[n] = t[n])
                                }
                            )(t, n)
                        };
                        return function(t, n) {
                            function r() {
                                this.constructor = t
                            }
                            e(t, n),
                                t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype,
                                    new r)
                        }
                    }(),
                    o = e.isFirefox,
                    a = e.isMS,
                    i = e.isWebKit,
                    s = e.win,
                    l = n.css,
                    c = n.defined,
                    u = n.extend,
                    d = n.pick,
                    p = n.pInt;
                return function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e),
                        t.compose = function(e) {
                            if (-1 === t.composedClasses.indexOf(e)) {
                                t.composedClasses.push(e);
                                var n = t.prototype,
                                    r = e.prototype;
                                r.getSpanCorrection = n.getSpanCorrection,
                                    r.htmlCss = n.htmlCss,
                                    r.htmlGetBBox = n.htmlGetBBox,
                                    r.htmlUpdateTransform = n.htmlUpdateTransform,
                                    r.setSpanRotation = n.setSpanRotation
                            }
                            return e
                        },
                        t.prototype.getSpanCorrection = function(e, t, n) {
                            this.xCorr = -e * n,
                                this.yCorr = -t
                        },
                        t.prototype.htmlCss = function(e) {
                            var t = "SPAN" === this.element.tagName && e && "width" in e,
                                n = d(t && e.width, void 0);
                            if (t) {
                                delete e.width,
                                    this.textWidth = n;
                                var r = !0
                            }
                            return e && "ellipsis" === e.textOverflow && (e.whiteSpace = "nowrap",
                                    e.overflow = "hidden"),
                                this.styles = u(this.styles, e),
                                l(this.element, e),
                                r && this.htmlUpdateTransform(),
                                this
                        },
                        t.prototype.htmlGetBBox = function() {
                            var e = this.element;
                            return {
                                x: e.offsetLeft,
                                y: e.offsetTop,
                                width: e.offsetWidth,
                                height: e.offsetHeight
                            }
                        },
                        t.prototype.htmlUpdateTransform = function() {
                            if (this.added) {
                                var e = this.renderer,
                                    t = this.element,
                                    n = this.translateX || 0,
                                    r = this.translateY || 0,
                                    o = this.x || 0,
                                    a = this.y || 0,
                                    i = this.textAlign || "left",
                                    s = {
                                        left: 0,
                                        center: .5,
                                        right: 1
                                    }[i],
                                    u = this.styles;
                                if (u = u && u.whiteSpace,
                                    l(t, {
                                        marginLeft: n,
                                        marginTop: r
                                    }), !e.styledMode && this.shadows && this.shadows.forEach(function(e) {
                                        l(e, {
                                            marginLeft: n + 1,
                                            marginTop: r + 1
                                        })
                                    }),
                                    this.inverted && [].forEach.call(t.childNodes, function(n) {
                                        e.invertChild(n, t)
                                    }),
                                    "SPAN" === t.tagName) {
                                    var d = this.rotation,
                                        h = this.textWidth && p(this.textWidth),
                                        f = [d, i, t.innerHTML, this.textWidth, this.textAlign].join(),
                                        m = void 0;
                                    (m = h !== this.oldTextWidth) && !(m = h > this.oldTextWidth) && ((m = this.textPxLength) || (l(t, {
                                                width: "",
                                                whiteSpace: u || "nowrap"
                                            }),
                                            m = t.offsetWidth),
                                        m = m > h),
                                    m && (/[ \-]/.test(t.textContent || t.innerText) || "ellipsis" === t.style.textOverflow) ? (l(t, {
                                                width: h + "px",
                                                display: "block",
                                                whiteSpace: u || "normal"
                                            }),
                                            this.oldTextWidth = h,
                                            this.hasBoxWidthChanged = !0) : this.hasBoxWidthChanged = !1,
                                        f !== this.cTT && (m = e.fontMetrics(t.style.fontSize, t).b, !c(d) || d === (this.oldRotation || 0) && i === this.oldAlign || this.setSpanRotation(d, s, m),
                                            this.getSpanCorrection(!c(d) && this.textPxLength || t.offsetWidth, m, s, d, i)),
                                        l(t, {
                                            left: o + (this.xCorr || 0) + "px",
                                            top: a + (this.yCorr || 0) + "px"
                                        }),
                                        this.cTT = f,
                                        this.oldRotation = d,
                                        this.oldAlign = i
                                }
                            } else
                                this.alignOnAdd = !0
                        },
                        t.prototype.setSpanRotation = function(e, t, n) {
                            var r = {},
                                c = a && !/Edge/.test(s.navigator.userAgent) ? "-ms-transform" : i ? "-webkit-transform" : o ? "MozTransform" : s.opera ? "-o-transform" : void 0;
                            c && (r[c] = r.transform = "rotate(" + e + "deg)",
                                r[c + (o ? "Origin" : "-origin")] = r.transformOrigin = 100 * t + "% " + n + "px",
                                l(this.element, r))
                        },
                        t.composedClasses = [],
                        t
                }(t)
            }),
            t(n, "Core/Renderer/HTML/HTMLRenderer.js", [n["Core/Renderer/HTML/AST.js"], n["Core/Renderer/SVG/SVGElement.js"], n["Core/Renderer/SVG/SVGRenderer.js"], n["Core/Utilities.js"]], function(e, t, n, r) {
                var o = this && this.__extends || function() {
                        var e = function(t, n) {
                            return (e = Object.setPrototypeOf || {
                                    __proto__: []
                                }
                                instanceof Array && function(e, t) {
                                    e.__proto__ = t
                                } ||

                                function(e, t) {
                                    for (var n in t)
                                        t.hasOwnProperty(n) && (e[n] = t[n])
                                }
                            )(t, n)
                        };
                        return function(t, n) {
                            function r() {
                                this.constructor = t
                            }
                            e(t, n),
                                t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype,
                                    new r)
                        }
                    }(),
                    a = r.attr,
                    i = r.createElement,
                    s = r.extend,
                    l = r.pick;
                return function(n) {
                    function r() {
                        return null !== n && n.apply(this, arguments) || this
                    }
                    return o(r, n),
                        r.compose = function(e) {
                            return -1 === r.composedClasses.indexOf(e) && (r.composedClasses.push(e),
                                    e.prototype.html = r.prototype.html),
                                e
                        },
                        r.prototype.html = function(n, r, o) {
                            var c = this.createElement("span"),
                                u = c.element,
                                d = c.renderer,
                                p = d.isSVG,
                                h = function(e, n) {
                                    ["opacity", "visibility"].forEach(function(r) {
                                            e[r + "Setter"] = function(o, a, i) {
                                                var s = e.div ? e.div.style : n;
                                                t.prototype[r + "Setter"].call(this, o, a, i),
                                                    s && (s[a] = o)
                                            }
                                        }),
                                        e.addedSetters = !0
                                };
                            return c.textSetter = function(t) {
                                    t !== this.textStr && (delete this.bBox,
                                        delete this.oldTextWidth,
                                        e.setElementHTML(this.element, l(t, "")),
                                        this.textStr = t,
                                        c.doTransform = !0)
                                },
                                p && h(c, c.element.style),
                                c.xSetter = c.ySetter = c.alignSetter = c.rotationSetter = function(e, t) {
                                    "align" === t ? c.alignValue = c.textAlign = e : c[t] = e,
                                        c.doTransform = !0
                                },
                                c.afterSetters = function() {
                                    this.doTransform && (this.htmlUpdateTransform(),
                                        this.doTransform = !1)
                                },
                                c.attr({
                                    text: n,
                                    x: Math.round(r),
                                    y: Math.round(o)
                                }).css({
                                    position: "absolute"
                                }),
                                d.styledMode || c.css({
                                    fontFamily: this.style.fontFamily,
                                    fontSize: this.style.fontSize
                                }),
                                u.style.whiteSpace = "nowrap",
                                c.css = c.htmlCss,
                                p && (c.add = function(e) {
                                    var t = d.box.parentNode,
                                        n = [];
                                    if (this.parentGroup = e) {
                                        var r = e.div;
                                        if (!r) {
                                            for (; e;)
                                                n.push(e),
                                                e = e.parentGroup;
                                            n.reverse().forEach(function(e) {
                                                function o(t, n) {
                                                    e[n] = t,
                                                        "translateX" === n ? d.left = t + "px" : d.top = t + "px",
                                                        e.doTransform = !0
                                                }
                                                var l = a(e.element, "class"),
                                                    u = e.styles || {};
                                                r = e.div = e.div || i("div", l ? {
                                                    className: l
                                                } : void 0, {
                                                    position: "absolute",
                                                    left: (e.translateX || 0) + "px",
                                                    top: (e.translateY || 0) + "px",
                                                    display: e.display,
                                                    opacity: e.opacity,
                                                    cursor: u.cursor,
                                                    pointerEvents: u.pointerEvents,
                                                    visibility: e.visibility
                                                }, r || t);
                                                var d = r.style;
                                                s(e, {
                                                        classSetter: function(e) {
                                                            return function(t) {
                                                                this.element.setAttribute("class", t),
                                                                    e.className = t
                                                            }
                                                        }(r),
                                                        on: function() {
                                                            return n[0].div && c.on.apply({
                                                                    element: n[0].div,
                                                                    onEvents: e.onEvents
                                                                }, arguments),
                                                                e
                                                        },
                                                        translateXSetter: o,
                                                        translateYSetter: o
                                                    }),
                                                    e.addedSetters || h(e)
                                            })
                                        }
                                    } else
                                        r = t;
                                    return r.appendChild(u),
                                        c.added = !0,
                                        c.alignOnAdd && c.htmlUpdateTransform(),
                                        c
                                }),
                                c
                        },
                        r.composedClasses = [],
                        r
                }(n)
            }),
            t(n, "Core/Axis/AxisDefaults.js", [n["Core/Color/Palette.js"]], function(e) {
                var t;
                return function(t) {
                        t.defaultXAxisOptions = {
                                alignTicks: !0,
                                allowDecimals: void 0,
                                panningEnabled: !0,
                                zIndex: 2,
                                zoomEnabled: !0,
                                dateTimeLabelFormats: {
                                    millisecond: {
                                        main: "%H:%M:%S.%L",
                                        range: !1
                                    },
                                    second: {
                                        main: "%H:%M:%S",
                                        range: !1
                                    },
                                    minute: {
                                        main: "%H:%M",
                                        range: !1
                                    },
                                    hour: {
                                        main: "%H:%M",
                                        range: !1
                                    },
                                    day: {
                                        main: "%e. %b"
                                    },
                                    week: {
                                        main: "%e. %b"
                                    },
                                    month: {
                                        main: "%b '%y"
                                    },
                                    year: {
                                        main: "%Y"
                                    }
                                },
                                endOnTick: !1,
                                gridLineDashStyle: "Solid",
                                gridZIndex: 1,
                                labels: {
                                    autoRotation: void 0,
                                    autoRotationLimit: 80,
                                    distance: void 0,
                                    enabled: !0,
                                    indentation: 10,
                                    overflow: "justify",
                                    padding: 5,
                                    reserveSpace: void 0,
                                    rotation: void 0,
                                    staggerLines: 0,
                                    step: 0,
                                    useHTML: !1,
                                    x: 0,
                                    zIndex: 7,
                                    style: {
                                        color: e.neutralColor60,
                                        cursor: "default",
                                        fontSize: "11px"
                                    }
                                },
                                maxPadding: .01,
                                minorGridLineDashStyle: "Solid",
                                minorTickLength: 2,
                                minorTickPosition: "outside",
                                minPadding: .01,
                                offset: void 0,
                                opposite: !1,
                                reversed: void 0,
                                reversedStacks: !1,
                                showEmpty: !0,
                                showFirstLabel: !0,
                                showLastLabel: !0,
                                startOfWeek: 1,
                                startOnTick: !1,
                                tickLength: 10,
                                tickPixelInterval: 100,
                                tickmarkPlacement: "between",
                                tickPosition: "outside",
                                title: {
                                    align: "middle",
                                    rotation: 0,
                                    useHTML: !1,
                                    x: 0,
                                    y: 0,
                                    style: {
                                        color: e.neutralColor60
                                    }
                                },
                                type: "linear",
                                uniqueNames: !0,
                                visible: !0,
                                minorGridLineColor: e.neutralColor5,
                                minorGridLineWidth: 1,
                                minorTickColor: e.neutralColor40,
                                lineColor: e.highlightColor20,
                                lineWidth: 1,
                                gridLineColor: e.neutralColor10,
                                gridLineWidth: void 0,
                                tickColor: e.highlightColor20
                            },
                            t.defaultYAxisOptions = {
                                reversedStacks: !0,
                                endOnTick: !0,
                                maxPadding: .05,
                                minPadding: .05,
                                tickPixelInterval: 72,
                                showLastLabel: !0,
                                labels: {
                                    x: -8
                                },
                                startOnTick: !0,
                                title: {
                                    rotation: 270,
                                    text: "Values"
                                },
                                stackLabels: {
                                    animation: {},
                                    allowOverlap: !1,
                                    enabled: !1,
                                    crop: !0,
                                    overflow: "justify",
                                    formatter: function() {
                                        return (0,
                                            this.axis.chart.numberFormatter)(this.total, -1)
                                    },
                                    style: {
                                        color: e.neutralColor100,
                                        fontSize: "11px",
                                        fontWeight: "bold",
                                        textOutline: "1px contrast"
                                    }
                                },
                                gridLineWidth: 1,
                                lineWidth: 0
                            },
                            t.defaultLeftAxisOptions = {
                                labels: {
                                    x: -15
                                },
                                title: {
                                    rotation: 270
                                }
                            },
                            t.defaultRightAxisOptions = {
                                labels: {
                                    x: 15
                                },
                                title: {
                                    rotation: 90
                                }
                            },
                            t.defaultBottomAxisOptions = {
                                labels: {
                                    autoRotation: [-45],
                                    x: 0
                                },
                                margin: 15,
                                title: {
                                    rotation: 0
                                }
                            },
                            t.defaultTopAxisOptions = {
                                labels: {
                                    autoRotation: [-45],
                                    x: 0
                                },
                                margin: 15,
                                title: {
                                    rotation: 0
                                }
                            }
                    }(t || (t = {})),
                    t
            }),
            t(n, "Core/Foundation.js", [n["Core/Utilities.js"]], function(e) {
                var t = e.addEvent,
                    n = e.isFunction,
                    r = e.objectEach,
                    o = e.removeEvent;
                return {
                    registerEventOptions: function(e, a) {
                        e.eventOptions = e.eventOptions || {},
                            r(a.events, function(r, a) {
                                e.eventOptions[a] !== r && (e.eventOptions[a] && (o(e, a, e.eventOptions[a]),
                                        delete e.eventOptions[a]),
                                    n(r) && (e.eventOptions[a] = r,
                                        t(e, a, r)))
                            })
                    }
                }
            }),
            t(n, "Core/Axis/Tick.js", [n["Core/FormatUtilities.js"], n["Core/Globals.js"], n["Core/Utilities.js"]], function(e, t, n) {
                var r = t.deg2rad,
                    o = n.clamp,
                    a = n.correctFloat,
                    i = n.defined,
                    s = n.destroyObjectProperties,
                    l = n.extend,
                    c = n.fireEvent,
                    u = n.isNumber,
                    d = n.merge,
                    p = n.objectEach,
                    h = n.pick;
                return t = function() {
                    function t(e, t, n, r, o) {
                        this.isNewLabel = this.isNew = !0,
                            this.axis = e,
                            this.pos = t,
                            this.type = n || "",
                            this.parameters = o || {},
                            this.tickmarkOffset = this.parameters.tickmarkOffset,
                            this.options = this.parameters.options,
                            c(this, "init"),
                            n || r || this.addLabel()
                    }
                    return t.prototype.addLabel = function() {
                            var t = this,
                                n = t.axis,
                                r = n.options,
                                o = n.chart,
                                s = n.categories,
                                d = n.logarithmic,
                                p = n.names,
                                f = t.pos,
                                m = h(t.options && t.options.labels, r.labels),
                                g = n.tickPositions,
                                y = f === g[0],
                                v = f === g[g.length - 1],
                                b = (!m.step || 1 === m.step) && 1 === n.tickInterval;
                            g = g.info;
                            var _, w = t.label;
                            if (s = this.parameters.category || (s ? h(s[f], p[f], f) : f),
                                d && u(s) && (s = a(d.lin2log(s))),
                                n.dateTime)
                                if (g)
                                    var x = o.time.resolveDTLFormat(r.dateTimeLabelFormats[!r.grid && g.higherRanks[f] || g.unitName]),
                                        E = x.main;
                                else
                                    u(s) && (E = n.dateTime.getXDateFormat(s, r.dateTimeLabelFormats || {}));
                            t.isFirst = y,
                                t.isLast = v;
                            var k = {
                                axis: n,
                                chart: o,
                                dateTimeLabelFormat: E,
                                isFirst: y,
                                isLast: v,
                                pos: f,
                                tick: t,
                                tickPositionInfo: g,
                                value: s
                            };
                            c(this, "labelFormat", k);
                            var S = function(t) {
                                return m.formatter ? m.formatter.call(t, t) : m.format ? (t.text = n.defaultLabelFormatter.call(t),
                                    e.format(m.format, t, o)) : n.defaultLabelFormatter.call(t, t)
                            };
                            r = S.call(k, k);
                            var O = x && x.list;
                            t.shortenLabel = O ? function() {
                                    for (_ = 0; _ < O.length; _++)
                                        if (l(k, {
                                                dateTimeLabelFormat: O[_]
                                            }),
                                            w.attr({
                                                text: S.call(k, k)
                                            }),
                                            w.getBBox().width < n.getSlotWidth(t) - 2 * m.padding)
                                            return;
                                    w.attr({
                                        text: ""
                                    })
                                } :
                                void 0,
                                b && n._addedPlotLB && t.moveLabel(r, m),
                                i(w) || t.movedLabel ? w && w.textStr !== r && !b && (!w.textWidth || m.style.width || w.styles.width || w.css({
                                        width: null
                                    }),
                                    w.attr({
                                        text: r
                                    }),
                                    w.textPxLength = w.getBBox().width) : (t.label = w = t.createLabel({
                                        x: 0,
                                        y: 0
                                    }, r, m),
                                    t.rotation = 0)
                        },
                        t.prototype.createLabel = function(e, t, n) {
                            var r = this.axis,
                                o = r.chart;
                            return (e = i(t) && n.enabled ? o.renderer.text(t, e.x, e.y, n.useHTML).add(r.labelGroup) : null) && (o.styledMode || e.css(d(n.style)),
                                    e.textPxLength = e.getBBox().width),
                                e
                        },
                        t.prototype.destroy = function() {
                            s(this, this.axis)
                        },
                        t.prototype.getPosition = function(e, t, n, r) {
                            var i = this.axis,
                                s = i.chart,
                                l = r && s.oldChartHeight || s.chartHeight;
                            return e = {
                                    x: e ? a(i.translate(t + n, null, null, r) + i.transB) : i.left + i.offset + (i.opposite ? (r && s.oldChartWidth || s.chartWidth) - i.right - i.left : 0),
                                    y: e ? l - i.bottom + i.offset - (i.opposite ? i.height : 0) : a(l - i.translate(t + n, null, null, r) - i.transB)
                                },
                                e.y = o(e.y, -1e5, 1e5),
                                c(this, "afterGetPosition", {
                                    pos: e
                                }),
                                e
                        },
                        t.prototype.getLabelPosition = function(e, t, n, o, a, s, l, u) {
                            var d = this.axis,
                                p = d.transA,
                                h = d.isLinked && d.linkedParent ? d.linkedParent.reversed : d.reversed,
                                f = d.staggerLines,
                                m = d.tickRotCorr || {
                                    x: 0,
                                    y: 0
                                },
                                g = o || d.reserveSpaceDefault ? 0 : -d.labelOffset * ("center" === d.labelAlign ? .5 : 1),
                                y = {},
                                v = a.y;
                            return i(v) || (v = 0 === d.side ? n.rotation ? -8 : -n.getBBox().height : 2 === d.side ? m.y + 8 : Math.cos(n.rotation * r) * (m.y - n.getBBox(!1, 0).height / 2)),
                                e = e + a.x + g + m.x - (s && o ? s * p * (h ? -1 : 1) : 0),
                                t = t + v - (s && !o ? s * p * (h ? 1 : -1) : 0),
                                f && (n = l / (u || 1) % f,
                                    d.opposite && (n = f - n - 1),
                                    t += d.labelOffset / f * n),
                                y.x = e,
                                y.y = Math.round(t),
                                c(this, "afterGetLabelPosition", {
                                    pos: y,
                                    tickmarkOffset: s,
                                    index: l
                                }),
                                y
                        },
                        t.prototype.getLabelSize = function() {
                            return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
                        },
                        t.prototype.getMarkPath = function(e, t, n, r, o, a) {
                            return a.crispLine([
                                ["M", e, t],
                                ["L", e + (o ? 0 : -n), t + (o ? n : 0)]
                            ], r)
                        },
                        t.prototype.handleOverflow = function(e) {
                            var t = this.axis,
                                n = t.options.labels,
                                o = e.x,
                                a = t.chart.chartWidth,
                                i = t.chart.spacing,
                                s = h(t.labelLeft, Math.min(t.pos, i[3]));
                            i = h(t.labelRight, Math.max(t.isRadial ? 0 : t.pos + t.len, a - i[1]));
                            var l, c = this.label,
                                u = this.rotation,
                                d = {
                                    left: 0,
                                    center: .5,
                                    right: 1
                                }[t.labelAlign || c.attr("align")],
                                p = c.getBBox().width,
                                f = t.getSlotWidth(this),
                                m = {},
                                g = f,
                                y = 1;
                            u || "justify" !== n.overflow ? 0 > u && o - d * p < s ? l = Math.round(o / Math.cos(u * r) - s) : 0 < u && o + d * p > i && (l = Math.round((a - o) / Math.cos(u * r))) : (a = o + (1 - d) * p,
                                    o - d * p < s ? g = e.x + g * (1 - d) - s : a > i && (g = i - e.x + g * d,
                                        y = -1),
                                    g = Math.min(f, g),
                                    g < f && "center" === t.labelAlign && (e.x += y * (f - g - d * (f - Math.min(p, g)))),
                                    (p > g || t.autoRotation && (c.styles || {}).width) && (l = g)),
                                l && (this.shortenLabel ? this.shortenLabel() : (m.width = Math.floor(l) + "px",
                                    (n.style || {}).textOverflow || (m.textOverflow = "ellipsis"),
                                    c.css(m)))
                        },
                        t.prototype.moveLabel = function(e, t) {
                            var n = this,
                                r = n.label,
                                o = n.axis,
                                a = o.reversed,
                                i = !1;
                            if (r && r.textStr === e ? (n.movedLabel = r,
                                    i = !0,
                                    delete n.label) : p(o.ticks, function(t) {
                                    i || t.isNew || t === n || !t.label || t.label.textStr !== e || (n.movedLabel = t.label,
                                        i = !0,
                                        t.labelPos = n.movedLabel.xy,
                                        delete t.label)
                                }), !i && (n.labelPos || r)) {
                                var s = n.labelPos || r.xy;
                                r = o.horiz ? a ? 0 : o.width + o.left : s.x,
                                    o = o.horiz ? s.y : a ? o.width + o.left : 0,
                                    n.movedLabel = n.createLabel({
                                        x: r,
                                        y: o
                                    }, e, t),
                                    n.movedLabel && n.movedLabel.attr({
                                        opacity: 0
                                    })
                            }
                        },
                        t.prototype.render = function(e, t, n) {
                            var r = this.axis,
                                o = r.horiz,
                                a = this.pos,
                                i = h(this.tickmarkOffset, r.tickmarkOffset);
                            a = this.getPosition(o, a, i, t),
                                i = a.x;
                            var s = a.y;
                            r = o && i === r.pos + r.len || !o && s === r.pos ? -1 : 1,
                                o = h(n, this.label && this.label.newOpacity, 1),
                                n = h(n, 1),
                                this.isActive = !0,
                                this.renderGridLine(t, n, r),
                                this.renderMark(a, n, r),
                                this.renderLabel(a, t, o, e),
                                this.isNew = !1,
                                c(this, "afterRender")
                        },
                        t.prototype.renderGridLine = function(e, t, n) {
                            var r = this.axis,
                                o = r.options,
                                a = {},
                                i = this.pos,
                                s = this.type,
                                l = h(this.tickmarkOffset, r.tickmarkOffset),
                                c = r.chart.renderer,
                                u = this.gridLine,
                                d = o.gridLineWidth,
                                p = o.gridLineColor,
                                f = o.gridLineDashStyle;
                            "minor" === this.type && (d = o.minorGridLineWidth,
                                    p = o.minorGridLineColor,
                                    f = o.minorGridLineDashStyle),
                                u || (r.chart.styledMode || (a.stroke = p,
                                        a["stroke-width"] = d || 0,
                                        a.dashstyle = f),
                                    s || (a.zIndex = 1),
                                    e && (t = 0),
                                    this.gridLine = u = c.path().attr(a).addClass("highcharts-" + (s ? s + "-" : "") + "grid-line").add(r.gridGroup)),
                                u && (n = r.getPlotLinePath({
                                    value: i + l,
                                    lineWidth: u.strokeWidth() * n,
                                    force: "pass",
                                    old: e
                                })) && u[e || this.isNew ? "attr" : "animate"]({
                                    d: n,
                                    opacity: t
                                })
                        },
                        t.prototype.renderMark = function(e, t, n) {
                            var r = this.axis,
                                o = r.options,
                                a = r.chart.renderer,
                                i = this.type,
                                s = r.tickSize(i ? i + "Tick" : "tick"),
                                l = e.x;
                            e = e.y;
                            var c = h(o["minor" !== i ? "tickWidth" : "minorTickWidth"], !i && r.isXAxis ? 1 : 0);
                            o = o["minor" !== i ? "tickColor" : "minorTickColor"];
                            var u = this.mark,
                                d = !u;
                            s && (r.opposite && (s[0] = -s[0]),
                                u || (this.mark = u = a.path().addClass("highcharts-" + (i ? i + "-" : "") + "tick").add(r.axisGroup),
                                    r.chart.styledMode || u.attr({
                                        stroke: o,
                                        "stroke-width": c
                                    })),
                                u[d ? "attr" : "animate"]({
                                    d: this.getMarkPath(l, e, s[0], u.strokeWidth() * n, r.horiz, a),
                                    opacity: t
                                }))
                        },
                        t.prototype.renderLabel = function(e, t, n, r) {
                            var o = this.axis,
                                a = o.horiz,
                                i = o.options,
                                s = this.label,
                                l = i.labels,
                                c = l.step;
                            o = h(this.tickmarkOffset, o.tickmarkOffset);
                            var d = e.x;
                            e = e.y;
                            var p = !0;
                            s && u(d) && (s.xy = e = this.getLabelPosition(d, e, s, a, l, o, r, c),
                                this.isFirst && !this.isLast && !i.showFirstLabel || this.isLast && !this.isFirst && !i.showLastLabel ? p = !1 : !a || l.step || l.rotation || t || 0 === n || this.handleOverflow(e),
                                c && r % c && (p = !1),
                                p && u(e.y) ? (e.opacity = n,
                                    s[this.isNewLabel ? "attr" : "animate"](e),
                                    this.isNewLabel = !1) : (s.attr("y", -9999),
                                    this.isNewLabel = !0))
                        },
                        t.prototype.replaceMovedLabel = function() {
                            var e = this.label,
                                t = this.axis,
                                n = t.reversed;
                            if (e && !this.isNew) {
                                var r = t.horiz ? n ? t.left : t.width + t.left : e.xy.x;
                                n = t.horiz ? e.xy.y : n ? t.width + t.top : t.top,
                                    e.animate({
                                        x: r,
                                        y: n,
                                        opacity: 0
                                    }, void 0, e.destroy),
                                    delete this.label
                            }
                            t.isDirty = !0,
                                this.label = this.movedLabel,
                                delete this.movedLabel
                        },
                        t
                }()
            }),
            t(n, "Core/Axis/Axis.js", [n["Core/Animation/AnimationUtilities.js"], n["Core/Axis/AxisDefaults.js"], n["Core/Color/Color.js"], n["Core/Color/Palette.js"], n["Core/DefaultOptions.js"], n["Core/Foundation.js"], n["Core/Globals.js"], n["Core/Axis/Tick.js"], n["Core/Utilities.js"]], function(e, t, n, r, o, a, i, s, l) {
                var c = e.animObject,
                    u = o.defaultOptions,
                    d = a.registerEventOptions,
                    p = i.deg2rad,
                    h = l.arrayMax,
                    f = l.arrayMin,
                    m = l.clamp,
                    g = l.correctFloat,
                    y = l.defined,
                    v = l.destroyObjectProperties,
                    b = l.erase,
                    _ = l.error,
                    w = l.extend,
                    x = l.fireEvent,
                    E = l.getMagnitude,
                    k = l.isArray,
                    S = l.isNumber,
                    O = l.isString,
                    C = l.merge,
                    T = l.normalizeTickInterval,
                    M = l.objectEach,
                    A = l.pick,
                    P = l.relativeLength,
                    N = l.removeEvent,
                    j = l.splat,
                    D = l.syncTimeout;
                return e = function() {
                    function e(e, t) {
                        this.zoomEnabled = this.width = this.visible = this.userOptions = this.translationSlope = this.transB = this.transA = this.top = this.ticks = this.tickRotCorr = this.tickPositions = this.tickmarkOffset = this.tickInterval = this.tickAmount = this.side = this.series = this.right = this.positiveValuesOnly = this.pos = this.pointRangePadding = this.pointRange = this.plotLinesAndBandsGroups = this.plotLinesAndBands = this.paddedTicks = this.overlap = this.options = this.offset = this.names = this.minPixelPadding = this.minorTicks = this.minorTickInterval = this.min = this.maxLabelLength = this.max = this.len = this.left = this.labelFormatter = this.labelEdge = this.isLinked = this.height = this.hasVisibleSeries = this.hasNames = this.eventOptions = this.coll = this.closestPointRange = this.chart = this.categories = this.bottom = this.alternateBands = void 0,
                            this.init(e, t)
                    }
                    return e.prototype.init = function(e, t) {
                            var n = t.isX;
                            this.chart = e,
                                this.horiz = e.inverted && !this.isZAxis ? !n : n,
                                this.isXAxis = n,
                                this.coll = this.coll || (n ? "xAxis" : "yAxis"),
                                x(this, "init", {
                                    userOptions: t
                                }),
                                this.opposite = A(t.opposite, this.opposite),
                                this.side = A(t.side, this.side, this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3),
                                this.setOptions(t);
                            var r = this.options,
                                o = r.labels,
                                a = r.type;
                            this.userOptions = t,
                                this.minPixelPadding = 0,
                                this.reversed = A(r.reversed, this.reversed),
                                this.visible = r.visible,
                                this.zoomEnabled = r.zoomEnabled,
                                this.hasNames = "category" === a || !0 === r.categories,
                                this.categories = r.categories || this.hasNames,
                                this.names || (this.names = [],
                                    this.names.keys = {}),
                                this.plotLinesAndBandsGroups = {},
                                this.positiveValuesOnly = !!this.logarithmic,
                                this.isLinked = y(r.linkedTo),
                                this.ticks = {},
                                this.labelEdge = [],
                                this.minorTicks = {},
                                this.plotLinesAndBands = [],
                                this.alternateBands = {},
                                this.len = 0,
                                this.minRange = this.userMinRange = r.minRange || r.maxZoom,
                                this.range = r.range,
                                this.offset = r.offset || 0,
                                this.min = this.max = null,
                                t = A(r.crosshair, j(e.options.tooltip.crosshairs)[n ? 0 : 1]),
                                this.crosshair = !0 === t ? {} : t, -1 === e.axes.indexOf(this) && (n ? e.axes.splice(e.xAxis.length, 0, this) : e.axes.push(this),
                                    e[this.coll].push(this)),
                                this.series = this.series || [],
                                e.inverted && !this.isZAxis && n && "undefined" === typeof this.reversed && (this.reversed = !0),
                                this.labelRotation = S(o.rotation) ? o.rotation : void 0,
                                d(this, r),
                                x(this, "afterInit")
                        },
                        e.prototype.setOptions = function(e) {
                            this.options = C(t.defaultXAxisOptions, "yAxis" === this.coll && t.defaultYAxisOptions, [t.defaultTopAxisOptions, t.defaultRightAxisOptions, t.defaultBottomAxisOptions, t.defaultLeftAxisOptions][this.side], C(u[this.coll], e)),
                                x(this, "afterSetOptions", {
                                    userOptions: e
                                })
                        },
                        e.prototype.defaultLabelFormatter = function(e) {
                            var t = this.axis;
                            e = this.chart.numberFormatter;
                            var n = S(this.value) ? this.value : NaN,
                                r = t.chart.time,
                                o = this.dateTimeLabelFormat,
                                a = u.lang,
                                i = a.numericSymbols;
                            a = a.numericSymbolMagnitude || 1e3;
                            var s = t.logarithmic ? Math.abs(n) : t.tickInterval,
                                l = i && i.length;
                            if (t.categories)
                                var c = "" + this.value;
                            else if (o)
                                c = r.dateFormat(o, n);
                            else if (l && 1e3 <= s)
                                for (; l-- && "undefined" === typeof c;)
                                    t = Math.pow(a, l + 1),
                                    s >= t && 0 === 10 * n % t && null !== i[l] && 0 !== n && (c = e(n / t, -1) + i[l]);
                            return "undefined" === typeof c && (c = 1e4 <= Math.abs(n) ? e(n, -1) : e(n, -1, void 0, "")),
                                c
                        },
                        e.prototype.getSeriesExtremes = function() {
                            var e, t = this,
                                n = t.chart;
                            x(this, "getSeriesExtremes", null, function() {
                                    t.hasVisibleSeries = !1,
                                        t.dataMin = t.dataMax = t.threshold = null,
                                        t.softThreshold = !t.isXAxis,
                                        t.stacking && t.stacking.buildStacks(),
                                        t.series.forEach(function(r) {
                                            if (r.visible || !n.options.chart.ignoreHiddenSeries) {
                                                var o = r.options,
                                                    a = o.threshold;
                                                if (t.hasVisibleSeries = !0,
                                                    t.positiveValuesOnly && 0 >= a && (a = null),
                                                    t.isXAxis) {
                                                    if (o = r.xData,
                                                        o.length) {
                                                        o = t.logarithmic ? o.filter(t.validatePositiveValue) : o,
                                                            e = r.getXExtremes(o);
                                                        var i = e.min,
                                                            s = e.max;
                                                        S(i) || i instanceof Date || (o = o.filter(S),
                                                                e = r.getXExtremes(o),
                                                                i = e.min,
                                                                s = e.max),
                                                            o.length && (t.dataMin = Math.min(A(t.dataMin, i), i),
                                                                t.dataMax = Math.max(A(t.dataMax, s), s))
                                                    }
                                                } else
                                                    r = r.applyExtremes(),
                                                    S(r.dataMin) && (i = r.dataMin,
                                                        t.dataMin = Math.min(A(t.dataMin, i), i)),
                                                    S(r.dataMax) && (s = r.dataMax,
                                                        t.dataMax = Math.max(A(t.dataMax, s), s)),
                                                    y(a) && (t.threshold = a),
                                                    (!o.softThreshold || t.positiveValuesOnly) && (t.softThreshold = !1)
                                            }
                                        })
                                }),
                                x(this, "afterGetSeriesExtremes")
                        },
                        e.prototype.translate = function(e, t, n, r, o, a) {
                            var i = this.linkedParent || this,
                                s = r && i.old ? i.old.min : i.min,
                                l = i.minPixelPadding;
                            o = (i.isOrdinal || i.brokenAxis && i.brokenAxis.hasBreaks || i.logarithmic && o) && i.lin2val;
                            var c = 1,
                                u = 0;
                            return r = r && i.old ? i.old.transA : i.transA,
                                r || (r = i.transA),
                                n && (c *= -1,
                                    u = i.len),
                                i.reversed && (c *= -1,
                                    u -= c * (i.sector || i.len)),
                                t ? (e = (e * c + u - l) / r + s,
                                    o && (e = i.lin2val(e))) : (o && (e = i.val2lin(e)),
                                    e = S(s) ? c * (e - s) * r + u + c * l + (S(a) ? r * a : 0) : void 0),
                                e
                        },
                        e.prototype.toPixels = function(e, t) {
                            return this.translate(e, !1, !this.horiz, null, !0) + (t ? 0 : this.pos)
                        },
                        e.prototype.toValue = function(e, t) {
                            return this.translate(e - (t ? 0 : this.pos), !0, !this.horiz, null, !0)
                        },
                        e.prototype.getPlotLinePath = function(e) {
                            function t(e, t, n) {
                                return ("pass" !== b && e < t || e > n) && (b ? e = m(e, t, n) : i = !0),
                                    e
                            }
                            var n, r, o, a, i, s = this,
                                l = s.chart,
                                c = s.left,
                                u = s.top,
                                d = e.old,
                                p = e.value,
                                h = e.lineWidth,
                                f = d && l.oldChartHeight || l.chartHeight,
                                g = d && l.oldChartWidth || l.chartWidth,
                                y = s.transB,
                                v = e.translatedValue,
                                b = e.force;
                            return e = {
                                    value: p,
                                    lineWidth: h,
                                    old: d,
                                    force: b,
                                    acrossPanes: e.acrossPanes,
                                    translatedValue: v
                                },
                                x(this, "getPlotLinePath", e, function(e) {
                                    v = A(v, s.translate(p, null, null, d)),
                                        v = m(v, -1e5, 1e5),
                                        n = o = Math.round(v + y),
                                        r = a = Math.round(f - v - y),
                                        S(v) ? s.horiz ? (r = u,
                                            a = f - s.bottom,
                                            n = o = t(n, c, c + s.width)) : (n = c,
                                            o = g - s.right,
                                            r = a = t(r, u, u + s.height)) : (i = !0,
                                            b = !1),
                                        e.path = i && !b ? null : l.renderer.crispLine([
                                            ["M", n, r],
                                            ["L", o, a]
                                        ], h || 1)
                                }),
                                e.path
                        },
                        e.prototype.getLinearTickPositions = function(e, t, n) {
                            var r = g(Math.floor(t / e) * e);
                            n = g(Math.ceil(n / e) * e);
                            var o, a = [];
                            if (g(r + e) === r && (o = 20),
                                this.single)
                                return [t];
                            for (t = r; t <= n && (a.push(t),
                                    (t = g(t + e, o)) !== i);)
                                var i = t;
                            return a
                        },
                        e.prototype.getMinorTickInterval = function() {
                            var e = this.options;
                            return !0 === e.minorTicks ? A(e.minorTickInterval, "auto") : !1 === e.minorTicks ? null : e.minorTickInterval
                        },
                        e.prototype.getMinorTickPositions = function() {
                            var e = this.options,
                                t = this.tickPositions,
                                n = this.minorTickInterval,
                                r = this.pointRangePadding || 0,
                                o = this.min - r;
                            r = this.max + r;
                            var a = r - o,
                                i = [];
                            if (a && a / n < this.len / 3) {
                                var s = this.logarithmic;
                                if (s)
                                    this.paddedTicks.forEach(function(e, t, r) {
                                        t && i.push.apply(i, s.getLogTickPositions(n, r[t - 1], r[t], !0))
                                    });
                                else if (this.dateTime && "auto" === this.getMinorTickInterval())
                                    i = i.concat(this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(n), o, r, e.startOfWeek));
                                else
                                    for (e = o + (t[0] - o) % n; e <= r && e !== i[0]; e += n)
                                        i.push(e)
                            }
                            return 0 !== i.length && this.trimTicks(i),
                                i
                        },
                        e.prototype.adjustForMinRange = function() {
                            var e, t, n, r, o = this.options,
                                a = this.logarithmic,
                                i = this.min,
                                s = this.max,
                                l = 0;
                            if (this.isXAxis && "undefined" === typeof this.minRange && !a && (y(o.min) || y(o.max) ? this.minRange = null : (this.series.forEach(function(o) {
                                        if (n = o.xData,
                                            r = o.xIncrement ? 1 : n.length - 1,
                                            1 < n.length)
                                            for (e = r; 0 < e; e--)
                                                t = n[e] - n[e - 1],
                                                (!l || t < l) && (l = t)
                                    }),
                                    this.minRange = Math.min(5 * l, this.dataMax - this.dataMin))),
                                s - i < this.minRange) {
                                var c = this.dataMax - this.dataMin >= this.minRange,
                                    u = this.minRange,
                                    d = (u - s + i) / 2;
                                d = [i - d, A(o.min, i - d)],
                                    c && (d[2] = this.logarithmic ? this.logarithmic.log2lin(this.dataMin) : this.dataMin),
                                    i = h(d),
                                    s = [i + u, A(o.max, i + u)],
                                    c && (s[2] = a ? a.log2lin(this.dataMax) : this.dataMax),
                                    s = f(s),
                                    s - i < u && (d[0] = s - u,
                                        d[1] = A(o.min, s - u),
                                        i = h(d))
                            }
                            this.min = i,
                                this.max = s
                        },
                        e.prototype.getClosest = function() {
                            var e;
                            return this.categories ? e = 1 : this.series.forEach(function(t) {
                                    var n = t.closestPointRange,
                                        r = t.visible || !t.chart.options.chart.ignoreHiddenSeries;
                                    !t.noSharedTooltip && y(n) && r && (e = y(e) ? Math.min(e, n) : n)
                                }),
                                e
                        },
                        e.prototype.nameToX = function(e) {
                            var t = k(this.categories),
                                n = t ? this.categories : this.names,
                                r = e.options.x;
                            if (e.series.requireSorting = !1,
                                y(r) || (r = this.options.uniqueNames ? t ? n.indexOf(e.name) : A(n.keys[e.name], -1) : e.series.autoIncrement()), -1 === r) {
                                if (!t)
                                    var o = n.length
                            } else
                                o = r;
                            return "undefined" !== typeof o && (this.names[o] = e.name,
                                    this.names.keys[e.name] = o),
                                o
                        },
                        e.prototype.updateNames = function() {
                            var e = this,
                                t = this.names;
                            0 < t.length && (Object.keys(t.keys).forEach(function(e) {
                                    delete t.keys[e]
                                }),
                                t.length = 0,
                                this.minRange = this.userMinRange,
                                (this.series || []).forEach(function(t) {
                                    t.xIncrement = null,
                                        t.points && !t.isDirtyData || (e.max = Math.max(e.max, t.xData.length - 1),
                                            t.processData(),
                                            t.generatePoints()),
                                        t.data.forEach(function(n, r) {
                                            if (n && n.options && "undefined" !== typeof n.name) {
                                                var o = e.nameToX(n);
                                                "undefined" !== typeof o && o !== n.x && (n.x = o,
                                                    t.xData[r] = o)
                                            }
                                        })
                                }))
                        },
                        e.prototype.setAxisTranslation = function() {
                            var e = this,
                                t = e.max - e.min,
                                n = e.linkedParent,
                                r = !!e.categories,
                                o = e.isXAxis,
                                a = e.axisPointRange || 0,
                                i = 0,
                                s = 0,
                                l = e.transA;
                            if (o || r || a) {
                                var c = e.getClosest();
                                n ? (i = n.minPointOffset,
                                        s = n.pointRangePadding) : e.series.forEach(function(t) {
                                        var n = r ? 1 : o ? A(t.options.pointRange, c, 0) : e.axisPointRange || 0,
                                            l = t.options.pointPlacement;
                                        a = Math.max(a, n),
                                            e.single && !r || (t = t.is("xrange") ? !o : o,
                                                i = Math.max(i, t && O(l) ? 0 : n / 2),
                                                s = Math.max(s, t && "on" === l ? 0 : n))
                                    }),
                                    n = e.ordinal && e.ordinal.slope && c ? e.ordinal.slope / c : 1,
                                    e.minPointOffset = i *= n,
                                    e.pointRangePadding = s *= n,
                                    e.pointRange = Math.min(a, e.single && r ? 1 : t),
                                    o && (e.closestPointRange = c)
                            }
                            e.translationSlope = e.transA = l = e.staticScale || e.len / (t + s || 1),
                                e.transB = e.horiz ? e.left : e.bottom,
                                e.minPixelPadding = l * i,
                                x(this, "afterSetAxisTranslation")
                        },
                        e.prototype.minFromRange = function() {
                            return this.max - this.range
                        },
                        e.prototype.setTickInterval = function(e) {
                            var t = this,
                                n = t.chart,
                                r = t.logarithmic,
                                o = t.options,
                                a = t.isXAxis,
                                i = t.isLinked,
                                s = o.tickPixelInterval,
                                l = t.categories,
                                c = t.softThreshold,
                                u = o.maxPadding,
                                d = o.minPadding,
                                p = o.tickInterval,
                                h = S(t.threshold) ? t.threshold : null;
                            t.dateTime || l || i || this.getTickAmount();
                            var f = A(t.userMin, o.min),
                                m = A(t.userMax, o.max);
                            if (i) {
                                t.linkedParent = n[t.coll][o.linkedTo];
                                var v = t.linkedParent.getExtremes();
                                t.min = A(v.min, v.dataMin),
                                    t.max = A(v.max, v.dataMax),
                                    o.type !== t.linkedParent.options.type && _(11, 1, n)
                            } else {
                                if (c && y(h))
                                    if (t.dataMin >= h)
                                        v = h,
                                        d = 0;
                                    else if (t.dataMax <= h) {
                                    var b = h;
                                    u = 0
                                }
                                t.min = A(f, v, t.dataMin),
                                    t.max = A(m, b, t.dataMax)
                            }
                            r && (t.positiveValuesOnly && !e && 0 >= Math.min(t.min, A(t.dataMin, t.min)) && _(10, 1, n),
                                    t.min = g(r.log2lin(t.min), 16),
                                    t.max = g(r.log2lin(t.max), 16)),
                                t.range && y(t.max) && (t.userMin = t.min = f = Math.max(t.dataMin, t.minFromRange()),
                                    t.userMax = m = t.max,
                                    t.range = null),
                                x(t, "foundExtremes"),
                                t.beforePadding && t.beforePadding(),
                                t.adjustForMinRange(), !(l || t.axisPointRange || t.stacking && t.stacking.usePercentage || i) && y(t.min) && y(t.max) && (n = t.max - t.min) && (!y(f) && d && (t.min -= n * d), !y(m) && u && (t.max += n * u)),
                                S(t.userMin) || (S(o.softMin) && o.softMin < t.min && (t.min = f = o.softMin),
                                    S(o.floor) && (t.min = Math.max(t.min, o.floor))),
                                S(t.userMax) || (S(o.softMax) && o.softMax > t.max && (t.max = m = o.softMax),
                                    S(o.ceiling) && (t.max = Math.min(t.max, o.ceiling))),
                                c && y(t.dataMin) && (h = h || 0, !y(f) && t.min < h && t.dataMin >= h ? t.min = t.options.minRange ? Math.min(h, t.max - t.minRange) : h : !y(m) && t.max > h && t.dataMax <= h && (t.max = t.options.minRange ? Math.max(h, t.min + t.minRange) : h)),
                                S(t.min) && S(t.max) && !this.chart.polar && t.min > t.max && (y(t.options.min) ? t.max = t.min : y(t.options.max) && (t.min = t.max)),
                                t.tickInterval = t.min === t.max || "undefined" === typeof t.min || "undefined" === typeof t.max ? 1 : i && t.linkedParent && !p && s === t.linkedParent.options.tickPixelInterval ? p = t.linkedParent.tickInterval : A(p, this.tickAmount ? (t.max - t.min) / Math.max(this.tickAmount - 1, 1) : void 0, l ? 1 : (t.max - t.min) * s / Math.max(t.len, s)),
                                a && !e && (t.series.forEach(function(e) {
                                        e.forceCrop = e.forceCropping && e.forceCropping(),
                                            e.processData(t.min !== (t.old && t.old.min) || t.max !== (t.old && t.old.max))
                                    }),
                                    x(this, "postProcessData")),
                                t.setAxisTranslation(),
                                x(this, "initialAxisTranslation"),
                                t.pointRange && !p && (t.tickInterval = Math.max(t.pointRange, t.tickInterval)),
                                e = A(o.minTickInterval, t.dateTime && !t.series.some(function(e) {
                                    return e.noSharedTooltip
                                }) ? t.closestPointRange : 0), !p && t.tickInterval < e && (t.tickInterval = e),
                                t.dateTime || t.logarithmic || p || (t.tickInterval = T(t.tickInterval, void 0, E(t.tickInterval), A(o.allowDecimals, .5 > t.tickInterval || void 0 !== this.tickAmount), !!this.tickAmount)),
                                this.tickAmount || (t.tickInterval = t.unsquish()),
                                this.setTickPositions()
                        },
                        e.prototype.setTickPositions = function() {
                            var e = this.options,
                                t = e.tickPositions,
                                n = this.getMinorTickInterval(),
                                r = this.hasVerticalPanning(),
                                o = "colorAxis" === this.coll,
                                a = (o || !r) && e.startOnTick;
                            r = (o || !r) && e.endOnTick,
                                o = e.tickPositioner,
                                this.tickmarkOffset = this.categories && "between" === e.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0,
                                this.minorTickInterval = "auto" === n && this.tickInterval ? this.tickInterval / 5 : n,
                                this.single = this.min === this.max && y(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== e.allowDecimals),
                                this.tickPositions = n = t && t.slice(), !n && (this.ordinal && this.ordinal.positions || !((this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200)) ? n = this.dateTime ? this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(this.tickInterval, e.units), this.min, this.max, e.startOfWeek, this.ordinal && this.ordinal.positions, this.closestPointRange, !0) : this.logarithmic ? this.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max) : (n = [this.min, this.max],
                                        _(19, !1, this.chart)),
                                    n.length > this.len && (n = [n[0], n.pop()],
                                        n[0] === n[1] && (n.length = 1)),
                                    this.tickPositions = n,
                                    o && (o = o.apply(this, [this.min, this.max]))) && (this.tickPositions = n = o),
                                this.paddedTicks = n.slice(0),
                                this.trimTicks(n, a, r),
                                this.isLinked || (this.single && 2 > n.length && !this.categories && !this.series.some(function(e) {
                                        return e.is("heatmap") && "between" === e.options.pointPlacement
                                    }) && (this.min -= .5,
                                        this.max += .5),
                                    t || o || this.adjustTickAmount()),
                                x(this, "afterSetTickPositions")
                        },
                        e.prototype.trimTicks = function(e, t, n) {
                            var r = e[0],
                                o = e[e.length - 1],
                                a = !this.isOrdinal && this.minPointOffset || 0;
                            if (x(this, "trimTicks"), !this.isLinked) {
                                if (t && -1 / 0 !== r)
                                    this.min = r;
                                else
                                    for (; this.min - a > e[0];)
                                        e.shift();
                                if (n)
                                    this.max = o;
                                else
                                    for (; this.max + a < e[e.length - 1];)
                                        e.pop();
                                0 === e.length && y(r) && !this.options.tickPositions && e.push((o + r) / 2)
                            }
                        },
                        e.prototype.alignToOthers = function() {
                            var e, t = {},
                                n = this.options;
                            return !1 !== this.chart.options.chart.alignTicks && n.alignTicks && !1 !== n.startOnTick && !1 !== n.endOnTick && !this.logarithmic && this.chart[this.coll].forEach(function(n) {
                                    var r = n.options;
                                    r = [n.horiz ? r.left : r.top, r.width, r.height, r.pane].join(),
                                        n.series.length && (t[r] ? e = !0 : t[r] = 1)
                                }),
                                e
                        },
                        e.prototype.getTickAmount = function() {
                            var e = this.options,
                                t = e.tickPixelInterval,
                                n = e.tickAmount;
                            !y(e.tickInterval) && !n && this.len < t && !this.isRadial && !this.logarithmic && e.startOnTick && e.endOnTick && (n = 2), !n && this.alignToOthers() && (n = Math.ceil(this.len / t) + 1),
                                4 > n && (this.finalTickAmt = n,
                                    n = 5),
                                this.tickAmount = n
                        },
                        e.prototype.adjustTickAmount = function() {
                            var e = this.options,
                                t = this.tickInterval,
                                n = this.tickPositions,
                                r = this.tickAmount,
                                o = this.finalTickAmt,
                                a = n && n.length,
                                i = A(this.threshold, this.softThreshold ? 0 : null);
                            if (this.hasData() && S(this.min) && S(this.max)) {
                                if (a < r) {
                                    for (; n.length < r;)
                                        n.length % 2 || this.min === i ? n.push(g(n[n.length - 1] + t)) : n.unshift(g(n[0] - t));
                                    this.transA *= (a - 1) / (r - 1),
                                        this.min = e.startOnTick ? n[0] : Math.min(this.min, n[0]),
                                        this.max = e.endOnTick ? n[n.length - 1] : Math.max(this.max, n[n.length - 1])
                                } else
                                    a > r && (this.tickInterval *= 2,
                                        this.setTickPositions());
                                if (y(o)) {
                                    for (t = e = n.length; t--;)
                                        (3 === o && 1 === t % 2 || 2 >= o && 0 < t && t < e - 1) && n.splice(t, 1);
                                    this.finalTickAmt = void 0
                                }
                            }
                        },
                        e.prototype.setScale = function() {
                            var e = !1,
                                t = !1;
                            this.series.forEach(function(n) {
                                    e = e || n.isDirtyData || n.isDirty,
                                        t = t || n.xAxis && n.xAxis.isDirty || !1
                                }),
                                this.setAxisSize();
                            var n = this.len !== (this.old && this.old.len);
                            n || e || t || this.isLinked || this.forceRedraw || this.userMin !== (this.old && this.old.userMin) || this.userMax !== (this.old && this.old.userMax) || this.alignToOthers() ? (this.stacking && this.stacking.resetStacks(),
                                    this.forceRedraw = !1,
                                    this.getSeriesExtremes(),
                                    this.setTickInterval(),
                                    this.isDirty || (this.isDirty = n || this.min !== (this.old && this.old.min) || this.max !== (this.old && this.old.max))) : this.stacking && this.stacking.cleanStacks(),
                                e && this.panningState && (this.panningState.isDirty = !0),
                                x(this, "afterSetScale")
                        },
                        e.prototype.setExtremes = function(e, t, n, r, o) {
                            var a = this,
                                i = a.chart;
                            n = A(n, !0),
                                a.series.forEach(function(e) {
                                    delete e.kdTree
                                }),
                                o = w(o, {
                                    min: e,
                                    max: t
                                }),
                                x(a, "setExtremes", o, function() {
                                    a.userMin = e,
                                        a.userMax = t,
                                        a.eventArgs = o,
                                        n && i.redraw(r)
                                })
                        },
                        e.prototype.zoom = function(e, t) {
                            var n = this,
                                r = this.dataMin,
                                o = this.dataMax,
                                a = this.options,
                                i = Math.min(r, A(a.min, r)),
                                s = Math.max(o, A(a.max, o));
                            return e = {
                                    newMin: e,
                                    newMax: t
                                },
                                x(this, "zoom", e, function(e) {
                                    var t = e.newMin,
                                        a = e.newMax;
                                    t === n.min && a === n.max || (n.allowZoomOutside || (y(r) && (t < i && (t = i),
                                                    t > s && (t = s)),
                                                y(o) && (a < i && (a = i),
                                                    a > s && (a = s))),
                                            n.displayBtn = "undefined" !== typeof t || "undefined" !== typeof a,
                                            n.setExtremes(t, a, !1, void 0, {
                                                trigger: "zoom"
                                            })),
                                        e.zoomed = !0
                                }),
                                e.zoomed
                        },
                        e.prototype.setAxisSize = function() {
                            var e = this.chart,
                                t = this.options,
                                n = t.offsets || [0, 0, 0, 0],
                                r = this.horiz,
                                o = this.width = Math.round(P(A(t.width, e.plotWidth - n[3] + n[1]), e.plotWidth)),
                                a = this.height = Math.round(P(A(t.height, e.plotHeight - n[0] + n[2]), e.plotHeight)),
                                i = this.top = Math.round(P(A(t.top, e.plotTop + n[0]), e.plotHeight, e.plotTop));
                            t = this.left = Math.round(P(A(t.left, e.plotLeft + n[3]), e.plotWidth, e.plotLeft)),
                                this.bottom = e.chartHeight - a - i,
                                this.right = e.chartWidth - o - t,
                                this.len = Math.max(r ? o : a, 0),
                                this.pos = r ? t : i
                        },
                        e.prototype.getExtremes = function() {
                            var e = this.logarithmic;
                            return {
                                min: e ? g(e.lin2log(this.min)) : this.min,
                                max: e ? g(e.lin2log(this.max)) : this.max,
                                dataMin: this.dataMin,
                                dataMax: this.dataMax,
                                userMin: this.userMin,
                                userMax: this.userMax
                            }
                        },
                        e.prototype.getThreshold = function(e) {
                            var t = this.logarithmic,
                                n = t ? t.lin2log(this.min) : this.min;
                            return t = t ? t.lin2log(this.max) : this.max,
                                null === e || -1 / 0 === e ? e = n : 1 / 0 === e ? e = t : n > e ? e = n : t < e && (e = t),
                                this.translate(e, 0, 1, 0, 1)
                        },
                        e.prototype.autoLabelAlign = function(e) {
                            var t = (A(e, 0) - 90 * this.side + 720) % 360;
                            return e = {
                                    align: "center"
                                },
                                x(this, "autoLabelAlign", e, function(e) {
                                    15 < t && 165 > t ? e.align = "right" : 195 < t && 345 > t && (e.align = "left")
                                }),
                                e.align
                        },
                        e.prototype.tickSize = function(e) {
                            var t = this.options,
                                n = A(t["tick" === e ? "tickWidth" : "minorTickWidth"], "tick" === e && this.isXAxis && !this.categories ? 1 : 0),
                                r = t["tick" === e ? "tickLength" : "minorTickLength"];
                            if (n && r) {
                                "inside" === t[e + "Position"] && (r = -r);
                                var o = [r, n]
                            }
                            return e = {
                                    tickSize: o
                                },
                                x(this, "afterTickSize", e),
                                e.tickSize
                        },
                        e.prototype.labelMetrics = function() {
                            var e = this.tickPositions && this.tickPositions[0] || 0;
                            return this.chart.renderer.fontMetrics(this.options.labels.style.fontSize, this.ticks[e] && this.ticks[e].label)
                        },
                        e.prototype.unsquish = function() {
                            var e, t, n = this.options.labels,
                                r = this.horiz,
                                o = this.tickInterval,
                                a = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / o),
                                i = n.rotation,
                                s = this.labelMetrics(),
                                l = Math.max(this.max - this.min, 0),
                                c = function(e) {
                                    var t = e / (a || 1);
                                    return t = 1 < t ? Math.ceil(t) : 1,
                                        t * o > l && 1 / 0 !== e && 1 / 0 !== a && l && (t = Math.ceil(l / o)),
                                        g(t * o)
                                },
                                u = o,
                                d = Number.MAX_VALUE;
                            if (r) {
                                if (!n.staggerLines && !n.step)
                                    if (S(i))
                                        var h = [i];
                                    else
                                        a < n.autoRotationLimit && (h = n.autoRotation);
                                h && h.forEach(function(n) {
                                    if (n === i || n && -90 <= n && 90 >= n) {
                                        t = c(Math.abs(s.h / Math.sin(p * n)));
                                        var r = t + Math.abs(n / 360);
                                        r < d && (d = r,
                                            e = n,
                                            u = t)
                                    }
                                })
                            } else
                                n.step || (u = c(s.h));
                            return this.autoRotation = h,
                                this.labelRotation = A(e, S(i) ? i : 0),
                                u
                        },
                        e.prototype.getSlotWidth = function(e) {
                            var t = this.chart,
                                n = this.horiz,
                                r = this.options.labels,
                                o = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                                a = t.margin[3];
                            if (e && S(e.slotWidth))
                                return e.slotWidth;
                            if (n && 2 > r.step)
                                return r.rotation ? 0 : (this.staggerLines || 1) * this.len / o;
                            if (!n) {
                                if (void 0 !== (e = r.style.width))
                                    return parseInt(String(e), 10);
                                if (a)
                                    return a - t.spacing[3]
                            }
                            return .33 * t.chartWidth
                        },
                        e.prototype.renderUnsquish = function() {
                            var e = this.chart,
                                t = e.renderer,
                                n = this.tickPositions,
                                r = this.ticks,
                                o = this.options.labels,
                                a = o.style,
                                i = this.horiz,
                                s = this.getSlotWidth(),
                                l = Math.max(1, Math.round(s - 2 * o.padding)),
                                c = {},
                                u = this.labelMetrics(),
                                d = a.textOverflow,
                                p = 0;
                            if (O(o.rotation) || (c.rotation = o.rotation || 0),
                                n.forEach(function(e) {
                                    e = r[e],
                                        e.movedLabel && e.replaceMovedLabel(),
                                        e && e.label && e.label.textPxLength > p && (p = e.label.textPxLength)
                                }),
                                this.maxLabelLength = p,
                                this.autoRotation)
                                p > l && p > u.h ? c.rotation = this.labelRotation : this.labelRotation = 0;
                            else if (s) {
                                var h = l;
                                if (!d) {
                                    var f = "clip";
                                    for (l = n.length; !i && l--;) {
                                        var m = n[l];
                                        (m = r[m].label) && (m.styles && "ellipsis" === m.styles.textOverflow ? m.css({
                                                textOverflow: "clip"
                                            }) : m.textPxLength > s && m.css({
                                                width: s + "px"
                                            }),
                                            m.getBBox().height > this.len / n.length - (u.h - u.f) && (m.specificTextOverflow = "ellipsis"))
                                    }
                                }
                            }
                            c.rotation && (h = p > .5 * e.chartHeight ? .33 * e.chartHeight : p,
                                    d || (f = "ellipsis")),
                                (this.labelAlign = o.align || this.autoLabelAlign(this.labelRotation)) && (c.align = this.labelAlign),
                                n.forEach(function(e) {
                                    var t = (e = r[e]) && e.label,
                                        n = a.width,
                                        o = {};
                                    t && (t.attr(c),
                                        e.shortenLabel ? e.shortenLabel() : h && !n && "nowrap" !== a.whiteSpace && (h < t.textPxLength || "SPAN" === t.element.tagName) ? (o.width = h + "px",
                                            d || (o.textOverflow = t.specificTextOverflow || f),
                                            t.css(o)) : t.styles && t.styles.width && !o.width && !n && t.css({
                                            width: null
                                        }),
                                        delete t.specificTextOverflow,
                                        e.rotation = c.rotation)
                                }, this),
                                this.tickRotCorr = t.rotCorr(u.b, this.labelRotation || 0, 0 !== this.side)
                        },
                        e.prototype.hasData = function() {
                            return this.series.some(function(e) {
                                return e.hasData()
                            }) || this.options.showEmpty && y(this.min) && y(this.max)
                        },
                        e.prototype.addTitle = function(e) {
                            var t, n = this.chart.renderer,
                                r = this.horiz,
                                o = this.opposite,
                                a = this.options.title,
                                i = this.chart.styledMode;
                            this.axisTitle || ((t = a.textAlign) || (t = (r ? {
                                        low: "left",
                                        middle: "center",
                                        high: "right"
                                    } : {
                                        low: o ? "right" : "left",
                                        middle: "center",
                                        high: o ? "left" : "right"
                                    })[a.align]),
                                    this.axisTitle = n.text(a.text || "", 0, 0, a.useHTML).attr({
                                        zIndex: 7,
                                        rotation: a.rotation,
                                        align: t
                                    }).addClass("highcharts-axis-title"),
                                    i || this.axisTitle.css(C(a.style)),
                                    this.axisTitle.add(this.axisGroup),
                                    this.axisTitle.isNew = !0),
                                i || a.style.width || this.isRadial || this.axisTitle.css({
                                    width: this.len + "px"
                                }),
                                this.axisTitle[e ? "show" : "hide"](e)
                        },
                        e.prototype.generateTick = function(e) {
                            var t = this.ticks;
                            t[e] ? t[e].addLabel() : t[e] = new s(this, e)
                        },
                        e.prototype.getOffset = function() {
                            var e = this,
                                t = this,
                                n = t.chart,
                                r = n.renderer,
                                o = t.options,
                                a = t.tickPositions,
                                i = t.ticks,
                                s = t.horiz,
                                l = t.side,
                                c = n.inverted && !t.isZAxis ? [1, 0, 3, 2][l] : l,
                                u = t.hasData(),
                                d = o.title,
                                p = o.labels,
                                h = n.axisOffset;
                            n = n.clipOffset;
                            var f, m = [-1, 1, 1, -1][l],
                                g = o.className,
                                v = t.axisParent,
                                b = 0,
                                _ = 0,
                                w = 0;
                            if (t.showAxis = f = u || o.showEmpty,
                                t.staggerLines = t.horiz && p.staggerLines || void 0, !t.axisGroup) {
                                var E = function(t, n, o) {
                                    return r.g(t).attr({
                                        zIndex: o
                                    }).addClass("highcharts-" + e.coll.toLowerCase() + n + " " + (e.isRadial ? "highcharts-radial-axis" + n + " " : "") + (g || "")).add(v)
                                };
                                t.gridGroup = E("grid", "-grid", o.gridZIndex),
                                    t.axisGroup = E("axis", "", o.zIndex),
                                    t.labelGroup = E("axis-labels", "-labels", p.zIndex)
                            }
                            if (u || t.isLinked ? (a.forEach(function(e) {
                                        t.generateTick(e)
                                    }),
                                    t.renderUnsquish(),
                                    t.reserveSpaceDefault = 0 === l || 2 === l || {
                                        1: "left",
                                        3: "right"
                                    }[l] === t.labelAlign,
                                    A(p.reserveSpace, "center" === t.labelAlign || null, t.reserveSpaceDefault) && a.forEach(function(e) {
                                        w = Math.max(i[e].getLabelSize(), w)
                                    }),
                                    t.staggerLines && (w *= t.staggerLines),
                                    t.labelOffset = w * (t.opposite ? -1 : 1)) : M(i, function(e, t) {
                                    e.destroy(),
                                        delete i[t]
                                }),
                                d && d.text && !1 !== d.enabled && (t.addTitle(f),
                                    f && !1 !== d.reserveSpace)) {
                                t.titleOffset = b = t.axisTitle.getBBox()[s ? "height" : "width"];
                                var k = d.offset;
                                _ = y(k) ? 0 : A(d.margin, s ? 5 : 10)
                            }
                            t.renderLine(),
                                t.offset = m * A(o.offset, h[l] ? h[l] + (o.margin || 0) : 0),
                                t.tickRotCorr = t.tickRotCorr || {
                                    x: 0,
                                    y: 0
                                },
                                d = 0 === l ? -t.labelMetrics().h : 2 === l ? t.tickRotCorr.y : 0,
                                u = Math.abs(w) + _,
                                w && (u = u - d + m * (s ? A(p.y, t.tickRotCorr.y + 8 * m) : p.x)),
                                t.axisTitleMargin = A(k, u),
                                t.getMaxLabelDimensions && (t.maxLabelDimensions = t.getMaxLabelDimensions(i, a)),
                                s = this.tickSize("tick"),
                                h[l] = Math.max(h[l], (t.axisTitleMargin || 0) + b + m * t.offset, u, a && a.length && s ? s[0] + m * t.offset : 0),
                                o = o.offset ? 0 : 2 * Math.floor(t.axisLine.strokeWidth() / 2),
                                n[c] = Math.max(n[c], o),
                                x(this, "afterGetOffset")
                        },
                        e.prototype.getLinePath = function(e) {
                            var t = this.chart,
                                n = this.opposite,
                                r = this.offset,
                                o = this.horiz,
                                a = this.left + (n ? this.width : 0) + r;
                            return r = t.chartHeight - this.bottom - (n ? this.height : 0) + r,
                                n && (e *= -1),
                                t.renderer.crispLine([
                                    ["M", o ? this.left : a, o ? r : this.top],
                                    ["L", o ? t.chartWidth - this.right : a, o ? r : t.chartHeight - this.bottom]
                                ], e)
                        },
                        e.prototype.renderLine = function() {
                            this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
                                this.chart.styledMode || this.axisLine.attr({
                                    stroke: this.options.lineColor,
                                    "stroke-width": this.options.lineWidth,
                                    zIndex: 7
                                }))
                        },
                        e.prototype.getTitlePosition = function() {
                            var e = this.horiz,
                                t = this.left,
                                n = this.top,
                                r = this.len,
                                o = this.options.title,
                                a = e ? t : n,
                                i = this.opposite,
                                s = this.offset,
                                l = o.x,
                                c = o.y,
                                u = this.axisTitle,
                                d = this.chart.renderer.fontMetrics(o.style.fontSize, u);
                            return u = Math.max(u.getBBox(null, 0).height - d.h - 1, 0),
                                r = {
                                    low: a + (e ? 0 : r),
                                    middle: a + r / 2,
                                    high: a + (e ? r : 0)
                                }[o.align],
                                t = (e ? n + this.height : t) + (e ? 1 : -1) * (i ? -1 : 1) * this.axisTitleMargin + [-u, u, d.f, -u][this.side],
                                e = {
                                    x: e ? r + l : t + (i ? this.width : 0) + s + l,
                                    y: e ? t + c - (i ? this.height : 0) + s : r + c
                                },
                                x(this, "afterGetTitlePosition", {
                                    titlePosition: e
                                }),
                                e
                        },
                        e.prototype.renderMinorTick = function(e, t) {
                            var n = this.minorTicks;
                            n[e] || (n[e] = new s(this, e, "minor")),
                                t && n[e].isNew && n[e].render(null, !0),
                                n[e].render(null, !1, 1)
                        },
                        e.prototype.renderTick = function(e, t, n) {
                            var r = this.ticks;
                            (!this.isLinked || e >= this.min && e <= this.max || this.grid && this.grid.isColumn) && (r[e] || (r[e] = new s(this, e)),
                                n && r[e].isNew && r[e].render(t, !0, -1),
                                r[e].render(t))
                        },
                        e.prototype.render = function() {
                            var e, t, n = this,
                                r = n.chart,
                                o = n.logarithmic,
                                a = n.options,
                                l = n.isLinked,
                                u = n.tickPositions,
                                d = n.axisTitle,
                                p = n.ticks,
                                h = n.minorTicks,
                                f = n.alternateBands,
                                m = a.stackLabels,
                                g = a.alternateGridColor,
                                y = n.tickmarkOffset,
                                v = n.axisLine,
                                b = n.showAxis,
                                _ = c(r.renderer.globalAnimation);
                            if (n.labelEdge.length = 0,
                                n.overlap = !1, [p, h, f].forEach(function(e) {
                                    M(e, function(e) {
                                        e.isActive = !1
                                    })
                                }),
                                n.hasData() || l) {
                                var w = n.chart.hasRendered && n.old && S(n.old.min);
                                n.minorTickInterval && !n.categories && n.getMinorTickPositions().forEach(function(e) {
                                        n.renderMinorTick(e, w)
                                    }),
                                    u.length && (u.forEach(function(e, t) {
                                            n.renderTick(e, t, w)
                                        }),
                                        y && (0 === n.min || n.single) && (p[-1] || (p[-1] = new s(n, -1, null, !0)),
                                            p[-1].render(-1))),
                                    g && u.forEach(function(a, s) {
                                        t = "undefined" !== typeof u[s + 1] ? u[s + 1] + y : n.max - y,
                                            0 === s % 2 && a < n.max && t <= n.max + (r.polar ? -y : y) && (f[a] || (f[a] = new i.PlotLineOrBand(n)),
                                                e = a + y,
                                                f[a].options = {
                                                    from: o ? o.lin2log(e) : e,
                                                    to: o ? o.lin2log(t) : t,
                                                    color: g,
                                                    className: "highcharts-alternate-grid"
                                                },
                                                f[a].render(),
                                                f[a].isActive = !0)
                                    }),
                                    n._addedPlotLB || (n._addedPlotLB = !0,
                                        (a.plotLines || []).concat(a.plotBands || []).forEach(function(e) {
                                            n.addPlotBandOrLine(e)
                                        }))
                            }
                            [p, h, f].forEach(function(e) {
                                    var t = [],
                                        n = _.duration;
                                    M(e, function(e, n) {
                                            e.isActive || (e.render(n, !1, 0),
                                                e.isActive = !1,
                                                t.push(n))
                                        }),
                                        D(function() {
                                            for (var n = t.length; n--;)
                                                e[t[n]] && !e[t[n]].isActive && (e[t[n]].destroy(),
                                                    delete e[t[n]])
                                        }, e !== f && r.hasRendered && n ? n : 0)
                                }),
                                v && (v[v.isPlaced ? "animate" : "attr"]({
                                        d: this.getLinePath(v.strokeWidth())
                                    }),
                                    v.isPlaced = !0,
                                    v[b ? "show" : "hide"](b)),
                                d && b && (a = n.getTitlePosition(),
                                    S(a.y) ? (d[d.isNew ? "attr" : "animate"](a),
                                        d.isNew = !1) : (d.attr("y", -9999),
                                        d.isNew = !0)),
                                m && m.enabled && n.stacking && n.stacking.renderStackTotals(),
                                n.old = {
                                    len: n.len,
                                    max: n.max,
                                    min: n.min,
                                    transA: n.transA,
                                    userMax: n.userMax,
                                    userMin: n.userMin
                                },
                                n.isDirty = !1,
                                x(this, "afterRender")
                        },
                        e.prototype.redraw = function() {
                            this.visible && (this.render(),
                                    this.plotLinesAndBands.forEach(function(e) {
                                        e.render()
                                    })),
                                this.series.forEach(function(e) {
                                    e.isDirty = !0
                                })
                        },
                        e.prototype.getKeepProps = function() {
                            return this.keepProps || e.keepProps
                        },
                        e.prototype.destroy = function(e) {
                            var t = this,
                                n = t.plotLinesAndBands,
                                r = this.eventOptions;
                            if (x(this, "destroy", {
                                    keepEvents: e
                                }),
                                e || N(t), [t.ticks, t.minorTicks, t.alternateBands].forEach(function(e) {
                                    v(e)
                                }),
                                n)
                                for (e = n.length; e--;)
                                    n[e].destroy();
                            "axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function(e) {
                                t[e] && (t[e] = t[e].destroy())
                            });
                            for (var o in t.plotLinesAndBandsGroups)
                                t.plotLinesAndBandsGroups[o] = t.plotLinesAndBandsGroups[o].destroy();
                            M(t, function(e, n) {
                                    -1 === t.getKeepProps().indexOf(n) && delete t[n]
                                }),
                                this.eventOptions = r
                        },
                        e.prototype.drawCrosshair = function(e, t) {
                            var o, a = this.crosshair,
                                i = A(a && a.snap, !0),
                                s = this.chart,
                                l = this.cross;
                            if (x(this, "drawCrosshair", {
                                    e: e,
                                    point: t
                                }),
                                e || (e = this.cross && this.cross.e),
                                a && !1 !== (y(t) || !i)) {
                                if (i ? y(t) && (o = A("colorAxis" !== this.coll ? t.crosshairPos : null, this.isXAxis ? t.plotX : this.len - t.plotY)) : o = e && (this.horiz ? e.chartX - this.pos : this.len - e.chartY + this.pos),
                                    y(o)) {
                                    var c = {
                                        value: t && (this.isXAxis ? t.x : A(t.stackY, t.y)),
                                        translatedValue: o
                                    };
                                    s.polar && w(c, {
                                            isCrosshair: !0,
                                            chartX: e && e.chartX,
                                            chartY: e && e.chartY,
                                            point: t
                                        }),
                                        c = this.getPlotLinePath(c) || null
                                }
                                if (!y(c))
                                    return void this.hideCrosshair();
                                i = this.categories && !this.isRadial,
                                    l || (this.cross = l = s.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (i ? "category " : "thin ") + (a.className || "")).attr({
                                            zIndex: A(a.zIndex, 2)
                                        }).add(),
                                        s.styledMode || (l.attr({
                                                stroke: a.color || (i ? n.parse(r.highlightColor20).setOpacity(.25).get() : r.neutralColor20),
                                                "stroke-width": A(a.width, 1)
                                            }).css({
                                                "pointer-events": "none"
                                            }),
                                            a.dashStyle && l.attr({
                                                dashstyle: a.dashStyle
                                            }))),
                                    l.show().attr({
                                        d: c
                                    }),
                                    i && !a.width && l.attr({
                                        "stroke-width": this.transA
                                    }),
                                    this.cross.e = e
                            } else
                                this.hideCrosshair();
                            x(this, "afterDrawCrosshair", {
                                e: e,
                                point: t
                            })
                        },
                        e.prototype.hideCrosshair = function() {
                            this.cross && this.cross.hide(),
                                x(this, "afterHideCrosshair")
                        },
                        e.prototype.hasVerticalPanning = function() {
                            var e = this.chart.options.chart.panning;
                            return !!(e && e.enabled && /y/.test(e.type))
                        },
                        e.prototype.validatePositiveValue = function(e) {
                            return S(e) && 0 < e
                        },
                        e.prototype.update = function(e, t) {
                            var n = this.chart;
                            e = C(this.userOptions, e),
                                this.destroy(!0),
                                this.init(n, e),
                                n.isDirtyBox = !0,
                                A(t, !0) && n.redraw()
                        },
                        e.prototype.remove = function(e) {
                            for (var t = this.chart, n = this.coll, r = this.series, o = r.length; o--;)
                                r[o] && r[o].remove(!1);
                            b(t.axes, this),
                                b(t[n], this),
                                t[n].forEach(function(e, t) {
                                    e.options.index = e.userOptions.index = t
                                }),
                                this.destroy(),
                                t.isDirtyBox = !0,
                                A(e, !0) && t.redraw()
                        },
                        e.prototype.setTitle = function(e, t) {
                            this.update({
                                title: e
                            }, t)
                        },
                        e.prototype.setCategories = function(e, t) {
                            this.update({
                                categories: e
                            }, t)
                        },
                        e.defaultOptions = t.defaultXAxisOptions,
                        e.keepProps = "extKey hcEvents names series userMax userMin".split(" "),
                        e
                }()
            }),
            t(n, "Core/Axis/DateTimeAxis.js", [n["Core/Utilities.js"]], function(e) {
                var t, n = e.addEvent,
                    r = e.getMagnitude,
                    o = e.normalizeTickInterval,
                    a = e.timeUnits;
                return function(e) {
                        function t() {
                            return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
                        }

                        function i(e) {
                            "datetime" !== e.userOptions.type ? this.dateTime = void 0 : this.dateTime || (this.dateTime = new l(this))
                        }
                        var s = [];
                        e.compose = function(e) {
                            return -1 === s.indexOf(e) && (s.push(e),
                                    e.keepProps.push("dateTime"),
                                    e.prototype.getTimeTicks = t,
                                    n(e, "init", i)),
                                e
                        };
                        var l = function() {
                            function e(e) {
                                this.axis = e
                            }
                            return e.prototype.normalizeTimeTickInterval = function(e, t) {
                                    var n = t || [
                                        ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                                        ["second", [1, 2, 5, 10, 15, 30]],
                                        ["minute", [1, 2, 5, 10, 15, 30]],
                                        ["hour", [1, 2, 3, 4, 6, 8, 12]],
                                        ["day", [1, 2]],
                                        ["week", [1, 2]],
                                        ["month", [1, 2, 3, 4, 6]],
                                        ["year", null]
                                    ];
                                    t = n[n.length - 1];
                                    var i, s = a[t[0]],
                                        l = t[1];
                                    for (i = 0; i < n.length && (t = n[i],
                                            s = a[t[0]],
                                            l = t[1], !(n[i + 1] && e <= (s * l[l.length - 1] + a[n[i + 1][0]]) / 2)); i++)
                                    ;
                                    return s === a.year && e < 5 * s && (l = [1, 2, 5]),
                                        e = o(e / s, l, "year" === t[0] ? Math.max(r(e / s), 1) : 1), {
                                            unitRange: s,
                                            count: e,
                                            unitName: t[0]
                                        }
                                },
                                e.prototype.getXDateFormat = function(e, t) {
                                    var n = this.axis;
                                    return n.closestPointRange ? n.chart.time.getDateFormat(n.closestPointRange, e, n.options.startOfWeek, t) || t.year : t.day
                                },
                                e
                        }();
                        e.Additions = l
                    }(t || (t = {})),
                    t
            }),
            t(n, "Core/Axis/LogarithmicAxis.js", [n["Core/Utilities.js"]], function(e) {
                var t, n = e.addEvent,
                    r = e.getMagnitude,
                    o = e.normalizeTickInterval,
                    a = e.pick;
                return function(e) {
                        function t(e) {
                            var t = this.logarithmic;
                            "logarithmic" !== e.userOptions.type ? this.logarithmic = void 0 : t || (this.logarithmic = new l(this))
                        }

                        function i() {
                            var e = this.logarithmic;
                            e && (this.lin2val = function(t) {
                                    return e.lin2log(t)
                                },
                                this.val2lin = function(t) {
                                    return e.log2lin(t)
                                }
                            )
                        }
                        var s = [];
                        e.compose = function(e) {
                            return -1 === s.indexOf(e) && (s.push(e),
                                    e.keepProps.push("logarithmic"),
                                    n(e, "init", t),
                                    n(e, "afterInit", i)),
                                e
                        };
                        var l = function() {
                            function e(e) {
                                this.axis = e
                            }
                            return e.prototype.getLogTickPositions = function(e, t, n, i) {
                                    var s = this.axis,
                                        l = s.len,
                                        c = s.options,
                                        u = [];
                                    if (i || (this.minorAutoInterval = void 0),
                                        .5 <= e)
                                        e = Math.round(e),
                                        u = s.getLinearTickPositions(e, t, n);
                                    else if (.08 <= e) {
                                        var d, p = Math.floor(t),
                                            h = c = void 0;
                                        for (l = .3 < e ? [1, 2, 4] : .15 < e ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; p < n + 1 && !h; p++) {
                                            var f = l.length;
                                            for (d = 0; d < f && !h; d++) {
                                                var m = this.log2lin(this.lin2log(p) * l[d]);
                                                m > t && (!i || c <= n) && "undefined" !== typeof c && u.push(c),
                                                    c > n && (h = !0),
                                                    c = m
                                            }
                                        }
                                    } else
                                        t = this.lin2log(t),
                                        n = this.lin2log(n),
                                        e = i ? s.getMinorTickInterval() : c.tickInterval,
                                        e = a("auto" === e ? null : e, this.minorAutoInterval, c.tickPixelInterval / (i ? 5 : 1) * (n - t) / ((i ? l / s.tickPositions.length : l) || 1)),
                                        e = o(e, void 0, r(e)),
                                        u = s.getLinearTickPositions(e, t, n).map(this.log2lin),
                                        i || (this.minorAutoInterval = e / 5);
                                    return i || (s.tickInterval = e),
                                        u
                                },
                                e.prototype.lin2log = function(e) {
                                    return Math.pow(10, e)
                                },
                                e.prototype.log2lin = function(e) {
                                    return Math.log(e) / Math.LN10
                                },
                                e
                        }();
                        e.Additions = l
                    }(t || (t = {})),
                    t
            }),
            t(n, "Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js", [n["Core/Utilities.js"]], function(e) {
                var t, n = e.erase,
                    r = e.extend,
                    o = e.isNumber;
                return function(e) {
                        var t, a = [];
                        e.compose = function(e, n) {
                            return t || (t = e), -1 === a.indexOf(n) && (a.push(n),
                                    r(n.prototype, i.prototype)),
                                n
                        };
                        var i = function() {
                            function e() {}
                            return e.prototype.getPlotBandPath = function(e, t, n) {
                                    void 0 === n && (n = this.options);
                                    var r = this.getPlotLinePath({
                                            value: t,
                                            force: !0,
                                            acrossPanes: n.acrossPanes
                                        }),
                                        a = [],
                                        i = this.horiz;
                                    if (t = !o(this.min) || !o(this.max) || e < this.min && t < this.min || e > this.max && t > this.max,
                                        e = this.getPlotLinePath({
                                            value: e,
                                            force: !0,
                                            acrossPanes: n.acrossPanes
                                        }),
                                        n = 1,
                                        e && r) {
                                        if (t) {
                                            var s = e.toString() === r.toString();
                                            n = 0
                                        }
                                        for (t = 0; t < e.length; t += 2) {
                                            var l = e[t],
                                                c = e[t + 1],
                                                u = r[t],
                                                d = r[t + 1];
                                            "M" !== l[0] && "L" !== l[0] || "M" !== c[0] && "L" !== c[0] || "M" !== u[0] && "L" !== u[0] || "M" !== d[0] && "L" !== d[0] || (i && u[1] === l[1] ? (u[1] += n,
                                                        d[1] += n) : i || u[2] !== l[2] || (u[2] += n,
                                                        d[2] += n),
                                                    a.push(["M", l[1], l[2]], ["L", c[1], c[2]], ["L", d[1], d[2]], ["L", u[1], u[2]], ["Z"])),
                                                a.isFlat = s
                                        }
                                    }
                                    return a
                                },
                                e.prototype.addPlotBand = function(e) {
                                    return this.addPlotBandOrLine(e, "plotBands")
                                },
                                e.prototype.addPlotLine = function(e) {
                                    return this.addPlotBandOrLine(e, "plotLines")
                                },
                                e.prototype.addPlotBandOrLine = function(e, n) {
                                    var r = this,
                                        o = this.userOptions,
                                        a = new t(this, e);
                                    if (this.visible && (a = a.render()),
                                        a) {
                                        if (this._addedPlotLB || (this._addedPlotLB = !0,
                                                (o.plotLines || []).concat(o.plotBands || []).forEach(function(e) {
                                                    r.addPlotBandOrLine(e)
                                                })),
                                            n) {
                                            var i = o[n] || [];
                                            i.push(e),
                                                o[n] = i
                                        }
                                        this.plotLinesAndBands.push(a)
                                    }
                                    return a
                                },
                                e.prototype.removePlotBandOrLine = function(e) {
                                    var t = this.plotLinesAndBands,
                                        r = this.options,
                                        o = this.userOptions;
                                    if (t) {
                                        for (var a = t.length; a--;)
                                            t[a].id === e && t[a].destroy();
                                        [r.plotLines || [], o.plotLines || [], r.plotBands || [], o.plotBands || []].forEach(function(t) {
                                            for (a = t.length; a--;)
                                                (t[a] || {}).id === e && n(t, t[a])
                                        })
                                    }
                                },
                                e.prototype.removePlotBand = function(e) {
                                    this.removePlotBandOrLine(e)
                                },
                                e.prototype.removePlotLine = function(e) {
                                    this.removePlotBandOrLine(e)
                                },
                                e
                        }()
                    }(t || (t = {})),
                    t
            }),
            t(n, "Core/Axis/PlotLineOrBand/PlotLineOrBand.js", [n["Core/Color/Palette.js"], n["Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js"], n["Core/Utilities.js"]], function(e, t, n) {
                var r = n.arrayMax,
                    o = n.arrayMin,
                    a = n.defined,
                    i = n.destroyObjectProperties,
                    s = n.erase,
                    l = n.fireEvent,
                    c = n.merge,
                    u = n.objectEach,
                    d = n.pick;
                return n = function() {
                    function n(e, t) {
                        this.axis = e,
                            t && (this.options = t,
                                this.id = t.id)
                    }
                    return n.compose = function(e) {
                            return t.compose(n, e)
                        },
                        n.prototype.render = function() {
                            l(this, "render");
                            var t = this,
                                n = t.axis,
                                r = n.horiz,
                                o = n.logarithmic,
                                i = t.options,
                                s = i.color,
                                p = d(i.zIndex, 0),
                                h = i.events,
                                f = {},
                                m = n.chart.renderer,
                                g = i.label,
                                y = t.label,
                                v = i.to,
                                b = i.from,
                                _ = i.value,
                                w = t.svgElem,
                                x = [],
                                E = a(b) && a(v);
                            x = a(_);
                            var k = !w,
                                S = {
                                    class: "highcharts-plot-" + (E ? "band " : "line ") + (i.className || "")
                                },
                                O = E ? "bands" : "lines";
                            if (o && (b = o.log2lin(b),
                                    v = o.log2lin(v),
                                    _ = o.log2lin(_)),
                                n.chart.styledMode || (x ? (S.stroke = s || e.neutralColor40,
                                    S["stroke-width"] = d(i.width, 1),
                                    i.dashStyle && (S.dashstyle = i.dashStyle)) : E && (S.fill = s || e.highlightColor10,
                                    i.borderWidth && (S.stroke = i.borderColor,
                                        S["stroke-width"] = i.borderWidth))),
                                f.zIndex = p,
                                O += "-" + p,
                                (o = n.plotLinesAndBandsGroups[O]) || (n.plotLinesAndBandsGroups[O] = o = m.g("plot-" + O).attr(f).add()),
                                k && (t.svgElem = w = m.path().attr(S).add(o)),
                                x)
                                x = n.getPlotLinePath({
                                    value: _,
                                    lineWidth: w.strokeWidth(),
                                    acrossPanes: i.acrossPanes
                                });
                            else {
                                if (!E)
                                    return;
                                x = n.getPlotBandPath(b, v, i)
                            }
                            return !t.eventsAdded && h && (u(h, function(e, n) {
                                        w.on(n, function(e) {
                                            h[n].apply(t, [e])
                                        })
                                    }),
                                    t.eventsAdded = !0),
                                (k || !w.d) && x && x.length ? w.attr({
                                    d: x
                                }) : w && (x ? (w.show(!0),
                                    w.animate({
                                        d: x
                                    })) : w.d && (w.hide(),
                                    y && (t.label = y = y.destroy()))),
                                g && (a(g.text) || a(g.formatter)) && x && x.length && 0 < n.width && 0 < n.height && !x.isFlat ? (g = c({
                                        align: r && E && "center",
                                        x: r ? !E && 4 : 10,
                                        verticalAlign: !r && E && "middle",
                                        y: r ? E ? 16 : 10 : E ? 6 : -4,
                                        rotation: r && !E && 90
                                    }, g),
                                    this.renderLabel(g, x, E, p)) : y && y.hide(),
                                t
                        },
                        n.prototype.renderLabel = function(e, t, n, a) {
                            var i = this.axis,
                                s = i.chart.renderer,
                                l = this.label;
                            l || (this.label = l = s.text(this.getLabelText(e), 0, 0, e.useHTML).attr({
                                        align: e.textAlign || e.align,
                                        rotation: e.rotation,
                                        class: "highcharts-plot-" + (n ? "band" : "line") + "-label " + (e.className || ""),
                                        zIndex: a
                                    }).add(),
                                    i.chart.styledMode || l.css(c({
                                        textOverflow: "ellipsis"
                                    }, e.style))),
                                a = t.xBounds || [t[0][1], t[1][1], n ? t[2][1] : t[0][1]],
                                t = t.yBounds || [t[0][2], t[1][2], n ? t[2][2] : t[0][2]],
                                n = o(a),
                                s = o(t),
                                l.align(e, !1, {
                                    x: n,
                                    y: s,
                                    width: r(a) - n,
                                    height: r(t) - s
                                }),
                                l.alignValue && "left" !== l.alignValue || l.css({
                                    width: (90 === l.rotation ? i.height - (l.alignAttr.y - i.top) : i.width - (l.alignAttr.x - i.left)) + "px"
                                }),
                                l.show(!0)
                        },
                        n.prototype.getLabelText = function(e) {
                            return a(e.formatter) ? e.formatter.call(this) : e.text
                        },
                        n.prototype.destroy = function() {
                            s(this.axis.plotLinesAndBands, this),
                                delete this.axis,
                                i(this)
                        },
                        n
                }()
            }),
            t(n, "Core/Tooltip.js", [n["Core/FormatUtilities.js"], n["Core/Globals.js"], n["Core/Color/Palette.js"], n["Core/Renderer/RendererUtilities.js"], n["Core/Renderer/RendererRegistry.js"], n["Core/Utilities.js"]], function(e, t, n, r, o, a) {
                var i = e.format,
                    s = t.doc,
                    l = r.distribute,
                    c = a.addEvent,
                    u = a.clamp,
                    d = a.css,
                    p = a.defined,
                    h = a.discardElement,
                    f = a.extend,
                    m = a.fireEvent,
                    g = a.isArray,
                    y = a.isNumber,
                    v = a.isString,
                    b = a.merge,
                    _ = a.pick,
                    w = a.splat,
                    x = a.syncTimeout;
                return e = function() {
                    function e(e, t) {
                        this.container = void 0,
                            this.crosshairs = [],
                            this.distance = 0,
                            this.isHidden = !0,
                            this.isSticky = !1,
                            this.now = {},
                            this.options = {},
                            this.outside = !1,
                            this.chart = e,
                            this.init(e, t)
                    }
                    return e.prototype.applyFilter = function() {
                            var e = this.chart;
                            e.renderer.definition({
                                tagName: "filter",
                                attributes: {
                                    id: "drop-shadow-" + e.index,
                                    opacity: .5
                                },
                                children: [{
                                    tagName: "feGaussianBlur",
                                    attributes: { in: "SourceAlpha",
                                        stdDeviation: 1
                                    }
                                }, {
                                    tagName: "feOffset",
                                    attributes: {
                                        dx: 1,
                                        dy: 1
                                    }
                                }, {
                                    tagName: "feComponentTransfer",
                                    children: [{
                                        tagName: "feFuncA",
                                        attributes: {
                                            type: "linear",
                                            slope: .3
                                        }
                                    }]
                                }, {
                                    tagName: "feMerge",
                                    children: [{
                                        tagName: "feMergeNode"
                                    }, {
                                        tagName: "feMergeNode",
                                        attributes: { in: "SourceGraphic"
                                        }
                                    }]
                                }]
                            })
                        },
                        e.prototype.bodyFormatter = function(e) {
                            return e.map(function(e) {
                                var t = e.series.tooltipOptions;
                                return (t[(e.point.formatPrefix || "point") + "Formatter"] || e.point.tooltipFormatter).call(e.point, t[(e.point.formatPrefix || "point") + "Format"] || "")
                            })
                        },
                        e.prototype.cleanSplit = function(e) {
                            this.chart.series.forEach(function(t) {
                                var n = t && t.tt;
                                n && (!n.isActive || e ? t.tt = n.destroy() : n.isActive = !1)
                            })
                        },
                        e.prototype.defaultFormatter = function(e) {
                            var t = this.points || w(this),
                                n = [e.tooltipFooterHeaderFormatter(t[0])];
                            return n = n.concat(e.bodyFormatter(t)),
                                n.push(e.tooltipFooterHeaderFormatter(t[0], !0)),
                                n
                        },
                        e.prototype.destroy = function() {
                            this.label && (this.label = this.label.destroy()),
                                this.split && this.tt && (this.cleanSplit(this.chart, !0),
                                    this.tt = this.tt.destroy()),
                                this.renderer && (this.renderer = this.renderer.destroy(),
                                    h(this.container)),
                                a.clearTimeout(this.hideTimer),
                                a.clearTimeout(this.tooltipTimeout)
                        },
                        e.prototype.getAnchor = function(e, t) {
                            var n, r, o = this.chart,
                                a = o.pointer,
                                i = o.inverted,
                                s = o.plotTop,
                                l = o.plotLeft,
                                c = 0,
                                u = 0;
                            return e = w(e),
                                this.followPointer && t ? ("undefined" === typeof t.chartX && (t = a.normalize(t)),
                                    a = [t.chartX - l, t.chartY - s]) : e[0].tooltipPos ? a = e[0].tooltipPos : (e.forEach(function(e) {
                                        n = e.series.yAxis,
                                            r = e.series.xAxis,
                                            c += e.plotX || 0,
                                            u += e.plotLow ? (e.plotLow + (e.plotHigh || 0)) / 2 : e.plotY || 0,
                                            r && n && (i ? (c += s + o.plotHeight - r.len - r.pos,
                                                u += l + o.plotWidth - n.len - n.pos) : (c += r.pos - l,
                                                u += n.pos - s))
                                    }),
                                    c /= e.length,
                                    u /= e.length,
                                    a = [i ? o.plotWidth - u : c, i ? o.plotHeight - c : u],
                                    this.shared && 1 < e.length && t && (i ? a[0] = t.chartX - l : a[1] = t.chartY - s)),
                                a.map(Math.round)
                        },
                        e.prototype.getLabel = function() {
                            var e, n = this,
                                r = this.chart.styledMode,
                                a = this.options,
                                i = "tooltip" + (p(a.className) ? " " + a.className : ""),
                                s = a.style.pointerEvents || (!this.followPointer && a.stickOnContact ? "auto" : "none"),
                                l = function() {
                                    n.inContact = !0
                                },
                                u = function(e) {
                                    var t = n.chart.hoverSeries;
                                    n.inContact = n.shouldStickOnContact() && n.chart.pointer.inClass(e.relatedTarget, "highcharts-tooltip"), !n.inContact && t && t.onMouseOut && t.onMouseOut()
                                },
                                h = this.chart.renderer;
                            if (!this.label) {
                                if (this.outside) {
                                    var f = this.chart.options.chart.style,
                                        m = o.getRendererType();
                                    this.container = e = t.doc.createElement("div"),
                                        e.className = "highcharts-tooltip-container",
                                        d(e, {
                                            position: "absolute",
                                            top: "1px",
                                            pointerEvents: s,
                                            zIndex: Math.max(this.options.style.zIndex || 0, (f && f.zIndex || 0) + 3)
                                        }),
                                        c(e, "mouseenter", l),
                                        c(e, "mouseleave", u),
                                        t.doc.body.appendChild(e),
                                        this.renderer = h = new m(e, 0, 0, f, void 0, void 0, h.styledMode)
                                }
                                if (this.split ? this.label = h.g(i) : (this.label = h.label("", 0, 0, a.shape, void 0, void 0, a.useHTML, void 0, i).attr({
                                            padding: a.padding,
                                            r: a.borderRadius
                                        }),
                                        r || this.label.attr({
                                            fill: a.backgroundColor,
                                            "stroke-width": a.borderWidth
                                        }).css(a.style).css({
                                            pointerEvents: s
                                        }).shadow(a.shadow)),
                                    r && a.shadow && (this.applyFilter(),
                                        this.label.attr({
                                            filter: "url(#drop-shadow-" + this.chart.index + ")"
                                        })),
                                    n.outside && !n.split) {
                                    var g = this.label,
                                        y = g.xSetter,
                                        v = g.ySetter;
                                    g.xSetter = function(t) {
                                            y.call(g, n.distance),
                                                e.style.left = t + "px"
                                        },
                                        g.ySetter = function(t) {
                                            v.call(g, n.distance),
                                                e.style.top = t + "px"
                                        }
                                }
                                this.label.on("mouseenter", l).on("mouseleave", u).attr({
                                    zIndex: 8
                                }).add()
                            }
                            return this.label
                        },
                        e.prototype.getPosition = function(e, t, n) {
                            var r, o = this.chart,
                                a = this.distance,
                                i = {},
                                l = o.inverted && n.h || 0,
                                c = this.outside,
                                u = c ? s.documentElement.clientWidth - 2 * a : o.chartWidth,
                                d = c ? Math.max(s.body.scrollHeight, s.documentElement.scrollHeight, s.body.offsetHeight, s.documentElement.offsetHeight, s.documentElement.clientHeight) : o.chartHeight,
                                p = o.pointer.getChartPosition(),
                                h = function(r) {
                                    var i = "x" === r;
                                    return [r, i ? u : d, i ? e : t].concat(c ? [i ? e * p.scaleX : t * p.scaleY, i ? p.left - a + (n.plotX + o.plotLeft) * p.scaleX : p.top - a + (n.plotY + o.plotTop) * p.scaleY, 0, i ? u : d] : [i ? e : t, i ? n.plotX + o.plotLeft : n.plotY + o.plotTop, i ? o.plotLeft : o.plotTop, i ? o.plotLeft + o.plotWidth : o.plotTop + o.plotHeight])
                                },
                                f = h("y"),
                                m = h("x"),
                                g = !this.followPointer && _(n.ttBelow, !o.inverted === !!n.negative),
                                y = function(e, t, n, r, o, s, u) {
                                    var d = c ? "y" === e ? a * p.scaleY : a * p.scaleX : a,
                                        h = (n - r) / 2,
                                        f = r < o - a,
                                        m = o + a + r < t,
                                        y = o - d - n + h;
                                    if (o = o + d - h,
                                        g && m)
                                        i[e] = o;
                                    else if (!g && f)
                                        i[e] = y;
                                    else if (f)
                                        i[e] = Math.min(u - r, 0 > y - l ? y : y - l);
                                    else {
                                        if (!m)
                                            return !1;
                                        i[e] = Math.max(s, o + l + n > t ? o : o + l)
                                    }
                                },
                                v = function(e, t, n, r, o) {
                                    var s;
                                    return o < a || o > t - a ? s = !1 : i[e] = o < n / 2 ? 1 : o > t - r / 2 ? t - r - 2 : o - n / 2,
                                        s
                                },
                                b = function(e) {
                                    var t = f;
                                    f = m,
                                        m = t,
                                        r = e
                                },
                                w = function() {
                                    !1 !== y.apply(0, f) ? !1 !== v.apply(0, m) || r || (b(!0),
                                        w()) : r ? i.x = i.y = 0 : (b(!0),
                                        w())
                                };
                            return (o.inverted || 1 < this.len) && b(),
                                w(),
                                i
                        },
                        e.prototype.hide = function(e) {
                            var t = this;
                            a.clearTimeout(this.hideTimer),
                                e = _(e, this.options.hideDelay),
                                this.isHidden || (this.hideTimer = x(function() {
                                    t.getLabel().fadeOut(e ? void 0 : e),
                                        t.isHidden = !0
                                }, e))
                        },
                        e.prototype.init = function(e, t) {
                            this.chart = e,
                                this.options = t,
                                this.crosshairs = [],
                                this.now = {
                                    x: 0,
                                    y: 0
                                },
                                this.isHidden = !0,
                                this.split = t.split && !e.inverted && !e.polar,
                                this.shared = t.shared || this.split,
                                this.outside = _(t.outside, !(!e.scrollablePixelsX && !e.scrollablePixelsY))
                        },
                        e.prototype.shouldStickOnContact = function() {
                            return !(this.followPointer || !this.options.stickOnContact)
                        },
                        e.prototype.isStickyOnContact = function() {
                            return !(!this.shouldStickOnContact() || !this.inContact)
                        },
                        e.prototype.move = function(e, t, n, r) {
                            var o = this,
                                i = o.now,
                                s = !1 !== o.options.animation && !o.isHidden && (1 < Math.abs(e - i.x) || 1 < Math.abs(t - i.y)),
                                l = o.followPointer || 1 < o.len;
                            f(i, {
                                    x: s ? (2 * i.x + e) / 3 : e,
                                    y: s ? (i.y + t) / 2 : t,
                                    anchorX: l ? void 0 : s ? (2 * i.anchorX + n) / 3 : n,
                                    anchorY: l ? void 0 : s ? (i.anchorY + r) / 2 : r
                                }),
                                o.getLabel().attr(i),
                                o.drawTracker(),
                                s && (a.clearTimeout(this.tooltipTimeout),
                                    this.tooltipTimeout = setTimeout(function() {
                                        o && o.move(e, t, n, r)
                                    }, 32))
                        },
                        e.prototype.refresh = function(e, t) {
                            var r = this.chart,
                                o = this.options,
                                i = w(e),
                                s = i[0],
                                l = [],
                                c = o.formatter || this.defaultFormatter,
                                u = this.shared,
                                d = r.styledMode,
                                p = {};
                            if (o.enabled) {
                                a.clearTimeout(this.hideTimer),
                                    this.followPointer = !this.split && s.series.tooltipOptions.followPointer;
                                var h = this.getAnchor(e, t),
                                    f = h[0],
                                    y = h[1];
                                if (!u || !g(e) && e.series && e.series.noSharedTooltip ? p = s.getLabelConfig() : (r.pointer.applyInactiveState(i),
                                        i.forEach(function(e) {
                                            e.setState("hover"),
                                                l.push(e.getLabelConfig())
                                        }),
                                        p = {
                                            x: s.category,
                                            y: s.y
                                        },
                                        p.points = l),
                                    this.len = l.length,
                                    e = c.call(p, this),
                                    c = s.series,
                                    this.distance = _(c.tooltipOptions.distance, 16), !1 === e)
                                    this.hide();
                                else {
                                    if (this.split)
                                        this.renderSplit(e, i);
                                    else {
                                        if (i = f,
                                            u = y,
                                            t && r.pointer.isDirectTouch && (i = t.chartX - r.plotLeft,
                                                u = t.chartY - r.plotTop), !r.polar && !1 !== c.options.clip && !c.shouldShowTooltip(i, u))
                                            return void this.hide();
                                        t = this.getLabel(),
                                            o.style.width && !d || t.css({
                                                width: this.chart.spacingBox.width + "px"
                                            }),
                                            t.attr({
                                                text: e && e.join ? e.join("") : e
                                            }),
                                            t.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + _(s.colorIndex, c.colorIndex)),
                                            d || t.attr({
                                                stroke: o.borderColor || s.color || c.color || n.neutralColor60
                                            }),
                                            this.updatePosition({
                                                plotX: f,
                                                plotY: y,
                                                negative: s.negative,
                                                ttBelow: s.ttBelow,
                                                h: h[2] || 0
                                            })
                                    }
                                    this.isHidden && this.label && this.label.attr({
                                            opacity: 1
                                        }).show(),
                                        this.isHidden = !1
                                }
                                m(this, "refresh")
                            }
                        },
                        e.prototype.renderSplit = function(e, t) {
                            function r(e, t, n, r, a) {
                                return void 0 === a && (a = !0),
                                    n ? (t = A ? 0 : D,
                                        e = u(e - r / 2, C.left, C.right - r - (o.outside ? P : 0))) : (t -= N,
                                        e = a ? e - r - k : e + k,
                                        e = u(e, a ? e : C.left, C.right)), {
                                        x: e,
                                        y: t
                                    }
                            }
                            var o = this,
                                a = o.chart,
                                i = o.chart,
                                c = i.chartWidth,
                                d = i.chartHeight,
                                p = i.plotHeight,
                                h = i.plotLeft,
                                m = i.plotTop,
                                g = i.pointer,
                                y = i.scrollablePixelsY;
                            y = void 0 === y ? 0 : y;
                            var b = i.scrollablePixelsX,
                                w = i.scrollingContainer;
                            w = void 0 === w ? {
                                scrollLeft: 0,
                                scrollTop: 0
                            } : w;
                            var x = w.scrollLeft;
                            w = w.scrollTop;
                            var E = i.styledMode,
                                k = o.distance,
                                S = o.options,
                                O = o.options.positioner,
                                C = o.outside && "number" !== typeof b ? s.documentElement.getBoundingClientRect() : {
                                    left: x,
                                    right: x + c,
                                    top: w,
                                    bottom: w + d
                                },
                                T = o.getLabel(),
                                M = this.renderer || a.renderer,
                                A = !(!a.xAxis[0] || !a.xAxis[0].opposite);
                            a = g.getChartPosition();
                            var P = a.left;
                            a = a.top;
                            var N = m + w,
                                j = 0,
                                D = p - y;
                            v(e) && (e = [!1, e]),
                                e = e.slice(0, t.length + 1).reduce(function(e, a, i) {
                                    if (!1 !== a && "" !== a) {
                                        i = t[i - 1] || {
                                            isHeader: !0,
                                            plotX: t[0].plotX,
                                            plotY: p,
                                            series: {}
                                        };
                                        var s = i.isHeader,
                                            l = s ? o : i.series;
                                        a = a.toString();
                                        var c = l.tt,
                                            d = i.isHeader,
                                            f = i.series,
                                            g = "highcharts-color-" + _(i.colorIndex, f.colorIndex, "none");
                                        if (c || (c = {
                                                    padding: S.padding,
                                                    r: S.borderRadius
                                                },
                                                E || (c.fill = S.backgroundColor,
                                                    c["stroke-width"] = S.borderWidth),
                                                c = M.label("", 0, 0, S[d ? "headerShape" : "shape"], void 0, void 0, S.useHTML).addClass((d ? "highcharts-tooltip-header " : "") + "highcharts-tooltip-box " + g).attr(c).add(T)),
                                            c.isActive = !0,
                                            c.attr({
                                                text: a
                                            }),
                                            E || c.css(S.style).shadow(S.shadow).attr({
                                                stroke: S.borderColor || i.color || f.color || n.neutralColor80
                                            }),
                                            l = l.tt = c,
                                            d = l.getBBox(),
                                            a = d.width + l.strokeWidth(),
                                            s && (j = d.height,
                                                D += j,
                                                A && (N -= j)),
                                            f = i.plotX,
                                            f = void 0 === f ? 0 : f,
                                            g = i.plotY,
                                            g = void 0 === g ? 0 : g,
                                            c = i.series,
                                            i.isHeader) {
                                            f = h + f;
                                            var y = m + p / 2
                                        } else {
                                            var v = c.xAxis,
                                                b = c.yAxis;
                                            f = v.pos + u(f, -k, v.len + k),
                                                c.shouldShowTooltip(0, b.pos - m + g, {
                                                    ignoreX: !0
                                                }) && (y = b.pos + g)
                                        }
                                        f = u(f, C.left - k, C.right + k),
                                            "number" === typeof y ? (d = d.height + 1,
                                                g = O ? O.call(o, a, d, i) : r(f, y, s, a),
                                                e.push({
                                                    align: O ? 0 : void 0,
                                                    anchorX: f,
                                                    anchorY: y,
                                                    boxWidth: a,
                                                    point: i,
                                                    rank: _(g.rank, s ? 1 : 0),
                                                    size: d,
                                                    target: g.y,
                                                    tt: l,
                                                    x: g.x
                                                })) : l.isActive = !1
                                    }
                                    return e
                                }, []), !O && e.some(function(e) {
                                    var t = (o.outside ? P : 0) + e.anchorX;
                                    return t < C.left && t + e.boxWidth < C.right || t < P - C.left + e.boxWidth && C.right - t > t
                                }) && (e = e.map(function(e) {
                                    var t = r(e.anchorX, e.anchorY, e.point.isHeader, e.boxWidth, !1);
                                    return f(e, {
                                        target: t.y,
                                        x: t.x
                                    })
                                })),
                                o.cleanSplit(),
                                l(e, D);
                            var R = P,
                                I = P;
                            e.forEach(function(e) {
                                    var t = e.x,
                                        n = e.boxWidth;
                                    (e = e.isHeader) || (o.outside && P + t < R && (R = P + t), !e && o.outside && R + n > I && (I = P + t))
                                }),
                                e.forEach(function(e) {
                                    var t = e.x,
                                        n = e.anchorX,
                                        r = e.pos,
                                        a = e.point.isHeader;
                                    if (r = {
                                            visibility: "undefined" === typeof r ? "hidden" : "inherit",
                                            x: t,
                                            y: r + N,
                                            anchorX: n,
                                            anchorY: e.anchorY
                                        },
                                        o.outside && t < n) {
                                        var i = P - R;
                                        0 < i && (a || (r.x = t + i,
                                                r.anchorX = n + i),
                                            a && (r.x = (I - R) / 2,
                                                r.anchorX = n + i))
                                    }
                                    e.tt.attr(r)
                                }),
                                e = o.container,
                                y = o.renderer,
                                o.outside && e && y && (i = T.getBBox(),
                                    y.setSize(i.width + i.x, i.height + i.y, !1),
                                    e.style.left = R + "px",
                                    e.style.top = a + "px")
                        },
                        e.prototype.drawTracker = function() {
                            if (this.followPointer || !this.options.stickOnContact)
                                this.tracker && this.tracker.destroy();
                            else {
                                var e = this.chart,
                                    t = this.label,
                                    n = this.shared ? e.hoverPoints : e.hoverPoint;
                                if (t && n) {
                                    var r = {
                                        x: 0,
                                        y: 0,
                                        width: 0,
                                        height: 0
                                    };
                                    n = this.getAnchor(n);
                                    var o = t.getBBox();
                                    n[0] += e.plotLeft - t.translateX,
                                        n[1] += e.plotTop - t.translateY,
                                        r.x = Math.min(0, n[0]),
                                        r.y = Math.min(0, n[1]),
                                        r.width = 0 > n[0] ? Math.max(Math.abs(n[0]), o.width - n[0]) : Math.max(Math.abs(n[0]), o.width),
                                        r.height = 0 > n[1] ? Math.max(Math.abs(n[1]), o.height - Math.abs(n[1])) : Math.max(Math.abs(n[1]), o.height),
                                        this.tracker ? this.tracker.attr(r) : (this.tracker = t.renderer.rect(r).addClass("highcharts-tracker").add(t),
                                            e.styledMode || this.tracker.attr({
                                                fill: "rgba(0,0,0,0)"
                                            }))
                                }
                            }
                        },
                        e.prototype.styledModeFormat = function(e) {
                            return e.replace('style="font-size: 10px"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex}"')
                        },
                        e.prototype.tooltipFooterHeaderFormatter = function(e, t) {
                            var n = e.series,
                                r = n.tooltipOptions,
                                o = n.xAxis,
                                a = o && o.dateTime;
                            o = {
                                isFooter: t,
                                labelConfig: e
                            };
                            var s = r.xDateFormat,
                                l = r[t ? "footerFormat" : "headerFormat"];
                            return m(this, "headerFormatter", o, function(t) {
                                    a && !s && y(e.key) && (s = a.getXDateFormat(e.key, r.dateTimeLabelFormats)),
                                        a && s && (e.point && e.point.tooltipDateKeys || ["key"]).forEach(function(e) {
                                            l = l.replace("{point." + e + "}", "{point." + e + ":" + s + "}")
                                        }),
                                        n.chart.styledMode && (l = this.styledModeFormat(l)),
                                        t.text = i(l, {
                                            point: e,
                                            series: n
                                        }, this.chart)
                                }),
                                o.text
                        },
                        e.prototype.update = function(e) {
                            this.destroy(),
                                b(!0, this.chart.options.tooltip.userOptions, e),
                                this.init(this.chart, b(!0, this.options, e))
                        },
                        e.prototype.updatePosition = function(e) {
                            var t = this.chart,
                                n = this.options,
                                r = t.pointer,
                                o = this.getLabel();
                            r = r.getChartPosition();
                            var a = (n.positioner || this.getPosition).call(this, o.width, o.height, e),
                                i = e.plotX + t.plotLeft;
                            e = e.plotY + t.plotTop,
                                this.outside && (n = n.borderWidth + 2 * this.distance,
                                    this.renderer.setSize(o.width + n, o.height + n, !1),
                                    1 === r.scaleX && 1 === r.scaleY || (d(this.container, {
                                            transform: "scale(" + r.scaleX + ", " + r.scaleY + ")"
                                        }),
                                        i *= r.scaleX,
                                        e *= r.scaleY),
                                    i += r.left - a.x,
                                    e += r.top - a.y),
                                this.move(Math.round(a.x), Math.round(a.y || 0), i, e)
                        },
                        e
                }()
            }),
            t(n, "Core/Series/Point.js", [n["Core/Renderer/HTML/AST.js"], n["Core/Animation/AnimationUtilities.js"], n["Core/DefaultOptions.js"], n["Core/FormatUtilities.js"], n["Core/Utilities.js"]], function(e, t, n, r, o) {
                var a = t.animObject,
                    i = n.defaultOptions,
                    s = r.format,
                    l = o.addEvent,
                    c = o.defined,
                    u = o.erase,
                    d = o.extend,
                    p = o.fireEvent,
                    h = o.getNestedProperty,
                    f = o.isArray,
                    m = o.isFunction,
                    g = o.isNumber,
                    y = o.isObject,
                    v = o.merge,
                    b = o.objectEach,
                    _ = o.pick,
                    w = o.syncTimeout,
                    x = o.removeEvent,
                    E = o.uniqueKey;
                return t = function() {
                    function t() {
                        this.colorIndex = this.category = void 0,
                            this.formatPrefix = "point",
                            this.id = void 0,
                            this.isNull = !1,
                            this.percentage = this.options = this.name = void 0,
                            this.selected = !1,
                            this.total = this.series = void 0,
                            this.visible = !0,
                            this.x = void 0
                    }
                    return t.prototype.animateBeforeDestroy = function() {
                            var e = this,
                                t = {
                                    x: e.startXPos,
                                    opacity: 0
                                },
                                n = e.getGraphicalProps();
                            n.singular.forEach(function(n) {
                                    e[n] = e[n].animate("dataLabel" === n ? {
                                        x: e[n].startXPos,
                                        y: e[n].startYPos,
                                        opacity: 0
                                    } : t)
                                }),
                                n.plural.forEach(function(t) {
                                    e[t].forEach(function(t) {
                                        t.element && t.animate(d({
                                            x: e.startXPos
                                        }, t.startYPos ? {
                                            x: t.startXPos,
                                            y: t.startYPos
                                        } : {}))
                                    })
                                })
                        },
                        t.prototype.applyOptions = function(e, n) {
                            var r = this.series,
                                o = r.options.pointValKey || r.pointValKey;
                            return e = t.prototype.optionsToObject.call(this, e),
                                d(this, e),
                                this.options = this.options ? d(this.options, e) : e,
                                e.group && delete this.group,
                                e.dataLabels && delete this.dataLabels,
                                o && (this.y = t.prototype.getNestedProperty.call(this, o)),
                                this.formatPrefix = (this.isNull = _(this.isValid && !this.isValid(), null === this.x || !g(this.y))) ? "null" : "point",
                                this.selected && (this.state = "select"),
                                "name" in this && "undefined" === typeof n && r.xAxis && r.xAxis.hasNames && (this.x = r.xAxis.nameToX(this)),
                                "undefined" === typeof this.x && r ? this.x = "undefined" === typeof n ? r.autoIncrement() : n : g(e.x) && r.options.relativeXValue && (this.x = r.autoIncrement(e.x)),
                                this
                        },
                        t.prototype.destroy = function() {
                            function e() {
                                (t.graphic || t.dataLabel || t.dataLabels) && (x(t),
                                    t.destroyElements());
                                for (o in t)
                                    t[o] = null
                            }
                            var t = this,
                                n = t.series,
                                r = n.chart;
                            n = n.options.dataSorting;
                            var o, i = r.hoverPoints,
                                s = a(t.series.chart.renderer.globalAnimation);
                            t.legendItem && r.legend.destroyItem(t),
                                i && (t.setState(),
                                    u(i, t),
                                    i.length || (r.hoverPoints = null)),
                                t === r.hoverPoint && t.onMouseOut(),
                                n && n.enabled ? (this.animateBeforeDestroy(),
                                    w(e, s.duration)) : e(),
                                r.pointCount--
                        },
                        t.prototype.destroyElements = function(e) {
                            var t = this;
                            e = t.getGraphicalProps(e),
                                e.singular.forEach(function(e) {
                                    t[e] = t[e].destroy()
                                }),
                                e.plural.forEach(function(e) {
                                    t[e].forEach(function(e) {
                                            e.element && e.destroy()
                                        }),
                                        delete t[e]
                                })
                        },
                        t.prototype.firePointEvent = function(e, t, n) {
                            var r = this,
                                o = this.series.options;
                            (o.point.events[e] || r.options && r.options.events && r.options.events[e]) && r.importEvents(),
                                "click" === e && o.allowPointSelect && (n = function(e) {
                                    r.select && r.select(null, e.ctrlKey || e.metaKey || e.shiftKey)
                                }),
                                p(r, e, t, n)
                        },
                        t.prototype.getClassName = function() {
                            return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + ("undefined" !== typeof this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
                        },
                        t.prototype.getGraphicalProps = function(e) {
                            var t, n = this,
                                r = [],
                                o = {
                                    singular: [],
                                    plural: []
                                };
                            for (e = e || {
                                    graphic: 1,
                                    dataLabel: 1
                                },
                                e.graphic && r.push("graphic", "upperGraphic", "shadowGroup"),
                                e.dataLabel && r.push("dataLabel", "dataLabelUpper", "connector"),
                                t = r.length; t--;) {
                                var a = r[t];
                                n[a] && o.singular.push(a)
                            }
                            return ["dataLabel", "connector"].forEach(function(t) {
                                    var r = t + "s";
                                    e[t] && n[r] && o.plural.push(r)
                                }),
                                o
                        },
                        t.prototype.getLabelConfig = function() {
                            return {
                                x: this.category,
                                y: this.y,
                                color: this.color,
                                colorIndex: this.colorIndex,
                                key: this.name || this.category,
                                series: this.series,
                                point: this,
                                percentage: this.percentage,
                                total: this.total || this.stackTotal
                            }
                        },
                        t.prototype.getNestedProperty = function(e) {
                            if (e)
                                return 0 === e.indexOf("custom.") ? h(e, this.options) : this[e]
                        },
                        t.prototype.getZone = function() {
                            var e = this.series,
                                t = e.zones;
                            e = e.zoneAxis || "y";
                            var n, r = 0;
                            for (n = t[r]; this[e] >= n.value;)
                                n = t[++r];
                            return this.nonZonedColor || (this.nonZonedColor = this.color),
                                this.color = n && n.color && !this.options.color ? n.color : this.nonZonedColor,
                                n
                        },
                        t.prototype.hasNewShapeType = function() {
                            return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType
                        },
                        t.prototype.init = function(e, t, n) {
                            return this.series = e,
                                this.applyOptions(t, n),
                                this.id = c(this.id) ? this.id : E(),
                                this.resolveColor(),
                                e.chart.pointCount++,
                                p(this, "afterInit"),
                                this
                        },
                        t.prototype.optionsToObject = function(e) {
                            var n = this.series,
                                r = n.options.keys,
                                o = r || n.pointArrayMap || ["y"],
                                a = o.length,
                                i = {},
                                s = 0,
                                l = 0;
                            if (g(e) || null === e)
                                i[o[0]] = e;
                            else if (f(e))
                                for (!r && e.length > a && (n = typeof e[0],
                                        "string" === n ? i.name = e[0] : "number" === n && (i.x = e[0]),
                                        s++); l < a;)
                                    r && "undefined" === typeof e[s] || (0 < o[l].indexOf(".") ? t.prototype.setNestedProperty(i, e[s], o[l]) : i[o[l]] = e[s]),
                                    s++,
                                    l++;
                            else
                                "object" === typeof e && (i = e,
                                    e.dataLabels && (n._hasPointLabels = !0),
                                    e.marker && (n._hasPointMarkers = !0));
                            return i
                        },
                        t.prototype.resolveColor = function() {
                            var e = this.series,
                                t = e.chart.styledMode,
                                n = e.chart.options.chart.colorCount;
                            if (delete this.nonZonedColor,
                                e.options.colorByPoint) {
                                if (!t) {
                                    n = e.options.colors || e.chart.options.colors;
                                    var r = n[e.colorCounter];
                                    n = n.length
                                }
                                t = e.colorCounter,
                                    e.colorCounter++,
                                    e.colorCounter === n && (e.colorCounter = 0)
                            } else
                                t || (r = e.color),
                                t = e.colorIndex;
                            this.colorIndex = _(this.options.colorIndex, t),
                                this.color = _(this.options.color, r)
                        },
                        t.prototype.setNestedProperty = function(e, t, n) {
                            return n.split(".").reduce(function(e, n, r, o) {
                                    return e[n] = o.length - 1 === r ? t : y(e[n], !0) ? e[n] : {},
                                        e[n]
                                }, e),
                                e
                        },
                        t.prototype.tooltipFormatter = function(e) {
                            var t = this.series,
                                n = t.tooltipOptions,
                                r = _(n.valueDecimals, ""),
                                o = n.valuePrefix || "",
                                a = n.valueSuffix || "";
                            return t.chart.styledMode && (e = t.chart.tooltip.styledModeFormat(e)),
                                (t.pointArrayMap || ["y"]).forEach(function(t) {
                                    t = "{point." + t,
                                        (o || a) && (e = e.replace(RegExp(t + "}", "g"), o + t + "}" + a)),
                                        e = e.replace(RegExp(t + "}", "g"), t + ":,." + r + "f}")
                                }),
                                s(e, {
                                    point: this,
                                    series: this.series
                                }, t.chart)
                        },
                        t.prototype.update = function(e, t, n, r) {
                            function o() {
                                i.applyOptions(e);
                                var r = l && i.hasDummyGraphic;
                                r = null === i.y ? !r : r,
                                    l && r && (i.graphic = l.destroy(),
                                        delete i.hasDummyGraphic),
                                    y(e, !0) && (l && l.element && e && e.marker && "undefined" !== typeof e.marker.symbol && (i.graphic = l.destroy()),
                                        e && e.dataLabels && i.dataLabel && (i.dataLabel = i.dataLabel.destroy()),
                                        i.connector && (i.connector = i.connector.destroy())),
                                    a = i.index,
                                    s.updateParallelArrays(i, a),
                                    u.data[a] = y(u.data[a], !0) || y(e, !0) ? i.options : _(e, u.data[a]),
                                    s.isDirty = s.isDirtyData = !0, !s.fixedBox && s.hasCartesianSeries && (c.isDirtyBox = !0),
                                    "point" === u.legendType && (c.isDirtyLegend = !0),
                                    t && c.redraw(n)
                            }
                            var a, i = this,
                                s = i.series,
                                l = i.graphic,
                                c = s.chart,
                                u = s.options;
                            t = _(t, !0), !1 === r ? o() : i.firePointEvent("update", {
                                options: e
                            }, o)
                        },
                        t.prototype.remove = function(e, t) {
                            this.series.removePoint(this.series.data.indexOf(this), e, t)
                        },
                        t.prototype.select = function(e, t) {
                            var n = this,
                                r = n.series,
                                o = r.chart;
                            this.selectedStaging = e = _(e, !n.selected),
                                n.firePointEvent(e ? "select" : "unselect", {
                                    accumulate: t
                                }, function() {
                                    n.selected = n.options.selected = e,
                                        r.options.data[r.data.indexOf(n)] = n.options,
                                        n.setState(e && "select"),
                                        t || o.getSelectedPoints().forEach(function(e) {
                                            var t = e.series;
                                            e.selected && e !== n && (e.selected = e.options.selected = !1,
                                                t.options.data[t.data.indexOf(e)] = e.options,
                                                e.setState(o.hoverPoints && t.options.inactiveOtherPoints ? "inactive" : ""),
                                                e.firePointEvent("unselect"))
                                        })
                                }),
                                delete this.selectedStaging
                        },
                        t.prototype.onMouseOver = function(e) {
                            var t = this.series.chart,
                                n = t.pointer;
                            e = e ? n.normalize(e) : n.getChartCoordinatesFromPoint(this, t.inverted),
                                n.runPointActions(e, this)
                        },
                        t.prototype.onMouseOut = function() {
                            var e = this.series.chart;
                            this.firePointEvent("mouseOut"),
                                this.series.options.inactiveOtherPoints || (e.hoverPoints || []).forEach(function(e) {
                                    e.setState()
                                }),
                                e.hoverPoints = e.hoverPoint = null
                        },
                        t.prototype.importEvents = function() {
                            if (!this.hasImportedEvents) {
                                var e = this,
                                    t = v(e.series.options.point, e.options).events;
                                e.events = t,
                                    b(t, function(t, n) {
                                        m(t) && l(e, n, t)
                                    }),
                                    this.hasImportedEvents = !0
                            }
                        },
                        t.prototype.setState = function(t, n) {
                            var r, o = this.series,
                                a = this.state,
                                s = o.options.states[t || "normal"] || {},
                                l = i.plotOptions[o.type].marker && o.options.marker,
                                c = l && !1 === l.enabled,
                                u = l && l.states && l.states[t || "normal"] || {},
                                h = !1 === u.enabled,
                                f = this.marker || {},
                                m = o.chart,
                                y = l && o.markerAttribs,
                                v = o.halo,
                                b = o.stateMarkerGraphic;
                            if (!((t = t || "") === this.state && !n || this.selected && "select" !== t || !1 === s.enabled || t && (h || c && !1 === u.enabled) || t && f.states && f.states[t] && !1 === f.states[t].enabled)) {
                                if (this.state = t,
                                    y && (r = o.markerAttribs(this, t)),
                                    this.graphic && !this.hasDummyGraphic) {
                                    if (a && this.graphic.removeClass("highcharts-point-" + a),
                                        t && this.graphic.addClass("highcharts-point-" + t), !m.styledMode) {
                                        var w = o.pointAttribs(this, t),
                                            x = _(m.options.chart.animation, s.animation);
                                        o.options.inactiveOtherPoints && g(w.opacity) && ((this.dataLabels || []).forEach(function(e) {
                                                    e && e.animate({
                                                        opacity: w.opacity
                                                    }, x)
                                                }),
                                                this.connector && this.connector.animate({
                                                    opacity: w.opacity
                                                }, x)),
                                            this.graphic.animate(w, x)
                                    }
                                    r && this.graphic.animate(r, _(m.options.chart.animation, u.animation, l.animation)),
                                        b && b.hide()
                                } else
                                    t && u && (a = f.symbol || o.symbol,
                                        b && b.currentSymbol !== a && (b = b.destroy()),
                                        r && (b ? b[n ? "animate" : "attr"]({
                                            x: r.x,
                                            y: r.y
                                        }) : a && (o.stateMarkerGraphic = b = m.renderer.symbol(a, r.x, r.y, r.width, r.height).add(o.markerGroup),
                                            b.currentSymbol = a)), !m.styledMode && b && b.attr(o.pointAttribs(this, t))),
                                    b && (b[t && this.isInside ? "show" : "hide"](),
                                        b.element.point = this,
                                        b.addClass(this.getClassName(), !0));
                                s = s.halo,
                                    r = (b = this.graphic || b) && b.visibility || "inherit",
                                    s && s.size && b && "hidden" !== r && !this.isCluster ? (v || (o.halo = v = m.renderer.path().add(b.parentGroup)),
                                        v.show()[n ? "animate" : "attr"]({
                                            d: this.haloPath(s.size)
                                        }),
                                        v.attr({
                                            class: "highcharts-halo highcharts-color-" + _(this.colorIndex, o.colorIndex) + (this.className ? " " + this.className : ""),
                                            visibility: r,
                                            zIndex: -1
                                        }),
                                        v.point = this,
                                        m.styledMode || v.attr(d({
                                            fill: this.color || o.color,
                                            "fill-opacity": s.opacity
                                        }, e.filterUserAttributes(s.attributes || {})))) : v && v.point && v.point.haloPath && v.animate({
                                        d: v.point.haloPath(0)
                                    }, null, v.hide),
                                    p(this, "afterSetState", {
                                        state: t
                                    })
                            }
                        },
                        t.prototype.haloPath = function(e) {
                            return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - e, this.plotY - e, 2 * e, 2 * e)
                        },
                        t
                }()
            }