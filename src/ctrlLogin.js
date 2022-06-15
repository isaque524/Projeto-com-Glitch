const seo    = require("./seo.json");
const db     = require("./sqlite.js");
const Base64 = require("js-base64");

module.exports = {
  
  configurar: async(servidor) => {
    servidor.get("/", module.exports.viewLogin);
    servidor.post("/", module.exports.validarLogin);
  },
  
  viewLogin: async(request, reply) => {
    console.log("Pagina de Login GET /");
    let params = { seo: seo };
    reply.view("/src/Paginas/index.hbs", params);
  },
  
  validarLogin: async(request, reply) => {
    console.log("Pagina de Login POST /");
    let params = { seo: seo };

    const usuario = request.body.usuario;
    const senha = request.body.senha;
    if( senha.length > 20 || usuario.length > 20 ){
      params.error = "Usuário e Senha devem possuir o máximo de 20 Caracteres";
      reply.view("/src/Paginas/index.hbs", params);
      return;
    }
     
    let select = await db.ProcurarUsuario(usuario, Base64.encode(senha));
    if( select.length == 0 ){
      params.error = "Usuario ou Senha Incorreta";
      reply.view("/src/Paginas/index.hbs", params);
      return;
    }

    let Autenticacao = Base64.encode( `${usuario}:${senha}` );
    reply.setCookie('Autenticacao', Autenticacao, {
      domain: `${process.env.PROJECT_DOMAIN}.glitch.me`,
      path: '/',
      maxAge: 60 * 60, // 1 hora
      secure: true,
      sameSite: 'lax',
      httpOnly: true
    });
    request.cookies.Authentication = Autenticacao;
    
    console.log(`Usuario ${usuario} autenticado`);
    reply.view("/src/Paginas/jogos.hbs")
  }
  
};