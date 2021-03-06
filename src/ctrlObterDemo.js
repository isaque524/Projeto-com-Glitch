const seo = require("./seo.json");
const db  = require("./sqlite.js");
const cookie = require("./cookie.js");
const Base64 = require("js-base64");
const uuid = require('uuid');

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
    let usuario = Base64.decode(request.cookies.Autenticacao).split(":")[0];
    
    let select = await db.ProcurarUsuario(usuario);
    let id_usuario = select[0].id;
    
    select = await db.ObterJogo(jogo);
    let id_jogo = select[0].id;
    
    let chave_produto = uuid.v4();
    
    await db.CriarDemo(id_usuario, id_jogo, chave_produto);
    
    // Direcionar para a página do usuário
    
    let credenciais = Base64.decode(request.cookies.Autenticacao).split(":"); 
    if(credenciais[0] == "Administrador" ){
      return reply.view("/src/Paginas/index.hbs", { 
        seo: seo,
        error: "ADM não pode ter tabela"
      });
    }else{    
    reply.view("/src/Paginas/usuario.hbs", { 
        seo: seo,
        demos: await db.ObterDemoUsuario(id_usuario)
      });
      return;
    }
  }
  
}