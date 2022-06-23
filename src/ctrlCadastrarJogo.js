const seo = require("./seo.json");
const db  = require("./sqlite.js");
const cookie = require("./cookie.js");

module.exports = {
  
  configurar: async(servidor) => {
    servidor.post("/jogo", module.exports.cadastrarJogo);
  },
  
  cadastrarJogo: async(request, reply) => {
    let valido = await cookie.validacao(request.cookies.Autenticacao);
    
    if( !valido ){
      reply.view("/src/Paginas/index.hbs", { 
        seo: seo,
        error: "Usuário deve se autenticar"
      });
      return;
    }
    
    let nome_jogo = request.body.nome_jogo;
    let decricao_jogo = request.body.decricao_jogo;
    let url_jogo = request.body.url_jogo; 
    
    let select = await db.ObterJogos();
    
    reply.view("/src/Paginas/jogos.hbs", { 
      seo: seo,
      jogos: select
    });
  },
  
}