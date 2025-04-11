// Select all images in the article
const images = document.querySelectorAll('article img');

images.forEach(img => {
    const altText = img.getAttribute('alt');
    if (altText) {
        const caption = document.createElement('small');
        caption.textContent = altText;
        img.insertAdjacentElement('afterend', caption);
    }
});