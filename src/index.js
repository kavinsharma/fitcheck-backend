const app = require("./app.js");
const config = require("./config");
const { connectToDb } = require("./core/scripts/db.connection.js");
const PORT = config.PORT ?? 8080;

app.listen(PORT, async () => {
  console.log("🚀 ~ app.listen ~ PORT:", `${PORT}`);
  const isConnected = await connectToDb();
  if (!isConnected) {
    console.error("Process has been terminated due to db connection failure!!");
    process.exit(0);
  }
});
