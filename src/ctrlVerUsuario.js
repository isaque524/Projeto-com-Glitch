const seo = require("./seo.json");
const db  = require("./sqlite.js");
const cookie = require("./cookie.js");
const Base64 = require("js-base64");

module.exports = {
  
  configurar: async(servidor) => {
    servidor.get("/usuario", module.exports.verUsuario);
  },
  
  verUsuario: async(request, reply) => {
    let valido = await cookie.validacao(request.cookies.Autenticacao);
    if( !valido ){
      reply.view("/src/Paginas/index.hbs", { 
        seo: seo,
        error: "Usuário deve se autenticar"
      });
      return;
    }
    
    let usuario = Base64.decode(request.cookies.Autenticacao).split(":")[0];
    let select = await db.ProcurarUsuario(usuario);
    let id_usuario = select[0].id;
    
    reply.view("/src/Paginas/usuario.hbs", { 
      seo: seo,
      demos: await db.ObterDemoUsuario(id_usuario)
    });
  }
  
}