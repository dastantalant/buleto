 function (e, t, n) {
    "use strict";
    (function (e) {
        function n(e) {
            var t = !1;
            return function () {
                t || (t = !0,
                    window.Promise.resolve().then(function () {
                        t = !1,
                            e()
                    }))
            }
        }

        function r(e) {
            var t = !1;
            return function () {
                t || (t = !0,
                    setTimeout(function () {
                        t = !1,
                            e()
                    }, pe))
            }
        }

        function o(e) {
            var t = {};
            return e && "[object Function]" === t.toString.call(e)
        }

        function a(e, t) {
            if (1 !== e.nodeType)
                return [];
            var n = e.ownerDocument.defaultView,
                r = n.getComputedStyle(e, null);
            return t ? r[t] : r
        }

        function i(e) {
            return "HTML" === e.nodeName ? e : e.parentNode || e.host
        }

        function s(e) {
            if (!e)
                return document.body;
            switch (e.nodeName) {
                case "HTML":
                case "BODY":
                    return e.ownerDocument.body;
                case "#document":
                    return e.body
            }
            var t = a(e),
                n = t.overflow,
                r = t.overflowX;
            return /(auto|scroll|overlay)/.test(n + t.overflowY + r) ? e : s(i(e))
        }

        function l(e) {
            return e && e.referenceNode ? e.referenceNode : e
        }

        function c(e) {
            return 11 === e ? me : 10 === e ? ge : me || ge
        }

        function u(e) {
            if (!e)
                return document.documentElement;
            for (var t = c(10) ? document.body : null, n = e.offsetParent || null; n === t && e.nextElementSibling;)
                n = (e = e.nextElementSibling).offsetParent;
            var r = n && n.nodeName;
            return r && "BODY" !== r && "HTML" !== r ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) && "static" === a(n, "position") ? u(n) : n : e ? e.ownerDocument.documentElement : document.documentElement
        }

        function d(e) {
            var t = e.nodeName;
            return "BODY" !== t && ("HTML" === t || u(e.firstElementChild) === e)
        }

        function p(e) {
            return null !== e.parentNode ? p(e.parentNode) : e
        }

        function h(e, t) {
            if (!e || !e.nodeType || !t || !t.nodeType)
                return document.documentElement;
            var n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
                r = n ? e : t,
                o = n ? t : e,
                a = document.createRange();
            a.setStart(r, 0),
                a.setEnd(o, 0);
            var i = a.commonAncestorContainer;
            if (e !== i && t !== i || r.contains(o))
                return d(i) ? i : u(i);
            var s = p(e);
            return s.host ? h(s.host, t) : h(e, p(t).host)
        }

        function f(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top",
                n = "top" === t ? "scrollTop" : "scrollLeft",
                r = e.nodeName;
            if ("BODY" === r || "HTML" === r) {
                var o = e.ownerDocument.documentElement;
                return (e.ownerDocument.scrollingElement || o)[n]
            }
            return e[n]
        }

        function m(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                r = f(t, "top"),
                o = f(t, "left"),
                a = n ? -1 : 1;
            return e.top += r * a,
                e.bottom += r * a,
                e.left += o * a,
                e.right += o * a,
                e
        }

        function g(e, t) {
            var n = "x" === t ? "Left" : "Top",
                r = "Left" === n ? "Right" : "Bottom";
            return parseFloat(e["border" + n + "Width"]) + parseFloat(e["border" + r + "Width"])
        }

        function y(e, t, n, r) {
            return Math.max(t["offset" + e], t["scroll" + e], n["client" + e], n["offset" + e], n["scroll" + e], c(10) ? parseInt(n["offset" + e]) + parseInt(r["margin" + ("Height" === e ? "Top" : "Left")]) + parseInt(r["margin" + ("Height" === e ? "Bottom" : "Right")]) : 0)
        }

        function v(e) {
            var t = e.body,
                n = e.documentElement,
                r = c(10) && getComputedStyle(n);
            return {
                height: y("Height", t, n, r),
                width: y("Width", t, n, r)
            }
        }

        function b(e) {
            return _e({}, e, {
                right: e.left + e.width,
                bottom: e.top + e.height
            })
        }

        function _(e) {
            var t = {};
            try {
                if (c(10)) {
                    t = e.getBoundingClientRect();
                    var n = f(e, "top"),
                        r = f(e, "left");
                    t.top += n,
                        t.left += r,
                        t.bottom += n,
                        t.right += r
                } else
                    t = e.getBoundingClientRect()
            } catch (e) { }
            var o = {
                left: t.left,
                top: t.top,
                width: t.right - t.left,
                height: t.bottom - t.top
            },
                i = "HTML" === e.nodeName ? v(e.ownerDocument) : {},
                s = i.width || e.clientWidth || o.width,
                l = i.height || e.clientHeight || o.height,
                u = e.offsetWidth - s,
                d = e.offsetHeight - l;
            if (u || d) {
                var p = a(e);
                u -= g(p, "x"),
                    d -= g(p, "y"),
                    o.width -= u,
                    o.height -= d
            }
            return b(o)
        }

        function w(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                r = c(10),
                o = "HTML" === t.nodeName,
                i = _(e),
                l = _(t),
                u = s(e),
                d = a(t),
                p = parseFloat(d.borderTopWidth),
                h = parseFloat(d.borderLeftWidth);
            n && o && (l.top = Math.max(l.top, 0),
                l.left = Math.max(l.left, 0));
            var f = b({
                top: i.top - l.top - p,
                left: i.left - l.left - h,
                width: i.width,
                height: i.height
            });
            if (f.marginTop = 0,
                f.marginLeft = 0, !r && o) {
                var g = parseFloat(d.marginTop),
                    y = parseFloat(d.marginLeft);
                f.top -= p - g,
                    f.bottom -= p - g,
                    f.left -= h - y,
                    f.right -= h - y,
                    f.marginTop = g,
                    f.marginLeft = y
            }
            return (r && !n ? t.contains(u) : t === u && "BODY" !== u.nodeName) && (f = m(f, t)),
                f
        }

        function x(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                n = e.ownerDocument.documentElement,
                r = w(e, n),
                o = Math.max(n.clientWidth, window.innerWidth || 0),
                a = Math.max(n.clientHeight, window.innerHeight || 0),
                i = t ? 0 : f(n),
                s = t ? 0 : f(n, "left");
            return b({
                top: i - r.top + r.marginTop,
                left: s - r.left + r.marginLeft,
                width: o,
                height: a
            })
        }

        function E(e) {
            var t = e.nodeName;
            if ("BODY" === t || "HTML" === t)
                return !1;
            if ("fixed" === a(e, "position"))
                return !0;
            var n = i(e);
            return !!n && E(n)
        }

        function k(e) {
            if (!e || !e.parentElement || c())
                return document.documentElement;
            for (var t = e.parentElement; t && "none" === a(t, "transform");)
                t = t.parentElement;
            return t || document.documentElement
        }

        function S(e, t, n, r) {
            var o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                a = {
                    top: 0,
                    left: 0
                },
                c = o ? k(e) : h(e, l(t));
            if ("viewport" === r)
                a = x(c, o);
            else {
                var u = void 0;
                "scrollParent" === r ? (u = s(i(t)),
                    "BODY" === u.nodeName && (u = e.ownerDocument.documentElement)) : u = "window" === r ? e.ownerDocument.documentElement : r;
                var d = w(u, c, o);
                if ("HTML" !== u.nodeName || E(c))
                    a = d;
                else {
                    var p = v(e.ownerDocument),
                        f = p.height,
                        m = p.width;
                    a.top += d.top - d.marginTop,
                        a.bottom = f + d.top,
                        a.left += d.left - d.marginLeft,
                        a.right = m + d.left
                }
            }
            n = n || 0;
            var g = "number" === typeof n;
            return a.left += g ? n : n.left || 0,
                a.top += g ? n : n.top || 0,
                a.right -= g ? n : n.right || 0,
                a.bottom -= g ? n : n.bottom || 0,
                a
        }

        function O(e) {
            return e.width * e.height
        }

        function C(e, t, n, r, o) {
            var a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
            if (-1 === e.indexOf("auto"))
                return e;
            var i = S(n, r, a, o),
                s = {
                    top: {
                        width: i.width,
                        height: t.top - i.top
                    },
                    right: {
                        width: i.right - t.right,
                        height: i.height
                    },
                    bottom: {
                        width: i.width,
                        height: i.bottom - t.bottom
                    },
                    left: {
                        width: t.left - i.left,
                        height: i.height
                    }
                },
                l = Object.keys(s).map(function (e) {
                    return _e({
                        key: e
                    }, s[e], {
                        area: O(s[e])
                    })
                }).sort(function (e, t) {
                    return t.area - e.area
                }),
                c = l.filter(function (e) {
                    var t = e.width,
                        r = e.height;
                    return t >= n.clientWidth && r >= n.clientHeight
                }),
                u = c.length > 0 ? c[0].key : l[0].key,
                d = e.split("-")[1];
            return u + (d ? "-" + d : "")
        }

        function T(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
            return w(n, r ? k(t) : h(t, l(n)), r)
        }

        function M(e) {
            var t = e.ownerDocument.defaultView,
                n = t.getComputedStyle(e),
                r = parseFloat(n.marginTop || 0) + parseFloat(n.marginBottom || 0),
                o = parseFloat(n.marginLeft || 0) + parseFloat(n.marginRight || 0);
            return {
                width: e.offsetWidth + o,
                height: e.offsetHeight + r
            }
        }

        function A(e) {
            var t = {
                left: "right",
                right: "left",
                bottom: "top",
                top: "bottom"
            };
            return e.replace(/left|right|bottom|top/g, function (e) {
                return t[e]
            })
        }

        function P(e, t, n) {
            n = n.split("-")[0];
            var r = M(e),
                o = {
                    width: r.width,
                    height: r.height
                },
                a = -1 !== ["right", "left"].indexOf(n),
                i = a ? "top" : "left",
                s = a ? "left" : "top",
                l = a ? "height" : "width",
                c = a ? "width" : "height";
            return o[i] = t[i] + t[l] / 2 - r[l] / 2,
                o[s] = n === s ? t[s] - r[c] : t[A(s)],
                o
        }

        function N(e, t) {
            return Array.prototype.find ? e.find(t) : e.filter(t)[0]
        }

        function j(e, t, n) {
            if (Array.prototype.findIndex)
                return e.findIndex(function (e) {
                    return e[t] === n
                });
            var r = N(e, function (e) {
                return e[t] === n
            });
            return e.indexOf(r)
        }

        function D(e, t, n) {
            return (void 0 === n ? e : e.slice(0, j(e, "name", n))).forEach(function (e) {
                e.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
                var n = e.function || e.fn;
                e.enabled && o(n) && (t.offsets.popper = b(t.offsets.popper),
                    t.offsets.reference = b(t.offsets.reference),
                    t = n(t, e))
            }),
                t
        }

        function R() {
            if (!this.state.isDestroyed) {
                var e = {
                    instance: this,
                    styles: {},
                    arrowStyles: {},
                    attributes: {},
                    flipped: !1,
                    offsets: {}
                };
                e.offsets.reference = T(this.state, this.popper, this.reference, this.options.positionFixed),
                    e.placement = C(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding),
                    e.originalPlacement = e.placement,
                    e.positionFixed = this.options.positionFixed,
                    e.offsets.popper = P(this.popper, e.offsets.reference, e.placement),
                    e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute",
                    e = D(this.modifiers, e),
                    this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0,
                        this.options.onCreate(e))
            }
        }

        function I(e, t) {
            return e.some(function (e) {
                var n = e.name;
                return e.enabled && n === t
            })
        }

        function L(e) {
            for (var t = [!1, "ms", "Webkit", "Moz", "O"], n = e.charAt(0).toUpperCase() + e.slice(1), r = 0; r < t.length; r++) {
                var o = t[r],
                    a = o ? "" + o + n : e;
                if ("undefined" !== typeof document.body.style[a])
                    return a
            }
            return null
        }

        function B() {
            return this.state.isDestroyed = !0,
                I(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"),
                    this.popper.style.position = "",
                    this.popper.style.top = "",
                    this.popper.style.left = "",
                    this.popper.style.right = "",
                    this.popper.style.bottom = "",
                    this.popper.style.willChange = "",
                    this.popper.style[L("transform")] = ""),
                this.disableEventListeners(),
                this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper),
                this
        }

        function F(e) {
            var t = e.ownerDocument;
            return t ? t.defaultView : window
        }

        function q(e, t, n, r) {
            var o = "BODY" === e.nodeName,
                a = o ? e.ownerDocument.defaultView : e;
            a.addEventListener(t, n, {
                passive: !0
            }),
                o || q(s(a.parentNode), t, n, r),
                r.push(a)
        }

        function z(e, t, n, r) {
            n.updateBound = r,
                F(e).addEventListener("resize", n.updateBound, {
                    passive: !0
                });
            var o = s(e);
            return q(o, "scroll", n.updateBound, n.scrollParents),
                n.scrollElement = o,
                n.eventsEnabled = !0,
                n
        }

        function W() {
            this.state.eventsEnabled || (this.state = z(this.reference, this.options, this.state, this.scheduleUpdate))
        }

        function U(e, t) {
            return F(e).removeEventListener("resize", t.updateBound),
                t.scrollParents.forEach(function (e) {
                    e.removeEventListener("scroll", t.updateBound)
                }),
                t.updateBound = null,
                t.scrollParents = [],
                t.scrollElement = null,
                t.eventsEnabled = !1,
                t
        }

        function H() {
            this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate),
                this.state = U(this.reference, this.state))
        }

        function Y(e) {
            return "" !== e && !isNaN(parseFloat(e)) && isFinite(e)
        }

        function G(e, t) {
            Object.keys(t).forEach(function (n) {
                var r = ""; -
                    1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && Y(t[n]) && (r = "px"),
                    e.style[n] = t[n] + r
            })
        }

        function K(e, t) {
            Object.keys(t).forEach(function (n) {
                !1 !== t[n] ? e.setAttribute(n, t[n]) : e.removeAttribute(n)
            })
        }

        function V(e) {
            return G(e.instance.popper, e.styles),
                K(e.instance.popper, e.attributes),
                e.arrowElement && Object.keys(e.arrowStyles).length && G(e.arrowElement, e.arrowStyles),
                e
        }

        function X(e, t, n, r, o) {
            var a = T(o, t, e, n.positionFixed),
                i = C(n.placement, a, t, e, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
            return t.setAttribute("x-placement", i),
                G(t, {
                    position: n.positionFixed ? "fixed" : "absolute"
                }),
                n
        }

        function J(e, t) {
            var n = e.offsets,
                r = n.popper,
                o = n.reference,
                a = Math.round,
                i = Math.floor,
                s = function (e) {
                    return e
                },
                l = a(o.width),
                c = a(r.width),
                u = -1 !== ["left", "right"].indexOf(e.placement),
                d = -1 !== e.placement.indexOf("-"),
                p = l % 2 === c % 2,
                h = l % 2 === 1 && c % 2 === 1,
                f = t ? u || d || p ? a : i : s,
                m = t ? a : s;
            return {
                left: f(h && !d && t ? r.left - 1 : r.left),
                top: m(r.top),
                bottom: m(r.bottom),
                right: f(r.right)
            }
        }

        function Z(e, t) {
            var n = t.x,
                r = t.y,
                o = e.offsets.popper,
                a = N(e.instance.modifiers, function (e) {
                    return "applyStyle" === e.name
                }).gpuAcceleration;
            void 0 !== a && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
            var i = void 0 !== a ? a : t.gpuAcceleration,
                s = u(e.instance.popper),
                l = _(s),
                c = {
                    position: o.position
                },
                d = J(e, window.devicePixelRatio < 2 || !we),
                p = "bottom" === n ? "top" : "bottom",
                h = "right" === r ? "left" : "right",
                f = L("transform"),
                m = void 0,
                g = void 0;
            if (g = "bottom" === p ? "HTML" === s.nodeName ? -s.clientHeight + d.bottom : -l.height + d.bottom : d.top,
                m = "right" === h ? "HTML" === s.nodeName ? -s.clientWidth + d.right : -l.width + d.right : d.left,
                i && f)
                c[f] = "translate3d(" + m + "px, " + g + "px, 0)",
                    c[p] = 0,
                    c[h] = 0,
                    c.willChange = "transform";
            else {
                var y = "bottom" === p ? -1 : 1,
                    v = "right" === h ? -1 : 1;
                c[p] = g * y,
                    c[h] = m * v,
                    c.willChange = p + ", " + h
            }
            var b = {
                "x-placement": e.placement
            };
            return e.attributes = _e({}, b, e.attributes),
                e.styles = _e({}, c, e.styles),
                e.arrowStyles = _e({}, e.offsets.arrow, e.arrowStyles),
                e
        }

        function Q(e, t, n) {
            var r = N(e, function (e) {
                return e.name === t
            }),
                o = !!r && e.some(function (e) {
                    return e.name === n && e.enabled && e.order < r.order
                });
            if (!o) {
                var a = "`" + t + "`",
                    i = "`" + n + "`";
                console.warn(i + " modifier is required by " + a + " modifier in order to work, be sure to include it before " + a + "!")
            }
            return o
        }

        function $(e, t) {
            var n;
            if (!Q(e.instance.modifiers, "arrow", "keepTogether"))
                return e;
            var r = t.element;
            if ("string" === typeof r) {
                if (!(r = e.instance.popper.querySelector(r)))
                    return e
            } else if (!e.instance.popper.contains(r))
                return console.warn("WARNING: `arrow.element` must be child of its popper element!"),
                    e;
            var o = e.placement.split("-")[0],
                i = e.offsets,
                s = i.popper,
                l = i.reference,
                c = -1 !== ["left", "right"].indexOf(o),
                u = c ? "height" : "width",
                d = c ? "Top" : "Left",
                p = d.toLowerCase(),
                h = c ? "left" : "top",
                f = c ? "bottom" : "right",
                m = M(r)[u];
            l[f] - m < s[p] && (e.offsets.popper[p] -= s[p] - (l[f] - m)),
                l[p] + m > s[f] && (e.offsets.popper[p] += l[p] + m - s[f]),
                e.offsets.popper = b(e.offsets.popper);
            var g = l[p] + l[u] / 2 - m / 2,
                y = a(e.instance.popper),
                v = parseFloat(y["margin" + d]),
                _ = parseFloat(y["border" + d + "Width"]),
                w = g - e.offsets.popper[p] - v - _;
            return w = Math.max(Math.min(s[u] - m, w), 0),
                e.arrowElement = r,
                e.offsets.arrow = (n = {},
                    be(n, p, Math.round(w)),
                    be(n, h, ""),
                    n),
                e
        }

        function ee(e) {
            return "end" === e ? "start" : "start" === e ? "end" : e
        }

        function te(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                n = Ee.indexOf(e),
                r = Ee.slice(n + 1).concat(Ee.slice(0, n));
            return t ? r.reverse() : r
        }

        function ne(e, t) {
            if (I(e.instance.modifiers, "inner"))
                return e;
            if (e.flipped && e.placement === e.originalPlacement)
                return e;
            var n = S(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed),
                r = e.placement.split("-")[0],
                o = A(r),
                a = e.placement.split("-")[1] || "",
                i = [];
            switch (t.behavior) {
                case ke.FLIP:
                    i = [r, o];
                    break;
                case ke.CLOCKWISE:
                    i = te(r);
                    break;
                case ke.COUNTERCLOCKWISE:
                    i = te(r, !0);
                    break;
                default:
                    i = t.behavior
            }
            return i.forEach(function (s, l) {
                if (r !== s || i.length === l + 1)
                    return e;
                r = e.placement.split("-")[0],
                    o = A(r);
                var c = e.offsets.popper,
                    u = e.offsets.reference,
                    d = Math.floor,
                    p = "left" === r && d(c.right) > d(u.left) || "right" === r && d(c.left) < d(u.right) || "top" === r && d(c.bottom) > d(u.top) || "bottom" === r && d(c.top) < d(u.bottom),
                    h = d(c.left) < d(n.left),
                    f = d(c.right) > d(n.right),
                    m = d(c.top) < d(n.top),
                    g = d(c.bottom) > d(n.bottom),
                    y = "left" === r && h || "right" === r && f || "top" === r && m || "bottom" === r && g,
                    v = -1 !== ["top", "bottom"].indexOf(r),
                    b = !!t.flipVariations && (v && "start" === a && h || v && "end" === a && f || !v && "start" === a && m || !v && "end" === a && g),
                    _ = !!t.flipVariationsByContent && (v && "start" === a && f || v && "end" === a && h || !v && "start" === a && g || !v && "end" === a && m),
                    w = b || _;
                (p || y || w) && (e.flipped = !0,
                    (p || y) && (r = i[l + 1]),
                    w && (a = ee(a)),
                    e.placement = r + (a ? "-" + a : ""),
                    e.offsets.popper = _e({}, e.offsets.popper, P(e.instance.popper, e.offsets.reference, e.placement)),
                    e = D(e.instance.modifiers, e, "flip"))
            }),
                e
        }

        function re(e) {
            var t = e.offsets,
                n = t.popper,
                r = t.reference,
                o = e.placement.split("-")[0],
                a = Math.floor,
                i = -1 !== ["top", "bottom"].indexOf(o),
                s = i ? "right" : "bottom",
                l = i ? "left" : "top",
                c = i ? "width" : "height";
            return n[s] < a(r[l]) && (e.offsets.popper[l] = a(r[l]) - n[c]),
                n[l] > a(r[s]) && (e.offsets.popper[l] = a(r[s])),
                e
        }

        function oe(e, t, n, r) {
            var o = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                a = +o[1],
                i = o[2];
            if (!a)
                return e;
            if (0 === i.indexOf("%")) {
                var s = void 0;
                switch (i) {
                    case "%p":
                        s = n;
                        break;
                    case "%":
                    case "%r":
                    default:
                        s = r
                }
                return b(s)[t] / 100 * a
            }
            if ("vh" === i || "vw" === i) {
                return ("vh" === i ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * a
            }
            return a
        }

        function ae(e, t, n, r) {
            var o = [0, 0],
                a = -1 !== ["right", "left"].indexOf(r),
                i = e.split(/(\+|\-)/).map(function (e) {
                    return e.trim()
                }),
                s = i.indexOf(N(i, function (e) {
                    return -1 !== e.search(/,|\s/)
                }));
            i[s] && -1 === i[s].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
            var l = /\s*,\s*|\s+/,
                c = -1 !== s ? [i.slice(0, s).concat([i[s].split(l)[0]]), [i[s].split(l)[1]].concat(i.slice(s + 1))] : [i];
            return c = c.map(function (e, r) {
                var o = (1 === r ? !a : a) ? "height" : "width",
                    i = !1;
                return e.reduce(function (e, t) {
                    return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t) ? (e[e.length - 1] = t,
                        i = !0,
                        e) : i ? (e[e.length - 1] += t,
                            i = !1,
                            e) : e.concat(t)
                }, []).map(function (e) {
                    return oe(e, o, t, n)
                })
            }),
                c.forEach(function (e, t) {
                    e.forEach(function (n, r) {
                        Y(n) && (o[t] += n * ("-" === e[r - 1] ? -1 : 1))
                    })
                }),
                o
        }

        function ie(e, t) {
            var n = t.offset,
                r = e.placement,
                o = e.offsets,
                a = o.popper,
                i = o.reference,
                s = r.split("-")[0],
                l = void 0;
            return l = Y(+n) ? [+n, 0] : ae(n, a, i, s),
                "left" === s ? (a.top += l[0],
                    a.left -= l[1]) : "right" === s ? (a.top += l[0],
                        a.left += l[1]) : "top" === s ? (a.left += l[0],
                            a.top -= l[1]) : "bottom" === s && (a.left += l[0],
                                a.top += l[1]),
                e.popper = a,
                e
        }

        function se(e, t) {
            var n = t.boundariesElement || u(e.instance.popper);
            e.instance.reference === n && (n = u(n));
            var r = L("transform"),
                o = e.instance.popper.style,
                a = o.top,
                i = o.left,
                s = o[r];
            o.top = "",
                o.left = "",
                o[r] = "";
            var l = S(e.instance.popper, e.instance.reference, t.padding, n, e.positionFixed);
            o.top = a,
                o.left = i,
                o[r] = s,
                t.boundaries = l;
            var c = t.priority,
                d = e.offsets.popper,
                p = {
                    primary: function (e) {
                        var n = d[e];
                        return d[e] < l[e] && !t.escapeWithReference && (n = Math.max(d[e], l[e])),
                            be({}, e, n)
                    },
                    secondary: function (e) {
                        var n = "right" === e ? "left" : "top",
                            r = d[n];
                        return d[e] > l[e] && !t.escapeWithReference && (r = Math.min(d[n], l[e] - ("right" === e ? d.width : d.height))),
                            be({}, n, r)
                    }
                };
            return c.forEach(function (e) {
                var t = -1 !== ["left", "top"].indexOf(e) ? "primary" : "secondary";
                d = _e({}, d, p[t](e))
            }),
                e.offsets.popper = d,
                e
        }

        function le(e) {
            var t = e.placement,
                n = t.split("-")[0],
                r = t.split("-")[1];
            if (r) {
                var o = e.offsets,
                    a = o.reference,
                    i = o.popper,
                    s = -1 !== ["bottom", "top"].indexOf(n),
                    l = s ? "left" : "top",
                    c = s ? "width" : "height",
                    u = {
                        start: be({}, l, a[l]),
                        end: be({}, l, a[l] + a[c] - i[c])
                    };
                e.offsets.popper = _e({}, i, u[r])
            }
            return e
        }

        function ce(e) {
            if (!Q(e.instance.modifiers, "hide", "preventOverflow"))
                return e;
            var t = e.offsets.reference,
                n = N(e.instance.modifiers, function (e) {
                    return "preventOverflow" === e.name
                }).boundaries;
            if (t.bottom < n.top || t.left > n.right || t.top > n.bottom || t.right < n.left) {
                if (!0 === e.hide)
                    return e;
                e.hide = !0,
                    e.attributes["x-out-of-boundaries"] = ""
            } else {
                if (!1 === e.hide)
                    return e;
                e.hide = !1,
                    e.attributes["x-out-of-boundaries"] = !1
            }
            return e
        }

        function ue(e) {
            var t = e.placement,
                n = t.split("-")[0],
                r = e.offsets,
                o = r.popper,
                a = r.reference,
                i = -1 !== ["left", "right"].indexOf(n),
                s = -1 === ["top", "left"].indexOf(n);
            return o[i ? "left" : "top"] = a[n] - (s ? o[i ? "width" : "height"] : 0),
                e.placement = A(t),
                e.offsets.popper = b(o),
                e
        }
        var de = "undefined" !== typeof window && "undefined" !== typeof document && "undefined" !== typeof navigator,
            pe = function () {
                for (var e = ["Edge", "Trident", "Firefox"], t = 0; t < e.length; t += 1)
                    if (de && navigator.userAgent.indexOf(e[t]) >= 0)
                        return 1;
                return 0
            }(),
            he = de && window.Promise,
            fe = he ? n : r,
            me = de && !(!window.MSInputMethodContext || !document.documentMode),
            ge = de && /MSIE 10/.test(navigator.userAgent),
            ye = function (e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            },
            ve = function () {
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
            be = function (e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n,
                    e
            },
            _e = Object.assign || function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n)
                        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            },
            we = de && /Firefox/i.test(navigator.userAgent),
            xe = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
            Ee = xe.slice(3),
            ke = {
                FLIP: "flip",
                CLOCKWISE: "clockwise",
                COUNTERCLOCKWISE: "counterclockwise"
            },
            Se = {
                shift: {
                    order: 100,
                    enabled: !0,
                    fn: le
                },
                offset: {
                    order: 200,
                    enabled: !0,
                    fn: ie,
                    offset: 0
                },
                preventOverflow: {
                    order: 300,
                    enabled: !0,
                    fn: se,
                    priority: ["left", "right", "top", "bottom"],
                    padding: 5,
                    boundariesElement: "scrollParent"
                },
                keepTogether: {
                    order: 400,
                    enabled: !0,
                    fn: re
                },
                arrow: {
                    order: 500,
                    enabled: !0,
                    fn: $,
                    element: "[x-arrow]"
                },
                flip: {
                    order: 600,
                    enabled: !0,
                    fn: ne,
                    behavior: "flip",
                    padding: 5,
                    boundariesElement: "viewport",
                    flipVariations: !1,
                    flipVariationsByContent: !1
                },
                inner: {
                    order: 700,
                    enabled: !1,
                    fn: ue
                },
                hide: {
                    order: 800,
                    enabled: !0,
                    fn: ce
                },
                computeStyle: {
                    order: 850,
                    enabled: !0,
                    fn: Z,
                    gpuAcceleration: !0,
                    x: "bottom",
                    y: "right"
                },
                applyStyle: {
                    order: 900,
                    enabled: !0,
                    fn: V,
                    onLoad: X,
                    gpuAcceleration: void 0
                }
            },
            Oe = {
                placement: "bottom",
                positionFixed: !1,
                eventsEnabled: !0,
                removeOnDestroy: !1,
                onCreate: function () { },
                onUpdate: function () { },
                modifiers: Se
            },
            Ce = function () {
                function e(t, n) {
                    var r = this,
                        a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    ye(this, e),
                        this.scheduleUpdate = function () {
                            return requestAnimationFrame(r.update)
                        },
                        this.update = fe(this.update.bind(this)),
                        this.options = _e({}, e.Defaults, a),
                        this.state = {
                            isDestroyed: !1,
                            isCreated: !1,
                            scrollParents: []
                        },
                        this.reference = t && t.jquery ? t[0] : t,
                        this.popper = n && n.jquery ? n[0] : n,
                        this.options.modifiers = {},
                        Object.keys(_e({}, e.Defaults.modifiers, a.modifiers)).forEach(function (t) {
                            r.options.modifiers[t] = _e({}, e.Defaults.modifiers[t] || {}, a.modifiers ? a.modifiers[t] : {})
                        }),
                        this.modifiers = Object.keys(this.options.modifiers).map(function (e) {
                            return _e({
                                name: e
                            }, r.options.modifiers[e])
                        }).sort(function (e, t) {
                            return e.order - t.order
                        }),
                        this.modifiers.forEach(function (e) {
                            e.enabled && o(e.onLoad) && e.onLoad(r.reference, r.popper, r.options, e, r.state)
                        }),
                        this.update();
                    var i = this.options.eventsEnabled;
                    i && this.enableEventListeners(),
                        this.state.eventsEnabled = i
                }
                return ve(e, [{
                    key: "update",
                    value: function () {
                        return R.call(this)
                    }
                }, {
                    key: "destroy",
                    value: function () {
                        return B.call(this)
                    }
                }, {
                    key: "enableEventListeners",
                    value: function () {
                        return W.call(this)
                    }
                }, {
                    key: "disableEventListeners",
                    value: function () {
                        return H.call(this)
                    }
                }]),
                    e
            }();
        Ce.Utils = ("undefined" !== typeof window ? window : e).PopperUtils,
            Ce.placements = xe,
            Ce.Defaults = Oe,
            t.a = Ce
    }).call(t, n(25))
}