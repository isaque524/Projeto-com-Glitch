const Base64 = require("js-base64");
const db     = require("./sqlite.js");

module.exports = {
  
  // Validate Authentication Cookie
  isValid: async(Authentication) => {
    console.log("exec isValid");
    // Exists ?
      if( Authentication == null || Authentication == undefined ) {
        console.error("User not Authenticated")
        return false;
      }
    // Valid ?
      let credentials = Base64.decode(Authentication).split(":");
      let result = await db.getPassword(credentials[0], credentials[1]);
      if( result.length === 0 ){
        console.error("Bad Cookie Value")
        return false;
      }
    
    return true
  }

}