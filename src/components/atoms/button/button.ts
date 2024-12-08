import styles from './button.scss?inline';

const template = document.createElement('template');
template.innerHTML = `
      <button class="button">
        <slot></slot>
      </button>
`;

class Button extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = styles;
        shadow.appendChild(style);

        shadow.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const type = this.getAttribute('type') || 'button--primary';

        const button = this.shadowRoot!.querySelector('.button')!;
        button.classList.add(type);
    }
}

customElements.define('custom-button', Button);