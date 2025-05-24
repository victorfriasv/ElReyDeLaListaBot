const firebaseConfig = {
  apiKey: "AIzaSyCTU6YmVCEpw_83xXNRmCimLmMgRxdv9ps",
  authDomain: "elreydelalistabot.firebaseapp.com",
  projectId: "elreydelalistabot",
  storageBucket: "elreydelalistabot.firebasestorage.app",
  messagingSenderId: "581972590063",
  appId: "1:581972590063:web:ff29eccda97a5c47750a1a",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

firebase.auth().signInAnonymously().then(() => {
  const listRef = db.ref("lista");

  listRef.on("value", (snapshot) => {
    const lista = snapshot.val() || {};
    const ul = document.getElementById("lista");
    ul.innerHTML = "";
    Object.entries(lista).forEach(([key, value]) => {
      const li = document.createElement("li");
      li.textContent = value.name;
      li.style.textDecoration = value.checked ? "line-through" : "none";
      li.onclick = () => listRef.child(key).update({ checked: !value.checked });
      ul.appendChild(li);
    });
  });

  window.addItem = () => {
    const val = document.getElementById("item").value;
    if (val) {
      listRef.push({ name: val, checked: false });
      document.getElementById("item").value = "";
    }
  };
});
