const seo = require("./seo.json");
const db  = require("./sqlite.js");
const Base64 = require("js-base64");

module.exports = {
  
  configurar: async(servidor) => {
    servidor.get("/jogoVelha", module.exports.viewCadastro);
    servidor.post("/jogoVelha", module.exports.validarCadastro);
  },


viewJogoVelha: async(request, reply) => {
    console.log("Pagina Inicial GET /jogos");
    let params = { seo: seo };
    let valido = await cookie.validacao(request.cookies.Autenticacao);
    if( !valido ){
      params.error = "Usuário deve se autenticar";
      reply.view("/src/Paginas/index.hbs", params);
      return;
    }
    
    reply.view("/src/Paginas/jogosVelha.hbs", params);
  },

}
 
