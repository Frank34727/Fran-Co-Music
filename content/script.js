// ✅ Check if user is logged in (optional welcome)
const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (currentUser) {
  const welcome = document.createElement("p");
  welcome.className = "text-white p-3";
  welcome.textContent = `🎉 Welcome, ${currentUser.username}!`;
  document.body.prepend(welcome);
}

// ✅ Handle Upload
function uploadMusic() {
  const artistName = document.getElementById("artistName").value.trim();
  const songTitle = document.getElementById("songTitle").value.trim();
  const musicFile = document.getElementById("musicFile").files[0];
  const coverImage = document.getElementById("coverImage").files[0];

  if (!artistName || !songTitle || !musicFile) {
    alert("Please fill in all fields and select a music file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const musicData = e.target.result;

    if (coverImage) {
      const coverReader = new FileReader();
      coverReader.onload = function (e2) {
        saveSong(artistName, songTitle, musicData, e2.target.result);
      };
      coverReader.readAsDataURL(coverImage);
    } else {
      saveSong(artistName, songTitle, musicData, "");
    }
  };
  reader.readAsDataURL(musicFile);
}

// ✅ Save song to localStorage
function saveSong(artist, title, music, cover) {
  const song = { artist, title, music, cover };
  const allSongs = JSON.parse(localStorage.getItem("allSongs") || "[]");
  allSongs.push(song);
  localStorage.setItem("allSongs", JSON.stringify(allSongs));

  alert("✅ Song uploaded successfully!");

  // Clear inputs
  document.getElementById("artistName").value = "";
  document.getElementById("songTitle").value = "";
  document.getElementById("musicFile").value = "";
  document.getElementById("coverImage").value = "";
}
