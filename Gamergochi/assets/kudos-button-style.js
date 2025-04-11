document.addEventListener("DOMContentLoaded", () => {
    const kudosButton = document.querySelector(".tinylytics_kudos");
    if (kudosButton) {
      // Add inline styles directly to the button
      kudosButton.style.fontSize = "18px";
      kudosButton.style.padding = "10px 16px";
      kudosButton.style.backgroundColor = "#dbdbdb";
      kudosButton.style.color = "#262626";
      kudosButton.style.border = "1px solid #8e8e8e"; // Adds a 1px dark gray border
      kudosButton.style.borderRadius = "5px"; // Optional rounded corners
    }
  });