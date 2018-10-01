import "./components/header/index.js";
import "./components/nav/index.js";
import "./components/main/index.js";
import "./components/footer/index.js";

customElements.define(
  "dageltie-layout",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    async connectedCallback() {
      this.render();
    }
    render() {
      this.shadowRoot.innerHTML = `
        <dageltie-header></dageltie-header>
        <dageltie-nav></dageltie-nav>
        <dageltie-main><slot></slot></dageltie-main>
        <dageltie-footer></dageltie-footer>
      `;
    }
  }
);
