const path = require("path");
const servidor = require("fastify")({
  logger: false
});;
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
  secret: `${process.env.COOKIE_SECRET}`, // Secret Key
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

// Injeção de dependência
let nomesCtrl = process.env.CONTROLADORES.split(","); 
console.log(nomesCtrl);
for(let i = 0; i < nomesCtrl.length; i++) {
  let ctrl = require(`./src/${nomesCtrl[i]}.js`);
  ctrl.configurar(servidor);
}