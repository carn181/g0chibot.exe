// Load JSON data and populate the HTML
fetch('/assets/data.json')
  .then(response => response.json())
  .then(data => {
    populateProfile(data.profile);
    populateContact(data.contact);
    populateAudioPlayer(data.audioPlayer);
    updateRandomSlogan(); // Call the slogan update after populating the profile
  })
  .catch(error => console.error('Error loading data:', error));

// Populate profile section
function populateProfile(profile) {
  const profileSection = document.getElementById('profile-section');
  profileSection.innerHTML = `
    <div class="profile-header">${profile.name}</div>
    <div class="profile-body">
      <div class="profile-image">
        <img src="${profile.profilePicture}" alt="${profile.name}'s profile picture" draggable="false">
      </div>
      <div class="profile-text">
        <div id="slogan">
          <b>${profile.slogan}</b> <!-- Placeholder for slogan -->
        </div>
        <br>
        ${profile.gender.label} <img src="${profile.gender.icon}" alt="${profile.gender.label} icon" style="height: 15px;"><br>
        ${profile.age} years old<br>
        ${profile.location}<br>
        <br>
        <img src="${profile.onlineStatus}" alt="Online Now">
      </div>
    </div>
    <div class="profile-mood">
      <b>Mood:</b> <span>${profile.mood.status} <img src="${profile.mood.icon}" style="height: 16px; alt="Mood icon"></span>
    </div>
    <div class="profile-links">
      <b>View My: 
        ${profile.links.map(link => `<a href="${link.url}" target="_blank">${link.text}</a>`).join(' | ')}
      </b>
    </div>
  `;
}

// Populate contact section
function populateContact(contact) {
  const contactSection = document.getElementById('contact-section');
  const columns = [[], []]; // Two columns for contacts

  contact.socials.forEach((social, index) => {
    const columnIndex = index % 2; // Alternate between column 0 and column 1
    columns[columnIndex].push(`
      <a href="${social.url}" target="_blank" class="contact-link">
        <img src="${social.icon}" height="14px" alt="${social.name}"> ${social.name}
      </a>
    `);
  });

  contactSection.innerHTML = `
    <div class="contact-header">
      <span>&nbsp;&nbsp;Contacting Max</span>
    </div>
    <div class="contact-content">
      <div class="contact-column">${columns[0].join('')}</div>
      <div class="contact-column">${columns[1].join('')}</div>
    </div>
  `;
}

// Populate audio player
function populateAudioPlayer(audioPlayer) {
  const audioPlayerDiv = document.getElementById('audio-player');
  audioPlayerDiv.innerHTML = `
    <button id="playPauseBtn"><i class="fas fa-play"></i></button>
    <div class="audio-info">
      <div class="title">${audioPlayer.title}</div>
      <div class="artist">${audioPlayer.artist}</div>
      <div class="volume-slider">
        <input type="range" id="volumeControl" min="0" max="1" step="0.01" value="0.30">
      </div>
    </div>
    <audio id="audioPlayer" style="display:none;">
      <source src="${audioPlayer.audioFile}" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  `;
}
