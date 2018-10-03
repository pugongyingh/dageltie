customElements.define(
  "dageltie-main",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    async connectedCallback() {
      this.render();
    }
    render() {
      this.shadowRoot.innerHTML = `<main>
  <style type="text/css">
    #main {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      align-items: flex-start;
      justify-content: center;
      background-color: white;
      color: black;
      padding: 25px;
      margin-bottom: 50px;
      max-width: 960px;
      margin-left: auto;
      margin-right: auto;
    }
    ::slotted(h1) {
      font-family: "Notable";
      font-size: 50px;
    }
    ::slotted(h1:first-child) {
      margin-top: 0;
    }
    ::slotted(h2) {
      font-family: "Leckerli One";
      font-size: 25px;
    }
    ::slotted(p) {
      font-family: "Bai Jamjuree";
      font-size: 20px;
      font-weight: 100;
    }
  </style>
  <div id="main">
    <slot></slot>
  </div>
</main>`;
    }
  }
);
