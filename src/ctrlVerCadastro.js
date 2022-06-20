const seo    = require("./seo.json");
const db     = require("./sqlite.js");
const Base64 = require("js-base64");

module.exports = {
  
  configurar: async(servidor) => {
    servidor.get("/cadastro", module.exports.verCadastro);
  },
  
  verCadastro: async(request, reply) => {
    reply.view("/src/Paginas/cadastro.hbs", { seo: seo });
  }
  
}