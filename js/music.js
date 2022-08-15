const mAudio = new Audio("assets/80s-synthwave-game-music-112662.mp3");
mAudio.loop = true;

function toggleMusic() {
  if (mAudio.paused) {
    mAudio.volume = 0.1;
    mAudio.play();

    toggleMusic.interval = setInterval(() => {
      if (mAudio.volume > 0.94) {
        mAudio.volume = 1;
        clearInterval(toggleMusic.interval);
      } else {
        mAudio.volume += 0.05;
      }
    }, 50);
  } else {
    clearInterval(toggleMusic.interval);
    mAudio.pause();
  }
}

function stopMusic() {
  mAudio.pause();
  mAudio.currentTime = 0;
}
