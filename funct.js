function delay(mennyi){
    return new Promise((resolve) => setTimeout(resolve, mennyi));
}

function sideCheck(x){
    if(x < 0) x = 300;
    if(x > 300) x = 0;
    return x;
}



export {delay};
export {sideCheck};
