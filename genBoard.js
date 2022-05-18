module.exports = (mines, rows, columns, id) => {
  let board = [];
  let rowsCreated = 0;
  let columnsCreated = 1;
  let rowArray = []
  //creation of board
  for (let i = 0; i < rows * columns; i++) {
    rowsCreated++;
    let tile = {
      y: columnsCreated, //column #
      x: rowsCreated, //row #
      m: false, //if there is a mine there
      l: 0,//the label of the tile
      c: false, //clicked
      f: false, //flagged
      i: id //id of user
    };
    rowArray.push(tile);
    if (rowsCreated + 1 > rows) {
      columnsCreated++;
      rowsCreated = 0;
      board.push(rowArray)
      rowArray = []
      if (columnsCreated > columns) {
        break;
      };
    };
  };
  //adding mines randomly
  let minesGen = [];
  whileloop:
  while (minesGen.length !== mines) {
    let randomRow = Math.floor(Math.random() * (rows - 1 + 1) + 1);
    let randomColumn = Math.floor(Math.random() * (columns - 1 + 1) + 1);
    let tile = {
      x: randomRow,
      y: randomColumn
    };
    if (minesGen.length == 0) {
      minesGen.push(tile);
      continue;
    };
    for (const placedMine of minesGen) {
      if ((placedMine.x == tile.x) && (placedMine.y == tile.y)) {
        continue whileloop;
      };
    };
    minesGen.push(tile);
  };
  //adding labels + mines to board
  for (const mine of minesGen) {
    let mineTile = board[mine.y - 1][mine.x - 1].m = true;
    let labelx = -2; //one column left
    let labely = -2; //one row left
    for (let i = 0; i < 9; i++) {
      if (((mine.y + labely >= 0) && (mine.y + labely <= 4)) && ((mine.x + labelx >= 0) && (mine.x + labelx <= 4))) {
        let tile = board[mine.y + labely][mine.x + labelx];
        tile.l = tile.l + 1;
      };
      labelx++;
      if (labelx == 1) {
        labelx = -2;
        labely++;
      };
    }
  };
  //to view the board in the , uncommnet below
  /*let string = "";
  for (const row of board) {
    for (const tile of row) {
      if (tile.m) {
        string += "💣";
      } else {
        string += tile.l;
      };
    };
    string += "\n";
  };
  console.log(string);*/
  return board;
};