const seo = require("./seo.json");
const db  = require("./sqlite.js");
const Base64 = require("js-base64");

module.exports = {
  
  configurar: async(servidor) => {
    servidor.get("/cadastro", module.exports.viewCadastro);
    servidor.post("/cadastro", module.exports.validarCadastro);
  },
  
  viewCadastro: async(request, reply) => {
    console.log("Pagina de Cadastro GET /cadastro");
    let params = { seo: seo };
    reply.view("/src/Paginas/cadastro.hbs", params);
  },
  
  validarCadastro: async(request, reply) => {
    console.log("Pagina de Cadastro POST /cadastro");
    let params = { seo: seo };

    const usuario = request.body.usuario;
    const senha = request.body.senha;
    if( senha.length > 20 || usuario.length > 20 ){
      params.error = "Usuário e Senha devem possuir o máximo de 20 Caracteres";
      reply.view("/src/Paginas/cadastro.hbs", params);
      return;
    }
    
    if( usuario.includes(":") || senha.includes(":") ){
      params.error = "Caracter reservado não permitido";
      reply.view("/src/Paginas/cadastro.hbs", params);
      return;
    }

    let select = await db.ProcurarCadastro(usuario);
    if( select.length != 0 ){
      params.error = "Usuário já existente";
      reply.view("/src/Paginas/cadastro.hbs", params);
      return;
    }

    await db.CriarUsuario(usuario, Base64.encode(senha));
    console.log(`Usuario ${usuario} cadastrado no banco de dados`);
    reply.view("/src/Paginas/index.hbs", params);
  }
  
};