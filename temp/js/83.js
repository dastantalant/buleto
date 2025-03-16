 function (e, t, n) {
    "use strict";

    function r(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" !== typeof t && "function" !== typeof t ? e : t
    }

    function a(e, t) {
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
    var i = function () {
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
        s = n(0),
        l = n(53),
        c = function (e) {
            function t() {
                return r(this, t),
                    o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this))
            }
            return a(t, e),
                i(t, [{
                    key: "componentDidMount",
                    value: function () {
                        var e = this,
                            t = !0,
                            n = !0,
                            r = l.findDOMNode(this);
                        e.__documentTouchStarted = function (t) {
                            r.removeEventListener("click", e.__elementClicked),
                                document.removeEventListener("click", e.__documentClicked)
                        },
                            e.__documentTouchMoved = function (e) {
                                n = !1
                            },
                            e.__documentTouchEnded = function (t) {
                                n && e.__documentClicked(t),
                                    n = !0
                            },
                            e.__documentClicked = function (t) {
                                if (-1 === (t.__clickedElements || []).indexOf(r)) {
                                    var n = e.onClickOut || e.props.onClickOut;
                                    if (!n)
                                        return console.warn("onClickOut is not defined.");
                                    n.call(e, t)
                                }
                            },
                            e.__elementTouchMoved = function (e) {
                                t = !1
                            },
                            e.__elementTouchEnded = function (n) {
                                t && e.__elementClicked(n),
                                    t = !0
                            },
                            e.__elementClicked = function (e) {
                                e.__clickedElements = e.__clickedElements || [],
                                    e.__clickedElements.push(r)
                            },
                            setTimeout(function () {
                                e.__unmounted || e.toggleListeners("addEventListener")
                            }, 0)
                    }
                }, {
                    key: "toggleListeners",
                    value: function (e) {
                        var t = l.findDOMNode(this);
                        t[e]("touchmove", this.__elementTouchMoved),
                            t[e]("touchend", this.__elementTouchEnded),
                            t[e]("click", this.__elementClicked),
                            document[e]("touchstart", this.__documentTouchStarted),
                            document[e]("touchmove", this.__documentTouchMoved),
                            document[e]("touchend", this.__documentTouchEnded),
                            document[e]("click", this.__documentClicked)
                    }
                }, {
                    key: "componentWillUnmount",
                    value: function () {
                        this.toggleListeners("removeEventListener"),
                            this.__unmounted = !0
                    }
                }, {
                    key: "render",
                    value: function () {
                        return Array.isArray(this.props.children) ? s.createElement("div", null, this.props.children) : s.Children.only(this.props.children)
                    }
                }]),
                t
        }(s.Component);
    e.exports = c
}