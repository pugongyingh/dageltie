import "./components/identity/index.js";

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
      const user = netlifyIdentity.currentUser();
      this.shadowRoot.innerHTML = `<nav>
  <style type="text/css">
    #nav {
      display: flex;
      flex-grow: 1;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      background-color: black;
      color: orange;
    }
    #links {
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
    #identity {
      margin-right: 25px;
    }
  </style>
  <div id="nav">
    <span id="links">
      <a href="#about">about</a>
      |
      <a href="#contact">contact</a>
    </span>
    <span id="identity">
      <dageltie-identity></dangeltie-identity>
    </span>
</div>
</nav>`;
    }
  }
);
