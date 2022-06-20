const seo = require("./seo.json");
const db  = require("./sqlite.js");
const cookie = require("./cookie.js");

module.exports = {
  
  configurar: async(servidor) => {
    servidor.get("/jogos", module.exports.viewJogos);
  },
  
  verJogos: async(request, reply) => {
    console.log("Pagina Inicial GET /jogos");
    let params = { seo: seo };
    let valido = await cookie.validacao(request.cookies.Autenticacao);
    if( !valido ){
      params.error = "Usuário deve se autenticar";
      reply.view("/src/Paginas/index.hbs", params);
      return;
    }
    
    reply.view("/src/Paginas/jogos.hbs", params);
  },
  
}