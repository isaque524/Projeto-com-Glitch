const seo = require("./seo.json");
const db  = require("./sqlite.js");
const cookie = require("./cookie.js");
const Base64 = require("js-base64");


module.exports = {
  
  configurar: async(servidor) => {
    servidor.get("/admin", module.exports.verAdmin);
  },
  

  verAdmin: async(request, reply) => {
    let valido = await cookie.validacao(request.cookies.Autenticacao);
    let credenciais = Base64.decode(request.cookies.Autenticacao).split(":"); 
    if(credenciais[0] != "Administrador" ){
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