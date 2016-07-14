/**
 * Created by mikum on 2016/7/14.
 */

function Drag(el) {
    this.suga = document.getElementById(el);
    this._board = document.getElementById("board");
    this.current = 0;
    this.items = [].slice.call(document.getElementById('container').children);
    this._leftA = ['5%', '35%', '65%', '90%'];
    this._class = document.getElementById("class"),
        // _wheel = 0,
        // _temp = 0,
        // _leftA =
        this._classNumbers = [15, 14, 13, 12];


    // _temp += e.wheelDelta / 120;
    // if (_temp < 0) _temp=_wheel = 0;
    // else if (_temp > 3) _temp=_wheel = 0;
    // else _wheel = _temp;
    // _obj.style.left = _leftA[_wheel];
    // _class.innerHTML = _classNumbers[_wheel];

    this._init();

}

Drag.prototype._init = function () {
    var self = this;
    this.items[this.current].classList.add('focus');
    this._board.addEventListener('mousewheel', function (e) {
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

var drag = new Drag('suga');
