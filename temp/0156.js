function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    t.__esModule = !0;
    var o = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        a = n(0),
        i = r(a),
        s = n(53),
        l = r(s),
        c = n(251),
        u = n(32),
        d = r(u),
        p = n(156),
        h = {
            initialize: function(e) {
                var t, n = l.default.findDOMNode(this.list),
                    r = i.default.Children.count(e.children),
                    o = this.getWidth(n),
                    a = this.getWidth(l.default.findDOMNode(this.track));
                if (e.vertical)
                    t = Math.ceil(this.getWidth(l.default.findDOMNode(this)));
                else {
                    var s = e.centerMode && 2 * parseInt(e.centerPadding);
                    "%" === e.centerPadding.slice(-1) && (s *= o / 100),
                        t = Math.ceil((this.getWidth(l.default.findDOMNode(this)) - s) / e.slidesToShow)
                }
                var u = this.getHeight(n.querySelector('[data-index="0"]')),
                    p = u * e.slidesToShow,
                    h = e.rtl ? r - 1 - e.initialSlide : e.initialSlide;
                this.setState({
                    slideCount: r,
                    slideWidth: t,
                    listWidth: o,
                    trackWidth: a,
                    currentSlide: h,
                    slideHeight: u,
                    listHeight: p
                }, function() {
                    var t = (0,
                            c.getTrackLeft)((0,
                            d.default)({
                            slideIndex: this.state.currentSlide,
                            trackRef: this.track
                        }, e, this.state)),
                        n = (0,
                            c.getTrackCSS)((0,
                            d.default)({
                            left: t
                        }, e, this.state));
                    this.setState({
                            trackStyle: n
                        }),
                        this.autoPlay()
                })
            },
            update: function(e) {
                var t, n = l.default.findDOMNode(this.list),
                    r = i.default.Children.count(e.children),
                    o = this.getWidth(n),
                    a = this.getWidth(l.default.findDOMNode(this.track));
                if (e.vertical)
                    t = Math.ceil(this.getWidth(l.default.findDOMNode(this)));
                else {
                    var s = e.centerMode && 2 * parseInt(e.centerPadding);
                    "%" === e.centerPadding.slice(-1) && (s *= o / 100),
                        t = Math.ceil((this.getWidth(l.default.findDOMNode(this)) - s) / e.slidesToShow)
                }
                var u = this.getHeight(n.querySelector('[data-index="0"]')),
                    h = u * e.slidesToShow;
                e.autoplay ? this.autoPlay(e.autoplay) : this.pause();
                var f = (0,
                    p.getOnDemandLazySlides)({}, this.props, this.state);
                f.length > 0 && this.props.onLazyLoad && this.props.onLazyLoad(f);
                var m = this.state.lazyLoadedList;
                this.setState({
                    slideCount: r,
                    slideWidth: t,
                    listWidth: o,
                    trackWidth: a,
                    slideHeight: u,
                    listHeight: h,
                    lazyLoadedList: m.concat(f)
                }, function() {
                    var t = (0,
                            c.getTrackLeft)((0,
                            d.default)({
                            slideIndex: this.state.currentSlide,
                            trackRef: this.track
                        }, e, this.state)),
                        n = (0,
                            c.getTrackCSS)((0,
                            d.default)({
                            left: t
                        }, e, this.state));
                    this.setState({
                        trackStyle: n
                    })
                })
            },
            getWidth: function(e) {
                return e && (e.getBoundingClientRect().width || e.offsetWidth) || 0
            },
            getHeight: function(e) {
                return e && (e.getBoundingClientRect().height || e.offsetHeight) || 0
            },
            adaptHeight: function() {
                if (this.props.adaptiveHeight) {
                    var e = '[data-index="' + this.state.currentSlide + '"]';
                    if (this.list) {
                        var t = l.default.findDOMNode(this.list),
                            n = t.querySelector(e) || {};
                        t.style.height = (n.offsetHeight || 0) + "px"
                    }
                }
            },
            canGoNext: function(e) {
                var t = !0;
                return e.infinite || (e.centerMode ? e.currentSlide >= e.slideCount - 1 && (t = !1) : (e.slideCount <= e.slidesToShow || e.currentSlide >= e.slideCount - e.slidesToShow) && (t = !1)),
                    t
            },
            slideHandler: function(e) {
                var t, n, r, o, a, i = this;
                if (!this.props.waitForAnimate || !this.state.animating) {
                    if (this.props.fade) {
                        if (n = this.state.currentSlide, !1 === this.props.infinite && (e < 0 || e >= this.state.slideCount))
                            return;
                        return t = e < 0 ? e + this.state.slideCount : e >= this.state.slideCount ? e - this.state.slideCount : e,
                            this.props.lazyLoad && this.state.lazyLoadedList.indexOf(t) < 0 && (this.setState(function(e, n) {
                                    return {
                                        lazyLoadedList: e.lazyLoadedList.concat(t)
                                    }
                                }),
                                this.props.onLazyLoad && this.props.onLazyLoad([t])),
                            a = function() {
                                i.setState({
                                        animating: !1
                                    }),
                                    i.props.afterChange && i.props.afterChange(t),
                                    delete i.animationEndCallback
                            },
                            this.setState({
                                animating: !0,
                                currentSlide: t
                            }, function() {
                                this.props.asNavFor && this.props.asNavFor.innerSlider.state.currentSlide !== this.state.currentSlide && this.props.asNavFor.innerSlider.slideHandler(e),
                                    this.animationEndCallback = setTimeout(a, this.props.speed)
                            }),
                            this.props.beforeChange && this.props.beforeChange(this.state.currentSlide, t),
                            void this.autoPlay()
                    }
                    if (t = e,
                        t < 0 ? n = !1 === this.props.infinite ? 0 : this.state.slideCount % this.props.slidesToScroll !== 0 ? this.state.slideCount - this.state.slideCount % this.props.slidesToScroll : this.state.slideCount + t : this.props.centerMode && t >= this.state.slideCount ? !1 === this.props.infinite ? (t = this.state.slideCount - 1,
                            n = this.state.slideCount - 1) : (t = this.state.slideCount,
                            n = 0) : n = t >= this.state.slideCount ? !1 === this.props.infinite ? this.state.slideCount - this.props.slidesToShow : this.state.slideCount % this.props.slidesToScroll !== 0 ? 0 : t - this.state.slideCount : this.state.currentSlide + this.slidesToShow < this.state.slideCount && t + this.props.slidesToShow >= this.state.slideCount ? !1 === this.props.infinite ? this.state.slideCount - this.props.slidesToShow : (this.state.slideCount - t) % this.props.slidesToScroll !== 0 ? this.state.slideCount - this.props.slidesToShow : t : t,
                        r = (0,
                            c.getTrackLeft)((0,
                            d.default)({
                            slideIndex: t,
                            trackRef: this.track
                        }, this.props, this.state)),
                        o = (0,
                            c.getTrackLeft)((0,
                            d.default)({
                            slideIndex: n,
                            trackRef: this.track
                        }, this.props, this.state)), !1 === this.props.infinite && (r === o && (t = n),
                            r = o),
                        this.props.beforeChange && this.props.beforeChange(this.state.currentSlide, n),
                        this.props.lazyLoad) {
                        var s = (0,
                            p.getOnDemandLazySlides)((0,
                            d.default)({}, this.props, this.state, {
                            currentSlide: t
                        }));
                        s.length > 0 && (this.setState(function(e, t) {
                                return {
                                    lazyLoadedList: e.lazyLoadedList.concat(s)
                                }
                            }),
                            this.props.onLazyLoad && this.props.onLazyLoad(s))
                    }
                    if (!1 === this.props.useCSS)
                        this.setState({
                            currentSlide: n,
                            trackStyle: (0,
                                c.getTrackCSS)((0,
                                d.default)({
                                left: o
                            }, this.props, this.state))
                        }, function() {
                            this.props.afterChange && this.props.afterChange(n)
                        });
                    else {
                        var l = {
                            animating: !1,
                            currentSlide: n,
                            trackStyle: (0,
                                c.getTrackCSS)((0,
                                d.default)({
                                left: o
                            }, this.props, this.state)),
                            swipeLeft: null
                        };
                        a = function() {
                                i.setState(l, function() {
                                    i.props.afterChange && i.props.afterChange(n),
                                        delete i.animationEndCallback
                                })
                            },
                            this.setState({
                                animating: !0,
                                currentSlide: n,
                                trackStyle: (0,
                                    c.getTrackAnimateCSS)((0,
                                    d.default)({
                                    left: r
                                }, this.props, this.state))
                            }, function() {
                                this.props.asNavFor && this.props.asNavFor.innerSlider.state.currentSlide !== this.state.currentSlide && this.props.asNavFor.innerSlider.slideHandler(e),
                                    this.animationEndCallback = setTimeout(a, this.props.speed)
                            })
                    }
                    this.autoPlay()
                }
            },
            swipeDirection: function(e) {
                var t, n, r, o;
                return t = e.startX - e.curX,
                    n = e.startY - e.curY,
                    r = Math.atan2(n, t),
                    o = Math.round(180 * r / Math.PI),
                    o < 0 && (o = 360 - Math.abs(o)),
                    o <= 45 && o >= 0 || o <= 360 && o >= 315 ? "left" : o >= 135 && o <= 225 ? "right" : !0 === this.props.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
            },
            play: function() {
                var e;
                if (this.props.rtl)
                    e = this.state.currentSlide - this.props.slidesToScroll;
                else {
                    if (!this.canGoNext(o({}, this.props, this.state)))
                        return !1;
                    e = this.state.currentSlide + this.props.slidesToScroll
                }
                this.slideHandler(e)
            },
            autoPlay: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                this.autoplayTimer && clearTimeout(this.autoplayTimer),
                    (e || this.props.autoplay) && (this.autoplayTimer = setTimeout(this.play, this.props.autoplaySpeed))
            },
            pause: function() {
                this.autoplayTimer && (clearTimeout(this.autoplayTimer),
                    this.autoplayTimer = null)
            }
        };
    t.default = h
}