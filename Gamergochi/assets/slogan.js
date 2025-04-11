// List of slogans
const slogans = [
  "I\'m going ghost!",  
  "Yo quiero Taco Bell.",  
  "Ehrmmm...",  
  "Little did I know it was a creature feature...",  
  "Wanna go metal detecting?",  
  "Ask me about my WoW mount collection!",  
  "This site probably looks like shit on a 4K monitor!",  
  "Add me to your Top 8!",  
  "comfi beats enjoyer",  
  "Snoopy enjoyer",  
  "woo!! :)",  
  "I wish it was 2005!",  
  "Let\'s go Mavs!",
  "Offline Television enjoyer",
  "bring back wonka shockers candy please",
  "Wake up the members of my nation, it's your time to be",
  "Surely you can't be serious?",
  "Not mobile friendly!"
];

// Pick a random slogan and replace the text
function updateRandomSlogan() {
  const randomSlogan = slogans[Math.floor(Math.random() * slogans.length)];
  const sloganElement = document.getElementById('slogan');
  if (sloganElement) {
    sloganElement.innerHTML = `<b>${randomSlogan}</b>`;
  }
}
