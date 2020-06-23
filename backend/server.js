const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const PORT = process.env.PORT || 5000;
const morg = require("morgan");

app.get("/", (req, res) => res.send("API Running"));
app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});

app.use(morg("dev"));
app.use(express.json({ extended: false }));
app.use("/api", require("./user"));
app.use("/ques", require("./Question"));
