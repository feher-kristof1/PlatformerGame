function delay(mennyi){
    return new Promise((resolve) => setTimeout(resolve, mennyi));
}

function sideCheck(x){
    if(x < 0) x = 300;
    if(x > 300) x = 0;
    return x;
}

function levelCompleted(){
    jatekter.style.display = "none";
    blockok.style.display = "none"
    document.querySelector('.level_done').style.display = "block";
}

