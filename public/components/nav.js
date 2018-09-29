customElements.define(
  "dageltie-nav",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    async connectedCallback() {
      this.render();
    }
    render() {
      this.shadowRoot.innerHTML = `<nav>
  <style type="text/css">
    #nav {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      align-items: flex-start;
      justify-content: center;
      background-color: black;
      color: orange;
    }
    #nav > span {
      flex-basis: 50px;
      line-height: 50px;
      font-family: "Leckerli One";
      font-size: 25px;
      margin-left: 25px;
    }
    a {
      color: orange;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    a:visited {
      text-decoration: dotted;
    }
  </style>
  <div id="nav"><span><a href="/">dageltie</a></span></div>
</nav>`;
    }
  }
);
