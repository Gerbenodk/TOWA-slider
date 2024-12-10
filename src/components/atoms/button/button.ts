import styles from './button.scss?inline';

const template: HTMLTemplateElement = document.createElement('template');
template.innerHTML = `
    <style>${styles}</style>
    <button class="button">
        <slot></slot>
    </button>
`;

class Button extends HTMLElement {
    constructor() {
        super();
        const shadow: ShadowRoot = this.attachShadow({ mode: 'open' });

        shadow.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const type: string = this.getAttribute('type') || 'button--primary';

        const button: Element = this.shadowRoot!.querySelector('.button')!;
        button.classList.add(type);
    }
}

customElements.define('custom-button', Button);