customElements.define(
  "dageltie-header",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    async connectedCallback() {
      this.render();
    }
    render() {
      this.shadowRoot.innerHTML = `<header>
  <style type="text/css">
    #header {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      align-items: center;
      justify-content: center;
      background-color: orange;
      color: white;
    }
    #header > span {
      flex-basis: 50px;
      line-height: 50px;
      font-family: "Leckerli One";
      font-size: 25px;
    }
  </style>
  <div id="header"><span>dageltie</span></div>
</header>`;
    }
  }
);
