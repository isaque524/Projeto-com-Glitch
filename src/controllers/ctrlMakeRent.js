const seo    = require("../seo.json");
const db     = require("../sqlite.js");
const cookie = require("../validateCookie.js");
var servidor = null

module.exports = {
  
  listen: async(servidor) => {
    // GET on /rent
    servidor.get("/rent", module.exports.viewRent);
    // POST on /rent
    //servidor.post("/rent", module.exports.viewRent);
  },
  
  viewRent: async(request, reply) => {
    console.log("exec viewRent");
    // params
      let params = request.query.raw ? {} : { seo: seo };
    // Validate Authentication Cookie
      let isValid = await cookie.isValid(request.cookies.Authentication);
      if( !isValid ){
        params.error = "Usuário deve se autenticar";
        reply.view("/src/pages/login.hbs", params);
        return;
      }
    // Show login.hbs
      reply.view("/src/pages/rent.hbs", params);
  },

}