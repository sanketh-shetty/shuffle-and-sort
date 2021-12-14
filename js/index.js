let deviceType = "small";
const mediaQuery = window.matchMedia("(min-width: 960px)");
let grid;

window.addEventListener("load", () => {
  grid = new Grid(3);
  deviceType = mediaQuery.matches ? "large" : "small";
});

mediaQuery.addListener((e) => {
  deviceType = e.matches ? "large" : "small";
  grid.renderCards();
});

const btnShuffleOnClick = () => {
  grid.shuffle();
};

const btnSortClick = () => {
  grid.sort();
};

/**********************
Grid Implementation
*********************/
class Grid {
  constructor(size) {
    this.size = size;
    this.len = size * size;
    this.posArr = new Array(this.len);
    this.init();
  }

  init = () => {
    for (let i = 0; i < this.len; i++) {
      this.posArr[i] = i + 1;
      this.addCard(this.posArr[i]);
    }
  };

  addCard = (text) => {
    var node = document.createElement("div");
    node.textContent = text;
    node.setAttribute("class", "box");
    document.querySelector(".container").appendChild(node);
  };

  shuffle = () => {
    for (let i = 0; i < grid.len; i++) {
      let j = Math.floor(Math.random() * grid.len);
      let tmp = this.posArr[j];
      this.posArr[j] = this.posArr[i];
      this.posArr[i] = tmp;
    }
    this.renderCards();
  };

  sort = () => {
    this.posArr.sort();
    this.renderCards();
  };

  renderCards = () => {
    for (let i = 1; i <= grid.len; i++) {
      let pos = this.posArr.indexOf(i);
      let row =
        deviceType === "small" ? pos + 1 : Math.ceil((pos + 1) / grid.size);
      let col = deviceType === "small" ? 1 : (pos % grid.size) + 1;
      //console.log(`${i} should goto ${row} ${col}`);
      document.querySelector(`.box:nth-of-type(${i})`).style.gridRow = row;
      document.querySelector(`.box:nth-of-type(${i})`).style.gridColumn = col;
    }
  };
}
