
function editButtons(showAll) {
  const url = new URL(window.location.href);
  const boardData = url.searchParams.get("board");
  if (!boardData) return false;
  let board = boardData.split("-");
  board.pop()
  if (board.length !== 25) return false;
  const buttons = document.getElementById("buttons").querySelectorAll("*");
  let tile = 0;
  const colors = {
    "n": "#5865f2",
    "m": "#f04747",
    "f": "#43b581"
  }
  for (const button of buttons) {
    if (button.tagName == "BR") continue;
    let label = board[tile];
    if (!showAll) {
      if (label < 10) { button.innerHTML = label; button.style["background-color"] = "#4f545c" }
      if (label >= 10) { button.innerHTML = "‎"; button.style["background-color"] = "#5865f2"; };
    } else {
      if (label >= 10) label = label - 10;
      if (!isNaN(label)) { button.innerHTML = label; button.style["background-color"] = "#4f545c"; }
      if (label == 10) { button.innerHTML = "💣"; button.style["background-color"] = "#f04747"; };
    }
    if (label == "m") { button.innerHTML = "💣"; button.style["background-color"] = "#f04747"; };
    if (label == "f") { button.innerHTML = "🚩"; button.style["background-color"] = "#43b581"; };
    tile++;
  }
}
editButtons(false);

let reveal = document.getElementById("reveal");
reveal.onclick = function() {
  if(reveal.innerHTML == "Reveal Board") {
    editButtons(true);
    reveal.innerHTML = "Unreveal Board";
  } else {
    editButtons(false);
    reveal.innerHTML = "Reveal Board";
  }
}

let share = document.getElementById("share");
share.onclick = function() {
  let editUrl = window.location.href.split("?")
  //navigator.clipboard.writeText(editUrl[0] + "share/?" + editUrl[1]);
  navigator.clipboard.writeText(window.location.href)
  share.innerHTML = "Copied to 📋";
  share.style["background-color"] = "#43b581"
}