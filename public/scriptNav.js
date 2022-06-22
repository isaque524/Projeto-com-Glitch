function letsGo(go){
    window.history.letsGo({}, "", `/${go}`);
  };


function navBarAtivada(id){
    let navbar = document.getElementById(id);
    navbar != null && navbar != undefined
      ? navbar.setAttribute("class", "active")
      : {};
  };

window.onload = function() {
  const go = document.getElementById("card_go").getAttribute('go_nome');
    letsGo(go);
    navBarAtivada(`navbar_${go}`);
}
  