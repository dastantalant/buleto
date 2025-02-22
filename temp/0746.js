)            t(n "Core/Axis/StackingAxis.js" [n["Core/Animation/AnimationUtilities.js"] n["Core/Axis/Axis.js"] n["Core/Utilities.js"]] function(e, t, n) {
                var r, o = e.getDeferredAnimation,
                    a = n.addEvent,
                    i = n.destroyObjectProperties,
                    s = n.fireEvent,
                    l = n.isNumber,
                    c = n.objectEach;
                return function(e) {
                        function t() {
                            var e = this.stacking;
                            if (e) {
                                var t = e.stacks;
                                c(t, function(e, n) {
                                        i(e),
                                            t[n] = null
                                    }),
                                    e && e.stackTotalGroup && e.stackTotalGroup.destroy()
                            }
                        }

                        function n() {
                            this.stacking || (this.stacking = new u(this))
                        }
                        var r = [];
                        e.compose = function(e) {
                            return -1 === r.indexOf(e) && (r.push(e),
                                    a(e, "init", n),
                                    a(e, "destroy", t)),
                                e
                        };
                        var u = function() {
                            function e(e) {
                                this.oldStacks = {},
                                    this.stacks = {},
                                    this.stacksTouched = 0,
                                    this.axis = e
                            }
                            return e.prototype.buildStacks = function() {
                                    var e, t = this.axis,
                                        n = t.series,
                                        r = t.options.reversedStacks,
                                        o = n.length;
                                    if (!t.isXAxis) {
                                        for (this.usePercentage = !1,
                                            e = o; e--;) {
                                            var a = n[r ? e : o - e - 1];
                                            a.setStackedPoints(),
                                                a.setGroupedPoints()
                                        }
                                        for (e = 0; e < o; e++)
                                            n[e].modifyStacks();
                                        s(t, "afterBuildStacks")
                                    }
                                },
                                e.prototype.cleanStacks = function() {
                                    if (!this.axis.isXAxis) {
                                        if (this.oldStacks)
                                            var e = this.stacks = this.oldStacks;
                                        c(e, function(e) {
                                            c(e, function(e) {
                                                e.cumulative = e.total
                                            })
                                        })
                                    }
                                },
                                e.prototype.resetStacks = function() {
                                    var e = this,
                                        t = e.stacks;
                                    e.axis.isXAxis || c(t, function(t) {
                                        c(t, function(n, r) {
                                            l(n.touched) && n.touched < e.stacksTouched ? (n.destroy(),
                                                delete t[r]) : (n.total = null,
                                                n.cumulative = null)
                                        })
                                    })
                                },
                                e.prototype.renderStackTotals = function() {
                                    var e = this.axis,
                                        t = e.chart,
                                        n = t.renderer,
                                        r = this.stacks;
                                    e = o(t, e.options.stackLabels && e.options.stackLabels.animation || !1);
                                    var a = this.stackTotalGroup = this.stackTotalGroup || n.g("stack-labels").attr({
                                        visibility: "visible",
                                        zIndex: 6,
                                        opacity: 0
                                    }).add();
                                    a.translate(t.plotLeft, t.plotTop),
                                        c(r, function(e) {
                                            c(e, function(e) {
                                                e.render(a)
                                            })
                                        }),
                                        a.animate({
                                            opacity: 1
                                        }, e)
                                },
                                e
                        }();
                        e.Additions = u
                    }(r || (r = {})),
                    r
            }