customElements.define(
  "dageltie-identity",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    get user() {
      return netlifyIdentity.currentUser();
    }
    async connectedCallback() {
      this.shadowRoot.addEventListener("click", (event) => {
        const name = event.srcElement.id;
        if (this[name]) {
          this[name]();
        }
      });
      netlifyIdentity.on("init", () => this.render());
      this.render();
    }
    login() {
      netlifyIdentity.open("login");
    }
    signup() {
      netlifyIdentity.open("signup");
    }
    logout() {
      netlifyIdentity.logout();
    }
    renderLogin() {
      return `<span id="login" class="link">Login</span>`;
    }
    renderSignUp() {
      return `<span id="signup" class="link">Sign Up</span>`;
    }
    renderLogout () {
      return `
        <span><img src="${this.user.user_metadata.avatar_url}" alt="${this.user.user_metadata.full_name}"</span>
        <span>${this.user.user_metadata.full_name}</span>
        <span>${this.user.email}</span>
        <span id="logout" class="link">
          Logout
        </span>
      `;
    }
    render() {
      console.log("user", this.user);
      let content;
      if (this.user) {
        content = this.renderLogout();
      } else {
        content = `${this.renderLogin()} / ${this.renderSignUp()}`;
      }
      this.shadowRoot.innerHTML = `
        <style type="text/css">
          #identity {
            color: white;
            font-family: "Bai Jamjure";
            font-size: 20px;
            font-weight: 100;
          }
          .link {
            cursor: pointer;
          }
          .link:hover {
            text-decoration: underline;
          }
        </style>
        <span id="identity">${content}</span>
      `;
    }
  }
);
