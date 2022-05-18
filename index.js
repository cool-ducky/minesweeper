const express = require("express");
const app = express();

const { verifyKeyMiddleware } = require("discord-interactions");

const genBoard = require("./genBoard");
const sendBoard = require("./sendBoard");
const editComponents = require("./editComponents");

app.post("/minesweep", verifyKeyMiddleware(process.env.PUBLIC_KEY), async (req, res) => {
  const { body } = req;
  const { data, member, user, type } = body;
  if (type == 2) {
    if (data.name !== "minesweeper") return;
    res.send({ type: 5 })
    const board = await genBoard(5, 5, 5, body.member.user.id);
    sendBoard(board, body);
  }
  if (type == 3) {

    const custom_id = JSON.parse(body.data.custom_id);
    if (custom_id.i !== body.member.user.id) { return res.send({ type: 4, data: { content: "Start your own game by using the /minesweeper command!", flags: 64 } }) };
    res.send({ type: 6 })
    if (custom_id?.again) {
      const board = await genBoard(5, 5, 5, body.member.user.id);
      return sendBoard(board, body);
    }
    editComponents(body);
  };
});

const PORT = process.env.PORT || 500
app.listen(PORT);

