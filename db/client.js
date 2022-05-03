const mongoose = require("mongoose");
const { MONGODB_CONNECTION_URI } = process.env;
mongoose
  .connect(MONGODB_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

const client = mongoose.connection;

client.on("error", (error) => {
  console.log(error.message);
});

module.exports = client;
