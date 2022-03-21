let signInBtn = document.getElementById("signIn");
let emailInput = document.getElementById("email");
let passInput = document.getElementById("password");

var firebaseConfig = {
  apiKey: "AIzaSyBfx00MvbvolEe6DJdw8nKYPMotXdm5nbg",
  authDomain: "chrome-ext-9c9aa.firebaseapp.com",
  projectId: "chrome-ext-9c9aa",
  storageBucket: "chrome-ext-9c9aa.appspot.com",
  messagingSenderId: "517841050613",
  appId: "1:517841050613:web:8b92ae0000eaa99beedebc",
};

firebase.initializeApp(firebaseConfig);

chrome.storage.local.set({ l: 0, t: 1 }, () => {});

signInBtn.addEventListener("click", async function () {
  let email = emailInput.value;
  let pass = passInput.value;

  // firebase
  //   .auth()
  //   .createUserWithEmailAndPassword(email, pass)
  //   .then((userCredential) => {
  //     // Signed in
  //     var user = userCredential.user;
  //     window.location.replace("../popup.html");
  //     // ...
  //   })
  //   .catch((error) => {
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     // ..
  //   });

  firebase
    .auth()
    .signInWithEmailAndPassword(email, pass)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      chrome.storage.local.set({ l: 1 }, () => {
        console.log("loggedIn set");
      });
      window.location.replace("../popup.html");
      console.log({ user });
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
});
