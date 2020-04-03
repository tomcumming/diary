function loaded() {
  const nav = document.querySelector("nav");
  const navToggle = document.querySelector("#toggle-nav");
  navToggle.addEventListener("change", (e) => {
    if ((e.target as HTMLInputElement).checked) {
      nav.classList.add("open");
    } else {
      nav.classList.remove("open");
    }
  });
}

window.addEventListener("DOMContentLoaded", loaded);
