  function navBarAtivada(id){
    // Active top nav
    let navbar = document.getElementById(id);
    navbar != null && navbar != undefined
      ? navbar.setAttribute("class", "active")
      : {};
  };

window.onload = function() {
  const go = document.getElementById("card_go").getAttribute('go_nome');
  
  // Change state
    replaceState(go);
  
  // Change active top nav
    navBarAtivada(`navbar_${go}`);
  