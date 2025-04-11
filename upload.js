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

function checkPassword() {
  const input = document.getElementById("passwordInput").value;
  const correctPassword = "mypassword123";

  if (input === correctPassword) {
    document.getElementById("authBox").style.display = "none";
    document.getElementById("uploadForm").style.display = "block";
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
  }).catch((error) => {
    document.getElementById("status").innerText = "Upload failed: " + error.message;
  });
}