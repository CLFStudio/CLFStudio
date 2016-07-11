/**
 * Created by mikum on 2016/7/10.
 */

var headersData = [
    {
        "src": "photos/f.jpg",
        "alt": "Think"
    },
    {
        "src": "photos/a.jpg",
        "alt": "Art"
    },
    {
        "src": "photos/g.jpg",
        "alt": "Envelop"
    },
    {
        "src": "photos/h.jpg",
        "alt": "Girl"
    },
    {
        "src": "photos/l.jpg",
        "alt": "Boby"
    }
];

var options = {
    stackItemsAnimation: {
        duration: 800,
        type: dynamics.spring
    },
    stackItemsPreAnimation: {
        accept: {
            elastic: true,
            animationProperties: {translateX: 100, translateY: 10, rotateZ: 5},
            animationSettings: {
                duration: 100,
                type: dynamics.easeIn
            }
        },
        reject: {
            elastic: true,
            animationProperties: {translateX: -100, translateY: 10, rotateZ: -5},
            animationSettings: {
                duration: 100,
                type: dynamics.easeIn
            }
        }
    }
};

(function (window) {
    var animaStack = function () {
        console.log("K");
        var Bleft = document.getElementById('button_left'),
            Bright = document.getElementById('button_right'),
            stack = new Stack(document.getElementById('stackAnima'), options);
        Bleft.addEventListener("click", function () {
            stack.reject()
        });
        Bright.addEventListener("click", function () {
            stack.accept()
        });
        window.stack = this.stack;
    };

    Vue.http.options.emulateJSON = true;
    var header = new Vue({
        el: 'header',
        data: {
            'headers': headersData
        }
    });
    var photos = new Vue({
        el: '#albums',
        ready: function () {
            this.$http.get('db/album.json').then(function (response) {
                this.$set('photos', response.json())
            });
            setTimeout(animaStack, 2000);
        },
        data: {
            'photos': ''
        }
    });

    // var mouseOn = function () {
    //     var header = document.getElementById('header'),
    //         addWheel = 0,
    //         mouseHandler = function (event) {
    //             addWheel += event.wheelDelta;
    //             if (addWheel < -240){
    //
    //             }
    //         };
    //     document.body.onmousewheel = function (event) {
    //         event = event || window.event;
    //         mouseHandler(event);
    //     };
    //     document.body.addEventListener("DOMMouseScroll", function (event) {
    //         mouseHandler(event);
    //     });
    // };
    // mouseOn();
})(window);


