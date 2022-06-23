const ctrl = require("./ctrlCookie.js");
const home = require("./ctrlViewHome.js");
const db   = require("../database/sqlite.js");

module.exports = {
  
  listen: async(fastify) => {
    fastify.post("/delete/rent", module.exports.deleteJogo);
  },
  
  deleteRent: async(request, reply) => {
    console.log("exec deleteRent");
    // Validate authentication cookie
      await ctrl.validateCookie(request, reply);
    
    // Variables
      let [user, password] = request.cookies.Authentication.split(":");
      let isbn = request.body.isbn;
      let result, id_user, name, quantity, params;
    