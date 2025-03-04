 function (e, t, n) {
    "use strict";

    function r(e, t) {
        return null != t && "undefined" !== typeof Symbol && t[Symbol.hasInstance] ? t[Symbol.hasInstance](e) : e instanceof t
    }

    function o(e) {
        return (o = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
            return typeof e
        } :
            function (e) {
                return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
        )(e)
    }

    function a() {
        return a = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
            a.apply(this, arguments)
    }

    function i(e, t) {
        if (null == e)
            return {};
        var n, r, o = {},
            a = Object.keys(e);
        for (r = 0; r < a.length; r++)
            n = a[r],
                t.indexOf(n) >= 0 || (o[n] = e[n]);
        if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            for (r = 0; r < i.length; r++)
                n = i[r],
                    t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
        }
        return o
    }

    function s(e, t) {
        e.prototype = Object.create(t.prototype),
            e.prototype.constructor = e,
            e.__proto__ = t
    }

    function l(e) {
        if (void 0 === e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var c = n(0),
        u = n.n(c),
        d = n(667),
        p = n(669),
        h = n(670),
        f = n(671),
        m = function (e) {
            function t(t) {
                var n;
                n = e.call(this, t) || this,
                    g.call(l(n));
                var r = t.mask,
                    o = t.maskChar,
                    a = t.formatChars,
                    i = t.defaultValue,
                    s = t.value,
                    c = t.alwaysShowMask;
                return n.hasValue = null != s,
                    n.maskOptions = Object(d.a)(r, o, a),
                    null == i && (i = ""),
                    null == s && (s = i),
                    s = n.getStringValue(s),
                    n.maskOptions.mask && (c || s) && (s = Object(h.b)(n.maskOptions, s)),
                    n.value = s,
                    n
            }
            s(t, e);
            var n = t.prototype;
            return n.componentDidMount = function () {
                this.isAndroidBrowser = Object(p.a)(),
                    this.isWindowsPhoneBrowser = Object(p.c)(),
                    this.isAndroidFirefox = Object(p.b)(),
                    this.maskOptions.mask && this.getInputValue() !== this.value && this.setInputValue(this.value)
            },
                n.componentWillReceiveProps = function (e) {
                    var t = this.maskOptions;
                    if (this.hasValue = null != e.value,
                        this.maskOptions = Object(d.a)(e.mask, e.maskChar, e.formatChars), !this.maskOptions.mask)
                        return this.backspaceOrDeleteRemoval = null,
                            void (this.lastCursorPos = null);
                    var n = this.maskOptions.mask && this.maskOptions.mask !== t.mask,
                        r = e.alwaysShowMask || this.isFocused(),
                        o = this.hasValue ? this.getStringValue(e.value) : this.value;
                    if (t.mask || this.hasValue || (o = this.getInputValue()),
                        (n || this.maskOptions.mask && (o || r)) && (o = Object(h.b)(this.maskOptions, o),
                            n)) {
                        var a = this.lastCursorPos,
                            i = Object(h.c)(this.maskOptions, o);
                        (null === a || i < a) && (a = Object(h.g)(this.maskOptions, o) ? i : this.getRightEditablePos(i),
                            this.setCursorPos(a))
                    } !this.maskOptions.mask || !Object(h.f)(this.maskOptions, o) || r || this.hasValue && e.value || (o = ""),
                        this.value = o
                },
                n.componentDidUpdate = function () {
                    this.maskOptions.mask && this.getInputValue() !== this.value && this.setInputValue(this.value)
                },
                n.render = function () {
                    var e = this,
                        t = this.props,
                        n = (t.mask,
                            t.alwaysShowMask,
                            t.maskChar,
                            t.formatChars,
                            t.inputRef,
                            i(t, ["mask", "alwaysShowMask", "maskChar", "formatChars", "inputRef"]));
                    if (this.maskOptions.mask) {
                        if (!n.disabled && !n.readOnly) {
                            ["onChange", "onKeyDown", "onPaste", "onMouseDown"].forEach(function (t) {
                                n[t] = e[t]
                            })
                        }
                        null != n.value && (n.value = this.value)
                    }
                    return u.a.createElement("input", a({
                        ref: this.handleRef
                    }, n, {
                        onFocus: this.onFocus,
                        onBlur: this.onBlur
                    }))
                },
                t
        }(u.a.Component),
        g = function () {
            var e = this;
            Object.defineProperty(this, "lastCursorPos", {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                value: null
            }),
                Object.defineProperty(this, "focused", {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    value: !1
                }),
                Object.defineProperty(this, "isDOMElement", {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    value: function (e) {
                        return "object" === ("undefined" === typeof HTMLElement ? "undefined" : o(HTMLElement)) ? r(e, HTMLElement) : 1 === e.nodeType && "string" === typeof e.nodeName
                    }
                }),
                Object.defineProperty(this, "getInputDOMNode", {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    value: function () {
                        var t = e.input;
                        return t ? e.isDOMElement(t) ? t : u.a.findDOMNode(t) : null
                    }
                }),
                Object.defineProperty(this, "getInputValue", {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    value: function () {
                        var t = e.getInputDOMNode();
                        return t ? t.value : null
                    }
                }),
                Object.defineProperty(this, "setInputValue", {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    value: function (t) {
                        var n = e.getInputDOMNode();
                        n && (e.value = t,
                            n.value = t)
                    }
                }),
                Object.defineProperty(this, "getLeftEditablePos", {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    value: function (t) {
                        for (var n = t; n >= 0; --n)
                            if (!Object(h.h)(e.maskOptions, n))
                                return n;
                        return null
                    }
                }),
                Object.defineProperty(this, "getRightEditablePos", {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    value: function (t) {
                        for (var n = e.maskOptions.mask, r = t; r < n.length; ++r)
                            if (!Object(h.h)(e.maskOptions, r))
                                return r;
                        return null
                    }
                }),
                Object.defineProperty(this, "setCursorToEnd", {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    value: function () {
                        var t = Object(h.c)(e.maskOptions, e.value),
                            n = e.getRightEditablePos(t);
                        null !== n && e.setCursorPos(n)
                    }
                }),
                Object.defineProperty(this, "setSelection", {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    value: function (t, n) {
                        void 0 === n && (n = 0);
                        var r = e.getInputDOMNode();
                        if (r) {
                            var o = t + n;
                            if ("selectionStart" in r && "selectionEnd" in r)
                                r.selectionStart = t,
                                    r.selectionEnd = o;
                            else {
                                var a = r.createTextRange();
                                a.collapse(!0),
                                    a.moveStart("character", t),
                                    a.moveEnd("character", o - t),
                                    a.select()
                            }
                        }
                    }
                }),
                Object.defineProperty(this, "getSelection", {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    value: function () {
                        var t = e.getInputDOMNode(),
                            n = 0,
                            r = 0;
                        if ("selectionStart" in t && "selectionEnd" in t)
                            n = t.selectionStart,
                                r = t.selectionEnd;
                        else {
                            var o = document.selection.createRange();
                            o.parentElement() === t && (n = -o.moveStart("character", -t.value.length),
                                r = -o.moveEnd("character", -t.value.length))
                        }
                        return {
                            start: n,
                            end: r,
                            length: r - n
                        }
                    }
                }),
                Object.defineProperty(this, "getCursorPos", {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    value: function () {
                        return e.getSelection().start
                    }
                }),
                Object.defineProperty(this, "setCursorPos", {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    value: function (t) {
                        e.setSelection(t, 0),
                            Object(f.a)(function () {
                                e.setSelection(t, 0)
                            }),
                            e.lastCursorPos = t
                    }
                }),
                Object.defineProperty(this, "isFocused", {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    value: function () {
                        return e.focused
                    }
                }),
                Object.defineProperty(this, "getStringValue", {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    value: function (e) {
                        return e || 0 === e ? e + "" : ""
                    }
                }),
                Object.defineProperty(this, "onKeyDown", {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    value: function (t) {
                        e.backspaceOrDeleteRemoval = null,
                            "function" === typeof e.props.onKeyDown && e.props.onKeyDown(t);
                        var n = t.key,
                            r = t.ctrlKey,
                            o = t.metaKey,
                            a = t.defaultPrevented;
                        if (!(r || o || a) && ("Backspace" === n || "Delete" === n)) {
                            var i = e.getSelection();
                            if (!("Backspace" === n && i.end > 0 || "Delete" === n && e.value.length > i.start))
                                return;
                            e.backspaceOrDeleteRemoval = {
                                key: n,
                                selection: e.getSelection()
                            }
                        }
                    }
                }),
                Object.defineProperty(this, "onChange", {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    value: function (t) {
                        var n = e.beforePasteState,
                            r = e.maskOptions,
                            o = r.mask,
                            a = r.maskChar,
                            i = r.lastEditablePos,
                            s = r.prefix,
                            l = e.getInputValue();
                        if (n)
                            return e.beforePasteState = null,
                                void e.pasteText(n.value, l, n.selection, t);
                        var c = e.value,
                            u = e.getInputDOMNode();
                        try {
                            "function" === typeof u.matches && u.matches(":-webkit-autofill") && (c = "")
                        } catch (e) { }
                        var d, p, m = e.getSelection(),
                            g = m.end,
                            y = o.length,
                            v = l.length,
                            b = c.length;
                        if (e.backspaceOrDeleteRemoval) {
                            var _ = "Delete" === e.backspaceOrDeleteRemoval.key;
                            if (l = e.value,
                                m = e.backspaceOrDeleteRemoval.selection,
                                g = m.start,
                                e.backspaceOrDeleteRemoval = null,
                                m.length)
                                l = Object(h.a)(e.maskOptions, l, m.start, m.length);
                            else if (m.start < s.length || !_ && m.start === s.length)
                                g = s.length;
                            else {
                                var w = _ ? e.getRightEditablePos(g) : e.getLeftEditablePos(g - 1);
                                null !== w && (a || (l = l.substr(0, Object(h.c)(e.maskOptions, l))),
                                    l = Object(h.a)(e.maskOptions, l, w, 1),
                                    g = w)
                            }
                        } else if (v > b) {
                            var x = v - b,
                                E = m.end - x;
                            p = l.substr(E, x),
                                g = E < i && (1 !== x || p !== o[E]) ? e.getRightEditablePos(E) : E,
                                l = l.substr(0, E) + l.substr(E + x),
                                d = Object(h.a)(e.maskOptions, l, E, y - E),
                                d = Object(h.e)(e.maskOptions, d, p, g),
                                l = Object(h.e)(e.maskOptions, c, p, g),
                                1 !== x || g >= s.length && g < i ? (g = Math.max(Object(h.c)(e.maskOptions, d), g)) < i && (g = e.getRightEditablePos(g)) : g < i && g++
                        } else if (v < b) {
                            var k = y - v;
                            p = l.substr(0, m.end);
                            var S = p === c.substr(0, m.end);
                            d = Object(h.a)(e.maskOptions, c, m.end, k),
                                a && (l = Object(h.e)(e.maskOptions, d, p, 0)),
                                d = Object(h.a)(e.maskOptions, d, m.end, y - m.end),
                                d = Object(h.e)(e.maskOptions, d, p, 0),
                                S ? g < s.length && (g = s.length) : (g = Math.max(Object(h.c)(e.maskOptions, d), g)) < i && (g = e.getRightEditablePos(g))
                        }
                        l = Object(h.b)(e.maskOptions, l),
                            e.setInputValue(l),
                            "function" === typeof e.props.onChange && e.props.onChange(t),
                            e.isWindowsPhoneBrowser ? Object(f.a)(function () {
                                e.setSelection(g, 0)
                            }) : e.setCursorPos(g)
                    }
                }),
                Object.defineProperty(this, "onFocus", {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    value: function (t) {
                        if (e.focused = !0,
                            e.maskOptions.mask)
                            if (e.value)
                                Object(h.c)(e.maskOptions, e.value) < e.maskOptions.mask.length && e.setCursorToEnd();
                            else {
                                var n = e.maskOptions.prefix,
                                    r = Object(h.b)(e.maskOptions, n),
                                    o = Object(h.b)(e.maskOptions, r),
                                    a = o !== t.target.value;
                                a && (t.target.value = o),
                                    e.value = o,
                                    a && "function" === typeof e.props.onChange && e.props.onChange(t),
                                    e.setCursorToEnd()
                            }
                        "function" === typeof e.props.onFocus && e.props.onFocus(t)
                    }
                }),
                Object.defineProperty(this, "onBlur", {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    value: function (t) {
                        if (e.focused = !1,
                            e.maskOptions.mask && !e.props.alwaysShowMask && Object(h.f)(e.maskOptions, e.value)) {
                            var n = "" !== e.getInputValue();
                            n && e.setInputValue(""),
                                n && "function" === typeof e.props.onChange && e.props.onChange(t)
                        }
                        "function" === typeof e.props.onBlur && e.props.onBlur(t)
                    }
                }),
                Object.defineProperty(this, "onMouseDown", {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    value: function (t) {
                        if (!e.focused && document.addEventListener) {
                            e.mouseDownX = t.clientX,
                                e.mouseDownY = t.clientY,
                                e.mouseDownTime = (new Date).getTime();
                            var n = function t(n) {
                                if (document.removeEventListener("mouseup", t),
                                    e.focused) {
                                    var r = Math.abs(n.clientX - e.mouseDownX),
                                        o = Math.abs(n.clientY - e.mouseDownY),
                                        a = Math.max(r, o),
                                        i = (new Date).getTime() - e.mouseDownTime;
                                    (a <= 10 && i <= 200 || a <= 5 && i <= 300) && e.setCursorToEnd()
                                }
                            };
                            document.addEventListener("mouseup", n)
                        }
                        "function" === typeof e.props.onMouseDown && e.props.onMouseDown(t)
                    }
                }),
                Object.defineProperty(this, "onPaste", {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    value: function (t) {
                        "function" === typeof e.props.onPaste && e.props.onPaste(t),
                            t.defaultPrevented || (e.beforePasteState = {
                                value: e.getInputValue(),
                                selection: e.getSelection()
                            },
                                e.setInputValue(""))
                    }
                }),
                Object.defineProperty(this, "pasteText", {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    value: function (t, n, r, o) {
                        var a = r.start;
                        r.length && (t = Object(h.a)(e.maskOptions, t, a, r.length));
                        var i = Object(h.d)(e.maskOptions, t, n, a);
                        t = Object(h.e)(e.maskOptions, t, n, a),
                            a += i,
                            a = e.getRightEditablePos(a) || a,
                            e.setInputValue(t),
                            o && "function" === typeof e.props.onChange && e.props.onChange(o),
                            e.setCursorPos(a)
                    }
                }),
                Object.defineProperty(this, "handleRef", {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    value: function (t) {
                        e.input = t,
                            "function" === typeof e.props.inputRef && e.props.inputRef(t)
                    }
                })
        };
    t.a = m
}