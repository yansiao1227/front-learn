import express from "express";
import { renderToString } from "vue/server-renderer";
import { createApp } from "./app.js";
import mysql from "mysql2/promise";

const server = express();
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "yzl123",
  database: "switchmanager",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

server.get("/data", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM t_product");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});
server.get("/", (req, res) => {
  const app = createApp();

  renderToString(app).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
        <script type="importmap">
          {
            "imports": {
              "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
            }
          }
        </script>
        <script type="module" src="/client.js"></script>
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
    `);
  });
});

server.use(express.static("."));

server.listen(3000, () => {
  console.log("ready");
});
