import styles from './slider.scss?inline';

const template = document.createElement('template');
template.innerHTML = `
    <div class="slider">
        <div class="slider__content">
          <slot></slot>
        </div>
        <slider-controls></slider-controls>
    </div>
`;

class Slider extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = styles;
        shadow.appendChild(style);

        shadow.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('slider-component', Slider);