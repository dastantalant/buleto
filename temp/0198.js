function(e, t) {
    ! function(e) {
        "use strict";

        function t(e) {
            if ("string" !== typeof e && (e = String(e)),
                /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e))
                throw new TypeError("Invalid character in header field name");
            return e.toLowerCase()
        }

        function n(e) {
            return "string" !== typeof e && (e = String(e)),
                e
        }

        function r(e) {
            var t = {
                next: function() {
                    var t = e.shift();
                    return {
                        done: void 0 === t,
                        value: t
                    }
                }
            };
            return y.iterable && (t[Symbol.iterator] = function() {
                    return t
                }),
                t
        }

        function o(e) {
            this.map = {},
                e instanceof o ? e.forEach(function(e, t) {
                    this.append(t, e)
                }, this) : Array.isArray(e) ? e.forEach(function(e) {
                    this.append(e[0], e[1])
                }, this) : e && Object.getOwnPropertyNames(e).forEach(function(t) {
                    this.append(t, e[t])
                }, this)
        }

        function a(e) {
            if (e.bodyUsed)
                return Promise.reject(new TypeError("Already read"));
            e.bodyUsed = !0
        }

        function i(e) {
            return new Promise(function(t, n) {
                e.onload = function() {
                        t(e.result)
                    },
                    e.onerror = function() {
                        n(e.error)
                    }
            })
        }

        function s(e) {
            var t = new FileReader,
                n = i(t);
            return t.readAsArrayBuffer(e),
                n
        }

        function l(e) {
            var t = new FileReader,
                n = i(t);
            return t.readAsText(e),
                n
        }

        function c(e) {
            for (var t = new Uint8Array(e), n = new Array(t.length), r = 0; r < t.length; r++)
                n[r] = String.fromCharCode(t[r]);
            return n.join("")
        }

        function u(e) {
            if (e.slice)
                return e.slice(0);
            var t = new Uint8Array(e.byteLength);
            return t.set(new Uint8Array(e)),
                t.buffer
        }

        function d() {
            return this.bodyUsed = !1,
                this._initBody = function(e) {
                    if (this._bodyInit = e,
                        e)
                        if ("string" === typeof e)
                            this._bodyText = e;
                        else if (y.blob && Blob.prototype.isPrototypeOf(e))
                        this._bodyBlob = e;
                    else if (y.formData && FormData.prototype.isPrototypeOf(e))
                        this._bodyFormData = e;
                    else if (y.searchParams && URLSearchParams.prototype.isPrototypeOf(e))
                        this._bodyText = e.toString();
                    else if (y.arrayBuffer && y.blob && b(e))
                        this._bodyArrayBuffer = u(e.buffer),
                        this._bodyInit = new Blob([this._bodyArrayBuffer]);
                    else {
                        if (!y.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(e) && !_(e))
                            throw new Error("unsupported BodyInit type");
                        this._bodyArrayBuffer = u(e)
                    } else
                        this._bodyText = "";
                    this.headers.get("content-type") || ("string" === typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : y.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
                },
                y.blob && (this.blob = function() {
                        var e = a(this);
                        if (e)
                            return e;
                        if (this._bodyBlob)
                            return Promise.resolve(this._bodyBlob);
                        if (this._bodyArrayBuffer)
                            return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                        if (this._bodyFormData)
                            throw new Error("could not read FormData body as blob");
                        return Promise.resolve(new Blob([this._bodyText]))
                    },
                    this.arrayBuffer = function() {
                        return this._bodyArrayBuffer ? a(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(s)
                    }
                ),
                this.text = function() {
                    var e = a(this);
                    if (e)
                        return e;
                    if (this._bodyBlob)
                        return l(this._bodyBlob);
                    if (this._bodyArrayBuffer)
                        return Promise.resolve(c(this._bodyArrayBuffer));
                    if (this._bodyFormData)
                        throw new Error("could not read FormData body as text");
                    return Promise.resolve(this._bodyText)
                },
                y.formData && (this.formData = function() {
                    return this.text().then(f)
                }),
                this.json = function() {
                    return this.text().then(JSON.parse)
                },
                this
        }

        function p(e) {
            var t = e.toUpperCase();
            return w.indexOf(t) > -1 ? t : e
        }

        function h(e, t) {
            t = t || {};
            var n = t.body;
            if (e instanceof h) {
                if (e.bodyUsed)
                    throw new TypeError("Already read");
                this.url = e.url,
                    this.credentials = e.credentials,
                    t.headers || (this.headers = new o(e.headers)),
                    this.method = e.method,
                    this.mode = e.mode,
                    n || null == e._bodyInit || (n = e._bodyInit,
                        e.bodyUsed = !0)
            } else
                this.url = String(e);
            if (this.credentials = t.credentials || this.credentials || "omit", !t.headers && this.headers || (this.headers = new o(t.headers)),
                this.method = p(t.method || this.method || "GET"),
                this.mode = t.mode || this.mode || null,
                this.referrer = null,
                ("GET" === this.method || "HEAD" === this.method) && n)
                throw new TypeError("Body not allowed for GET or HEAD requests");
            this._initBody(n)
        }

        function f(e) {
            var t = new FormData;
            return e.trim().split("&").forEach(function(e) {
                    if (e) {
                        var n = e.split("="),
                            r = n.shift().replace(/\+/g, " "),
                            o = n.join("=").replace(/\+/g, " ");
                        t.append(decodeURIComponent(r), decodeURIComponent(o))
                    }
                }),
                t
        }

        function m(e) {
            var t = new o;
            return e.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function(e) {
                    var n = e.split(":"),
                        r = n.shift().trim();
                    if (r) {
                        var o = n.join(":").trim();
                        t.append(r, o)
                    }
                }),
                t
        }

        function g(e, t) {
            t || (t = {}),
                this.type = "default",
                this.status = void 0 === t.status ? 200 : t.status,
                this.ok = this.status >= 200 && this.status < 300,
                this.statusText = "statusText" in t ? t.statusText : "OK",
                this.headers = new o(t.headers),
                this.url = t.url || "",
                this._initBody(e)
        }
        if (!e.fetch) {
            var y = {
                searchParams: "URLSearchParams" in e,
                iterable: "Symbol" in e && "iterator" in Symbol,
                blob: "FileReader" in e && "Blob" in e && function() {
                    try {
                        return new Blob, !0
                    } catch (e) {
                        return !1
                    }
                }(),
                formData: "FormData" in e,
                arrayBuffer: "ArrayBuffer" in e
            };
            if (y.arrayBuffer)
                var v = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
                    b = function(e) {
                        return e && DataView.prototype.isPrototypeOf(e)
                    },
                    _ = ArrayBuffer.isView || function(e) {
                        return e && v.indexOf(Object.prototype.toString.call(e)) > -1
                    };
            o.prototype.append = function(e, r) {
                    e = t(e),
                        r = n(r);
                    var o = this.map[e];
                    this.map[e] = o ? o + "," + r : r
                },
                o.prototype.delete = function(e) {
                    delete this.map[t(e)]
                },
                o.prototype.get = function(e) {
                    return e = t(e),
                        this.has(e) ? this.map[e] : null
                },
                o.prototype.has = function(e) {
                    return this.map.hasOwnProperty(t(e))
                },
                o.prototype.set = function(e, r) {
                    this.map[t(e)] = n(r)
                },
                o.prototype.forEach = function(e, t) {
                    for (var n in this.map)
                        this.map.hasOwnProperty(n) && e.call(t, this.map[n], n, this)
                },
                o.prototype.keys = function() {
                    var e = [];
                    return this.forEach(function(t, n) {
                            e.push(n)
                        }),
                        r(e)
                },
                o.prototype.values = function() {
                    var e = [];
                    return this.forEach(function(t) {
                            e.push(t)
                        }),
                        r(e)
                },
                o.prototype.entries = function() {
                    var e = [];
                    return this.forEach(function(t, n) {
                            e.push([n, t])
                        }),
                        r(e)
                },
                y.iterable && (o.prototype[Symbol.iterator] = o.prototype.entries);
            var w = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
            h.prototype.clone = function() {
                    return new h(this, {
                        body: this._bodyInit
                    })
                },
                d.call(h.prototype),
                d.call(g.prototype),
                g.prototype.clone = function() {
                    return new g(this._bodyInit, {
                        status: this.status,
                        statusText: this.statusText,
                        headers: new o(this.headers),
                        url: this.url
                    })
                },
                g.error = function() {
                    var e = new g(null, {
                        status: 0,
                        statusText: ""
                    });
                    return e.type = "error",
                        e
                };
            var x = [301, 302, 303, 307, 308];
            g.redirect = function(e, t) {
                    if (-1 === x.indexOf(t))
                        throw new RangeError("Invalid status code");
                    return new g(null, {
                        status: t,
                        headers: {
                            location: e
                        }
                    })
                },
                e.Headers = o,
                e.Request = h,
                e.Response = g,
                e.fetch = function(e, t) {
                    return new Promise(function(n, r) {
                        var o = new h(e, t),
                            a = new XMLHttpRequest;
                        a.onload = function() {
                                var e = {
                                    status: a.status,
                                    statusText: a.statusText,
                                    headers: m(a.getAllResponseHeaders() || "")
                                };
                                e.url = "responseURL" in a ? a.responseURL : e.headers.get("X-Request-URL");
                                var t = "response" in a ? a.response : a.responseText;
                                n(new g(t, e))
                            },
                            a.onerror = function() {
                                r(new TypeError("Network request failed"))
                            },
                            a.ontimeout = function() {
                                r(new TypeError("Network request failed"))
                            },
                            a.open(o.method, o.url, !0),
                            "include" === o.credentials ? a.withCredentials = !0 : "omit" === o.credentials && (a.withCredentials = !1),
                            "responseType" in a && y.blob && (a.responseType = "blob"),
                            o.headers.forEach(function(e, t) {
                                a.setRequestHeader(t, e)
                            }),
                            a.send("undefined" === typeof o._bodyInit ? null : o._bodyInit)
                    })
                },
                e.fetch.polyfill = !0
        }
    }("undefined" !== typeof self ? self : this)
}