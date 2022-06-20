const Base64 = require("js-base64");
const db     = require("./sqlite.js");

module.exports = {
  
  // Validação do Cookie de Autenticação
  validacao: async(Autenticacao) => {
    // Não Existe
      if( Autenticacao == null || Autenticacao == undefined ) {
        console.log("Usuário não autenticado")
        return false;
      }
    // Valor inválido
      let credenciais = Base64.decode(Autenticacao).split(":");
      let result = await db.ProcurarUsuario(credenciais[0], Base64.encode(credenciais[1]));
      if( result.length == 0 ){
        console.error("Valor inválido para o Cookie de Autenticação")
        return false;
      }
    // Valor válido
    return true
  }

}