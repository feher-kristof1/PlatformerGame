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
});