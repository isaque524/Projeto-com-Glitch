const seo    = require("./seo.json");

module.exports = {
  
  configurar: async(servidor) => {
    servidor.get("/", module.exports.verLogin);
  },
  
  verLogin: async(request, reply) => {
    reply.view("/src/Paginas/index.hbs", { seo: seo });
  }  
  
};