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

(function (window) {
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
        },
        data: {
            'photos': ''
        }
    });
    var mouseOn = function () {
        var header = document.getElementById('header'),
            mouseHandler = function (event) {
                if (event.wheelDelta < 0) {
                    header.style.display = "none";
            }
        };
        document.body.onmousewheel = function (event) {
            event = event || window.event;
            mouseHandler(event);
        };
        document.body.addEventListener("DOMMouseScroll", function (event) {
            mouseHandler(event);
        });
    };
    mouseOn();
})(window);



