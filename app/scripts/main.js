window.onload=function () {
  var LogoDom = document.getElementById("logo"),
    honorButton = document.getElementById("honorButton"),
    honorBox = document.getElementById("honorBox"),
    closeB = document.getElementById('close'),
    closeB1 = closeB.children[0],
    closeB2 = closeB.children[1];

  LogoDom.classList.add("fadeIn");

  honorButton.addEventListener('click', function () {
    honorBox.classList.add('showBox');
    closeB1.className = 'barOne';
    closeB2.className = 'barTwo';
  });

  closeB.addEventListener('click', function() {
    honorBox.classList.remove('showBox');
    closeB1.className = "";
    closeB2.className = "";
  });

};
