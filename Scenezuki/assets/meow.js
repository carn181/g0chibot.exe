const catImage = document.getElementById('cat-image');
const meowSound = document.getElementById('meow-sound');

catImage.addEventListener('click', () => {
    // Play the meow sound
    meowSound.currentTime = 0; // Reset sound if already playing
    meowSound.play();
    
    // Add wiggle animation
    catImage.classList.add('wiggle');
    
    // Remove wiggle animation after 1 second
    setTimeout(() => {
        catImage.classList.remove('wiggle');
    }, 1000);
});
