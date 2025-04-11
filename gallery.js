const firebaseConfig = {
    apiKey: "AIzaSyBHiXDPWU0V9zBhoicWb7VL5YP6I7ZIcBo",
    authDomain: "website-f9439.firebaseapp.com",
    projectId: "website-f9439",
    storageBucket: "website-f9439.appspot.com",
    messagingSenderId: "614527810563",
    appId: "1:614527810563:web:42ad92fc101c83d095a236"
    };


firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

const correctPassword = "mypassword123";

function checkPassword() {
  const input = document.getElementById("passwordInput").value;
  if (input === correctPassword) {
    document.getElementById("authBox").style.display = "none";
    document.getElementById("uploadForm").style.display = "block";
    loadImages();
  } else {
    document.getElementById("authMessage").innerText = "Incorrect password!";
  }
}

function uploadImage() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) return;

  const ref = storage.ref("images/" + file.name);
  ref.put(file).then(() => {
    document.getElementById("status").innerText = "Upload successful!";
    loadImages(); // refresh
  }).catch((error) => {
    document.getElementById("status").innerText = "Upload failed: " + error.message;
  });
}

function loadImages() {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  storage.ref("images/").listAll().then((result) => {
    result.items.forEach((imageRef) => {
      imageRef.getDownloadURL().then((url) => {
        const div = document.createElement("div");

        const img = document.createElement("img");
        img.src = url;

        const btn = document.createElement("button");
        btn.innerText = "Delete";
        btn.className = "delete-btn";
        btn.onclick = () => deleteImage(imageRef.fullPath);

        div.appendChild(img);
        div.appendChild(btn);
        gallery.appendChild(div);
      });
    });
  });
}

function deleteImage(path) {
  storage.ref(path).delete().then(() => {
    alert("Image deleted!");
    loadImages();
  });
}

function displayImage(url) {
  const galleryContainer = document.getElementById("gallery");

  const link = document.createElement("a");
  link.href = url; // Direct Firebase image URL
  link.setAttribute("data-lightbox", "gallery");
  link.setAttribute("data-title", "Tap to close");

  const img = document.createElement("img");
  img.src = url;
  img.alt = "Uploaded Image";
  img.classList.add("gallery-image"); // optional for CSS styling

  link.appendChild(img);
  galleryContainer.appendChild(link);
}