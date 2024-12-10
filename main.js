import http from "http";
import fs from "fs";
import path from "path";

function checkFolderExists(folderName) {
  const folderPath = path.join(__dirname, folderName);
  return fs.existsSync(folderPath);
}

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/data") {
      const dataPath = path.join(__dirname, "data.json");

      if (fs.existsSync(dataPath)) {
        fs.readFile(dataPath, "utf-8", (err, data) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Errori data failis wakitxvisas");
            return;
          }
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(data);
        });
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("data.json ver vipovet :| ");
      }
    } else if (req.url === "/random") {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ randomNumber }));
    } else if (req.url === "/html") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`
        <table border="1">
          <tr>
            <th>Saxeli</th>
            <th>Asaki</th>
          </tr>
          <tr>
            <td>levani</td>
            <td>25</td>
          </tr>
          <tr>
            <td>levani</td>
            <td>30</td>
          </tr>
        </table>
      `);
    } else if (req.url === "/current-time") {
      const currentTime = new Date().toISOString();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ currentTime }));
    } else if (req.url === "/users") {
      const data = [
        { id: 1, name: "levani" },
        { id: 2, name: "gio" },
        { id: 3, name: "irakli" },
      ];
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Route ver ipovna");
    }
  }
});

server.listen(3000, () => {
  console.log("serveri gashvebulia amaze http://localhost:3000");
});
