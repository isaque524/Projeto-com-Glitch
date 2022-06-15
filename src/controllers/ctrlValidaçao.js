const seo    = require("../seo.json");
const db     = require("../sqlite.js");
const Base64 = require("js-base64");
var servidor = null

module.exports = {
  
  listen: async(servidor) => {
     
    servidor.get("/", module.exports.viewLogin);
    servidor.post("/", module.exports.validaLogin);
  },
  
  viewLogin: async(request, reply) => {
    console.log("viewLogin sendo executado");

      let params = { seo: seo };
      reply.view("/src/pages/login.hbs", params);
  },
  
  validaLogin: async(request, reply) => {
    console.log("validaLogin sendo executado");
    
      let params = { seo: seo };
    
      let user = request.body.user;
      if( user.length < 1 || user.length > 20 ){
        console.error("Minimo de caracter  1  maximo 20 Caracteres")
        params.error = "Minimo de caracter  1  maximo 20 Caracteres";
        reply.view("/src/pages/login.hbs", params);
        return;
      }
      let password = request.body.password;
      if( password.length < 1 || password.length > 20 ){
        console.error("Minimo de caracter  1  maximo 20 Caracteres")
        params.error = "Minimo de caracter  1  maximo 20 Caracteres";
        reply.view("/src/pages/login.hbs", params);
        return;
      }      
      
      var result;
          result = await db.getUser(user);
        if( result.length === 0 ){
          console.error("Login incorreto")
          params.error = "Login incorreto";
          reply.view("/src/pages/login.hbs", params);
          return;
        }
        result = await db.getPassword(user, password);
        if( result.length === 0 ){
          console.error("Senha incorreta")
          params.error = "Senha incorreta";
          reply.view("/src/pages/login.hbs", params);
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