const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const root = path.join(__dirname);

const sendHtml = (file) => (req, res) => {
  res.sendFile(path.join(root, file));
};

["/solutions", "/industries", "/about", "/contact"].forEach((route) => {
  const name = route.slice(1) + ".html";
  app.get(route, sendHtml(name));
});

app.use(express.static(root));

app.listen(PORT, () => {
  console.log(`Megamind site: http://localhost:${PORT}`);
});
