import { lvl2 } from "./blockok.js";

window.addEventListener("DOMContentLoaded", () => {
    let jatekter = document.querySelector("#jatekter");
    let blockok = document.querySelector("#blockok");
    const key = document.querySelector("#key");
    const karakter = document.querySelector("#charImg");

    let kulcs = jatekter.getContext("2d");
    let char = jatekter.getContext("2d");
    let kozga = blockok.getContext("2d");

    let x;
    let y;
    let height;
    let width;

    let velx = 0;
    let vely = 0;

    let speed = 1;
    let jumpstrenght = 45;
    let grav = 0.5;
    let coll = false;
    let hasKey = false;

    addEventListener("keydown", function(e){
        if(e.code == "KeyD" || e.code == "ArrowRight") velx = +speed;
        if(e.code == "KeyA" || e.code == "Arrowleft") velx = -speed;
        if(e.code == "Space"){
            if(coll){
                jump();
            }
        }
        // ide sidecheck
    });

    addEventListener("keyup", function(e){
        if(e.code == "KeyD"|| e.code == "ArrowRight") velx = 0;
        if(e.code == "KeyA" || e.code == "ArrowLeft") velx = 0;
        // ide is sidecheck 
    });

    async function jump(){
        for(let i = 0; i< jumpstrenght; i++){
            for(let j = 0; j < lvl2.length; j++){
                let block = lvl2[j];
                let bx = block.x;
                let by = block.y;
                let bwidth = block.width;
                let bheight = block.height;
                // ide kell majd sidecheck
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
            // ide delay
            y -= 1;
        }
    }
});