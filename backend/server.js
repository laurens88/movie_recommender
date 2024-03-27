const { config } = require("./config/config");
const  app  = require("./app");

app.listen(process.env.PORT || config.server.port);
console.log(`Running on :${config.server.port}`);