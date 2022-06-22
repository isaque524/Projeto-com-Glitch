  function navBarAtivada(id){
    // Active top nav
    let navbar = document.getElementById(id);
    navbar != null && navbar != undefined
      ? navbar.setAttribute("class", "active")
      : {};
  };

window.onload = function() {
  const state = document.getElementById("card").getAttribute('name');
  
  // Change state
    replaceState(state);
  
  // Change active top nav
    navBarAtivada(`navbar_${state}`);
  