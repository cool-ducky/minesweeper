function editButtons() {
  const url = new URL(window.location.href);
  const board = url.searchParams.get("board");
  if (!board) return;
  board.split("");
  if (board.length !== 25) return;
  const buttons = document.getElementById("buttons").querySelectorAll("*");
  let tile = 0;
  const colors = {
    "n": "#5865f2",
    "b": "#f04747",
    "f": "#43b581"
  }
  for (const button of buttons) {
    if (button.tagName == "BR") continue;
    let label = board[tile];
    button.style["background-color"] = (!isNaN(label)) ? "#5865f2" : colors[label];
    if (!isNaN(label)) button.innerHTML = label;
    if (label == "n") button.innerHTML = "‎";
    if (label == "b") button.innerHTML = "💣";
    if (label == "f") button.innerHTML = "🚩";
  tile++;
}
}
editButtons()