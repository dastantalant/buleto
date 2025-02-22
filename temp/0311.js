function(e, t, n) {
    "use strict";

    function r() {
        var e = [],
            t = [];
        return {
            clear: function() {
                t = o,
                    e = o
            },
            notify: function() {
                for (var n = e = t, r = 0; r < n.length; r++)
                    n[r]()
            },
            get: function() {
                return t
            },
            subscribe: function(n) {
                var r = !0;
                return t === e && (t = e.slice()),
                    t.push(n),
                    function() {
                        r && e !== o && (r = !1,
                            t === e && (t = e.slice()),
                            t.splice(t.indexOf(n), 1))
                    }
            }
        }
    }
    n.d(t, "a", function() {
        return i
    });
    var o = null,
        a = {
            notify: function() {}
        },
        i = function() {
            function e(e, t, n) {
                this.store = e,
                    this.parentSub = t,
                    this.onStateChange = n,
                    this.unsubscribe = null,
                    this.listeners = a
            }
            var t = e.prototype;
            return t.addNestedSub = function(e) {
                    return this.trySubscribe(),
                        this.listeners.subscribe(e)
                },
                t.notifyNestedSubs = function() {
                    this.listeners.notify()
                },
                t.isSubscribed = function() {
                    return Boolean(this.unsubscribe)
                },
                t.trySubscribe = function() {
                    this.unsubscribe || (this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange),
                        this.listeners = r())
                },
                t.tryUnsubscribe = function() {
                    this.unsubscribe && (this.unsubscribe(),
                        this.unsubscribe = null,
                        this.listeners.clear(),
                        this.listeners = a)
                },
                e
        }()
}