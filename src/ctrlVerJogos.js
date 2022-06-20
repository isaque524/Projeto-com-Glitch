const seo = require("./seo.json");
const db  = require("./sqlite.js");
const cookie = require("./cookie.js");

module.exports = {
  
  configurar: async(servidor) => {
    servidor.get("/jogos", module.exports.verJogos);
  },
  
  verJogos: async(request, reply) => {
    let valido = await cookie.validacao(request.cookies.Autenticacao);
    
    if( !valido ){
      reply.view("/src/Paginas/index.hbs", { 
        seo: seo,
        error: "Usuário deve se autenticar"
      });
      return;
    }
    
    let select = await db.ObterJogos();
    
    reply.view("/src/Paginas/jogos.hbs", { 
      seo: seo,
      jogos: select
    });
  },
  
}