const gallery = document.getElementById("gallery");

if (gallery) {
    const imageCount = 6; // Update this when you add more photos
    for (let i = 1; i <= imageCount; i++) {
        const img = document.createElement("img");
        img.src = `images/photo${i}.jpg`;
        img.alt = `Photo ${i}`;
        gallery.appendChild(img);
    }
}
