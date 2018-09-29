import "./header.js";
import "./nav.js";
import "./main.js";
import "./footer.js";

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
