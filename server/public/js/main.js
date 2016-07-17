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
    }
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