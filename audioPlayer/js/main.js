const prevBtn = document.querySelector(".btn__prev");
const nextBtn = document.querySelector(".btn__next");
const playBtn = document.querySelector(".btn__play");
const lastBtn = document.querySelector(".btn__last");
const firstBtn = document.querySelector(".btn__first");

const playBtnImage = document.querySelector(".btn__play-img");
const pauseBtnImage = document.querySelector(".btn__pause-img");
const play = document.querySelector(".item");
const audio = document.querySelector(".audio-song");
const progressContainer = document.querySelector(".progress__container");
const progress = document.querySelector(".progress");
const nameSong = document.querySelector(".item__info-group");
const nameGroup = document.querySelector(".item__info-tack");
const songСover = document.querySelector(".img-song");
// время песни
const durationSong = document.querySelector(".item__timing-song");
const currentTimeSong = document.querySelector(".current-time");
const durationTimeSong = document.querySelector(".duration-time");
// индекс песни
let songIndex = 0;

const songsData = [
  {
    name: "In The End",
    group: "Linkin Park",
    audioSong: "./songs/Linkin Park - In The End.mp3",
    cover: "./img/imgbackground/img1.png",
  },
  {
    name: "Mein Herz Brennt",
    group: "Rammstein",
    audioSong: "./songs/Rammstein - Mein Herz Brennt.mp3",
    cover: "./img/imgbackground/img2.png",
  },
  {
    name: "Knockin' On Heaven's Door",
    group: "Bob Dylan",
    audioSong: "./songs/Bob Dylan - Knockin' On Heaven's Door.mp3",
    cover: "./img/imgbackground/img3.png",
  },
];
// песня по умолчанию
loadSong(songIndex, songsData);
// Load Song
function loadSong(index, data) {
  let { name, group, audioSong, cover } = data[index];
  nameSong.innerHTML = name;
  nameGroup.innerHTML = group;
  audio.src = audioSong;
  songСover.src = cover;
  getTimeSong();
  setTimeSong();
}
// get time song
function getTimeSong() {
  audio.addEventListener("loadedmetadata", () => {
    let time = audio.duration;
    let min = Math.floor(time / 60);
    let sec = Math.floor(time - min * 60);
    min = min < 10 ? `0${min}` : min;
    sec = sec < 10 ? `0${sec}` : sec;
    durationTimeSong.innerHTML = `${min}:${sec}`;
  });
}
// set time song
function setTimeSong() {
  audio.addEventListener("timeupdate", () => {
    let time = audio.currentTime;
    let min = Math.floor(time / 60);
    let sec = Math.floor(time - min * 60);
    min = min < 10 ? `0${min}` : min;
    sec = sec < 10 ? `0${sec}` : sec;
    currentTimeSong.innerHTML = `${min}:${sec}`;
  });
}
// Play
function playSong() {
  audio.play();
  play.classList.add("play");
  addClassActive(songIndex);
}

// Pause
function pauseSong() {
  audio.pause();
  play.classList.remove("play");
}

playBtn.addEventListener("click", function (event) {
  if (event.target === playBtnImage) {
    playSong();
  } else if (event.target === pauseBtnImage) {
    pauseSong();
  }
});

// Next song
function nextSong() {
  songIndex++;
  if (songIndex > songsData.length - 1) {
    songIndex = 0;
  }
  loadSong(songIndex, songsData);
  playSong();
}
nextBtn.addEventListener("click", nextSong);

//Prev song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songsData.length - 1;
  }
  loadSong(songIndex, songsData);
  playSong();
}
prevBtn.addEventListener("click", prevSong);

// Last song
function lastSong() {
  songIndex = songsData.length - 1;
  loadSong(songIndex, songsData);
  playSong();
}
lastBtn.addEventListener("click", lastSong);

// First song
function firstSong() {
  songIndex = 0;
  loadSong(songIndex, songsData);
  playSong();
}
firstBtn.addEventListener("click", firstSong);

// Progress line
function updateProgress() {
  const duration = audio.duration;
  const currentTime = audio.currentTime;
  let timeInterval = (currentTime / duration) * 100 + "%";
  progress.style.width = `${timeInterval}`;
}
audio.addEventListener("timeupdate", updateProgress);

// set progress
function setProgress(event) {
  const width = this.clientWidth;
  const clicX = event.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clicX / width) * duration;
}
progressContainer.addEventListener("click", setProgress);

// Autoplay
audio.addEventListener("ended", nextSong);

// Play list
function getPlayListColumn({ name, group, cover }) {
  return `
  <div class="column">
    <div class="column__content">
    <p class="column__group">${name}</p>
      <p class="column__track">${group}</p>
    </div>
    <div class="column__img-inner">
      <img
        class="column__img"
        src="${cover}"
        alt="${name}"
      />
    </div>
  </div>
  `;
}

function getPlayList(data) {
  // создаем и вставляем title
  let playList = document.querySelector(".playlist");
  let title = document.createElement("h3");
  title.classList.add("playlist__title");
  title.innerHTML = "Playlist";
  playList.appendChild(title);

  // создаем и вставляем колонки
  let columnsDiv = document.createElement("div");
  columnsDiv.classList.add("playlist__columns");
  playList.appendChild(columnsDiv);

  const columns = document.querySelector(".playlist__columns");
  data.forEach((item) => {
    columns.insertAdjacentHTML("beforeend", getPlayListColumn(item));
  });
}
getPlayList(songsData);

// click play list
const columns = document.querySelectorAll(".column");
columns.forEach((column, columnIndex) => {
  column.addEventListener("click", () => {
    loadSong(columnIndex, songsData);
    playSong();
    songIndex = columnIndex;
    addClassActive(songIndex);
  });
});
function addClassActive(item) {
  const columns = document.querySelectorAll(".column");
  columns.forEach((column) => {
    column.classList.remove("active");
  });
  columns[item].classList.add("active");
}
