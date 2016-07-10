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
        var eventUtil = {
            getWheelDelta: function (event) {
                return event.wheelDelta ? event.wheelDelta : -event.detail * 40;
            }
        };


        function handleMouse(event) {
            var delta = eventUtil.getWheelDelta(event);
            alert(delta);
        }

        eventUtil.addHandler(document, "mouseWheel", handleMouse);
        eventUtil.addHandler(document, "DOMMouseScroll", handleMouse);
    };
    mouseOn();

})(window);



