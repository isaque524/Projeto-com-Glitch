const fs = require("fs");
const dbFile = "./.data/farmacia.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const dbWrapper = require("sqlite");
const Base64 = require("js-base64");
let db;

dbWrapper.open( {filename: dbFile, driver: sqlite3.Database} )
  .then(async (dBase) => {
    db = dBase;
  
    try {
      // Banco de dados não existe
      if (!exists) {
          // Tabela usuário
          console.log("Criando o banco de dados da Farmacia");
          await db.run(
            "CREATE TABLE usuarios (id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, usuario VARCHAR[30], senha VARCHAR[200])"
          );
          // Usuário Admin
          await db.run(
            `INSERT INTO usuarios (usuario, senha) VALUES ("Administrador", "${Base64.encode(process.env.ADMIN_KEY)}")`
          );
        
      } else {
        console.log("Banco de dados existente");
        console.log( await db.all("SELECT * FROM usuarios") )
      }
      
    } catch (dbError) {
      console.error(dbError);
    }
  
  });

module.exports = {
  
  // Encontrar usuário no banco de dados
  Usuario: async(usuario) => {
    console.log(`Procurando usuário ${usuario}`);
    try {
      let select = db.all(`SELECT * FROM usuarios WHERE usuario="${usuario}"`);
      return select;
    
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  // Procurar usuário e senha no banco de dados
  UsuarioSenha: async(usuario, senha) => {
    console.log(`Procurando se a senha do usuário ${usuario} bate com a senha`);
    try {
      let select = db.all(`SELECT * FROM usuarios WHERE usuario="${usuario}" and senha="${senha}"`);
      return select;
      
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  // Criar usuario no banco de dados
  createUser: async(user, password) => {
    console.log("exec getPassword");
    try {
      await db.run(
        `INSERT INTO users (user, password) VALUES ("${user}", "${password}")`
      );
      
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
};
