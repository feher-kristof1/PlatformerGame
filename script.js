import {blockokcl} from "./blockok.js";

document.addEventListener("DOMContentLoaded", () => {
  let player = document.querySelector(".player");
  let level; // kulonbozo szimbolumok jelzik hogy mi hol van

  let menu = document.querySelector("#menu");
    let blockok = document.querySelector("#block");

    let char = menu.getContext("2d");
    let kozga = blockok.getContext("2d")

    let x = 10;
    let y = 139;
    let width = 6;
    let height = 5;
    let velxj = 0;
    let velxb = 0;
    let vely=0;
    let speed = 1;
    let jumpstrenght = 30;
    let grav = 1;
    let coll = false;


    addEventListener("keydown", function (e) {
        if (e.code == "KeyD") velxj = +speed;
        if (e.code == "KeyA") velxb = -speed;;
        if (e.code == "ArrowRight") velxj = speed;
        if (e.code == "ArrowLeft") velxb = -speed;
        if(e.code == "Space") {
            if(coll) {
                for(let i=0;i<jumpstrenght;i+=1){
                    y-=1

                }
            }
        }
    });
    
    addEventListener("keyup", function (e) {
        if (e.code == "KeyD") velxj = 0;
        if (e.code == "KeyA") velxb = 0;
        if (e.code == "ArrowRight") velxj = 0;
        if (e.code == "ArrowLeft") velxb = 0;
    });

    function update(){
        if(coll == false) grav=1;
        x+=velxb;
        x+=velxj;
        y+=(vely+grav);
        coll=false;

        for(let i=0;i<blockokcl.length;i++){
            let block = blockokcl[i]
            let bx = block.x;
            let by = block.y;
            let bwidth = block.width;
            let bheight = block.height;

            kozga.fillRect(bx,by,bwidth,bheight)
            kozga.fillStyle="red"

            if(y+height>=by&&y+height<=by+bheight&&x+width>=bx&&x+width<=bx+bwidth+5||y+height<=by&&y+height<=by+bheight&&x>=bx&&x<=bx+bwidth+5) {
                if(y<by&&y>by-bheight&&y+height>by-bheight){
                    y=by-height;
                    coll=true
                }
                if(y<by-bheight) {
                    coll=false
                }
                if(y>by&&y+height>by){
                    y=by+bheight
                    coll=true
                }
                if(y<=by+bheight&&y+height>=by+bheight&&x+width>=bx){
                    coll=true
                    y=(by+bheight)-1
                }
            }
            console.log(bx, x+2, menu.width/2)
        }


        char.clearRect(0, 0, menu.width, menu.height);
        char.fillRect(x,y,width,height);

        if(y+2>140) {
            y=139;
            grav=0;
            coll=true;
        } 
        if(y<0) y=0;

        requestAnimationFrame(update);
        console.log(y, "x",x)
        }


    update()
});