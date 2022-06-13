const seo    = require("../seo.json");
const db     = require("../sqlite.js");
const cookie = require("../validateCookie.js");
var servidor = null

module.exports = {
  
  listen: async(servidor) => {
    // GET on /books 
    servidor.get("/books", module.exports.viewBooks);
    // POST on /books
    //servidor.post("/books", module.exports.viewBooks);
  },
  
  viewBooks: async(request, reply) => {
    console.log("exec viewBooks");
    // params
      let params = request.query.raw ? {} : { seo: seo };
    // Validate Authentication Cookie
      let isValid = await cookie.isValid(request.cookies.Authentication);
      if( !isValid ){
        params.error = "Usuário deve se autenticar";
        reply.view("/src/pages/login.hbs", params);
        return;
      }
    // Acessing book's table
      params.books = await db.getBooks();
    // Show books.hbs
      reply.view("/src/pages/books.hbs", params);
  }
  
}