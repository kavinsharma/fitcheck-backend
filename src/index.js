const app = require("./app.js");
const config = require("./config");
const PORT = config.PORT ?? 8080;

app.listen(PORT, async () => {
  console.log(`🚀 ~ app.listen ~ PORT: ${PORT}`);
});
