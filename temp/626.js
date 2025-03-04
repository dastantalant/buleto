 function (e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    t.__esModule = !0;
    var o = n(251),
        a = n(155),
        i = (r(a),
            n(32)),
        s = r(i),
        l = n(53),
        c = r(l),
        u = n(154),
        d = {
            changeSlide: function (e) {
                var t, n, r, o, a, i = this.props,
                    s = i.slidesToScroll,
                    l = i.slidesToShow,
                    c = i.centerMode,
                    d = i.rtl,
                    p = this.state,
                    h = p.slideCount,
                    f = p.currentSlide;
                if (o = h % s !== 0,
                    t = o ? 0 : (h - f) % s,
                    "previous" === e.message)
                    r = 0 === t ? s : l - t,
                        a = f - r,
                        this.props.lazyLoad && !this.props.infinite && (n = f - r,
                            a = -1 === n ? h - 1 : n);
                else if ("next" === e.message)
                    r = 0 === t ? s : t,
                        a = f + r,
                        this.props.lazyLoad && !this.props.infinite && (a = (f + s) % h + t);
                else if ("dots" === e.message) {
                    if ((a = e.index * e.slidesToScroll) === e.currentSlide)
                        return
                } else if ("children" === e.message) {
                    if ((a = e.index) === e.currentSlide)
                        return;
                    if (this.props.infinite) {
                        var m = (0,
                            u.siblingDirection)({
                                currentSlide: f,
                                targetSlide: a,
                                slidesToShow: l,
                                centerMode: c,
                                slideCount: h,
                                rtl: d
                            });
                        a > e.currentSlide && "left" === m ? a -= h : a < e.currentSlide && "right" === m && (a += h)
                    }
                } else if ("index" === e.message && (a = Number(e.index)) === e.currentSlide)
                    return;
                this.slideHandler(a)
            },
            keyHandler: function (e) {
                e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && !0 === this.props.accessibility ? this.changeSlide({
                    message: !0 === this.props.rtl ? "next" : "previous"
                }) : 39 === e.keyCode && !0 === this.props.accessibility && this.changeSlide({
                    message: !0 === this.props.rtl ? "previous" : "next"
                }))
            },
            selectHandler: function (e) {
                this.changeSlide(e)
            },
            swipeStart: function (e) {
                var t, n;
                !1 !== this.props.swipe && (!1 === this.props.draggable && -1 !== e.type.indexOf("mouse") || (t = void 0 !== e.touches ? e.touches[0].pageX : e.clientX,
                    n = void 0 !== e.touches ? e.touches[0].pageY : e.clientY,
                    this.setState({
                        dragging: !0,
                        touchObject: {
                            startX: t,
                            startY: n,
                            curX: t,
                            curY: n
                        }
                    })))
            },
            swipeMove: function (e) {
                if (!this.state.dragging)
                    return void e.preventDefault();
                if (!this.state.scrolling) {
                    if (this.state.animating)
                        return void e.preventDefault();
                    this.props.vertical && this.props.swipeToSlide && this.props.verticalSwiping && e.preventDefault();
                    var t, n, r, a = this.state.touchObject;
                    n = (0,
                        o.getTrackLeft)((0,
                            s.default)({
                                slideIndex: this.state.currentSlide,
                                trackRef: this.track
                            }, this.props, this.state)),
                        a.curX = e.touches ? e.touches[0].pageX : e.clientX,
                        a.curY = e.touches ? e.touches[0].pageY : e.clientY,
                        a.swipeLength = Math.round(Math.sqrt(Math.pow(a.curX - a.startX, 2)));
                    var i = Math.round(Math.sqrt(Math.pow(a.curY - a.startY, 2)));
                    if (!this.props.verticalSwiping && !this.state.swiping && i > 10)
                        return void this.setState({
                            scrolling: !0
                        });
                    this.props.verticalSwiping && (a.swipeLength = i),
                        r = (!1 === this.props.rtl ? 1 : -1) * (a.curX > a.startX ? 1 : -1),
                        this.props.verticalSwiping && (r = a.curY > a.startY ? 1 : -1);
                    var l = this.state.currentSlide,
                        c = Math.ceil(this.state.slideCount / this.props.slidesToScroll),
                        u = this.swipeDirection(this.state.touchObject),
                        d = a.swipeLength;
                    !1 === this.props.infinite && (0 === l && "right" === u || l + 1 >= c && "left" === u) && (d = a.swipeLength * this.props.edgeFriction, !1 === this.state.edgeDragged && this.props.edgeEvent && (this.props.edgeEvent(u),
                        this.setState({
                            edgeDragged: !0
                        }))), !1 === this.state.swiped && this.props.swipeEvent && (this.props.swipeEvent(u),
                            this.setState({
                                swiped: !0
                            })),
                        t = this.props.vertical ? n + d * (this.state.listHeight / this.state.listWidth) * r : this.props.rtl ? n - d * r : n + d * r,
                        this.props.verticalSwiping && (t = n + d * r),
                        this.setState({
                            touchObject: a,
                            swipeLeft: t,
                            trackStyle: (0,
                                o.getTrackCSS)((0,
                                    s.default)({
                                        left: t
                                    }, this.props, this.state))
                        }),
                        Math.abs(a.curX - a.startX) < .8 * Math.abs(a.curY - a.startY) || a.swipeLength > 10 && (this.setState({
                            swiping: !0
                        }),
                            e.preventDefault())
                }
            },
            getNavigableIndexes: function () {
                var e = void 0,
                    t = 0,
                    n = 0,
                    r = [];
                for (this.props.infinite ? (t = -1 * this.props.slidesToShow,
                    n = -1 * this.props.slidesToShow,
                    e = 2 * this.state.slideCount) : e = this.state.slideCount; t < e;)
                    r.push(t),
                        t = n + this.props.slidesToScroll,
                        n += this.props.slidesToScroll <= this.props.slidesToShow ? this.props.slidesToScroll : this.props.slidesToShow;
                return r
            },
            checkNavigable: function (e) {
                var t = this.getNavigableIndexes(),
                    n = 0;
                if (e > t[t.length - 1])
                    e = t[t.length - 1];
                else
                    for (var r in t) {
                        if (e < t[r]) {
                            e = n;
                            break
                        }
                        n = t[r]
                    }
                return e
            },
            getSlideCount: function () {
                var e = this,
                    t = this.props.centerMode ? this.state.slideWidth * Math.floor(this.props.slidesToShow / 2) : 0;
                if (this.props.swipeToSlide) {
                    var n = void 0,
                        r = c.default.findDOMNode(this.list),
                        o = r.querySelectorAll(".slick-slide");
                    if (Array.from(o).every(function (r) {
                        if (e.props.vertical) {
                            if (r.offsetTop + e.getHeight(r) / 2 > -1 * e.state.swipeLeft)
                                return n = r, !1
                        } else if (r.offsetLeft - t + e.getWidth(r) / 2 > -1 * e.state.swipeLeft)
                            return n = r, !1;
                        return !0
                    }), !n)
                        return 0;
                    var a = !0 === this.props.rtl ? this.state.slideCount - this.state.currentSlide : this.state.currentSlide;
                    return Math.abs(n.dataset.index - a) || 1
                }
                return this.props.slidesToScroll
            },
            swipeEnd: function (e) {
                if (!this.state.dragging)
                    return void (this.props.swipe && e.preventDefault());
                var t = this.state.touchObject,
                    n = this.state.listWidth / this.props.touchThreshold,
                    r = this.swipeDirection(t);
                this.props.verticalSwiping && (n = this.state.listHeight / this.props.touchThreshold);
                var a = this.state.scrolling;
                if (this.setState({
                    dragging: !1,
                    edgeDragged: !1,
                    scrolling: !1,
                    swiping: !1,
                    swiped: !1,
                    swipeLeft: null,
                    touchObject: {}
                }), !a && t.swipeLength)
                    if (t.swipeLength > n) {
                        e.preventDefault(),
                            this.props.onSwipe && this.props.onSwipe(r);
                        var i = void 0,
                            l = void 0;
                        switch (r) {
                            case "left":
                            case "down":
                                l = this.state.currentSlide + this.getSlideCount(),
                                    i = this.props.swipeToSlide ? this.checkNavigable(l) : l,
                                    this.setState({
                                        currentDirection: 0
                                    });
                                break;
                            case "right":
                            case "up":
                                l = this.state.currentSlide - this.getSlideCount(),
                                    i = this.props.swipeToSlide ? this.checkNavigable(l) : l,
                                    this.setState({
                                        currentDirection: 1
                                    });
                                break;
                            default:
                                i = this.state.currentSlide
                        }
                        this.slideHandler(i)
                    } else {
                        var c = (0,
                            o.getTrackLeft)((0,
                                s.default)({
                                    slideIndex: this.state.currentSlide,
                                    trackRef: this.track
                                }, this.props, this.state));
                        this.setState({
                            trackStyle: (0,
                                o.getTrackAnimateCSS)((0,
                                    s.default)({
                                        left: c
                                    }, this.props, this.state))
                        })
                    }
            },
            onInnerSliderEnter: function (e) {
                this.props.autoplay && this.props.pauseOnHover && this.pause()
            },
            onInnerSliderOver: function (e) {
                this.props.autoplay && this.props.pauseOnHover && this.pause()
            },
            onInnerSliderLeave: function (e) {
                this.props.autoplay && this.props.pauseOnHover && this.autoPlay()
            }
        };
    t.default = d
}