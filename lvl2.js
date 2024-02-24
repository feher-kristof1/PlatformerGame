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
    });

    addEventListener("keyup", function(e){
        if(e.code == "KeyD"|| e.code == "ArrowRight") velx = 0;
        if(e.code == "KeyA" || e.code == "ArrowLeft") velx = 0;
    });
});