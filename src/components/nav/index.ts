import domReady from "../../domready";

export class DiaryNav extends HTMLElement {
  constructor() {
    super();

    const template = document.querySelector<HTMLTemplateElement>(
      "#template-nav"
    );
    if (!template) throw new Error(`Can't find nav template`);
    this.appendChild(template.content.cloneNode(true));

    const toggleButton = this.querySelector<HTMLInputElement>("#toggle-nav");
    if (!toggleButton) throw new Error(`Can't find nav toggle button`);
    toggleButton.addEventListener("change", (e) => {
      if ((e.target as HTMLInputElement).checked) this.classList.add("open");
      else this.classList.remove("open");
    });
  }

  connectedCallback() {
    console.log("hello");
  }

  disconnectedCallback() {
    console.log("goodbye");
  }
}

domReady.then(() => customElements.define("diary-nav", DiaryNav));
