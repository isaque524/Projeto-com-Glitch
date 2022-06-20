const seo = require("./seo.json");
const db  = require("./sqlite.js");
const cookie = require("./cookie.js");

module.exports = {
  
  configurar: async(servidor) => {
    servidor.get("/obter/demo", module.exports.obterDemo);
  },
  
  obterDemo: async(request, reply) => {
    let valido = await cookie.validacao(request.cookies.Autenticacao);
    
    if( !valido ){
      reply.view("/src/Paginas/index.hbs", { 
        seo: seo,
        error: "Usuário deve se autenticar"
      });
      return;
    }
    
    let jogo = request.query.nome;
    let usuario = Base64.decode(request.cookies.Autenticacao.split(":")[0];
    
    let select = await db.ObterJogo(jogo);
    let id_jogo = select[0].id;
    console.log(id_jogo);
    
    select = await db.ProcurarUsuario(usuario);
    let id_usuario = select[0].id;
    console.log(id_usuario);
    
  } //CriarDemo ObterJogo ProcurarUsuario
  
}