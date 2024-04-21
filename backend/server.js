const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 3333;

app.use(cors());
app.use(express.static("public"));

app.get("/players", async (req, res) => {
  const { ip, port, password } = req.query;

  try {
    const result = await axios(
      "http://" + ip + ":" + port + `/v1/api/players`,
      {
        method: "get",
        auth: {
          username: "admin",
          password: password,
        },
      }
    );

    res.send(result.data || {});
  } catch (e) {
    res.send({});
  }
});

app.get("/info", async (req, res) => {
  const { ip, port, password } = req.query;

  try {
    const result = await axios("http://" + ip + ":" + port + `/v1/api/info`, {
      method: "get",
      auth: {
        username: "admin",
        password: password,
      },
    });

    res.send(result.data || {});
  } catch (e) {
    res.send({});
  }
});

app.listen(port, () => {
  console.log("palserver Map is running on " + port);
});
