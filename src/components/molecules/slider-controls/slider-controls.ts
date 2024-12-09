import styles from './slider-controls.scss?inline';

const template = document.createElement('template');
template.innerHTML = `
    <style>${styles}</style>
    <div class="slider-controls">
        <!-- @TODO add blocks for each slide and show which is active-->
        <div class="slider-controls__container"></div>
    
        <div class="slider-controls__arrows">
            <custom-button 
                class="slider-controls__button prev" 
                aria-label="Previous Slide"
                type="button--arrow"
            >
                ◀
            </custom-button>
            <custom-button 
                class="slider-controls__button next" 
                aria-label="Next Slide" 
                type="button--arrow"
            >
                ▶
            </custom-button>
        </div>
    </div>
`;

class SliderControls extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        shadow.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const prevButton = this.shadowRoot!.querySelector('.prev')!;
        const nextButton = this.shadowRoot!.querySelector('.next')!;

        prevButton.addEventListener('click', () => this.dispatchEvent(new CustomEvent('prev')));
        nextButton.addEventListener('click', () => this.dispatchEvent(new CustomEvent('next')));
    }
}
customElements.define('slider-controls', SliderControls);