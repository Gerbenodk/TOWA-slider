describe('Slider Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  //add this test to ensure that when on first or last test don't break
  it('should render the slider with 4 slides', () => {
    cy.get('slider-component').shadow().find('.slider__track > slider-item').should('have.length', 4);
  });

  it('should navigate to the next slide when the next arrow is clicked', () => {
    cy.get('slider-component')
        .shadow()
        .find('slider-controls')
        .shadow()
        .find('.slider-controls__arrow.next')
        .click();

    cy.get('slider-component')
        .shadow()
        .find('.slider__track')
        .should('have.attr', 'style')
        .and('include', 'translateX(-100%)');
  });

  it('should navigate to the previous slide when the previous arrow is clicked', () => {
    cy.get('slider-component')
        .shadow()
        .find('slider-controls')
        .shadow()
        .find('.slider-controls__arrow.prev')
        .click();

    cy.get('slider-component')
        .shadow()
        .find('.slider__track')
        .should('have.attr', 'style')
        .and('include', 'translateX(-300%)');
  });

  it('should go to a specific slide when a block is clicked', () => {
    cy.get('slider-component')
        .shadow()
        .find('slider-controls')
        .shadow()
        .find('.slider-controls__block[data-index="2"]')
        .click();

    cy.get('slider-component')
        .shadow()
        .find('.slider__track')
        .should('have.attr', 'style')
        .and('include', 'translateX(-200%)');
  });

  it('should allow swiping to navigate slides on touch devices', () => {
    const startX = 100;
    const endX = 10;

    cy.get('slider-component')
        .trigger('touchstart', { touches: [{ clientX: startX }] })
        .trigger('touchend', { changedTouches: [{ clientX: endX }] });

    cy.get('slider-component')
        .shadow()
        .find('.slider__track')
        .should('have.attr', 'style')
        .and('include', 'translateX(-0%)');
  });
});
