const seo = require("./seo.json");
const db  = require("./sqlite.js");
const cookie = require("./cookie.js");

module.exports = {
  
  configurar: async(servidor) => {
    servidor.post("/jogo", module.exports.deletarJogo);
  },
  
  deletarJogo:  async(request, reply) => {
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
    
    await db.delJogo(nome_jogo, decricao_jogo, url_jogo);
    
    reply.view("/src/Paginas/jogos.hbs", { 
      seo: seo,
      jogos: await db.ObteJogos()
    });
  }
  
}

try {
        // User id
          result  = await db.getUser(user);
          id_user = result[0].id;
        // Delete rent
          await db.deleteRent(id_user, isbn);
        // Update Books
          result = await db.getBook(isbn);
          // Book has not been deleted
          if(result.length != 0){
            name     = result[0].name;
            quantity = result[0].quantity + 1;
            await db.updateBook(isbn, quantity);
          }
        
      } catch {
        // Error
          // Parameters
            params = await home.parameters(request);
            params.message = { error: "Erro interno, veja o log para detalhes" };
          // Reply
            console.error(`Delete rent internal error`);
            return reply.view("/src/pages/home.hbs", params);
      }
    