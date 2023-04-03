const express = require("express");
const app = express();

const PORT = process.env.PORT || 3004;

app.get("/health", (req, res) => {
      return res.status(200).json({message: "healthy", status: 200})
})

app.get("/users", (req, res) => {
      return res.status(200).json({data: [{userName: "aman12", name: "Aman Gahlot", email: "amangahlot@gmail.com", address: "Bhadauriya District Ballarshah"}], status: 200})
})

app.listen(PORT, () => {
      console.log("app is listening port", PORT)
});

