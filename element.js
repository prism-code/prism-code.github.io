!(function () {
  customElements.define(
    "prism-code",
    class extends HTMLElement {
      connectedCallback() {
        const version = "1.24.1";
        const createElement = (
          tag,
          props = {},
          element = document.createElement(tag)
        ) => {
          if (props.append) {
            element.append(...props.append);
            delete props.append;
          }
          return Object.assign(element, props);
        };
        setTimeout(() => {
          // wait till lightDOM is parsed
          new Promise((resolve, reject) => {
            if (window.Prism) {
              resolve();
              return;
            }
            document.head.append(
              createElement("script", {
                src: `https://cdnjs.cloudflare.com/ajax/libs/prism/${version}/prism.min.js`,
                onload: resolve,
                onerror: reject,
              })
            );
          }).then(() => {
            this.attachShadow({ mode: "open" }).append(
              createElement("style", {
                textContent: `@import url('https://cdnjs.cloudflare.com/ajax/libs/prism/${version}/themes/prism.min.css');`,
              }),
              createElement("pre", {
                append: [
                  createElement("code", {
                    className: `language-${
                      this.getAttribute("language") || "javascript"
                    }`,
                    textContent: this.textContent.trim(),
                  }),
                ],
              })
            ); //append
            Prism.highlightAllUnder(this.shadowRoot);
          }); // then
        }, 0); // setTimeout
      } // connectedCallback
    } // class
  ); // customElements.define
})();
