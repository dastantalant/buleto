 function (e, t, n) {
    "use strict";
    var r = {
        animating: !1,
        dragging: !1,
        autoPlayTimer: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        listWidth: null,
        listHeight: null,
        scrolling: !1,
        slideCount: null,
        slideWidth: null,
        slideHeight: null,
        swiping: !1,
        swipeLeft: null,
        touchObject: {
            startX: 0,
            startY: 0,
            curX: 0,
            curY: 0
        },
        lazyLoadedList: [],
        initialized: !1,
        edgeDragged: !1,
        swiped: !1,
        trackStyle: {},
        trackWidth: 0
    };
    e.exports = r
}