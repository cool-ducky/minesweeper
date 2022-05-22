module.exports = (req, res) => {
  let boardData = req.query.board.split("-")
  boardData.pop();
  let board = "|";
  let counter = 0;
  if (boardData.length == 25) {
    for (const tile of boardData) {
      if (counter == 5) {
        board += "\n|";
        counter = 0;
      }
      if (!isNaN(tile) && tile < 20) {
        board += (tile >= 10) ? " "+ tile - 10 +" ": " "+tile+" ";
      };
      if (tile == "m" || tile == 20) board += "💣"
      if (tile == "f") board += "🚩"
      board += "|";
      counter++;
    };
  } else {
    board = "Error, board data invalid.";
  };
  let description = `\`\`\`\n${board}\n\`\`\``
  res.send(`
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./index.css ">
  <link rel="icon"  href="./flag.png">
  <meta property="og:title" content="🚩 MiniSweeper" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="http://ducky.gq" />
  <meta property="og:image" content="./flag.png" />
  <meta property="og:description" content="${board}" />
  <meta name="theme-color" content="#FF0000">
  <title>MiniSweeper</title>
 <meta http-equiv="refresh" content="0; url=${process.env.URL}/?board=${req.query.board}" />
</head>
`)
}