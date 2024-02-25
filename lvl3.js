import { lvl3 } from "./blockok.js";
import { lvl3trap } from "./blockok.js";
import { delay } from "./funct.js";
import { sideCheck } from "./funct.js";
import { GameCompMusic } from "./funct.js";

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#start").play();
  document.querySelector("#bgmusic").play();

  let jatekter = document.querySelector(".lvl3");
  let blockok = document.querySelector(".palya3");
  let traplayer = document.querySelector(".trap");
  const key = document.querySelector("#key");
  const karakter = document.querySelector("#charImg");

  let kulcs = jatekter.getContext("2d");
  let char = jatekter.getContext("2d");
  let kozga = blockok.getContext("2d");
  let trap = traplayer.getContext("2d");

  let x = 0;
  let y = 140;
  let height = 4;
  let width = 3;

  let velxb = 0;
  let velxj = 0;
  let vely = 0;

  let speed = 1;
  let jumpstrenght = 55;
  let grav = 1.5;
  let coll = false;
  let hasKey = false;

  addEventListener("keydown", function (e) {
    if (e.code == "KeyD" || e.code == "ArrowRight") velxj = +speed;
    if (e.code == "KeyA" || e.code == "ArrowLeft") velxb = -speed;
    if (e.code == "Space") {
      if (coll) {
        jump();
      }
    }
    x = sideCheck(x);
  });

  addEventListener("keyup", function (e) {
    if (e.code == "KeyD" || e.code == "ArrowRight") velxj = 0;
    if (e.code == "KeyA" || e.code == "ArrowLeft") velxb = 0;
    x = sideCheck(x);
  });

  async function jump() {
    for (let i = 0; i < jumpstrenght; i++) {
      for (let j = 0; j < lvl3.length; j++) {
        let block = lvl3[j];
        let bx = block.x;
        let by = block.y;
        let bwidth = block.width;
        let bheight = block.height;
        sideCheck();
        if (
          y <= by + bheight &&
          y + height >= by + bheight &&
          x + width >= bx &&
          x <= bx + bwidth
        ) {
          coll = true;
          y = by + bheight - 1;
        }
      }
      await delay(3);
      y -= 1;
    }
  }

  function gameComp() {
    jatekter.style.display = "none";
    blockok.style.display = "none";
    traplayer.style.display = "none";
    document.querySelector("#vege").style.display = "block";
  }

  function levelCompleted() {
    jatekter.style.display = "none";
    blockok.style.display = "none";
    document.querySelector(".level_done").style.display = "block";
  }

  function csapdarajzol() {
    for (let i = 0; i < lvl3trap.length; i++) {
      let trapp = lvl3trap[i];
      let bx = trapp.x;
      let by = trapp.y;
      let bwidth = trapp.width;
      let bheight = trapp.height;

      trap.fillStyle = "green";
      trap.fillRect(bx, by, bwidth, bheight);
    }
  }
  csapdarajzol();

  function csapdafigyel() {
    for (let i = 0; i < lvl3trap.length; i++) {
      let block = lvl3trap[i];
      let bx = block.x;
      let by = block.y;
      let bwidth = block.width;
      let bheight = block.height;

      if (
        (x + width > bx &&
          x < bx + bwidth &&
          y + height > by &&
          y < by + bheight) ||
        (x > bx + bwidth &&
          x < bx + bwidth &&
          y + height > by &&
          y > by + bheight)
      ) {
        y += 10;
        document.querySelector("#death").play();
      }
    }
  }

  function palyarajzol() {
    for (let i = 0; i < lvl3.length; i++) {
      let block = lvl3[i];
      let bx = block.x;
      let by = block.y;
      let bwidth = block.width;
      let bheight = block.height;

      kozga.fillStyle = "red";
      kozga.fillRect(bx, by, bwidth, bheight);

    }
  }
  palyarajzol();

  function update() {
    csapdafigyel();
    console.log(x, y);
    grav = 1.25;
    x += velxb;
    x += velxj;
    y += vely + grav;
    coll = false;

    for (let i = 0; i < lvl3.length; i++) {
      let block = lvl3[i];
      let bx = block.x;
      let by = block.y;
      let bwidth = block.width;
      let bheight = block.height;

      if (
        (y + height >= by &&
          y + height <= by + bheight &&
          x + width >= bx &&
          x + width <= bx + bwidth + 3) ||
        (y + height <= by &&
          y + height <= by + bheight &&
          x >= bx &&
          x <= bx + bwidth + 5)
      ) {
        if (y < by && y > by - bheight && y + height > by - bheight) {
          y = by - height + 1;
          coll = true;
        }
        if (y > by && y + height > by) {
          y = by + bheight;
          coll = true;
        }
        if (y > by + bheight && x > bx && x < bx + bwidth) {
          y = by + bheight - 1;
          coll = true;
        }
      }
      console.log(hasKey);
    }
    if (hasKey) {
      if (x >= 280 && y >= 139) {
        GameCompMusic();
        gameComp();
        x = 0;
      }
    }

    char.clearRect(0, 0, jatekter.width, jatekter.height);
    char.drawImage(karakter, x, y);

    if (x + width > 295 && y == 7 && x < 300 && y == 7) {
      hasKey = true;
      console.log(hasKey);
      document.querySelector("#keyup").play();
    }

    if (!hasKey) kulcs.drawImage(key, 245, -40);

    if (y + 2 > 140) {
      y = 139;
      grav = 0;
      coll = true;
    }
    if (y < 0) y = 0;

    requestAnimationFrame(update);
  }

  update();
});
