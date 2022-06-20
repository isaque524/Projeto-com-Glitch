const seo    = require("./seo.json");

module.exports = {
  
  configurar: async(servidor) => {
    servidor.get("/", module.exports.viewLogin);
  },
  
  viewLogin: async(request, reply) => {
    reply.view("/src/Paginas/index.hbs", { seo: seo });
  }  
  
};