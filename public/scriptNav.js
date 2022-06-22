  function navBarAtivada(id){
    // Active top nav
    let navbar = document.getElementById(id);
    navbar != null && navbar != undefined
      ? navbar.setAttribute("class", "active")
      : {};
  };