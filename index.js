const path = require("path");
const express = require("express");
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const { verifyKeyMiddleware } = require("discord-interactions");

const genBoard = require("./bot/genBoard");
const sendBoard = require("./bot/sendBoard");
const editComponents = require("./bot/editComponents");

app.post("/minesweep", verifyKeyMiddleware(process.env.PUBLIC_KEY), async (req, res) => {
  const { body } = req;
  const { data, member, user, type } = body;
  if (type == 2) {
    if (data.name !== "minisweeper") return;
    res.send({ type: 5 })
    const board = await genBoard(5, 5, 5, body);
    sendBoard(board, body);
  }
  if (type == 3) {

    const custom_id = JSON.parse(body.data.custom_id);
    if (custom_id.i !== body.member.user.id) { return res.send({ type: 4, data: { content: "💣 Start your own game by using the /minisweeper command!", flags: 64 } }) };
    res.send({ type: 6 })
    if (custom_id?.again) {
      const board = await genBoard(5, 5, 5, body);
      return sendBoard(board, body);
    }
    editComponents(body);
  };
});


app.get("/", (req, res) => {
  res.sendFile('index.html', {root: "./public" })
})

const PORT = process.env.PORT || 500
app.listen(PORT);

