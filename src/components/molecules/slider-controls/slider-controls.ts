import styles from './slider-controls.scss?inline';

const template = document.createElement('template');
template.innerHTML = `
    <style>${styles}</style>
    <div class="slider-controls">
        <div class="slider-controls__blocks"></div>
    
        <div class="slider-controls__arrows">
            <button 
                class="slider-controls__arrow prev" 
                aria-label="Previous Slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
            </button>
            <button 
                class="slider-controls__arrow next" 
                aria-label="Next Slide" 
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                </svg>
            </button>
        </div>
    </div>
`;

class SliderControls extends HTMLElement {
    private blocks: HTMLElement[] = [];
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

    //gets initialized tough slider.ts
    initBlocks(slideCount: number) {
        const blocksContainer = this.shadowRoot!.querySelector('.slider-controls__blocks')!;
        blocksContainer.innerHTML = '';

        this.blocks = [];

        for (let i = 0; i < slideCount; i++) {
            const block = document.createElement('div');
            block.classList.add('slider-controls__block');
            block.setAttribute('data-index', i.toString());
            block.addEventListener('click', () => this.dispatchEvent(new CustomEvent('goToSlide', { detail: i })));

            this.blocks.push(block);
            blocksContainer.appendChild(block);
        }

        this.setActiveBlock(0);
    }

    setActiveBlock(activeIndex: number) {
        this.blocks.forEach((block, index) => {
            block.classList.toggle('slider-controls__block--active', index === activeIndex);
        });
    }
}
customElements.define('slider-controls', SliderControls);