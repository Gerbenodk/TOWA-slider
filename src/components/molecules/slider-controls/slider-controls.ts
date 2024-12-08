import styles from './slider-controls.scss?inline';

const template = document.createElement('template');
template.innerHTML = `
   <div class="slider-controls">
    <custom-button class="slider-controls__button prev">◀</custom-button>
    <custom-button class="slider-controls__button next">▶</custom-button>
  </div>
`;



class SliderControls extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = styles;
        shadow.appendChild(style);

        shadow.appendChild(template.content.cloneNode(true));
    }
}
customElements.define('slider-controls', SliderControls);