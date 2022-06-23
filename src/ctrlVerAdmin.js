const seo = require("./seo.json");
const db  = require("./sqlite.js");
const cookie = require("./cookie.js");

module.exports = {
  
  configurar: async(servidor) => {
    servidor.get("/admin", module.exports.verAdmin);
  },
  

  
  verAdmin: async(request, reply) => {
    let valido = await cookie.validacao(request.cookies.Autenticacao);
      let usuario = request.body.usuarior
      let body_pass = request.body.password;
    
    if(usuario!= "Administrador"  ){
      reply.view("/src/Paginas/index.hbs", { 
        seo: seo,
        error: "ADM deve se autenticar"
      });
      return;
    }
    
    reply.view("/src/Paginas/adm.hbs", { 
      seo: seo,
      ranking: await db.ObterTopDemos()
    });
  },
  
}