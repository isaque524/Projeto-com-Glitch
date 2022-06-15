const seo    = require("./seo.json");
const db     = require("./sqlite.js");
const Base64 = require("js-base64");

module.exports = {
  
  configurar: async(servidor) => {
    servidor.get("/", module.exports.viewLogin);
    servidor.post("/", module.exports.validarLogin);
  },
  
  viewLogin: async(request, reply) => {
    console.log("Pagina de Login GET /");
    let params = { seo: seo };
    reply.view("/src/Paginas/index.hbs", params);
  },
  
  validarLogin: async(request, reply) => {
    console.log("Pagina de Login POST /");
    let params = { seo: seo };

    const usuario = request.body.usuario;
    const senha = request.body.senha;
    if( senha.length > 20 || usuario.length > 20 ){
      params.error = "Usuário deve possuir entre 6 e 20 Caracteres";
      reply.view("/src/Paginas/index.hbs", params);
      return;
    } 

    var result;
        result = await db.getUser(user);
      if( result.length === 0 ){
        console.error("Login incorreto")
        params.error = "Login incorreto";
        reply.view("/src/Paginas/index.hbs", params);
        return;
      }
      result = await db.getPassword(user, password);
      if( result.length === 0 ){
        console.error("Senha incorreta")
        params.error = "Senha incorreta";
        reply.view("/src/Paginas/index.hbs", params);
        return;
      }

    let basic_authentication = Base64.encode( `${user}:${password}` );
    reply.setCookie('Authentication', basic_authentication, {
      domain: `${process.env.PROJECT_DOMAIN}.glitch.me`,
      path: '/',
      maxAge: 60 * 22, // 22 minutes
      secure: true,
      sameSite: 'lax',
      httpOnly: true
    });
    request.cookies.Authentication = basic_authentication;

  // Success
    console.log(`User: ${user} successfully logged in`);
    await ctrl.viewBooks(request, reply);
  }
  
};