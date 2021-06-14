describe('Shop card operations', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3006');
  });

  context('No device dependent', () => {
    it('toggles favorite', () => {
      cy.get('.product-card__favorite').first().click();
    });
  });

  context('Desktop', () => {
    beforeEach(() => {
      cy.viewport(1280, 920);
    });

    it('adds some products to the cart', () => {
      cy.findAllByText('+ ADD').first().click();
      cy.findAllByText('+ ADD').first().click();
      cy.findAllByText('+ ADD').first().click();

      cy.get('.cart-item').should('have.length', 1);
    });
  });

  context('Mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-xr');
    });

    it('adds a product to the cart', () => {
      cy.get('.product-card').first().click();

      cy.location('pathname').should('include', 'cart');

      cy.get('.cart-item').should('have.length', 1);
    });

    it('adds some products to the cart', () => {
      cy.get('.product-card').first().click();

      cy.location('pathname').should('include', 'cart');

      cy.get('.cart-item').should('have.length', 1);

      cy.get('.header__btn').click();

      cy.location('pathname').should('not.include', 'cart');

      cy.get('.product-card').eq(3).click();

      cy.get('.cart-item').should('have.length', 2);
    });
  });
});
