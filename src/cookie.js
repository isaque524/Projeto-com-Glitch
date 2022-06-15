const Base64 = require("js-base64");
const db     = require("./sqlite.js");

module.exports = {
  
  // Validação do Cookie de Autenticação
  validacao: async(Autenticacao) => {
    console.log("exec isValid");
    // Não Existe
      if( Autenticacao == null || Autenticacao == undefined ) {
        console.log("Usuário não autenticado")
        return false;
      }
    // Valor inválido
      let credenciais = Base64.decode(Autenticacao).split(":");
      let result = await db.getUser(credenciais[0]);
      if( result.length === 0 || crypto.AES.decrypt(result[0].password, process.env.AES_Salt).toString(crypto.enc.Utf8) != crypto.AES.decrypt(credentials[1], process.env.AES_Salt).toString(crypto.enc.Utf8) ){
        console.error("Valor inválido para o Cookie de Autenticação")
        return false;
      }
    // Valor válido
    return true
  }

}