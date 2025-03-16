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
    n.d(t, "a", function () {
        return h
    });
    var i = n(0),
        s = n.n(i),
        l = n(53),
        c = n.n(l),
        u = function () {
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
        d = document.getElementById("root-modal");
    if (!d) {
        var p = document.createElement("div");
        p.id,
            document.body.appendChild(p)
    }
    var h = function (e) {
        function t() {
            return r(this, t),
                o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return a(t, e),
            u(t, [{
                key: "render",
                value: function () {
                    var e = this.props.children;
                    return console.log("this.props", this.props),
                        s.a.createElement("div", null, c.a.createPortal(e, d))
                }
            }]),
            t
    }(s.a.PureComponent)
}