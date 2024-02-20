import { lvl1 } from "./blockok.js";

document.addEventListener("DOMContentLoaded", () => {
  let player = document.querySelector(".player");
  let level; // kulonbozo szimbolumok jelzik hogy mi hol van

  let jatekter = document.querySelector("#menu");
  let blockok = document.querySelector("#block");
  const kulcs = document.querySelector("#kulcs");
  const img3 = document.querySelector("#kep3");
  const img4 = document.querySelector("#kep4");

  let key = blockok.getContext("2d");
  let char = jatekter.getContext("2d");
  let kozga = blockok.getContext("2d");

  let x = 10;
  let y = 139;
  let width = 4;
  let height = 3;

  let velxj = 0;
  let velxb = 0;
  let vely = 0;

  let speed = 1;
  let jumpstrenght = 45;

  let grav = 0.5;
  let coll = false;
  let hasKey = false;

  function delay(mennyi) {
    return new Promise((resolve) => setTimeout(resolve, mennyi));
  }

  function sideCheck() {
    if (x < 0) x = 300;
    if (x > 300) x = 0;
  }

  async function jump() {
    for (let i = 0; i < jumpstrenght; i++) {
      for (let j = 0; j < lvl1.length; j++) {
        let block = lvl1[j];
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

  addEventListener("keydown", function (e) {
    if (e.code == "KeyD") velxj = +speed;
    if (e.code == "KeyA") velxb = -speed;
    if (e.code == "ArrowRight") velxj = speed;
    if (e.code == "ArrowLeft") velxb = -speed;
    if (e.code == "Space") {
      if (coll) {
        jump();
      }
    }
    sideCheck();
    console.log(x, y);
  });

  addEventListener("keyup", function (e) {
    if (e.code == "KeyD") velxj = 0;
    if (e.code == "KeyA") velxb = 0;
    if (e.code == "ArrowRight") velxj = 0;
    if (e.code == "ArrowLeft") velxb = 0;
    sideCheck();
  });

  function update() {
    if (coll == false) grav = 0.65;
    x += velxb;
    x += velxj;
    y += vely + grav;
    coll = false;

    for (let i = 0; i < lvl1.length; i++) {
      let block = lvl1[i];
      let bx = block.x;
      let by = block.y;
      let bwidth = block.width;
      let bheight = block.height;

      kozga.fillRect(bx, by, bwidth, bheight);
      kozga.fillStyle = "red";

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
          y = by - height;
          coll = true;
        }
        if (y < by - bheight) {
          coll = false;
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
      if (x + width > 285 && y < 10 && hasKey) {
        document.querySelector("#cel").innerHTML = "Gratula, nyertél!";
        velxb = 0;
        velxj = 0;
      }
      if (x + width < 285 && y < 10) {
        document.querySelector("#cel").innerHTML = "";
      }
    }

    char.clearRect(0, 0, jatekter.width, jatekter.height);
    char.drawImage(img4, x, y);
    key.drawImage(kulcs, 215, 53);
    //215 53
    // 261- 267, 100
    //char.fillRect(x, y, width, height);

    if (x > 260 && y == 100 && x < 270 && y == 100) {
      hasKey = true;
      // key.fillRect(0, 0, jatekter.width, jatekter.height);
      console.log(hasKey);
    }

    console.log(hasKey);

    if (hasKey) {
      // key.fillRect(215, 53, jatekter.width, jatekter.height);

      // rá kéne jonni a kulcs torlesere
      //key.clearRect(10, 10, jatekter.width, jatekter.height)

      //clearrecttel lehet torolni, csak goofy 
      // lehet hogy kulon canvas kene neki
      // meg ha a palya rajzolast kulon fuggvenybe tennenk akkor lehet hogy tudnank parameterezni az updatet

      // majd meg csinalok leveleket
      // meg szepitem a kodot
      // meg meg csiszolni kene az egeszet



      // a kodot kene majd szepiteni mert otvaar
    }

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
