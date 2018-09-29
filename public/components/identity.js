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
        switch (name) {
          case "login":
            return this.login();
          case "signup":
            return this.signup();
          case "logout":
            return this.logout();
          default:
            break;
        }
      });
      netlifyIdentity.on("init", () => this.render());
      netlifyIdentity.on("login", () => this.render());
      netlifyIdentity.on("logout", () => this.render());
    }
    login() {
      netlifyIdentity.open("login");
    }
    signup() {
      netlifyIdentity.open("signup");
    }
    logout() {
      netlifyIdentity.open();
    }
    renderLogin() {
      return `<span id="login" class="link">Login</span>`;
    }
    renderSignUp() {
      return `<span id="signup" class="link">Sign Up</span>`;
    }
    renderLogout () {
      return `
        <img 
          id="logout"
          src="${this.user.user_metadata.avatar_url}"
          alt="${this.user.user_metadata.full_name}"
          width="40px"
          height="40px"
        />
      `;
    }
    render() {
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
          #logout {
            border-radius: 100%;
            cursor: pointer;
          }
        </style>
        <span id="identity">${content}</span>
      `;
    }
  }
);
