;(function (window) {

    'use strict';

    var support = {animations: Modernizr.cssanimations},
        animEndEventNames = {
            'WebkitAnimation': 'webkitAnimationEnd',
            'OAnimation': 'oAnimationEnd',
            'msAnimation': 'MSAnimationEnd',
            'animation': 'animationend'
        },
        animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],
        onEndAnimation = function (el, callback) {
            var onEndCallbackFn = function (ev) {
                if (support.animations) {
                    if (ev.target != this) return;
                    this.removeEventListener(animEndEventName, onEndCallbackFn);
                }
                if (callback && typeof callback === 'function') {
                    callback.call();
                }
            };
            if (support.animations) {
                el.addEventListener(animEndEventName, onEndCallbackFn);
            }
            else {
                onEndCallbackFn();
            }
        };

    function extend(a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }

    function Stack(el, options) {
        this.el = el;
        this.options = extend({}, this.options);
        extend(this.options, options);
        this.items = [].slice.call(this.el.children);
        this.itemsTotal = this.items.length;
        if (this.options.infinite && this.options.visible >= this.itemsTotal || !this.options.infinite && this.options.visible > this.itemsTotal || this.options.visible <= 0) {
            this.options.visible = 1;
        }
        window.items = this.items;
        this.current = 0;
        this._init();
    }

    Stack.prototype.options = {
        perspective: 1000,
        perspectiveOrigin: '50% -50%',
        visible: 3,
        infinite: true,
        onEndStack: function () {
            return false;
        },
        stackItemsAnimation: {
            duration: 500,
            type: dynamics.bezier,
            points: [{'x': 0, 'y': 0, 'cp': [{'x': 0.25, 'y': 0.1}]}, {'x': 1, 'y': 1, 'cp': [{'x': 0.25, 'y': 1}]}]
        },
        stackItemsAnimationDelay: 0
    };

    Stack.prototype._init = function () {
        this.el.style.WebkitPerspective = this.el.style.perspective = this.options.perspective + 'px';
        this.el.style.WebkitPerspectiveOrigin = this.el.style.perspectiveOrigin = this.options.perspectiveOrigin;
        var self = this;
        for (var i = 0; i < this.itemsTotal; ++i) {
            var item = this.items[i];
            if (i < this.options.visible) {
                item.style.opacity = 1;
                item.style.pointerEvents = 'auto';
                item.style.zIndex = i === 0 ? parseInt(this.options.visible + 1) : parseInt(this.options.visible - i);
                item.style.WebkitTransform = item.style.transform = 'translate3d(0px, 0px, ' + parseInt(-1 * 50 * i) + 'px)';
            }
            else {
                item.style.WebkitTransform = item.style.transform = 'translate3d(0,0,-' + parseInt(this.options.visible * 50) + 'px)';
            }
        }
        this.items[this.current].classList.add('stack__item--current');
    };
    Stack.prototype.reject = function (callback) {
        this._next('reject', callback);
    };

    Stack.prototype.accept = function (callback) {
        this._next('accept', callback);
    };

    Stack.prototype.restart = function () {
        this.hasEnded = false;
        this._init();
    };

    Stack.prototype._next = function (action, callback) {
        if (this.isAnimating || ( !this.options.infinite && this.hasEnded )) return;
        this.isAnimating = true;

        var currentItem = this.items[this.current];
        currentItem.classList.remove('stack__item--current');

        currentItem.classList.add(action === 'accept' ? 'stack__item--accept' : 'stack__item--reject');

        var self = this;
        onEndAnimation(currentItem, function () {
            currentItem.style.opacity = 0;
            currentItem.style.pointerEvents = 'none';
            currentItem.style.zIndex = -1;
            currentItem.style.WebkitTransform = currentItem.style.transform = 'translate3d(0px, 0px, -' + parseInt(self.options.visible * 50) + 'px)';

            currentItem.classList.remove(action === 'accept' ? 'stack__item--accept' : 'stack__item--reject');

            self.items[self.current].style.zIndex = self.options.visible + 1;
            self.isAnimating = false;

            if (callback) callback();

            if (!self.options.infinite && self.current === 0) {
                self.hasEnded = true;
                self.options.onEndStack(self);
            }
        });

        for (var i = 0; i < this.itemsTotal; ++i) {
            if (i >= this.options.visible) break;

            if (!this.options.infinite) {
                if (this.current + i >= this.itemsTotal - 1) break;
                var pos = this.current + i + 1;
            }
            else {
                var pos = this.current + i < this.itemsTotal - 1 ? this.current + i + 1 : i - (this.itemsTotal - this.current - 1);
            }

            var item = this.items[pos],
                animateStackItems = function (item, i) {
                    item.style.pointerEvents = 'auto';
                    item.style.opacity = 1;
                    item.style.zIndex = parseInt(self.options.visible - i);

                    dynamics.animate(item, {
                        translateZ: parseInt(-1 * 50 * i)
                    }, self.options.stackItemsAnimation);
                };

            setTimeout(function (item, i) {
                return function () {
                    var preAnimation;

                    if (self.options.stackItemsPreAnimation) {
                        preAnimation = action === 'accept' ? self.options.stackItemsPreAnimation.accept : self.options.stackItemsPreAnimation.reject;
                    }

                    if (preAnimation) {
                        var animProps = {};

                        for (var key in preAnimation.animationProperties) {
                            var interval = preAnimation.elastic ? preAnimation.animationProperties[key] / self.options.visible : 0;
                            animProps[key] = preAnimation.animationProperties[key] - Number(i * interval);
                        }

                        animProps.translateZ = parseInt(-1 * 50 * (i + 1));

                        preAnimation.animationSettings.complete = function () {
                            animateStackItems(item, i);
                        };

                        dynamics.animate(item, animProps, preAnimation.animationSettings);
                    }
                    else {
                        animateStackItems(item, i);
                    }
                };
            }(item, i), this.options.stackItemsAnimationDelay);
        }

        this.current = this.current < this.itemsTotal - 1 ? this.current + 1 : 0;
        this.items[this.current].classList.add('stack__item--current');
    };

    window.Stack = Stack;

})(window);