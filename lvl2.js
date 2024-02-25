import { lvl2 } from "./blockok.js";
import { delay } from "./funct.js";
import { sideCheck } from "./funct.js";

window.addEventListener("DOMContentLoaded", () => {
    let jatekter = document.querySelector(".menu");
    let blockok = document.querySelector(".block");
    const key = document.querySelector("#key");
    const karakter = document.querySelector("#charImg");

    let kulcs = jatekter.getContext("2d");
    let char = jatekter.getContext("2d");
    let kozga = blockok.getContext("2d");

    let x = 0;
    let y = 139;
    let height = 4;
    let width = 3;

    let velxb = 0;
    let velxj = 0;
    let vely = 0;

    let speed = 1;
    let jumpstrenght = 45;
    let grav = 0.5;
    let coll = false;
    let hasKey = false;

    addEventListener("keydown", function(e){
        if(e.code == "KeyD" || e.code == "ArrowRight") velxj = +speed;
        if(e.code == "KeyA" || e.code == "ArrowLeft") velxb = -speed;
        if(e.code == "Space"){
            if(coll){
                jump();
            }
        }
        x = sideCheck(x);
    });

    addEventListener("keyup", function(e){
        if(e.code == "KeyD"|| e.code == "ArrowRight") velxj = 0;
        if(e.code == "KeyA" || e.code == "ArrowLeft") velxb = 0;
         x = sideCheck(x);
    });

    async function jump(){
        for(let i = 0; i< jumpstrenght; i++){
            for(let j = 0; j < lvl2.length; j++){
                let block = lvl2[j];
                let bx = block.x;
                let by = block.y;
                let bwidth = block.width;
                let bheight = block.height;
                x = sideCheck(x);
                if(
                    y <= by + bheight &&
                    y + height >= by + bheight &&
                    x + width >= bx &&
                    x <= bx + bwidth 
                ){
                    coll = true;
                    y = by + bheight - 1;
                }
            }
            await delay(3);
            y -= 1;
        }
    }

    // function DrawLevel(){
    //     for(let i = 0; i < lvl2.lenght; i++){
    //         let block = lvl2[i];
    //         let bx = block.x;
    //         let by = block.y;
    //         let bwidth = block.width;
    //         let bheight = block.height;
            
    //         kozga.fillRect(bx, by, bwidth, bheight);
    //         kozga.fillStyle = "red";

    //         if (
    //             (y + height >= by &&
    //               y + height <= by + bheight &&
    //               x + width >= bx &&
    //               x + width <= bx + bwidth + 3) ||
    //             (y + height <= by &&
    //               y + height <= by + bheight &&
    //               x >= bx &&
    //               x <= bx + bwidth + 5)
    //           ) {
    //             if (y < by && y > by - bheight && y + height > by - bheight) {
    //               y = by - height;
    //               coll = true;
    //             }
    //             if (y < by - bheight) {
    //               coll = false;
    //             }
    //             if (y > by && y + height > by) {
    //               y = by + bheight;
    //               coll = true;
    //             }
    //             if (y > by + bheight && x > bx && x < bx + bwidth) {
    //               y = by + bheight - 1;
    //               coll = true;
    //             }
            
    //           }
    //           console.log("hhhh")
    //           if (x + width > 285 && y < 10 && hasKey) {
    //             // levelCompleted();
    //           }
    //         //   if (x + width < 285 && y < 10) {
    //         //     document.querySelector("#cel").innerHTML = "";
    //         //   }
            
    //     }
    // }

    // function update(){
    //     if(coll == false) grav = 0.65
    //     x += velxb;
    //     x += velxj;
    //     y += vely + grav;
    //     coll = false

    //     DrawLevel();

    //     char.clearRect(0, 0, jatekter.width, jatekter.height);
    //     char.drawImage(karakter, x, y);
    //     kulcs.drawImage(key, 0, 0);

    //     // kulcs helye
    //     // if (x > 260 && y == 100 && x < 270 && y == 100) {
    //     //     hasKey = true;
    //     //     // key.fillRect(0, 0, jatekter.width, jatekter.height);
            
    //     // }
    //     if(hasKey) {
    //         kulcs.clearRect(10, 10, jatekter.width, jatekter.height);
    //         char.drawImage(karakter, x, y);
    //     }

    //     requestAnimationFrame(update);
    // }
    function update() {
        if (coll == false) grav = 0.65;
        x += velxb;
        x += velxj;
        y += vely + grav;
        coll = false;
    
        for (let i = 0; i < lvl2.length; i++) {
          let block = lvl2[i];
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
        //   if (x + width > 285 && y < 10 && hasKey) {
        //     levelCompleted();
        //   }
        //   if (x + width < 285 && y < 10) {
        //     document.querySelector("#cel").innerHTML = "";
        //   }
        }
    
        char.clearRect(0, 0, jatekter.width, jatekter.height);
        char.drawImage(karakter, x, y);
        kulcs.drawImage(key, 215, 53);
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
          kulcs.clearRect(10, 10, jatekter.width, jatekter.height);
          char.drawImage(img4, x, y);
    
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