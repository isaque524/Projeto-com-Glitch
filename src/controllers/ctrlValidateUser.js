const seo    = require("../seo.json");
const db     = require("../sqlite.js");
const ctrl   = require("./ctrlViewBooks.js");
const Base64 = require("js-base64");
var servidor = null

module.exports = {
  
  listen: async(servidor) => {
    // GET on root 
    servidor.get("/", module.exports.viewLogin);
    // POST on root
    servidor.post("/", module.exports.validateLogin);
  },
  
  viewLogin: async(request, reply) => {
    console.log("exec viewLogin");
    // params
      let params = { seo: seo };
    // Show login.hbs
      reply.view("/src/pages/login.hbs", params);
  },
  
  validateLogin: async(request, reply) => {
    console.log("exec validateLogin");
    // params
      let params = { seo: seo };
    
    // Validate Length
      let user = request.body.user;
      if( user.length < 1 || user.length > 20 ){
        console.error("Usuário deve possuir entre 1 e 20 Caracteres")
        params.error = "Usuário deve possuir entre 1 e 20 Caracteres";
        reply.view("/src/pages/login.hbs", params);
        return;
      }
      let password = request.body.password;
      if( password.length < 1 || password.length > 20 ){
        console.error("Senha deve possuir entre 1 e 20 Caracteres")
        params.error = "Senha deve possuir entre 1 e 20 Caracteres";
        reply.view("/src/pages/login.hbs", params);
        return;
      }      
      
    // Validate Database
      var result;
      //Find if user exists
        result = await db.getUser(user);
        if( result.length === 0 ){
          console.error("Usuário inexistente")
          params.error = "Usuário inexistente";
          reply.view("/src/pages/login.hbs", params);
          return;
        }
      //Find if password corresponds to user
        result = await db.getPassword(user, password);
        if( result.length === 0 ){
          console.error("Senha incorreta")
          params.error = "Senha incorreta";
          reply.view("/src/pages/login.hbs", params);
          return;
        }
    
    // Cookie Creation
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