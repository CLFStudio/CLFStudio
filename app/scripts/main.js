window.onload=function () {
  var LogoDom = document.getElementById("logo"),
    nav = document.getElementById("nav"),
    menu = document.getElementById("menu"),
    honorButton = document.getElementById("honorButton"),
    honorBox = document.getElementById("honorBox"),
    closeB = document.getElementById('close'),
    closeB1 = closeB.children[0],
    closeB2 = closeB.children[1],
    menuStatus = 0;

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

  menu.addEventListener('click', function () {
    if(menuStatus){
      nav.classList.remove('show-nav');
      menuStatus=0;
      document.getElementById('body').style.overflowY="scroll";
    }
    else{
      nav.classList.add('show-nav');
      menuStatus=1;
      document.getElementById('body').style.overflowY="hidden";
    }
  });
};
