customElements.define(
  "dageltie-footer",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    async connectedCallback() {
      this.render();
    }
    render() {
      this.shadowRoot.innerHTML = `<footer>
  <style type="text/css">
    #footer {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      align-items: flex-end;
      justify-content: center;
      background-color: orange;
      color: black;
    }
    #footer > span {
      flex-basis: 50px;
      line-height: 50px;
      font-family: "Leckerli One";
      font-size: 25px;
      margin-right: 25px;
    }
  </style>
  <div id="footer"><span>&copy; dageltie</span></div>
</footer>`;
    }
  }
);
