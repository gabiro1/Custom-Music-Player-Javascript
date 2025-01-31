const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause-btn');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const playlist = document.getElementById('playlist'); 

let isPlaying = false;
let currentSongIndex = 0;

const songs = [
  { title: 'Yesu Abasha Kugukiza', artist: 'Clarion', src: '9. Yesu Abasha Kugukiza.mp3' },
  { title: 'Mana-Data', artist: 'Send Us', src: '7-Mana-Data.mp3' },
  { title: 'Ese wunvise inkuru', artist: 'Perle de vie', src: 'Ese wunvise inkuru .mp3' }
];
// Dynamically populate the playlist
function populatePlaylist() {
  songs.forEach((song, index) => {
    const li = document.createElement('li'); // Create a new list item
    li.classList.add('song-item');  // Add the class to the li
    li.textContent = song.title;    // Set the song title as the text content

    // Add event listener to each song item to play the selected song
    li.addEventListener('click', () => {
      currentSongIndex = index;  // Set the current song index
      loadSong(currentSongIndex); // Load the song
      if (isPlaying) audio.play(); // Play the song if it's already playing
    });

    playlist.appendChild(li); // Append the li to the playlist
  });
}

function loadSong(songIndex) {
  const song = songs[songIndex];
  audio.src = song.src;   // Set the audio source
  audio.load();           // Load the song
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  progress.value = 0;     // Reset progress
}

function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = 'Play';
  } else {
    audio.play()
      .then(() => {
        playPauseBtn.textContent = 'Pause';
      })
      .catch((error) => {
        console.log('Error playing audio:', error);
      });
  }
  isPlaying = !isPlaying;
}

function updateProgress() {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  progress.value = (currentTime / duration) * 100;
}

function changeProgress() {
  const progressValue = progress.value;
  const duration = audio.duration;
  audio.currentTime = (progressValue / 100) * duration;
}

function changeVolume() {
  audio.volume = volume.value / 100;
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) audio.play();
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) audio.play();
}

// Call populatePlaylist to load the playlist on page load
populatePlaylist();

playPauseBtn.addEventListener('click', togglePlayPause);
progress.addEventListener('input', changeProgress);
volume.addEventListener('input', changeVolume);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// Load the first song initially
loadSong(0);

// Update progress every second
audio.addEventListener('timeupdate', updateProgress);
