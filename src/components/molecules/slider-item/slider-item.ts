import styles from './slider-item.scss?inline';

const template: HTMLTemplateElement = document.createElement('template');
template.innerHTML = `
    <style>${styles}</style>
    <div class="slider-item">
    <!--Background image set on slider-item -->
        <div class="slider-item__content">
            <h1 class="slider-item__heading"></h1>
            <p class="slider-item__description"></p>
            <div class="slider-item__actions">
                <custom-button class="slider-item__button">
                    Mehr erfahren
                    <slot name="icon">
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                            <path d="M4 12h14M15 8l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                        </svg>
                    </slot>
                </custom-button>
                <custom-button class="slider-item__button" type="button--secondary">Kontakt</custom-button>
            </div>
        </div>
    </div>
`;

class SliderItem extends HTMLElement {
    constructor() {
        super();
        const shadow: ShadowRoot = this.attachShadow({mode: 'open'});

        shadow.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const heading: string = this.getAttribute('heading') || '';
        const description: string = this.getAttribute('description') || '';

        // @TODO make image field dynamic - for dev static image
        const image: string = '../assets/img/slide-item.png';
        // const image = this.getAttribute('image') || '';

        const slideElement: Element = this.shadowRoot!.querySelector('.slider-item')!;
        const headingElement: Element = this.shadowRoot!.querySelector('.slider-item__heading')!;
        const descriptionElement: Element = this.shadowRoot!.querySelector('.slider-item__description')!;

        // Set dynamic content values
        slideElement.setAttribute('style', `background-image: url(${image});`);
        headingElement.textContent = heading;
        descriptionElement.textContent = description;
    }
}

customElements.define('slider-item', SliderItem);