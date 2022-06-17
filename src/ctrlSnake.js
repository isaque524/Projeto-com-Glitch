const seo = require("./seo.json");
const db  = require("./sqlite.js");
const Base64 = require("js-base64");
const cookie = require("./cookie.js");

module.exports = {
  
  configurar: async(servidor) => {
    servidor.get("/snake", module.exports.viewSnake);
    //servidor.post("/jogoVelha", module.exports.);
  },


viewSnake: async(request, reply) => {
    console.log("Pagina Inicial GET /jogos");
    let params = { seo: seo };
    let valido = await cookie.validacao(request.cookies.Autenticacao);
    if( !valido ){
      params.error = "Usuário deve se autenticar";
      reply.view("/src/Paginas/index.hbs", params);
      return;
    }
    
    reply.view("/src/Paginas/snake.hbs", params);
  },

}

  
