function delay(mennyi) {
  return new Promise((resolve) => setTimeout(resolve, mennyi));
}

function sideCheck(x) {
  if (x < 0) x = 295;
  if (x > 295) x = 0;
  return x;
}

function LvlDone(){
  document.querySelector("#palyakesz").play();
  document.querySelector("#bgmusic").pause();
}

function GameCompMusic(){
  document.querySelector("#gamecomp").play();
  document.querySelector("#bgmusic").pause();
}

export {delay};
export {sideCheck};
export { LvlDone };
export {GameCompMusic};