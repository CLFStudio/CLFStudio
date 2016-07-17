/**
 * Created by mikum on 2016/7/17.
 */

(function(window){
    function Drag(el) {
        this.suga = document.getElementById(el);
        this._board = document.getElementById("board");
        this.current = 0;
        this.items = [].slice.call(document.getElementById('container').children);
        this._leftA = ['5%', '35%', '65%', '90%'];
        this._class = document.getElementById("class"),
        this._classNumbers = [15, 14, 13, 12];
        this._init();
    };
    Drag.prototype._init = function () {
        var self = this;
        this.items[this.current].classList.add('focus');
        this._board.addEventListener('mousewheel', function (e) {
            e.preventDefault();
            self._next(e.wheelDelta < 0 ? 'go' : 'back');
        });
    };
    Drag.prototype._next = function (option) {
        if (option == "go") {
            if (this.current == 3) exit();
            else {
                this.items[this.current + 1].classList.add('focus');
                this.items[this.current].classList.remove('focus');
                this.current += 1;
            }
        }
        if (option == "back") {
            if (this.current == 0) exit();
            else {
                this.items[this.current - 1].classList.add('focus');
                this.items[this.current].classList.remove('focus');
                this.current -= 1;
            }
        }
        this.suga.style.left = this._leftA[this.current];
        this._class.innerHTML = this._classNumbers[this.current];
    };
    window.Drag = Drag;
})(window);

window.onload=function () {
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
    var animaStack = function () {
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

    var honorBox = document.getElementById('honorBox'),
        honorB = document.getElementById('honorB'),
        closeB = document.getElementById('close'),
        closeB1 = closeB.children[0],
        closeB2 = closeB.children[1];
    honorB.addEventListener('click',function () {
        honorBox.classList.add('showBox');
        closeB1.className='barOne';
        closeB2.className='barTwo';
    });
    closeB.addEventListener('click',function () {
        honorBox.classList.remove('showBox');
        closeB1.className="";
        closeB2.className="";
    });
};