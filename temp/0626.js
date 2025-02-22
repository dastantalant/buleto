function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    t.__esModule = !0,
        t.InnerSlider = void 0;
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
        s = n(626),
        l = r(s),
        c = n(155),
        u = r(c),
        d = n(627),
        p = r(d),
        h = n(252),
        f = (r(h),
            n(628)),
        m = r(f),
        g = n(20),
        y = r(g),
        v = n(32),
        b = r(v),
        _ = n(156),
        w = n(632),
        x = n(633),
        E = n(634);
    t.InnerSlider = (0,
        m.default)({
        displayName: "InnerSlider",
        mixins: [u.default, l.default],
        list: null,
        track: null,
        listRefHandler: function(e) {
            this.list = e
        },
        trackRefHandler: function(e) {
            this.track = e
        },
        getInitialState: function() {
            return o({}, p.default, {
                currentSlide: this.props.initialSlide
            })
        },
        componentWillMount: function() {
            if (this.props.init && this.props.init(),
                this.props.lazyLoad) {
                var e = (0,
                    _.getOnDemandLazySlides)((0,
                    b.default)({}, this.props, this.state));
                e.length > 0 && (this.setState(function(t, n) {
                        return {
                            lazyLoadedList: t.lazyLoadedList.concat(e)
                        }
                    }),
                    this.props.onLazyLoad && this.props.onLazyLoad(e))
            }
        },
        componentDidMount: function() {
            this.initialize(this.props),
                this.adaptHeight(),
                window && (window.addEventListener ? window.addEventListener("resize", this.onWindowResized) : window.attachEvent("onresize", this.onWindowResized))
        },
        componentWillUnmount: function() {
            this.animationEndCallback && clearTimeout(this.animationEndCallback),
                window.addEventListener ? window.removeEventListener("resize", this.onWindowResized) : window.detachEvent("onresize", this.onWindowResized),
                this.state.autoPlayTimer && clearInterval(this.state.autoPlayTimer)
        },
        componentWillReceiveProps: function(e) {
            this.props.slickGoTo != e.slickGoTo ? this.changeSlide({
                message: "index",
                index: e.slickGoTo,
                currentSlide: this.state.currentSlide
            }) : this.state.currentSlide >= e.children.length ? (this.update(e),
                this.changeSlide({
                    message: "index",
                    index: e.children.length - e.slidesToShow,
                    currentSlide: this.state.currentSlide
                })) : this.update(e)
        },
        componentDidUpdate: function() {
            if (this.props.reInit && this.props.reInit(),
                this.props.lazyLoad) {
                var e = (0,
                    _.getOnDemandLazySlides)((0,
                    b.default)({}, this.props, this.state));
                e.length > 0 && (this.setState(function(t, n) {
                        return {
                            lazyLoadedList: t.lazyLoadedList.concat(e)
                        }
                    }),
                    this.props.onLazyLoad && this.props.onLazyLoad(e))
            }
            this.adaptHeight()
        },
        onWindowResized: function() {
            this.update(this.props),
                this.setState({
                    animating: !1
                }),
                clearTimeout(this.animationEndCallback),
                delete this.animationEndCallback
        },
        slickPrev: function() {
            var e = this;
            setTimeout(function() {
                return e.changeSlide({
                    message: "previous"
                })
            }, 0)
        },
        slickNext: function() {
            var e = this;
            setTimeout(function() {
                return e.changeSlide({
                    message: "next"
                })
            }, 0)
        },
        slickGoTo: function(e) {
            var t = this;
            e = Number(e), !isNaN(e) && setTimeout(function() {
                return t.changeSlide({
                    message: "index",
                    index: e,
                    currentSlide: t.state.currentSlide
                })
            }, 0)
        },
        render: function() {
            var e, t = (0,
                    y.default)("slick-initialized", "slick-slider", this.props.className, {
                    "slick-vertical": this.props.vertical
                }),
                n = {
                    fade: this.props.fade,
                    cssEase: this.props.cssEase,
                    speed: this.props.speed,
                    infinite: this.props.infinite,
                    centerMode: this.props.centerMode,
                    focusOnSelect: this.props.focusOnSelect ? this.selectHandler : null,
                    currentSlide: this.state.currentSlide,
                    lazyLoad: this.props.lazyLoad,
                    lazyLoadedList: this.state.lazyLoadedList,
                    rtl: this.props.rtl,
                    slideWidth: this.state.slideWidth,
                    slideHeight: this.state.slideHeight,
                    listHeight: this.state.listHeight,
                    vertical: this.props.vertical,
                    slidesToShow: this.props.slidesToShow,
                    slidesToScroll: this.props.slidesToScroll,
                    slideCount: this.state.slideCount,
                    trackStyle: this.state.trackStyle,
                    variableWidth: this.props.variableWidth,
                    unslick: this.props.unslick,
                    centerPadding: this.props.centerPadding
                };
            if (!0 === this.props.dots && this.state.slideCount >= this.props.slidesToShow) {
                var r = {
                    dotsClass: this.props.dotsClass,
                    slideCount: this.state.slideCount,
                    slidesToShow: this.props.slidesToShow,
                    currentSlide: this.state.currentSlide,
                    slidesToScroll: this.props.slidesToScroll,
                    clickHandler: this.changeSlide,
                    children: this.props.children,
                    customPaging: this.props.customPaging,
                    infinite: this.props.infinite,
                    appendDots: this.props.appendDots
                };
                e = i.default.createElement(x.Dots, r)
            }
            var a, s, l = {
                infinite: this.props.infinite,
                centerMode: this.props.centerMode,
                currentSlide: this.state.currentSlide,
                slideCount: this.state.slideCount,
                slidesToShow: this.props.slidesToShow,
                prevArrow: this.props.prevArrow,
                nextArrow: this.props.nextArrow,
                clickHandler: this.changeSlide
            };
            this.props.arrows && (a = i.default.createElement(E.PrevArrow, l),
                s = i.default.createElement(E.NextArrow, l));
            var c = null;
            this.props.vertical && (c = {
                height: this.state.listHeight
            });
            var u = null;
            !1 === this.props.vertical ? !0 === this.props.centerMode && (u = {
                padding: "0px " + this.props.centerPadding
            }) : !0 === this.props.centerMode && (u = {
                padding: this.props.centerPadding + " 0px"
            });
            var d = (0,
                    b.default)({}, c, u),
                p = {
                    className: "slick-list",
                    style: d,
                    onMouseDown: this.swipeStart,
                    onMouseMove: this.state.dragging ? this.swipeMove : null,
                    onMouseUp: this.swipeEnd,
                    onMouseLeave: this.state.dragging ? this.swipeEnd : null,
                    onTouchStart: this.swipeStart,
                    onTouchMove: this.state.dragging ? this.swipeMove : null,
                    onTouchEnd: this.swipeEnd,
                    onTouchCancel: this.state.dragging ? this.swipeEnd : null,
                    onKeyDown: this.props.accessibility ? this.keyHandler : null
                },
                h = {
                    className: t,
                    onMouseEnter: this.onInnerSliderEnter,
                    onMouseLeave: this.onInnerSliderLeave,
                    onMouseOver: this.onInnerSliderOver
                };
            return this.props.unslick && (p = {
                        className: "slick-list"
                    },
                    h = {
                        className: t
                    }),
                i.default.createElement("div", h, this.props.unslick ? "" : a, i.default.createElement("div", o({
                    ref: this.listRefHandler
                }, p), i.default.createElement(w.Track, o({
                    ref: this.trackRefHandler
                }, n), this.props.children)), this.props.unslick ? "" : s, this.props.unslick ? "" : e)
        }
    })
}