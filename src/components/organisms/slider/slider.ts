import styles from './slider.scss?inline';

const template = document.createElement('template');
template.innerHTML = `
    <style>${styles}</style>
    <div class="slider">
        <div class="slider__track"></div>
        <slider-controls></slider-controls>
    </div>
`;

class Slider extends HTMLElement {
    private currentSlide: number = 0;
    private maxSliderCount: number = 4
    private slides: HTMLElement[] = [];

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        shadow.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.fetchSliderData();

        //Event fired by slider-contols component
        const controls = this.shadowRoot!.querySelector('slider-controls')!;
        controls.addEventListener('prev', () => this.goToSlide(-1));
        controls.addEventListener('next', () => this.goToSlide(1));

        this.updateSlidePosition();
    }

    disconnectedCallback() {
        const controls = this.shadowRoot!.querySelector('slider-controls')!;
        controls.removeEventListener('prev', () => this.goToSlide(-1));
        controls.removeEventListener('next', () => this.goToSlide(1));

        // @TODO find clean way to remove event listeners mobile
        this.removeEventListener('touchstart', () => {});
        this.removeEventListener('touchend', () => {});
    }

    private async fetchSliderData() {
        try {
            const response = await fetch('https://dummyjson.com/products');
            const data = await response.json();

            const limitedItems = data.products.slice(0, this.maxSliderCount);
            this.populateSlides(limitedItems);
        } catch (error) {
            console.error('Error fetching slider data:', error);
        }
    }

    // Populate slider with dynamically created slides
    private populateSlides(products: any[]) {
        const track = this.shadowRoot!.querySelector('.slider__track')!;

        track.innerHTML = '';

        products.forEach((product) => {
            const slide = document.createElement('slider-item');
            slide.setAttribute('heading', product.title);
            slide.setAttribute('description', product.description);
            slide.setAttribute('image', product.thumbnail);

            track.appendChild(slide);

            this.slides.push(slide);
        });

        this.updateSlidePosition();
        this.setupTouchGestures();
    }

    private goToSlide(direction: number) {
        let sliderIndex = this.currentSlide + direction; // add number so forwards is + 1 backwards is + -1

        if (sliderIndex < 0) sliderIndex = this.slides.length - 1; // Loop back to the last slide
        if (sliderIndex >= this.slides.length) sliderIndex = 0;   // Loop back to the first slide

        this.currentSlide = sliderIndex;
        this.updateSlidePosition();
    }

    private updateSlidePosition() {
        const track = this.shadowRoot!.querySelector('.slider__track')!;
        track.setAttribute('style', `transform: translateX(-${this.currentSlide * 100}%);`);
    }

    private setupTouchGestures() {
        let startX = 0;

        this.addEventListener('touchstart', (e) => (startX = e.touches[0].clientX));
        this.addEventListener('touchend', (e) => {
            const deltaX = e.changedTouches[0].clientX - startX;
            if (deltaX > 50) this.goToSlide(-1);
            if (deltaX < -50) this.goToSlide(1);
        });
    }
}

customElements.define('slider-component', Slider);