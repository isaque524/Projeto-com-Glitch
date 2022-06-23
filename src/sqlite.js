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
          console.log("Criando a tabela usuários");
          await db.run(
            "CREATE TABLE usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, usuario VARCHAR[30], senha VARCHAR[200])"
          );
          // Usuário Admin
          await db.run(
            `INSERT INTO usuarios (usuario, senha) VALUES ("Administrador", "${Base64.encode(process.env.ADMIN_KEY)}")`
          );
          
          // Tabela Jogos
          console.log("Criando a tabela jogos");
          await db.run(
            "CREATE TABLE jogos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR[30], descricao VARCHAR[200], imagem VARCHAR[100])"
          );
          // Jogos Padrões
          await db.run(
            `INSERT INTO jogos (nome, descricao, imagem) VALUES
              ("ELDEN RING", "Levante-se, Manchado, e seja guiado pela graça para brandir o poder do Elden Ring.", "https://cdn.glitch.global/a9ca4aa8-5634-4864-a73b-fd4799e547e2/elden.png?v=1655753287099"),
              ("GOD OF WAR", "Com a vingança contra os deuses do Olimpo no passado, Kratos agora vive no reino nórdico.", "https://cdn.glitch.global/a9ca4aa8-5634-4864-a73b-fd4799e547e2/good.webp?v=1655753345971"),
              ("FIFA", "EA SPORTS™ FIFA 22 deixa o jogo ainda mais real  e uma nova temporada de inovações em todos os modos.", "https://cdn.glitch.global/a9ca4aa8-5634-4864-a73b-fd4799e547e2/fifa-22-featured-image.png.adapt.crop16x9.575p.png?v=1655753298248"),
              ("FORZA", "Dirija centenas dos melhores carros do mundo e explore a paisagens do mundo aberto.", "https://cdn.glitch.global/a9ca4aa8-5634-4864-a73b-fd4799e547e2/thumb-1920-709880.jpg?v=1655753370976"),
              ("2K22", "Aprenda com os melhores do ramo quando quiser melhorar seus lances.", "https://cdn.glitch.global/a9ca4aa8-5634-4864-a73b-fd4799e547e2/header.jpg?v=1655753353655"),
              ("CUPHEAD", "Cuphead é um jogo de ação e tiros clássico,Inspirado nas animações infantis da década de 1930.", "https://cdn.glitch.global/a9ca4aa8-5634-4864-a73b-fd4799e547e2/cuphead.png?v=1655753278788")
            `
          );
          
          // Tabela Demos
          console.log("Criando a tabela demos");
          await db.run(
            "CREATE TABLE demos (id INTEGER PRIMARY KEY AUTOINCREMENT, id_usuario INTEGER, id_jogo INTEGER, chave_produto VARCHAR[70])"
          );
        
      } else {
        console.log("Banco de dados existente");
        //console.log( await db.all("SELECT * FROM usuarios") );
        //console.log( await db.all("SELECT * FROM jogos") );
        //console.log( await db.all("SELECT * FROM demos") );
      }
      
    } catch (dbError) {
      console.error(dbError);
    }
  
  });

module.exports = {
  
  // Encontrar usuário no banco de dados
  ObterUsuario: async(usuario, senha) => {
    try {
      let select = db.all(`SELECT * FROM usuarios WHERE usuario="${usuario}" and senha="${senha}"`);
      return select;
    
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  // Criar usuário no banco de dados
  CriarUsuario: async(usuario, senha) => {
    try {
      await db.run(
        `INSERT INTO usuarios (usuario, senha) VALUES ("${usuario}", "${senha}")`
      );
      
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  // Procurar se usuario já existe
  ProcurarUsuario: async(usuario) => {
    try {
      let select = await db.all(`SELECT * FROM usuarios WHERE usuario="${usuario}"`);
      return select;
      
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  // Obter jogo por id no database
  ObterJogo: async(nome) => {
    try {
      let select = await db.all(`SELECT * FROM jogos WHERE nome="${nome}"`);
      return select;
      
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  // Obter todos os jogos no database
  ObterJogos: async() => {
    try {
      let select = await db.all(`SELECT * FROM jogos`);
      return select;
      
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  // Criar um jogo no database
  CriarJogo: async(nome, descricao, imagem) => {
    try {
      await db.run(` INSERT INTO jogos (nome, descricao, imagem) VALUES ("${nome}", "${descricao}", "${imagem}") `);
      
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  // Apagar um jogo no database
  ApagarJogo: async(nome) => {
    try {
      await db.run(`DELETE FROM jogos WHERE nome="${nome}"`);
      
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  // Criar demo no database
  CriarDemo: async(id_usuario, id_jogo, chave_produto) => {
    try {
      await db.run(`INSERT INTO demos (id_usuario, id_jogo, chave_produto) VALUES (${id_usuario}, ${id_jogo}, "${chave_produto}")`);
      
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  // Obter relação de usuários - demos
  ObterDemoUsuario: async(id_usuario) => {
    try {
      let select = await db.all(`
        SELECT d.chave_produto, j.nome, j.descricao, j.imagem
        FROM demos d
        JOIN jogos j ON j.id = d.id_jogo
        WHERE d.id_usuario=${id_usuario}
      `);
      return select;
      
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  // Top demos clicadas
  ObterTopDemos: async() => {
    try {
      let select = await db.all(`
        SELECT
          j.nome,
          t1.ranking
        FROM (
          SELECT DISTINCT
            id_jogo,
            DENSE_RANK () OVER (ORDER BY id_jogo DESC) ranking
          FROM demos
        ) t1
        JOIN jogos j ON t1.id_jogo = j.id
      `);
      return select;
      
    } catch (dbError) {
      console.error(dbError);
    }
  }
  
};
