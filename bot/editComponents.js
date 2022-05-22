const fetch = require("node-fetch");
module.exports = async (body) => {
  
const data = JSON.parse(body.data.custom_id);
  
  const checkReaction = async () => {
    const res = await fetch(`https://discord.com/api/v9/channels/${message.channel_id}/messages/${message.id}/reactions/%F0%9F%9A%A9`, {
      method: "get",
      headers: { 'Authorization': 'Bot ' + process.env.BOT_TOKEN }
    });
    const reactions = await res.json();
    if (Symbol.iterator in Object(reactions)) {
      for (const reaction of reactions) {
        if (reaction.id == body.member.user.id) {
          return true;
        };
      };
    };
    return false;
  };

  const edit = async (message, loss = false, win = false) => {
    message.content = "⌨️ Coded by **ducky#8930**."
    if (!loss) {
      let tilesShown = 0;
      for (const rows of message.components) {
        for (const tile of rows.components) {
          let tileData = JSON.parse(tile.custom_id);
          if (tileData.c && !tileData.f) { tilesShown++ };
        };
      };
      if (tilesShown == 20) { win = true; };
    };
    let url = process.env.URL + "/?board=";
    if (loss || win) {
      let again = 0; //custom ids need to each be different
      message.components.forEach((rows, rowIndex) => {
        rows.components.forEach((tile, tileIndex) => {
          let custom_id = JSON.parse(tile.custom_id);
          if(tile.label == " ") {
            if(custom_id.m) {
              url += 20 + "-";
            } else {
            url += custom_id.l + 10 + "-";
            }
          } else {
            if(!custom_id.f && !custom_id.m) {
              url += custom_id.l + "-";
            } else {
              if(custom_id.m && !custom_id.f) url += "m-"
              if(custom_id.f) url += "f-"
            }
          }
          message.components[rowIndex].components[tileIndex].custom_id = JSON.stringify({i: body.member.user.id, again: true, number: again})
          again++;

        });
      });
    };
    if (loss) { message.content = `💣 Aw, you found a bomb!\n 👍 Click any button to play again.\n 👀 [Reveal the rest of the board!](<${url}>)` };
    if (win) { 
      const timeTook = (Math.floor(new Date().getTime() / 1000) - data.t);
      message.content = `🚩 Good job! You found all the mines!\n⌛ You took **${timeTook} seconds**!\n👍 Click any button to play again.\n 🔗 [Share your board!](<${url}>)` 
    };
    const res = await fetch(`https://discord.com/api/v9/webhooks/${body.application_id}/${body.token}/messages/@original`, {
      method: "patch",
      body: JSON.stringify({
        components: message.components,
        content: message.content
      }),
      headers: { 'Content-Type': 'application/json' }
    });
  };

  
  const { message } = body;
  const reacted = await checkReaction();
  if (reacted) {
    if (data.c && !data.f) { return; }; //if no flag and clicked, no flag
    if (data.f) {
      data.f = false;
      data.c = false;
      message.components[data.y - 1].components[data.x - 1] = {
        style: 1,
        label: " ",
        custom_id: JSON.stringify(data),
        type: 2
      };
    } else {
      data.c = true
      data.f = true
      message.components[data.y - 1].components[data.x - 1] = {
        style: 3,
        label: "🚩",
        custom_id: JSON.stringify(data),
        type: 2
      };
    };
    return edit(message);
  };
  if (data.c && !data.f) {
    let labelx = -2
    let labely = -2
    let lose = false;
    for (let i = 0; i < 9; i++) {
      if (((data.y + labely >= 0) && (data.y + labely <= 4)) && ((data.x + labelx >= 0) && (data.x + labelx <= 4))) {
        let component = message.components[data.y + labely].components[data.x + labelx];
        let tile = JSON.parse(component.custom_id);
        if (!tile.c && !tile.f) { //, if the tile is already clicked, and if it's flagged, ignore
          tile.c = true;
          if (tile.m) {
            lose = true;
            message.components[data.y + labely].components[data.x + labelx] = {
              style: 4,
              label: "💣",
              custom_id: JSON.stringify(tile),
              type: 2
            };
          } else {
            message.components[data.y + labely].components[data.x + labelx] = {
              style: 2,
              label: tile.l,
              custom_id: JSON.stringify(tile),
              type: 2
            };
          };
        };
      };
      labelx++;
      if (labelx == 1) {
        labelx = -2;
        labely++;
      };
    }
    if (lose) { return edit(message, true); };
    return edit(message);
  }
  if (!data.c && !data.f) {
    if (data.m) {
      message.components[data.y - 1].components[data.x - 1] = {
        style: 4,
        label: "💣",
        custom_id: JSON.stringify(data),
        type: 2
      };
      return edit(message, true);
    };
    data.c = true;
    message.components[data.y - 1].components[data.x - 1] = {
      style: 2,
      label: data.l,
      custom_id: JSON.stringify(data),
      type: 2
    };
    return edit(message);
  }
  //lose + win function
};
