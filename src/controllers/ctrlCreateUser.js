const seo = require("../seo.json");
const db  = require("../sqlite.js");
var servidor = null

module.exports = {
  
  listen: async(servidor) => {
    // GET on /registration
    servidor.get("/cadastro", module.exports.viewRegistration);
    // POST on /registration
    servidor.post("/cadastro", module.exports.validateRegistration);
  },
  
  viewCadastro: async(request, reply) => {
    console.log("cadastro de usuario em execução");
      let params = { seo: seo };
      reply.view("/src/pages/cadastro.hbs", params);
  },
  
  validateCadastro: async(request, reply) => {
    console.log("validaCadastro em execuçaõ");
      let params = { seo: seo };
    
        let user = request.body.user;
        if( user.length < 1 || user.length > 20 ){
          console.error("Minimo de caracter  1  maximo 20 Caracteres")
          params.error = "Minimo de caracter  1  maximo 20 Caracteres";
          reply.view("/src/pages/cadastro.hbs", params);
          return;
        }
        let password = request.body.password;
        if( password.length < 1 || password.length > 20 ){
          console.error("Minimo de caracter  1  maximo 20 Caracteres")
          params.error = "Minimo de caracter  1  maximo 20 Caracteres";
          reply.view("/src/pages/cadastro.hbs", params);
          return;
        }
      // Basic Auth Exception
        if( user.includes(":") ){
          console.error("Caracter especial não permitido")
          params.error = "Caracter especial não permitido";
          reply.view("/src/pages/cadastro.hbs", params);
          return;
        }
    
    // Basic Auth Exception
      if( user.includes(":") ){
        console.error("Caracter especial não permitido")
        params.error = "Caracter especial não permitido";
        reply.view("/src/pages/cadastro.hbs", params);
        return;
      }
      
    // Database
      // Find if user exists
        let result = await db.getUser(user);
        if( result.length != 0 ){
          console.error("Usuário já existente")
          params.error = "Usuário já existente";
          reply.view("/src/pages/cadastro.hbs", params);
          return;
        }
      // Insert user in the database
        await db.createUser(user, password);
    
    //Success
      console.log(`User: ${user} successfully created`);
      reply.view("/src/pages/login.hbs", params);
  }
  
};