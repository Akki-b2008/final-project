require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");

connectDB();

app.listen(3005, () => {
  console.log("Aibuddy Server is running on Port 3005");
});
