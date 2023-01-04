if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./serviceworker.js")
    .then((reg) => console.log("success", reg.scope))
    .catch((err) => console.log("failure:", err));
}
