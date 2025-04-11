document.addEventListener('DOMContentLoaded', function () {
    // Wait for the audio player to be populated dynamically
    const waitForAudioPlayer = setInterval(() => {
      const audio = document.getElementById('audioPlayer');
      const playPauseBtn = document.getElementById('playPauseBtn');
      const volumeControl = document.getElementById('volumeControl');
  
      if (audio && playPauseBtn && volumeControl) {
        clearInterval(waitForAudioPlayer); // Stop checking once elements are available
  
        // Set the default volume to 30%
        audio.volume = 0.30;
  
        // Function to update the slider background dynamically
        function updateSliderBackground(value) {
          const percentage = value * 100;
          volumeControl.style.background = `linear-gradient(to right, #ff9800 ${percentage}%, #e67e00 ${percentage}%)`;
        }
  
        // Initialize the slider background on page load
        updateSliderBackground(volumeControl.value);
  
        // Play/Pause functionality
        playPauseBtn.addEventListener('click', function () {
          if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>'; // Pause icon
          } else {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'; // Play icon
          }
        });
  
        // Volume control functionality
        volumeControl.addEventListener('input', function () {
          audio.volume = this.value;
          updateSliderBackground(this.value); // Update the background based on the slider position
        });
      }
    }, 100); // Check every 100ms
  });
  