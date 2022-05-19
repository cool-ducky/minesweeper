const fetch = require("node-fetch")
module.exports = async (board, body) => {
  let actionRows = [];
  let starter = false; //shows one tile, to start with
  for (const row of board) {
    let actionRow = {
      type: 1,
      components: []
    };
    for (const tile of row) {
      let component = {
        style: 1,
        type: 2,
        custom_id: JSON.stringify(tile),
        label: " "
      };
      if(tile.l == 0 && !starter) {
        tile.c = true
        component.label = "0";
        component.style = 2;
        tile.c = true;
        component.custom_id = JSON.stringify(tile);
        starter = true;
      };
      actionRow.components.push(component);
    };
    actionRows.push(actionRow);
  };
  const res = await fetch(`https://discord.com/api/v9/webhooks/${body.application_id}/${body.token}/messages/@original`, {
    method: "patch",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: "💣 Find the **5 bombs** to win.\n🚩 Use the flag reaction to flag mines.\n👉 *If there is no flag reaction, make sure to enable reactions.*\n📕 Learn to play minesweeper [here](<https://minesweepergame.com/strategy/how-to-play-minesweeper.php>)!",
      components: actionRows
    })
  });
  const data = await res.json()
  if (data?.id && data?.channel_id) {
    //react with a flag emoji
    const react = await fetch(`https://discord.com/api/v9/channels/${data.channel_id}/messages/${data.id}/reactions/%F0%9F%9A%A9/@me`, {
      method: "put",
      headers: { 'Authorization': 'Bot ' + process.env.BOT_TOKEN }
    });
  }
};