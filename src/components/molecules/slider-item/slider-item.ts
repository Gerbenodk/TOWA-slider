import styles from './slider-item.scss?inline';

const template = document.createElement('template');
template.innerHTML = `
   <div class="slider-item">
    <!--Background image set on slider-item -->
    <div class="slider-item__content">
      <h1 class="slider-item__heading"></h1>
      <p class="slider-item__description"></p>
      <div class="slider-item__actions">
        <custom-button class="slider-item__button learn-more">Mehr erfahren</custom-button>
        <custom-button class="slider-item__button contact" type="button--secondary">Kontakt</custom-button>
      </div>
    </div>
  </div>
`;

class SliderItem extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = styles;
        shadow.appendChild(style);

        shadow.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const heading = this.getAttribute('heading') || '';
        const description = this.getAttribute('description') || '';

        // @TODO make image field dynamic - for dev static image
        const image = 'https://shorturl.at/V6Dkv';
        // const image = this.getAttribute('image') || '';

        const slideElement = this.shadowRoot!.querySelector('.slider-item')!;
        const headingElement = this.shadowRoot!.querySelector('.slider-item__heading')!;
        const descriptionElement = this.shadowRoot!.querySelector('.slider-item__description')!;

        // Set dynamic content
        slideElement.setAttribute('style', `background-image: url(${image});`);
        headingElement.textContent = heading;
        descriptionElement.textContent = description;
    }
}
customElements.define('slider-item', SliderItem);