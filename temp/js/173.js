 function (e, t, n) {
    "use strict";

    function r() { }

    function o(e) {
        try {
            return e.then
        } catch (e) {
            return y = e,
                v
        }
    }

    function a(e, t) {
        try {
            return e(t)
        } catch (e) {
            return y = e,
                v
        }
    }

    function i(e, t, n) {
        try {
            e(t, n)
        } catch (e) {
            return y = e,
                v
        }
    }

    function s(e) {
        if ("object" !== typeof this)
            throw new TypeError("Promises must be constructed via new");
        if ("function" !== typeof e)
            throw new TypeError("Promise constructor's argument is not a function");
        this._75 = 0,
            this._83 = 0,
            this._18 = null,
            this._38 = null,
            e !== r && m(e, this)
    }

    function l(e, t, n) {
        return new e.constructor(function (o, a) {
            var i = new s(r);
            i.then(o, a),
                c(e, new f(t, n, i))
        })
    }

    function c(e, t) {
        for (; 3 === e._83;)
            e = e._18;
        if (s._47 && s._47(e),
            0 === e._83)
            return 0 === e._75 ? (e._75 = 1,
                void (e._38 = t)) : 1 === e._75 ? (e._75 = 2,
                    void (e._38 = [e._38, t])) : void e._38.push(t);
        u(e, t)
    }

    function u(e, t) {
        g(function () {
            var n = 1 === e._83 ? t.onFulfilled : t.onRejected;
            if (null === n)
                return void (1 === e._83 ? d(t.promise, e._18) : p(t.promise, e._18));
            var r = a(n, e._18);
            r === v ? p(t.promise, y) : d(t.promise, r)
        })
    }

    function d(e, t) {
        if (t === e)
            return p(e, new TypeError("A promise cannot be resolved with itself."));
        if (t && ("object" === typeof t || "function" === typeof t)) {
            var n = o(t);
            if (n === v)
                return p(e, y);
            if (n === e.then && t instanceof s)
                return e._83 = 3,
                    e._18 = t,
                    void h(e);
            if ("function" === typeof n)
                return void m(n.bind(t), e)
        }
        e._83 = 1,
            e._18 = t,
            h(e)
    }

    function p(e, t) {
        e._83 = 2,
            e._18 = t,
            s._71 && s._71(e, t),
            h(e)
    }

    function h(e) {
        if (1 === e._75 && (c(e, e._38),
            e._38 = null),
            2 === e._75) {
            for (var t = 0; t < e._38.length; t++)
                c(e, e._38[t]);
            e._38 = null
        }
    }

    function f(e, t, n) {
        this.onFulfilled = "function" === typeof e ? e : null,
            this.onRejected = "function" === typeof t ? t : null,
            this.promise = n
    }

    function m(e, t) {
        var n = !1,
            r = i(e, function (e) {
                n || (n = !0,
                    d(t, e))
            }, function (e) {
                n || (n = !0,
                    p(t, e))
            });
        n || r !== v || (n = !0,
            p(t, y))
    }
    var g = n(297),
        y = null,
        v = {};
    e.exports = s,
        s._47 = null,
        s._71 = null,
        s._44 = r,
        s.prototype.then = function (e, t) {
            if (this.constructor !== s)
                return l(this, e, t);
            var n = new s(r);
            return c(this, new f(e, t, n)),
                n
        }
}