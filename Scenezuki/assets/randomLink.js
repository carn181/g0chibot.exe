// List of 90s things that live in my head rent-free
const urls = [
    "https://www.youtube.com/watch?v=S8EvnM2XUTI",
    "https://www.youtube.com/watch?v=JkxNLeKGr4M",
    "https://www.youtube.com/watch?v=myIR__htBgc",
    "https://www.youtube.com/watch?v=nOpgKz9y9fA",
    "https://www.youtube.com/watch?v=B6L6WtjobIk",
    "https://www.youtube.com/watch?v=uwJQQux0TF0",  
    "https://www.youtube.com/watch?v=UtVJdPfm0F8",  
    "https://www.youtube.com/watch?v=UtVJdPfm0F8",  
];

// Pick a random URL
const randomURL = urls[Math.floor(Math.random() * urls.length)];

// Update the anchor tag's href with the random URL
document.getElementById("randomLink").href = randomURL;
