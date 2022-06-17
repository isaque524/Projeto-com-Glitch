const fs = require("fs");
const dbFile = "./.data/jogos.db";
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
          console.log("Criando o banco de dados jogos");
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
  ProcurarUsuario: async(usuario, senha) => {
    console.log(`Procurando usuário ${usuario}`);
    try {
      let select = db.all(`SELECT * FROM usuarios WHERE usuario="${usuario}" and senha="${senha}"`);
      return select;
    
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  // Criar usuário no banco de dados
  CriarUsuario: async(usuario, senha) => {
    console.log(`Criando o usuário ${usuario}`);
    try {
      await db.run(
        `INSERT INTO usuarios (usuario, senha) VALUES ("${usuario}", "${senha}")`
      );
      
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  // Procurar se usuario já existe
  ProcurarCadastro: async(usuario) => {
    console.log(`Procurando pelo usuario ${usuario}`);
    try {
      let select = await db.all(`SELECT * FROM usuarios WHERE usuario="${usuario}"`);
      return select;
      
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  
  
  
};
