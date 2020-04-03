export function init() {
  const navToggle = document.querySelector<HTMLInputElement>("#toggle-nav");
  if (!navToggle) throw new Error("Can't find nav toggle element");

  function setNavClass(open: boolean) {
    const nav = document.querySelector("nav");
    if (!nav) throw new Error(`Can't find nav element`);
    if (open) {
      nav.classList.add("open");
    } else {
      nav.classList.remove("open");
    }
  }

  navToggle.addEventListener("change", (e) =>
    setNavClass((e.target as HTMLInputElement).checked)
  );
  setNavClass(navToggle.checked);
}
