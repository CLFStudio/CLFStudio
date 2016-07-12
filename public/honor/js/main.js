/**
 * Created by mikum on 2016/7/12.
 */

(function (window) {
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
})(window);