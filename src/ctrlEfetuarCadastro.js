const seo = require("./seo.json");
const db  = require("./sqlite.js");
const Base64 = require("js-base64");

module.exports = {
  
  configurar: async(servidor) => {
    servidor.post("/cadastro", module.exports.efeturarCadastro);
  },
  
  efeturarCadastro: async(request, reply) => {
    const usuario = request.body.usuario;
    const senha = request.body.senha;
    
    if( senha.length > 20 || usuario.length > 20 ){
      reply.view("/src/Paginas/cadastro.hbs", { 
        seo: seo,
        error: "Usuário e Senha devem possuir o máximo de 20 Caracteres"
      });
      return;
    }
    
    if( usuario.includes(":") || senha.includes(":") ){
      reply.view("/src/Paginas/cadastro.hbs", { 
        seo: seo,
        error: "Caracter reservado não permitido"
      });
      return;
    }

    let select = await db.ProcurarUsuario(usuario);
    if( select.length != 0 ){
      reply.view("/src/Paginas/cadastro.hbs", { 
        seo: seo,
        error: "Usuário já existente"
      });
      return;
    }

    await db.CriarUsuario(usuario, Base64.encode(senha));
    console.log(`Usuario ${usuario} cadastrado no banco de dados`);
    reply.view("/src/Paginas/index.hbs", { seo: seo });
  }
  
};