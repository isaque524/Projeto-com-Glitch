const hbs = require("handlebars")
const path = require("path");
const servidor = require("fastify")({
  logger: false    
});     
servidor.register(require("fastify-formbody"));
servidor.register(require("point-of-view"), {
  engine: {
    handlebars: require("handlebars")
  }    
});   
servidor.register(require("fastify-static"), {
  root: path.join(__dirname, "public"), 
  prefix: "/"
});
servidor.register(require('fastify-cookie'), {
  secret: `${process.env.COOKIE_SECRET}`,
  parseOptions: {}
});
servidor.listen(process.env.PORT, '0.0.0.0', function(err, address) {
  if (err) {
    servidor.log.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address}`);
});

const data = require("./src/data.json");
const db = require("./src/" + data.database);
const seo = require("./src/seo.json")
if (seo.url === "glitch-default") {
  seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

//
// Carga dinâmica dos controladores de Caso de Uso (Injeção de Dependência)
//
let nomesCtrl = process.env.CONTROLADORES.split(","); 
console.log(`Controladores : ${nomesCtrl.join(", ")}`);
for(let i = 0; i < nomesCtrl.length; i++) {
  let ctrl = require(`./src/${nomesCtrl[i]}.js`);
  ctrl.configurar(servidor);
}

//
// Carga dinâmica dos partials do meu sistema
//
const fs = require("fs");  
let nomesPartials = process.env.PARTIALS.split(","); 
console.log(nomesPartials);
for(let i = 0; i < nomesPartials.length; i++) {
  let nome = nomesPartials[i];
  hbs.registerPartial(nome, fs.readFileSync(path.join(__dirname, 'src', 'Paginas', 'partials', nome+'.hbs'), 'utf8'));
}